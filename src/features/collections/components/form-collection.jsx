import { useState } from "react";
import { InputText } from "../../../components/input/input";
import AddLarge from "../icons/addLarge";
import { CardBookCol } from "./card-book-col";
import FooterButtonsCol from "./footer-buttons-collection";
import { ModalBooks } from "./modal-books";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import { useForm } from "react-hook-form";

export const FormCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addBooks, setAddBooks] = useState([]); // Libros seleccionados
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async () => {
    if (addBooks.length === 0) {
      setSnackbar({
        open: true,
        message: "Selecciona al menos un libro para la colección.",
        severity: "warning",
      });
      return;
    }
  
    const name = document.querySelector("input[name='nameCollection']").value.trim();
    const description = document.querySelector("textarea[name='description']").value.trim();
  
    if (!name || !description) {
      setSnackbar({
        open: true,
        message: "El nombre y la descripción de la colección son obligatorios.",
        severity: "warning",
      });
      return;
    }
  
    if (!user || !user.idUsuario) {
      setSnackbar({
        open: true,
        message: "Error: Usuario no definido. Intenta iniciar sesión nuevamente.",
        severity: "error",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      // Insertar en la tabla "Coleccion"
      const { data: collectionData, error: collectionError } = await supabase
        .from("Coleccion")
        .insert({
          idUsuario: user.id_usuario,
          nombre: nameCollection,
          descripcion: description,
        })
        .select("idColeccion")
        .single();
  
      if (collectionError) {
        console.error("Error al insertar colección:", collectionError);
        setSnackbar({
          open: true,
          message: "Hubo un error al guardar la colección.",
          severity: "error",
        });
        return;
      }
  
      const idColeccion = collectionData.idColeccion;
  
      // Insertar en la tabla "RegistroColeccion" los libros seleccionados
      const bookInsertions = addBooks.map(async (book) => {
        const { error: bookError } = await supabase
          .from("RegistroColeccion")
          .insert({
            idColeccion,
            codLibro: book.codLibro,
          });
  
        if (bookError) {
          console.error("Error al insertar libro:", bookError);
          return { error: bookError };
        }
  
        return { success: true };
      });
  
      // Verificar si hubo errores en las inserciones
      const bookResponses = await Promise.all(bookInsertions);
      const hasErrors = bookResponses.some((response) => response?.error);
  
      if (hasErrors) {
        setSnackbar({
          open: true,
          message: "Error al guardar algunos libros en la colección.",
          severity: "error",
        });
        return;
      }
  
      setSnackbar({
        open: true,
        message: "Colección y libros guardados con éxito.",
        severity: "success",
      });
  
      // Limpiar formulario y redirigir
      setAddBooks([]);
      navigate("/profile");
    } catch (error) {
      console.error("Error inesperado al guardar la colección:", error);
      setSnackbar({
        open: true,
        message: "Hubo un error inesperado. Intenta nuevamente.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate("/profile");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = (selectedBooks) => {
    setIsModalOpen(false);
    if (selectedBooks) {
      setAddBooks((prevBooks) => {
        const uniqueBooks = selectedBooks.filter(
          (book) =>
            !prevBooks.some((prevBook) => prevBook.codLibro === book.codLibro)
        );
        return [...prevBooks, ...uniqueBooks];
      });
    }
  };

  const handleDeleteBook = (codLibro) => {
    setAddBooks((prevBooks) =>
      prevBooks.filter((book) => book.codLibro !== codLibro)
    );
  };

  console.log(addBooks);

  return (
    <div>
      <form className="flex flex-col items-center ">
        <h1 className="text-secondary-sec2 font-title text-title-lg mt-2">
          Nueva Colección de Libros
        </h1>
        <div className="w-full px-40 mt-2">
          <InputText
            name="nameCollection"
            label="Nombre de la colección"
            placeholder="Escribe aquí"
            className="w-full bg-transparent border-[1px] rounded border-neutral-neu0 md:w-[340px] h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
          />

          <label
            htmlFor="description"
            className=" text-primary-pri2 font-label text-label-lg"
          >
            Descripción <span className="text-error-err2">*</span>
          </label>
          <textarea
            name="Descripción"
            placeholder="Escribe aquí"
            className="w-full h-24 bg-transparent border-[1px] rounded border-neutral-neu0 p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md my-2 resize-none"
          />

          <label
            htmlFor="selectBooks"
            className="text-primary-pri2 font-label text-label-lg pt-3"
          >
            Seleccionar libros:
          </label>
          <div className="flex flex-wrap mt-2 space-x-8">
            {addBooks.map((book) => (
              <CardBookCol
                key={book.codLibro}
                titleBook={book.nombreLibro}
                frontBook={book.enlacePortada}
                deleteBook={() => handleDeleteBook(book.codLibro)}
              />
            ))}
            <div
              onClick={handleOpenModal}
              className=" w-[140px] h-40 mt-2 bg-neutral-neu2 rounded-2xl flex items-center justify-center hover:text-secondary-sec2 cursor-pointer hover:border hover:border-secondary-sec2 "
            >
              <AddLarge />
            </div>
          </div>
        </div>
        <FooterButtonsCol onCancel={onCancel} onSubmit = {onSubmit}/>
      </form>
      
      {isModalOpen && <ModalBooks onClose={handleCloseModal} />}
    </div>
  );
};
