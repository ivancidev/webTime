import React, { useState } from "react";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import { InputText } from "../../../components/input/input";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode } from "../../../services/reset-password";
import { verifyResetCode } from "../../../services/verify-reset-code";
import EmailSentModal from "./modal-email-sent";
import { supabase } from "../../../services/supabaseClient";

const ResetPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmailForPasswordReset = async (email) => {
    if (!email.trim()) {
      return "El campo no puede estar vacío.";
    }
    if (/\s/.test(email)) {
      return "El correo no puede contener espacios.";
    }
  
    try {
      const { data, error } = await supabase
        .from("usuario")
        .select("correo")
        .eq("correo", email);
  
      if (error || data.length === 0) {
        return "El correo electrónico no está registrado o no se ha escrito correctamente.";
      }
      return true;
    } catch (err) {
      console.error("Error al validar el correo:", err);
      return "Ocurrió un error al validar el correo. Inténtalo nuevamente.";
    }
  };

  const handleSendCode = async () => {
    setIsLoading(true);
    setEmailError(""); 
  
    if (!email.trim()) {
      setEmailError("El campo no puede estar vacío.");
      setIsLoading(false);
      return;
    } else if (/\s/.test(email)) {
      setEmailError("El correo no puede contener espacios.");
      setIsLoading(false);
      return;
    }
  
    const validationResponse = await validateEmailForPasswordReset(email);
  
    if (validationResponse !== true) {
      setEmailError(validationResponse);
      setIsLoading(false);
      return;
    }
  
    try {
      await sendVerificationCode(email);
      setShowEmailSentModal(true);
    } catch (error) {
      console.error("Error al enviar el código:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleEmailSentModalClose = () => {
    setShowEmailSentModal(false);
    setStep(2);
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);

    try {
      await verifyResetCode(email, code);
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Error al verificar el código:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      {showEmailSentModal && (
        <EmailSentModal email={email} onClose={handleEmailSentModalClose} />
      )}
      <div className="w-[95%] h-[350px] sm:w-[550px] sm:h-[350px] bg-primary-pri3 rounded-xl shadow-lg">
        <div className="w-full flex justify-end p-1">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {step === 1 && (
            <>
              {/* Contenido del paso 1 */}
              <h1 className="text-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-md">
                Restablece tu contraseña
              </h1>
              <p className="text-center font-body text-body-sm text-neutral-neu0 w-[85%] sm:w-auto mt-3 mx-10">
                Introduce el correo electrónico asociado a tu cuenta de WebTime y
                te enviaremos un correo con un enlace para restaurar tu
                contraseña
              </p>
              <div className="w-[85%] sm:w-[75%] mb-5">
                <InputText
                  labelMarginTop="10px"
                  labelFontSize="16px"
                  label="Correo electrónico"
                  placeholder="Ingrese su correo electrónico"
                  className="w-[100%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[40px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
            
                    if (!value.trim()) {
                      setEmailError("El campo no puede estar vacío.");
                    } else if (/\s/.test(value)) {
                      setEmailError("El correo no puede contener espacios.");
                    } else {
                      setEmailError(""); 
                    }
                  }}
                />
                {emailError && (
                <span
                  style={{
                    color: "#BA1A1A",
                    textAlign: "start", // Centrar horizontalmente
                    display: "block", // Para que ocupe toda la anchura disponible
                    marginTop: "8px",
                    fontSize: "14px",
                     // Espaciado entre el campo y el mensaje
                  }}
                  className="text-error-err2"
                >
                  {emailError}
                </span>
              )}

              </div>
              <div className="w-full pl-[5%] sm:pr-[10%] sm:w-auto mb-3">
                <Button
                  text={
                    isLoading
                      ? "Enviando..."
                      : "Enviar correo de restablecimiento de contraseña"
                  }
                  onClick={handleSendCode}
                  disabled={isLoading}
                  variant="combExp"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              {/* Contenido del paso 2 */}
              <h1 className="text-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-md">
                Ingresa el código
              </h1>
              <p className="text-center font-body text-body-sm text-neutral-neu0 w-[85%] sm:w-auto mt-3 mx-10">
                Introduce el código enviado a tu correo.
              </p>
              <div className="w-[85%] sm:w-auto mb-5">
                <InputText
                  labelMarginTop="10px"
                  labelFontSize="16px"
                  label="Código de verificación"
                  placeholder="Ingrese el código"
                  className="w-[100%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[40px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="w-full pl-[5%] sm:pl-0 sm:w-auto mb-3">
                <Button
                  text={isLoading ? "Verificando..." : "Verificar código"}
                  onClick={handleVerifyCode}
                  disabled={!code}
                  variant="combExp"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
