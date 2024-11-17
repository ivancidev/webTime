import { Form } from "../components/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const FormResetPassword = () => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
  } = useForm();

  const [passwordStrength, setPasswordStrength] = useState("");
  const password = watch("password");

  const onSubmit = (data) => {
      console.log("Datos enviados:", data);
      // Lógica para actualizar la contraseña en el servidor
  };

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

  return (
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
          <img
              src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/pexels-cottonbro-4064843.jpg"
              alt="fondo"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative w-[600px] h-[400px] flex flex-col justify-center items-center bg-primary-pri3 rounded-2xl shadow-2xl z-10 border border-gray-200">
              <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-display text-display-sm">
                  Elige una nueva contraseña
              </h1>
              <div className="w-fit">
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
                              message: "Usa 2 caracteres o más",
                          },
                          maxLength: {
                              value: 128,
                              message: "Ingresa una contraseña con 128 caracteres o menos",
                          },
                          validate: validatePasswordStrength,
                      }}
                      validationRules2={{
                          required: "Este campo es obligatorio",
                          validate: (value) =>
                              value === password || "Las contraseñas no coinciden",
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
