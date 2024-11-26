import { supabase } from "./supabaseClient";
export const deleteBookFromCollection = async (idColeccion, codLibro) => {
    if (!idColeccion || !codLibro) {
      console.error("El ID de la colección y del libro son requeridos.");
      return { success: false, error: "Faltan parámetros requeridos." };
    }
  };