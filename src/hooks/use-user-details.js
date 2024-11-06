import { supabase } from "../services/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useUserDetails = (user) => {
  const fetchUserDetails = async () => {
    const [
      streakResponse,
      timeReadResponse,
      isAccomplishResponse,
      minLearnResponse,
      metricaResponse,
      idStreakResponse,
      dateResponse,
    ] = await Promise.all([
      supabase
        .from("Rachas_usuarios")
        .select("dias_racha")
        .eq("id_usuario", user.id_usuario)
        .single(),
      supabase
        .from("preferencias_tiempos")
        .select("id_tiempo_lectura")
        .eq("id_usuario", user.id_usuario)
        .single(),
      supabase
        .from("estadisticas_diarias")
        .select("se_cumplio")
        .eq("id_usuario", user.id_usuario)
        .single(),
      supabase
        .from("estadisticas_diarias")
        .select("minutos_aprendido_hoy")
        .eq("id_usuario", user.id_usuario)
        .single(),
      supabase
        .from("estadisticas_diarias")
        .select("id_metrica")
        .eq("id_usuario", user.id_usuario)
        .single(),
      supabase
        .from("Rachas_usuarios")
        .select("id_racha")
        .eq("id_usuario", user.id_usuario)
        .single(),
      supabase
        .from("estadisticas_diarias")
        .select("fecha")
        .eq("id_usuario", user.id_usuario)
        .single(),
    ]);

    if (
      streakResponse.error ||
      timeReadResponse.error ||
      isAccomplishResponse.error ||
      minLearnResponse.error ||
      metricaResponse.error ||
      idStreakResponse.error ||
      dateResponse.error
    ) {
      throw new Error("Error al obtener racha o tiempo de lectura del usuario");
    }

    const timeReadId = timeReadResponse.data.id_tiempo_lectura;

    const timeMinutesResponse = await supabase
      .from("tiempos_lectura")
      .select("minutos")
      .eq("id_tiempo_lectura", timeReadId)
      .single();

    if (timeMinutesResponse.error) {
      throw new Error("Error al obtener minutos de tiempo de lectura");
    }

    return {
      dias_racha: streakResponse.data.dias_racha,
      id_tiempo_lectura: timeReadId,
      minutos: timeMinutesResponse.data.minutos,
      se_cumplio: isAccomplishResponse.data.se_cumplio,
      minutos_aprendido_hoy: minLearnResponse.data.minutos_aprendido_hoy,
      id_metrica: metricaResponse.data.id_metrica,
      id_racha: idStreakResponse.data.id_racha,
      fecha: dateResponse.data.fecha,
    };
  };

  const {
    data: userDetails,
    isError,
    error,
  } = useQuery(["userDetails"], fetchUserDetails, {
    enabled: !!user,
  });

  return { userDetails, error: isError ? error : null };
};
