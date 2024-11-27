import { supabase } from "./supabaseClient";

export const addBookToCollection = async (
  codCollection,
  codBook,
  setNotification,
) => {
  try {
    const { data: existingBook, error: fetchError } = await supabase
      .from("RegistroColeccion")
      .select("*")
      .eq("idColeccion", codCollection)
      .eq("codLibro", codBook)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingBook) {
      setNotification({
        open: true,
        message: "Este libro ya forma parte de tu colección",
        severity: "warning",
      });
    } else {
      const { data, error: insertError } = await supabase
        .from("RegistroColeccion")
        .insert([{ idColeccion: codCollection, codLibro: codBook }]);

      if (insertError) {
        throw insertError;
      }

      setNotification({
        open: true,
        message: "El libro se ha añadido a tu colección exitosamente",
        severity: "success",
      });

    }
  } catch (error) {
    console.error("Error al agregar libro a colección:", error);
    setNotification({
      open: true,
      message: "Ocurrió un error al intentar añadir el libro.",
      severity: "error",
    });
  }
};
