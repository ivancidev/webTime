import { supabase } from "./supabaseClient";
export const deleteBookFromCollection = async (idColeccion, codLibro) => {
    if (!idColeccion || !codLibro) {
      console.error("El ID de la colección y del libro son requeridos.");
      return { success: false, error: "Faltan parámetros requeridos." };
    }
    try {
        const { data, error } = await supabase
          .from("RegistroColeccion")
          .delete()
          .match({ idColeccion, codLibro });
      } catch (error) {
        console.error("Error inesperado al eliminar el libro:", error.message);
        return { success: false, error: error.message };
      }
  };