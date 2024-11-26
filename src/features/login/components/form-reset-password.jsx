import { Form } from "../components/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";

export const FormResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  if (!email) {
    console.error("No se proporcionó un email");
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-red-500">
          Error: No se puede restablecer la contraseña sin un correo electrónico válido.
        </p>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const password = watch("password");
  const password2 = watch("usernameOrEmail");

  const validatePasswordStrength = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>~+=\-_;/\[\]]/.test(value);
    const isValid = hasUpperCase && hasNumber && hasSpecialChar;

    if (!isValid) {
      setPasswordStrength(
        "Se requiere por lo menos una mayúscula, número y símbolo"
      );
      return "Se requiere por lo menos una mayúscula, número y símbolo";
    }

    if (value.length <= 4) {
      setPasswordStrength("Contraseña insegura");
    } else if (value.length < 8) {
      setPasswordStrength("Contraseña buena");
    } else {
      setPasswordStrength("Contraseña muy segura");
    }
    return true;
  };

  const updatePassword = async (email, newPassword) => {
    try {
      // Verificar si el usuario existe
      const { data: user, error: userError } = await supabase
        .from("usuario")
        .select("id_usuario")
        .eq("correo", email)
        .single();

      if (userError || !user) {
        throw new Error("Usuario no encontrado");
      }

      // Actualizar la contraseña en la base de datos sin hashing
      const { data, error } = await supabase
        .from("usuario")
        .update({ password: newPassword })
        .eq("correo", email);

      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error("Error al actualizar la contraseña:", err);
      throw err;
    }
  };

  const onSubmit = async (data) => {
    try {
      await updatePassword(email, data.password);
      alert("Contraseña actualizada correctamente");
      navigate("/login");
    } catch (error) {
      alert("Hubo un problema al actualizar la contraseña: " + error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
      <img
        src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/pexels-cottonbro-4064843.jpg"
        alt="fondo"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="relative w-[100%] h-full sm:w-[600px] sm:h-[400px] flex flex-col justify-center items-center bg-primary-pri3 sm:rounded-2xl shadow-2xl z-10 border border-gray-200">
        <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-display text-display-sm text-center">
          Elige una nueva contraseña
        </h1>
        <div className="w-[80%] sm:w-fit">
          <Form
            label1="Nueva contraseña"
            label2="Confirmar contraseña"
            placeholder1="Ingrese su contraseña"
            placeholder2="Ingrese su contraseña"
            textButton="Cambiar contraseña"
            showEyeIconFirstInput="true"
            validationRules1={{
              required: "Este campo es obligatorio",
              minLength: {
                value: 2,
                message: "La contraseña debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 128,
                message: "La contraseña debe tener 128 caracteres o menos",
              },
              validate: validatePasswordStrength,
            }}
            validationRules2={{
              required: "Este campo es obligatorio",
              validate: (value) =>
                value === password2 || "Las contraseñas no coinciden",
            }}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            passwordStrength={passwordStrength}
          />
        </div>
      </div>
    </div>
  );
};
