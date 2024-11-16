import { useState } from "react";
import { InputText } from "../../../components/input/input";
import AddLarge from "../icons/addLarge";
import { CardBookCol } from "./card-book-col";
import FooterButtonsCol from "./footer-buttons-collection";
import { ModalBooks } from "./modal-books";

export const FormCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addBooks, setAddBooks] = useState([]);
  const onCancel = () => {
    navigation("/profile");
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
      </form>
      <FooterButtonsCol onCancel={onCancel} />
      {isModalOpen && <ModalBooks onClose={handleCloseModal} />}
    </div>
  );
};
