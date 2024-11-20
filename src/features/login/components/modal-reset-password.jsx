import React, { useState } from "react";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import { InputText } from "../../../components/input/input";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode } from "../../../services/reset-password";
import { verifyResetCode } from "../../../services/verify-reset-code";

const ResetPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setIsLoading(true);

    try {
      await sendVerificationCode(email);
      setStep(2);
    } catch (error) {
      console.error("Error al enviar el código:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
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
      <div className="w-[95%] h-[350px] sm:w-[550px] sm:h-[320px] bg-primary-pri3 rounded-xl shadow-lg">
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
              <h1 className="text-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-md">
                Restablece tu contraseña
              </h1>
              <p className="text-center font-body text-body-sm text-neutral-neu0 w-[85%] sm:w-auto mt-3 mx-10">
                Introduce el correo electrónico asociado a tu cuenta de WebTime
                y te enviaremos un correo con un enlace para restaurar tu
                contraseña
              </p>
              <div className="w-[85%] sm:w-auto mb-5">
                <InputText
                  labelMarginTop="10px"
                  labelFontSize="16px"
                  label="¿Cuál es tu correo electrónico?"
                  placeholder="Ingrese su correo electrónico"
                  className="w-[100%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[40px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full pl-[5%] sm:pl-0 sm:w-auto mb-3">
                <Button
                  text={isLoading ? "Enviando..." : "Enviar código"}
                  onClick={handleSendCode}
                  disabled={isLoading || !email}
                  variant="combExp"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
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
                  text="Verificar código"
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