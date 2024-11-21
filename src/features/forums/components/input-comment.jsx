import React, { useState } from "react";
import Button from "../../../components/buttons/button";
import UserProf from "../../../icons/userProfile";

export const InputComment = ({
  maxChars = 500, // Máximo de caracteres permitido
  onComment, // Callback al presionar el botón Comentar
  placeholder = "Agregar comentario",
  profileImage, // Imagen de perfil como prop
  textButton,
}) => {
  const [comment, setComment] = useState("");

  // Maneja cambios en el área de texto
  const handleInputChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setComment(e.target.value);
    }
  };

  return (
    <div className="py-5 px-8 bg-primary-pri3 border border-neutral-neu1 rounded-xl w-full">
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                    {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Imagen de perfil"
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <UserProf/>
                    </div>
                    )}
                </div>
                <div className="flex-grow relative">
                    <textarea
                    value={comment}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="px-5 py-3 w-full h-auto max-h-16 overflow-y-auto resize-none bg-transparent border-none outline-none text-neutral-neu0 text-body-md font-body text-justify leading-6"
                    />
                    {/* Contador de caracteres */}
                    <p className="pl-5 text-body-sm text-green-600">
                    ({comment.length}/{maxChars})
                    </p>
                </div>
            </div>
            <div className="flex flex-row justify-end">
                    <Button
                        text={textButton} 
                        variant="combColBlackBlue"
                        onClick={() => onComment(comment)}
                    />
            </div>
        </div>
    </div>
  );
};