import { useEffect, useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { useCollectionBooks } from "../../../hooks/use-get-collections";
import CloseIcon from "../../../icons/close";
import { CardAddCollection } from "../components/card-collection";
import { CardCreateCollection } from "../components/card-createCollection";
import { addBookToCollection } from "../../../services/add-book-collection";
import { SnackbarNotification } from "../components/snack-notification";

export const ModalCollection = ({ onClose, text, codLibro }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [collectionBooks, setCollectionBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const getCollectionBooks = async () => {
      setIsLoading(true);
      try {
        const collections = await useCollectionBooks(user.id_usuario);
        setCollectionBooks(collections);
      } catch (error) {
        console.error("Error al obtener colecciones:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getCollectionBooks();
    } else {
      setIsLoading(false);
    }
  }, [setCollectionBooks, setIsLoading]);

  const handleAddBookToCollection = async (idColeccion) => {
    try {
      await addBookToCollection(idColeccion, codLibro, setNotification);
    } catch (error) {
      console.error("Error al agregar libro a colección:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
    setTimeout(() => {
      if (notification.severity === "success") {
        onClose();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[521px] h-auto bg-primary-pri3 rounded-xl p-6">
        <div className="w-full flex items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-secondary-sec2 w-auto text-center text-title-md font-semibold">
              {text}
            </h1>
          </div>
          <div className="flex justify-end">
            <ButtonIcon
              onClick={onClose}
              SvgIcon={CloseIcon}
              variant="combColBlack2"
            />
          </div>
        </div>
        <section className="h-96 overflow-y-auto px-6">
          {isLoading == false && <CardCreateCollection codLibro={codLibro} />}

          {isLoading ? (
            <div className="text-center my-32 font-body text-body-md text-neutral-neu0 mx-4">
              Cargando colecciones...
            </div>
          ) : collectionBooks.length === 0 ? (
            <div className="text-center my-32 font-body text-body-md text-neutral-neu0 mx-4">
              Aún no tienes ninguna colección de libros
              <h1 className="text-neutral-neu0 font-body text-body-md mx-4 mt-3">
                ¡Crea una para comenzar!
              </h1>
            </div>
          ) : (
            collectionBooks.map((collection) => (
              <div
                onClick={() =>
                  handleAddBookToCollection(collection.idColeccion)
                }
                key={collection.idColeccion}
              >
                <CardAddCollection
                  key={collection.idColeccion}
                  collectionName={collection.nombre}
                  amountBooks={collection.libros.length}
                  books={collection.libros}
                />
              </div>
            ))
          )}
        </section>
      </div>
      <SnackbarNotification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
      ;
    </div>
  );
};
