import { supabase } from "./supabaseClient";

/**
 * Verifica si una colección tiene libros asociados y elimina la colección si está vacía.
 * @param {number} idColeccion - El ID de la colección.
 * @returns {Promise<object>} - Resultado de la operación.
 */
export const deleteEmptyCollection = async (idColeccion) => {
  try {
    // Verificar si hay libros asociados en la colección
    const { data: registroData, error: registroError } = await supabase
      .from("RegistroColeccion")
      .select("*")
      .eq("idColeccion", idColeccion);

    if (registroError) {
      throw new Error(`Error al verificar los libros de la colección: ${registroError.message}`);
    }

    // Si no hay libros asociados, eliminar la colección
    if (registroData.length === 0) {
      const { error: coleccionError } = await supabase
        .from("Coleccion")
        .delete()
        .eq("idColeccion", idColeccion);

      if (coleccionError) {
        throw new Error(`Error al eliminar la colección: ${coleccionError.message}`);
      }

      return { success: true, message: "La colección estaba vacía y fue eliminada." };
    }

    // Si hay libros asociados, no se elimina la colección
    return { success: false, message: "La colección tiene libros asociados y no se eliminó." };
  } catch (error) {
    console.error("Error inesperado:", error);
    return { success: false, message: error.message };
  }
};
