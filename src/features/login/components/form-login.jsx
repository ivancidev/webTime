import { useState } from "react";
import { Form } from "../components/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/use-login";
import { supabase } from "../../../services/supabaseClient";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login, error: loginError } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true); // Mostrar el modal de carga
    const { usernameOrEmail, password } = data;

    const success = await login(usernameOrEmail, password);

    setIsLoading(false); // Ocultar el modal de carga

    if (success) {
      navigate("/app"); 
    } else {
      console.error("Error de autenticación:", loginError);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register-user"); 
  };

  const validateUsernameOrEmail = async (usernameOrEmail) => {
    try {
      const { data, error } = await supabase
        .from("usuario")
        .select("correo, nombre_usuario")
        .or(`correo.eq.${usernameOrEmail},nombre_usuario.eq.${usernameOrEmail}`);
      
      if (error || data.length === 0) {
        return "¡Nombre de usuario o correo incorrecto!";
      }
  
      return true; 
    } catch (err) {
      console.error("Error al validar el correo o nombre de usuario:", err);
      return "Ocurrió un error al validar. Inténtalo nuevamente.";
    }
  };

  const validatePassword = async (password, allValues) => {
    const { usernameOrEmail } = allValues;
  
    try {
      const { data: userData, error: userError } = await supabase
        .from("usuario")
        .select("password")
        .or(`correo.eq.${usernameOrEmail},nombre_usuario.eq.${usernameOrEmail}`)
        .single();
  
      if (userError || !userData) {
        return "¡Nombre de usuario o correo incorrecto!"; 
      }
  
      if (userData.password !== password) {
        return "¡Contraseña incorrecta!";
      }
  
      return true; 
    } catch (err) {
      console.error("Error al validar la contraseña:", err);
      return "Ocurrió un error al validar. Inténtalo nuevamente.";
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
      <img
        src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/pexels-cottonbro-4064843.jpg"
        alt="fondo"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="relative w-full h-screen sm:w-[650px] sm:h-[550px] flex flex-col justify-center items-center bg-primary-pri3 sm:rounded-2xl shadow-2xl z-10 border border-gray-200">
        <h1 className="text-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-display text-display-md">
          ¡Bienvenido a Webtime!
        </h1>
        <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-sm mb-5">
          Inicia sesión en tu cuenta
        </h1>
        <div className="w-fit">
          <Form 
            label1="Nombre de usuario o correo"
            label2="Contraseña"
            placeholder1="Ingrese su nombre de usuario o correo"
            placeholder2="Ingrese su contraseña"
            textButton="Iniciar Sesión"
            showButtonForgetPassword="true"
            validationRules1={{
              required: "Este campo es obligatorio",
              validate: async (value) => {
                if (/\s/.test(value)) {
                  return "El correo o nombre de usuario no debe contener espacios.";
                }
                return await validateUsernameOrEmail(value);
              },
            }}
            validationRules2={{
              required: "Este campo es obligatorio",
              validate: async (value, allValues) => {
                if (/\s/.test(value)) {
                  return "La contraseña no debe contener espacios.";
                }
                return await validatePassword(value, allValues);
              },
            }}
            onSubmit={handleSubmit(onSubmit)} 
            register={register} 
            errors={errors} 
          />
          <label className="flex items-center space-x-2">
            <span className="font-body text-body-sm text-neutral-neu0">
              ¿Aún no tienes una cuenta?{" "}
              <button
                type="button"
                className="font-body text-body-sm text-secondary-sec2 underline hover:text-secondary-sec1"
                onClick={handleRegisterClick}
              >
                Regístrate aquí.
              </button>
            </span>
          </label>
        </div>
      </div>
      {/* Modal de carga */}
      <Dialog open={isLoading} PaperProps={{ style: { backgroundColor: 'white', boxShadow: 'none' } }}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
};
