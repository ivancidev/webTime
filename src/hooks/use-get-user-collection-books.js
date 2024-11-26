import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useGetUserCollectionBooks = (idColeccion) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooksByCollection = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("RegistroColeccion")
          .select(
            `
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
          )
          .eq("idColeccion", idColeccion);

        if (error) throw error;
        const booksFromCollection = data.map((record) => record.libro);
        setBooks(booksFromCollection);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (idColeccion) {
      fetchBooksByCollection();
    }
  }, [idColeccion]);

  return { data: books, isLoading, isError, error };
};