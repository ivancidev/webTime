import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useGetReply = (codComentario) => {
  const [replies, setReplies] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      setIsLoadingR(true);
      try {
        const { data, error } = await supabase
          .from("respuesta")
          .select(
            `
              cod_respuesta,
              respuesta,
              fecha_respuesta,
              usuario (
                nombre,
                avatar
              ),
              interaccion_respuesta_usuario (
                tipointeraccionrespuesta
              )
            `
          )
          .eq("cod_comentario", codComentario)
          .order("fecha_respuesta", { ascending: false });

        if (error) {
          setError("Error al obtener respuestas.");
          console.error(error);
        } else {
          const repliesConInteracciones = data.map((reply) => {
            const likes =
              reply.interaccion_respuesta_usuario?.filter(
                (interaccion) => interaccion.tipointeraccionrespuesta === 1
              ).length || 0;

            const dislikes =
              reply.interaccion_respuesta_usuario?.filter(
                (interaccion) => interaccion.tipointeraccionrespuesta === -1
              ).length || 0;

            return {
              ...reply,
              likes,
              dislikes,
            };
          });

          setReplies(repliesConInteracciones);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        setError("Error al obtener respuestas.");
      } finally {
        setIsLoadingR(false);
      }
    };

    fetchReplies();
  }, [codComentario]);

  return { replies, isLoadingR, error };
};
