// src/hooks/use-get-user-collection-books.js
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useGetUserCollectionBooks = (userId) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setBooks([]);
      setIsLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        // **Paso 1:** Obtener todas las colecciones del usuario
        const { data: collections, error: collectionsError } = await supabase
          .from("Coleccion")
          .select("idColeccion")
          .eq("idUsuario", userId);

        if (collectionsError) throw collectionsError;

        const collectionIds = collections.map((collection) => collection.idColeccion);

        if (collectionIds.length === 0) {
          setBooks([]);
          return;
        }

        // **Paso 2:** Obtener todos los registros de colecciones que correspondan a las colecciones del usuario
        const { data: registros, error: registrosError } = await supabase
          .from("RegistroColeccion")
          .select("codLibro")
          .in("idColeccion", collectionIds);

        if (registrosError) throw registrosError;

        const bookIds = registros.map((registro) => registro.codLibro);

        if (bookIds.length === 0) {
          setBooks([]);
          return;
        }

        // **Paso 3:** Obtener los libros correspondientes a los codLibro obtenidos
        const { data: libros, error: librosError } = await supabase
          .from("libro")
          .select(`
            *,
            categoria (nombreCategoria),
            idioma (idioma),
            autor (nombreAutor)
          `)
          .in("codLibro", bookIds);

        if (librosError) throw librosError;

        setBooks(libros);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [userId]);

  return { data: books, isLoading, isError, error };
};
