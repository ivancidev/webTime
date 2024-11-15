import Button from "../../../components/buttons/button"; 
import { InputText } from "../../../components/input/input";
import EyeOff from "../../../icons/eyeOff";
import EyeOn from "../../../icons/eyeOn";
import { useState } from "react";

export const Form = ({label1, label2, placeholder1, placeholder2, textButton, showEyeIconFirstInput, showButtonForgetPassword}) => {
    const [showPasswordFirst, setShowPasswordFirst] = useState(false);
    const [showPasswordSecond, setShowPasswordSecond] = useState(false);

    return (
        <form className="flex flex-col sm:items-center">
            <div>
                <div className="mb-5">
                    <InputText
                        label={label1}
                        placeholder={placeholder1}
                        labelFontSize="16px"
                        errorFontSize="14px"
                        labelMarginTop="10px"
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
                            className="font-body text-body-sm text-secondary-sec2 underline hover:text-secondary-sec1"
                            >
                            ¿Olvidaste tu contraseña?
                        </button>
                    )}
                </div>
                <Button
                    text={textButton}
                    variant="combExp"
                />
            </div>
        </form>
    );
};
