import { supabase } from "./supabaseClient";

export const fetchUserBooks = async (id_usuario) => {
  try {
    const { data: categorias, error: categoriaError } = await supabase
      .from("preferencias_categorias")
      .select("codCategoria")
      .eq("id_usuario", id_usuario);

    if (categoriaError) throw categoriaError;

    const categoriaIds = categorias.map((categoria) => categoria.codCategoria);

    const { data: libros, error: libroError } = await supabase
      .from("libro")
      .select("*")
      .in("codCategoria", categoriaIds);

    if (libroError) throw libroError;

    return libros;
  } catch (error) {
    console.error("Error al obtener los libros del usuario:", error);
    return [];
  }
};
