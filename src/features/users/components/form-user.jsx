import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/buttons/button";
import { InputText } from "../../../components/input/input";
import ImageUploader from "./image-uploader";

export const FormUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent m-[20px] font-display text-display-md">
        ¡Bienvenido a Webtime!
      </h1>
      <ImageUploader />

      <div className="pb-6">
        <InputText
          name="name"
          label="Nombre completo"
          placeholder="Ingrese su nombre"
          className="w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
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
          className="w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
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
          className="w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
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
        <InputText
          name="password"
          label="Contraseña"
          placeholder="Escribe aquí"
          type="password"
          className="w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
          register={register}
          errors={errors}
        />
      </div>

      <Button text="Registrarse" variant="combExp" type="submit" />
    </form>
  );
};
