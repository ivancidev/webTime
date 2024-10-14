import { supabase } from "../services/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useBookDetails = (book) => {
  const fetchBookDetails = async () => {
    const [autorResponse, languageResponse, categoryResponse] =
      await Promise.all([
        supabase
          .from("autor")
          .select("nombreAutor")
          .eq("codAutor", book.codAutor)
          .single(),
        supabase
          .from("idioma")
          .select("idioma")
          .eq("codIdioma", book.codIdioma)
          .single(),
        supabase
          .from("categoria")
          .select("nombreCategoria")
          .eq("codCategoria", book.codCategoria)
          .single(),
      ]);

    if (
      autorResponse.error ||
      languageResponse.error ||
      categoryResponse.error
    ) {
      throw new Error("Error al obtener detalles del libro");
    }

    return {
      nombreAutor: autorResponse.data.nombreAutor,
      idioma: languageResponse.data.idioma,
      nombreCategoria: categoryResponse.data.nombreCategoria,
    };
  };

  const {
    data: bookDetails,
    isLoading,
    isError,
    error,
  } = useQuery(["bookDetails"], fetchBookDetails, {
    enabled: !!book,
  });

  return { bookDetails, loading: isLoading, error: isError ? error : null };
};
