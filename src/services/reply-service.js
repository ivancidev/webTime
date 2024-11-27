import { supabase } from "./supabaseClient";

export const addReply = async (respuesta, codComentario, idUsuario) => {
  const fechaActual = new Date().toISOString();

  try {
    const { error } = await supabase.from("respuesta").insert([
      {
        respuesta: respuesta,
        fecha_respuesta: fechaActual,
        cod_comentario: codComentario,
        id_usuario: idUsuario,
      },
    ]);

    if (error) {
      throw new Error("Error al insertar respuesta: " + error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Error al enviar la respuesta:", error);
    return { success: false, error: error.message };
  }
};
