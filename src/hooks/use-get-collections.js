import { supabase } from "../services/supabaseClient";

export const useCollectionBooks = async (id_usuario) => {
  try {
    const { data: colecciones, error: coleccionesError } = await supabase
      .from("Coleccion")
      .select("idColeccion, descripcion, nombre")
      .eq("idUsuario", id_usuario);

    if (coleccionesError) {
      console.error("Error fetching collections:", coleccionesError);
      return [];
    }

    if (!colecciones || colecciones.length === 0) {
      return [];
    }

    const coleccionesIds = colecciones.map((c) => c.idColeccion);

    const { data: registros, error: registrosError } = await supabase
      .from("RegistroColeccion")
      .select("idColeccion, codLibro")
      .in("idColeccion", coleccionesIds);

    if (registrosError) {
      console.error("Error fetching collection records:", registrosError);
      return [];
    }
    const codLibros = [
      ...new Set(registros.map((registro) => registro.codLibro)),
    ];
    const { data: libros, error: librosError } = await supabase
      .from("libro")
      .select("codLibro, enlacePortada")
      .in("codLibro", codLibros);

    if (librosError) {
      console.error("Error fetching book covers:", librosError);
      return [];
    }
    const registrosConPortadas = registros.map((registro) => {
      const libro = libros.find(
        (libro) => libro.codLibro === registro.codLibro
      );
      return {
        ...registro,
        enlacePortada: libro?.enlacePortada || null,
      };
    });
    const coleccionesConLibros = colecciones.map((coleccion) => ({
      ...coleccion,
      libros: registrosConPortadas
        .filter((registro) => registro.idColeccion === coleccion.idColeccion)
        .map(({ codLibro, enlacePortada }) => ({ codLibro, enlacePortada })),
    }));

    return coleccionesConLibros;
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
};
