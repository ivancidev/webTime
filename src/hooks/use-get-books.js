import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useGetBooks = (isRecent) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const today = new Date();
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);

        const { data, error } = await supabase
          .from("libro")
          .select(
            `
            *,
            categoria (
              nombreCategoria
            ),
            idioma (
              idioma
            ),
            autor(
              nombreAutor
            )
            `
          )
          [isRecent ? "gte" : "lt"](
            "fecha_creacion",
            fiveDaysAgo.toISOString()
          );

        if (error) throw error;

        setBooks(data);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { data: books, isLoading, isError, error };
};
