import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useGetReply = (codComentario) => {
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      setIsLoading(true);
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
            )
          `
          )
          .eq("cod_comentario", codComentario)
          .order("fecha_respuesta", { ascending: false });

        if (error) throw error;

        setReplies(data);
      } catch (err) {
        console.error("Error al obtener respuestas:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (codComentario) {
      fetchReplies();
    }
  }, [codComentario]);

  return { replies, isLoading, error };
};
