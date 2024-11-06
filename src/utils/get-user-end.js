import { supabase } from "../services/supabaseClient";

export const getLastUser = async () => {
  try {
    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .order("fecha_creacion", { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("Error al obtener el último usuario:", error.message);
  }
};
