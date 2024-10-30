import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/button";
import { InputText } from "../../../components/input/input";
import ImageUploader from "./image-uploader";
import EyeOn from "../../../icons/eyeOn";
import EyeOff from "../../../icons/eyeOff";
import TermsModal from "./modal-terms";

export const FormUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = (data) => {
    console.log(data);
    navigate("/preferences");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:items-center"
    >
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
                !/\s{2,}/.test(value) ||
                "No se permiten espacios múltiples consecutivos",
            },
          }}
          labelMarginTop="5px"
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
              message:
                "Nombre de usuario sólo admite caracteres a-z, A-Z, 0-9, _, .",
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
                !/\s{2,}/.test(value) ||
                "No se permiten espacios múltiples consecutivos",
            },
          }}
          labelMarginTop="5px"
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
                /^[a-zA-Z0-9._%+-]+@gmail\.[a-zA-Z]{2,}$/.test(value) ||
                "El correo electrónico debe ser un Gmail válido.",
            },
          }}
          labelMarginTop="5px"
        />

        <div className="w-[95%] sm:w-96">
          <InputText
            name="password"
            label="Contraseña"
            placeholder="Escribe aquí"
            type={showPassword ? "text" : "password"}
            className="w-full bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 pr-12 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
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
            labelMarginTop="5px"
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <EyeOn />}
              </button>
            }
          />
        </div>
        <label className="flex items-center space-x-2 mt-2">
        <input type="checkbox" className="w-4 h-4" required/>
          <span className="font-body text-body-sm text-neutral-neu0">
            He leído y acepto los{" "}
            <button
              type="button"
              onClick={openModal}
              className="font-body text-body-sm text-secondary-sec2 underline"
            >
              Términos y Condiciones.
            </button>
          </span>
        </label>
        {passwordStrength && !errors.password && (
          <span className={`mt-2 ${getPasswordStrengthColor()}`}>
            {passwordStrength}
          </span>
        )}
      </div>
      {isModalOpen && (
        <TermsModal onClose={closeModal} onConfirm={closeModal} />
      )}

      <Button
        text="Registrarse"
        variant="combExp"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};
