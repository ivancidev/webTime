import { supabase } from "./supabaseClient";

export const addComment = async (comentario, idForo, idUsuario) => {
  const fechaActual = new Date().toISOString();

  try {
    const { error } = await supabase.from("comentarios").insert([
      {
        comentario: comentario,
        fecha: fechaActual,
        id_foro: idForo,
        id_usuario: idUsuario,
      },
    ]);

    if (error) {
      throw new Error("Error al insertar comentario: " + error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
    return { success: false, error: error.message };
  }
};
