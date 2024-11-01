import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/button";
import { InputText } from "../../../components/input/input";
import ImageUploader from "./image-uploader";
import EyeOn from "../../../icons/eyeOn";
import EyeOff from "../../../icons/eyeOff";
import { registerUser } from "../../../services/auth-service";
import { supabase } from "../../../services/supabaseClient";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import TermsModal from "./modal-terms";

export const FormUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setOpenDialog(true);
  

    const response = await registerUser({ ...data, imageFile });
    setIsLoading(false);
  
    if (response.success) {
      setIsSuccess(true); 
    } else {
      setErrorMessage(response.message);
    }
  };

  const validatePasswordStrength = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>~+=\-_;/\[\]]/.test(value);
    const isValid = hasUpperCase && hasNumber && hasSpecialChar;

    if (!isValid) {
      setPasswordStrength("Se requiere por lo menos una mayúscula, número y símbolo");
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

  const validateEmail = async (email) => {
    const { data, error } = await supabase
      .from('usuario')  
      .select('correo')  
      .eq('correo', email); 

    if (error || data.length>0) {
      setPasswordStrength("Correo electrónico ya registrado");
      return "Correo electrónico ya registrado";
    }
    return true  
};

const validateNameUser = async (nameUser) => {
    const { data, error } = await supabase
      .from('usuario')  
      .select('nombre_usuario')  
      .eq('nombre_usuario', nameUser); 

    if (error || data.length>0) {
      setPasswordStrength("Este nombre de usuario está en uso, ingrese otro.");
      return "Este nombre de usuario está en uso, ingrese otro.";
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:items-center"
      >
        <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent m-[20px] font-display text-display-md">
          ¡Bienvenido a Webtime!
        </h1>
        <div className="flex flex-col items-center">
          <ImageUploader onImageSelect={(file) => setImageFile(file)} />
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
                value: 50,
                message: "Nombre no debe exceder 50 caracteres",
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
                value: /^[a-zA-Z0-9_.áéíóúÁÉÍÓÚñÑ\s]*$/,
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
                  !/\s{2,}/.test(value) ||
                  "No se permiten espacios múltiples consecutivos",
                validate: validateNameUser
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
              validate: {
                noSpaces: (value) =>
                  !/\s/.test(value) || "El correo no debe contener espacios",
                isGmail: (value) =>
                  /^[a-zA-Z0-9._%+-]+@gmail/.test(value) ||
                  "El correo electrónico debe ser un gmail válido.",
                  validate: validateEmail
              },
            }}
            labelMarginTop="5px"
          />

          <div className="w-[95%] sm:w-96">
            <InputText
              name="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 pr-12 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
              register={register}
              errors={errors}
              validationRules={{
                required: "Contraseña no puede estar vacía",
                minLength: {
                  value: 4,
                  message: "Contraseña debe tener al menos 4 caracteres",
                },
                maxLength: {
                  value: 40,
                  message: "Contraseña no debe exceder 40 caracteres",
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
          {passwordStrength && !errors.password && (
            <span className={`mt-2 ${getPasswordStrengthColor()}`}>
              {passwordStrength}
            </span>
          )}
          <div className="flex flex-col mt-2 mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                {...register("terms", {
                  required: "Debe aceptar los Términos y Condiciones",
                })}
              />
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
            {errors.terms && (
              <span className="text-error-err2 text-md mt-1">{errors.terms.message}</span>
            )}
          </div>
          {isModalOpen && (
            <TermsModal onClose={closeModal} onConfirm={closeModal} />
          )}

          <Button
            text="Registrarse"
            disabled={isLoading}
            variant="combExp"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
          {errorMessage && (
            <Alert severity="error" style={{ marginTop: "16px" }}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </form>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '20px',
          },
        }}
      >
        {isSuccess ? (
          <>
            <DialogTitle className="text-center text-primary-pri1">Registro exitoso</DialogTitle>
            <DialogContent className="flex flex-col items-center justify-center">
              <Button
                text="Aceptar"
                onClick={() => {
                  setOpenDialog(false);
                  navigate("/preferences"); 
                }}
              />
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle className="text-center text-primary-pri1">Cargando...</DialogTitle>
            <DialogContent className="flex flex-col items-center justify-center">
              <CircularProgress />
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};