import { supabase } from "./supabaseClient";

export const updateAccom = async (idUsuario, idMetrica, isAccom, min) => {
  try {
    const { data, error } = await supabase
      .from("estadisticas_diarias")
      .update({ se_cumplio: isAccom, minutos_aprendido_hoy: min })
      .eq("id_usuario", idUsuario)
      .eq("id_metrica", idMetrica);

    if (error) {
      throw error;
    }

    console.log("Se cumplió actualizado con éxito", data);
  } catch (error) {
    console.error("Error al actualizar se cumplió:", error.message);
  }
};
