import { supabase } from './supabaseClient'; 
export const  updateDailyStatistics = async (userId, learning_minutes) => {
  try {

    const today = new Date().toISOString().split('T')[0];

    const { data: existingRecord, error: fetchError } = await supabase
      .from('estadisticas_diarias')
      .select('*')
      .eq('id_usuario', userId)
      .eq('fecha', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { 
      throw fetchError;
    }

    if (existingRecord) {
      const { data, error } = await supabase
        .from('estadisticas_diarias')
        .update({ 
          minutos_aprendido_hoy: existingRecord.minutos_aprendido_hoy + learning_minutes 
        })
        .eq('id_metrica', existingRecord.id_metrica);

      if (error) {
        throw error;
      }

      return data;
    } else {

      const { data, error } = await supabase
        .from('estadisticas_diarias')
        .insert({
          id_usuario: userId,
          minutos_aprendido_hoy: learning_minutes,
          fecha: today,
          se_cumplio: false 
        });

      if (error) {
        throw error;
      }

      return data;
    }
  } catch (error) {
    throw error;
  }
};
