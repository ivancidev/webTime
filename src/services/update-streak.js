import { supabase } from "./supabaseClient";

export const updateRacha = async (idUsuario, idRacha, diasRacha) => {
  try {
    const { data, error } = await supabase
      .from("Rachas_usuarios")
      .update({ dias_racha: diasRacha })
      .eq("id_usuario", idUsuario)
      .eq("id_racha", idRacha);

    if (error) {
      throw error;
    }

    console.log("Racha actualizada con éxito", data);
  } catch (error) {
    console.error("Error al actualizar la racha:", error.message);
  }
};
