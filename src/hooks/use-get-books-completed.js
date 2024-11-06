import { supabase } from "../services/supabaseClient";

export const useCompletedBooks = async (id_usuario) => {
  const { data, error } = await supabase
    .from("registro_leido")
    .select(
      `
      *,
      libro (
        *,
        categoria (
          *
        ),
        idioma (
          *
        ),
        autor (
          *
        )
      ) 
    `
    )
    .eq("id_usuario", id_usuario)
    .order("fecha_conclusion", { ascending: false });

  if (error) {
    console.error("Error fetching completed books:", error);
    return [];
  }

  const completedBooks = data.filter((record) => {
    const libroCompleto = record.pagina >= record.libro.numero_paginas;
    const audioCompleto =
      record.tiempo_escuchado >= record.libro.duracion_audio;
    return libroCompleto || audioCompleto;
  });

  return completedBooks;
};
