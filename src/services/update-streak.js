import { supabase } from "./supabaseClient";
export const updateRacha = async (idUsuario, diasRacha) => {
  try {
    const { data, error } = await supabase
      .from("Rachas_usuarios")
      .upsert({ id_usuario: idUsuario, dias_racha: diasRacha })
      .eq("id_usuario", idUsuario);
    if (error) {
      throw error;
    }

    console.log("Racha actualizada con éxito", data);
  } catch (error) {
    console.error("Error al actualizar la racha:", error.message);
  }
};
