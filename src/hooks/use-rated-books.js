import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useTopRatedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("calificacion").select(
          `
            codLibro,
            calificacion,
            libro (
              *,
              categoria (
                nombreCategoria
              ),
              idioma (
                idioma
              ),
              autor (
                nombreAutor
              )
            )
          `
        );

        if (error) throw error;

        const bookRatings = data.reduce(
          (acc, { codLibro, calificacion, libro }) => {
            if (!acc[codLibro]) {
              acc[codLibro] = {
                codLibro,
                ...libro,
                total: 0,
                count: 0,
              };
            }
            acc[codLibro].total += calificacion;
            acc[codLibro].count += 1;
            return acc;
          },
          {}
        );

        const averagedBooks = Object.values(bookRatings).map(
          ({ total, count, ...book }) => ({
            ...book,
            avgCalificacion: total / count,
          })
        );

        const topBooks = averagedBooks
          .sort((a, b) => b.avgCalificacion - a.avgCalificacion)
          .slice(0, 10);

        setBooks(topBooks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  return { books, loading, error };
};
