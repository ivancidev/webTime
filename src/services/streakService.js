import { getDate } from "../utils/get-date";
import { supabase } from "./supabaseClient";
let isUpdating = false;

export const updateDailyStatistics = async (userId, listeningTimeInMinutes) => {
  if (isUpdating) return;
  isUpdating = true;

  try {
    // const today = "2024-11-28";
    const today = getDate();
    const lastNotificationDate =
      localStorage.getItem("lastNotificationDate") || "";

    const { data: existingRecord, error: fetchError } = await supabase
      .from("estadisticas_diarias")
      .select("*")
      .eq("id_usuario", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(
        "Error al obtener el registro de estadísticas diarias:",
        fetchError
      );
      throw fetchError;
    }

    let data, error;

    if (existingRecord) {
      ({ data, error } = await supabase
        .from("estadisticas_diarias")
        .update({
          fecha: today,
          minutos_aprendido_hoy:
            existingRecord.fecha !== lastNotificationDate
              ? existingRecord.minutos_aprendido_hoy + listeningTimeInMinutes
              : 0,
          se_cumplio: false,
        })
        .eq("id_metrica", existingRecord.id_metrica));
    } else {
      ({ data, error } = await supabase.from("estadisticas_diarias").insert({
        id_usuario: userId,
        minutos_aprendido_hoy: listeningTimeInMinutes,
        fecha: today,
        se_cumplio: false,
      }));
    }

    if (error) {
      console.error(
        "Error al actualizar/insertar en estadisticas_diarias:",
        error
      );
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error en updateDailyStatistics:", error);
    throw error;
  } finally {
    isUpdating = false;
  }
};
