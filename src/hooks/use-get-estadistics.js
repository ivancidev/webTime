import { supabase } from "../services/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useGetEstadistics = (user) => {
  const fetchEstadistics = async () => {
    const { data, error } = await supabase
      .from("estadisticas_diarias")
      .select("se_cumplio, minutos_aprendido_hoy, id_metrica, fecha")
      .eq("id_usuario", user.id_usuario)
      .single();

    if (error) {
      throw new Error("Error al obtener las estadísticas del usuario");
    }

    return data;
  };

  const {
    data: useEstadistics,
    isError,
    error,
  } = useQuery(["useEstadistics", user.id_usuario], fetchEstadistics, {
    enabled: !!user,
  });

  return { useEstadistics, error: isError ? error : null };
};
