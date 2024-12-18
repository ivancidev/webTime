import React, { useState, useRef } from "react";
import Button from "../../../components/buttons/button";
import UserProf from "../../../icons/userProfile";
import CircularProgress from "@mui/material/CircularProgress"; // Importa CircularProgress

export const InputComment = ({
  maxChars = 500,
  onComment,
  placeholder,
  profileImage,
  textButton,
}) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("Mínimo 5 caracteres");
  const [errorType, setErrorType] = useState("length");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío
  const currentRequest = useRef(null);

  const analyzeComment = async (text) => {
    try {
      if (currentRequest.current) {
        currentRequest.current.abort();
      }
      const controller = new AbortController();
      currentRequest.current = controller;

      const response = await fetch(
        `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment: { text },
            languages: ["es"],
            requestedAttributes: { TOXICITY: {} },
          }),
          signal: controller.signal,
        }
      );
      const result = await response.json();
      const toxicityScore = result.attributeScores.TOXICITY.summaryScore.value;
      return toxicityScore >= 0.2;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error al analizar el comentario:", error);
      }
      return false;
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setComment(text);

    if (text.trim().length < 5) {
      setError("Mínimo 5 caracteres");
      setErrorType("length");
    } else if (text.length > maxChars) {
      setError(" ");
      setErrorType("length");
    } else {
      setError("");
      setErrorType("");
    }
  };

  const handleComment = async () => {
    if (isSubmitting) return; // Prevenir múltiples clics mientras se procesa
    setIsSubmitting(true); // Activar el estado de envío

    try {
      if (comment.trim().length < 5) {
        setError("Mínimo 5 caracteres");
        setErrorType("length");
        return;
      }

      if (comment.length > maxChars) {
        setError(" ");
        setErrorType("length");
        return;
      }

      const isOffensive = await analyzeComment(comment);
      if (isOffensive) {
        setError("El comentario contiene contenido ofensivo o inapropiado.");
        setErrorType("offensive");
      } else {
        setError("");
        setErrorType("");
        onComment(comment);
        setComment(""); // Limpiar el campo después de enviar
      }
    } finally {
      setIsSubmitting(false); // Desactivar el estado de envío al finalizar
    }
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
            <div className="flex items-center">
              {isSubmitting && <CircularProgress size={20} className="mr-2" />}{" "}
              {/* Indicador */}
              <Button
                text={textButton}
                variant={
                  comment.trim().length >= 5 &&
                  comment.length <= maxChars &&
                  !error
                    ? "combColBlackBlue"
                    : "combDesactivate2"
                }
                onClick={handleComment}
                disabled={isSubmitting || !!error} // Deshabilitar el botón durante el envío
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-6">
        {error && (
          <p
            className={`flex justify-end text-body-sm p-2 ${
              errorType === "length" ? "text-green-600" : "text-error-err2"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
