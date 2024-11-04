import { supabase } from './supabaseClient'; // Asegúrate de importar tu cliente de Supabase o la herramienta que uses

export const updateDailyStatistics = async (userId, listeningTimeInMinutes) => {
  try {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Verificar si existe un registro para el usuario y la fecha actual
    const { data: existingRecord, error: fetchError } = await supabase
      .from('estadisticas_diarias')
      .select('*')
      .eq('id_usuario', userId)
      .eq('fecha', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // 'PGRST116' es el código de error cuando no hay registros
      console.error('Error al obtener el registro de estadísticas diarias:', fetchError);
      throw fetchError;
    }

    if (existingRecord) {
      // Si existe, actualizar minutos_aprendido_hoy sumando listeningTimeInMinutes
      const { data, error } = await supabase
        .from('estadisticas_diarias')
        .update({ 
          minutos_aprendido_hoy: existingRecord.minutos_aprendido_hoy + listeningTimeInMinutes 
        })
        .eq('id_metrica', existingRecord.id_metrica);

      if (error) {
        console.error('Error al actualizar minutos_aprendido_hoy:', error);
        throw error;
      }

      return data;
    } else {
      // Si no existe, crear un nuevo registro
      const { data, error } = await supabase
        .from('estadisticas_diarias')
        .insert({
          id_usuario: userId,
          minutos_aprendido_hoy: listeningTimeInMinutes,
          fecha: today,
          se_cumplio: false // Asumiendo que 'se_cumplio' inicialmente es false
        });

      if (error) {
        console.error('Error al insertar nuevo registro en estadisticas_diarias:', error);
        throw error;
      }

      return data;
    }
  } catch (error) {
    console.error('Error en updateDailyStatistics:', error);
    throw error;
  }
};