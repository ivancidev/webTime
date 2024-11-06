import { supabase } from "./supabaseClient";

export const updatePreferenceTime = async (userId, selectedTime) => {
  try {
    const { data, error } = await supabase
      .from("preferencias_tiempos")
      .update({ id_tiempo_lectura: selectedTime })
      .match({ id_usuario: userId });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al actualizar la preferencia de tiempo:", error);
    throw error;
  }
};
