import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/buttons/button";
import { InputText } from "../../../components/input/input";
import ImageUploader from "./image-uploader";
import EyeOn from "../../../icons/eyeOn";
import EyeOff from "../../../icons/eyeOff";

export const FormUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data); 
  };

  const passwordValue = watch("password");

  const validatePasswordStrength = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValid = hasUpperCase && hasNumber && hasSpecialChar;

    if (!isValid) {
      setPasswordStrength("Contraseña no válida");
      return "Contraseña no válida";
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

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "Contraseña insegura":
        return "text-red-500";
      case "Contraseña buena":
        return "text-orange-500";
      case "Contraseña muy segura":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:items-center">
      <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent m-[20px] font-display text-display-md">
        ¡Bienvenido a Webtime!
      </h1>
      <div className="flex flex-col items-center">
        <ImageUploader />
      </div>
      
      <div className="pb-6">
        <InputText
          name="name"
          label="Nombre completo"
          placeholder="Ingrese su nombre"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
          register={register}
          errors={errors}
          validationRules={{
            required: "Nombre no puede estar vacío",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
              message: "Nombre sólo admite caracteres a-z, A-Z",
            },
            minLength: {
              value: 2,
              message: "Nombre debe tener al menos 2 caracteres",
            },
            maxLength: {
              value: 20,
              message: "Nombre no debe exceder 20 caracteres",
            },
            validate: {
              noMultipleSpaces: (value) =>
                !/\s{2,}/.test(value) || "No se permiten espacios múltiples consecutivos",
            },
          }}
        />
        <InputText
          name="nickname"
          label="Nombre de usuario"
          placeholder="Ingrese un nombre de usuario"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
          register={register}
          errors={errors}
          validationRules={{
            required: "Nombre de usuario no puede estar vacío",
            pattern: {
              value: /^[a-zA-Z0-9_.áéíóúÁÉÍÓÚñÑ]*$/,
              message: "Nombre de usuario sólo admite caracteres a-z, A-Z, 0-9, _, .",
            },
            minLength: {
              value: 2,
              message: "Nombre de usuario debe tener al menos 2 caracteres",
            },
            maxLength: {
              value: 20,
              message: "Nombre de usuario no debe exceder 20 caracteres",
            },
            validate: {
              noMultipleSpaces: (value) =>
                !/\s{2,}/.test(value) || "No se permiten espacios múltiples consecutivos",
            },
          }}
        />
        <InputText
          name="email"
          label="Correo electrónico"
          placeholder="Ingrese su correo electrónico"
          type="email"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
          register={register}
          errors={errors}
          validationRules={{
            required: "Correo electrónico no puede estar vacío",
            minLength: {
              value: 6,
              message: "Correo electrónico debe tener al menos 6 caracteres",
            },
            maxLength: {
              value: 60,
              message: "Correo electrónico no debe exceder 60 caracteres",
            },
            validate: {
              noSpaces: (value) =>
                !/\s/.test(value) || "El correo no debe contener espacios",
              isGmail: (value) =>
                /^[a-zA-Z0-9._%+-]+@gmail\.[a-zA-Z]{2,}$/.test(value) || "El correo electrónico debe ser un Gmail válido.",
            },
          }}
        />

        <div className="relative">
          <InputText
            name="password"
            label="Contraseña"
            placeholder="Escribe aquí"
            type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
            className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 pr-10 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
            register={register}
            errors={errors}
            validationRules={{
              required: "Contraseña no puede estar vacía",
              maxLength: {
                value: 20,
                message: "Contraseña no debe exceder 20 caracteres",
              },
              validate: validatePasswordStrength,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-8 md:right-3 transform -translate-y-[50%]"
            style={{ top: '77px' }}
          >
            {showPassword ? <EyeOff /> : <EyeOn />}
          </button>
        </div>
        {passwordStrength && !errors.password && (
          <span className={`mt-2 ${getPasswordStrengthColor()}`}>
            {passwordStrength}
          </span>
        )}
      </div>

      <Button text="Registrarse" variant="combExp" type="submit" />
    </form>
  );
};
