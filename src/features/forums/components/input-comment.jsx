import React, { useState } from "react";
import Button from "../../../components/buttons/button";
import UserProf from "../../../icons/userProfile";

export const InputComment = ({
  maxChars = 500,
  onComment,
  placeholder,
  profileImage,
  textButton,
}) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="pt-5 pb-3 px-8 bg-primary-pri3 border border-neutral-neu1 rounded-xl w-full">
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
                  <UserProf />
                </div>
              )}
            </div>
            <div className="flex-grow relative mt-1">
              <textarea
                value={comment}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="px-5 w-full h-auto max-h-16 overflow-y-auto resize-none bg-transparent border-none outline-none text-neutral-neu0 text-body-md font-body text-justify leading-6"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mt-2">
            <p
              className={`text-body-sm ${
                comment.length > maxChars ? "text-error-err2" : "text-green-600"
              }`}
            >
              ({comment.length}/{maxChars})
            </p>
            <Button
              text={textButton}
              variant={
                comment.trim().length >= 5 && comment.length <= maxChars
                  ? "combColBlackBlue"
                  : "combDesactivate2"
              }
              onClick={() => onComment(comment)}
              disabled={comment.trim().length <= 5 || comment.trim().length > 500}
            />
          </div>
        </div>
      </div>
      {comment.trim().length < 5 && (
        <p className="flex justify-end text-body-sm text-green-600 p-2">
          Mínimo 5 caracteres
        </p>
      )}
    </div>
  );
};
