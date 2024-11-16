import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../components/buttons/button"; 
import { InputText } from "../../../components/input/input";
import EyeOff from "../../../icons/eyeOff";
import EyeOn from "../../../icons/eyeOn";
import { useLogin } from '../../../hooks/use-login';
import ResetPasswordModal from "./modal-reset-password";

export const Form = ({
  label1,
  label2,
  placeholder1,
  placeholder2,
  textButton,
  showEyeIconFirstInput,
  showButtonForgetPassword,
  validationRules1 = {},
  validationRules2 = {},
  onSubmit, 
  register, 
  errors,
}) => {
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <form className="flex flex-col sm:items-center" onSubmit={onSubmit}>
      <div>
        <div className="mb-3">
          <InputText
            label={label1}
            placeholder={placeholder1}
            labelFontSize="16px"
            errorFontSize="14px"
            labelMarginTop="10px"
            register={register} 
            name="usernameOrEmail"
            validationRules={validationRules1} 
            errors={errors}
            type={!showEyeIconFirstInput || showPasswordFirst ? "text" : "password"}
            className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[40px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
            icon={
              showEyeIconFirstInput && (
                <button
                  type="button"
                  onClick={() => setShowPasswordFirst(!showPasswordFirst)}
                >
                  {showPasswordFirst ? <EyeOff /> : <EyeOn />}
                </button>
              )
            }
          />

          <InputText
            label={label2}
            placeholder={placeholder2}
            labelFontSize="16px"
            errorFontSize="14px"
            labelMarginTop="5px"
            register={register}
            name="password"
            validationRules={validationRules2} 
            errors={errors}
            type={showPasswordSecond ? "text" : "password"}
            className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[40px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
            icon={
              <button
                type="button"
                onClick={() => setShowPasswordSecond(!showPasswordSecond)}
              >
                {showPasswordSecond ? <EyeOff /> : <EyeOn />}
              </button>
            }
          />

          {showButtonForgetPassword && (
            <button
              type="button"
              onClick={openModal}
              className="font-body text-body-sm text-secondary-sec2 underline hover:text-secondary-sec1 mt-4"
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}
          {isModalOpen && (
            <ResetPasswordModal onClose={closeModal} onConfirm={closeModal} />
          )}
        </div>

        <Button text={textButton} variant="combExp" type="submit" />
      </div>
    </form>
  );
};