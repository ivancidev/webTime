import { supabase } from "./supabaseClient";
export const deleteEmptyCollection = async (idColeccion) => {
  try {
    const { data: registroData, error: registroError } = await supabase
      .from("RegistroColeccion")
      .select("*")
      .eq("idColeccion", idColeccion);

    if (registroError) {
      throw new Error(`Error al verificar los libros de la colección: ${registroError.message}`);
    }

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

    return { success: false, message: "La colección tiene libros asociados y no se eliminó." };
  } catch (error) {
    console.error("Error inesperado:", error);
    return { success: false, message: error.message };
  }
};
