import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../components/buttons/button"; 
import { InputText } from "../../../components/input/input";
import EyeOff from "../../../icons/eyeOff";
import EyeOn from "../../../icons/eyeOn";
import { useLogin } from '../../../hooks/use-login';
import ResetPasswordModal from "./modal-reset-password";

export const Form = ({label1, label2, placeholder1, placeholder2, textButton, showEyeIconFirstInput, showButtonForgetPassword}) => {
    const [showPasswordFirst, setShowPasswordFirst] = useState(false);
    const [showPasswordSecond, setShowPasswordSecond] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook para navegar entre rutas
    const { login, error } = useLogin(); // Usa el hook useLogin


    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
        // Llama a la función login del hook useLogin
        const success = await login(usernameOrEmail, password);
    
        if (success) {
          // Si la autenticación es exitosa, redirige al usuario
          navigate('/app'); // Cambia '/dashboard' por la ruta que desees
        } else {
          // Si la autenticación falla, actualiza el estado de error
          // Deja que el frontend se encargue de mostrar el mensaje apropiado
          console.error('Error de autenticación:', error);
        }
      };

      return (
        <form className="flex flex-col sm:items-center" onSubmit={handleSubmit}>
          <div>
            <div className="mb-3">
              <InputText
                label={label1}
                placeholder={placeholder1}
                labelFontSize="16px"
                errorFontSize="14px"
                labelMarginTop="10px"
                type={!showEyeIconFirstInput || showPasswordFirst ? 'text' : 'password'}
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                type={showPasswordSecond ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  className="font-body text-body-sm text-secondary-sec2 underline hover:text-secondary-sec1"
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