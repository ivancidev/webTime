import React from "react";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import { deleteBookFromCollection } from "../../../services/delete-book-collection";
import { deleteEmptyCollection } from "../../../services/delete-empty-collection"; // Importa la nueva función
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import Alert from "../icons/alert";

export const DeleteBookModal = ({
  isOpen,
  onClose,
  onConfirm,
  bookName,
  bookId,
}) => {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    const idColeccion = localStorage.getItem("collectionId"); // Obtener el ID de la colección desde localStorage

    if (!idColeccion) {
      console.error("ID de colección no encontrado en localStorage.");
      onClose();
      return;
    }

    try {
      const result = await deleteBookFromCollection(idColeccion, bookId);

      if (result.success) {
        onConfirm(bookId); // Notifica al padre que el libro fue eliminado

        // Verificar si la colección está vacía y eliminarla si corresponde
        const checkResult = await deleteEmptyCollection(idColeccion);

        if (checkResult.success) {
          navigate("/profile"); // Redirigir al perfil si la colección se eliminó
        } else {
          window.location.reload(); // Refrescar la página si la colección aún tiene libros
        }
      } else {
        console.error("Error al eliminar el libro:", result.error);
        alert(
          "Hubo un error al intentar eliminar el libro. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al eliminar el libro:", error);
    } finally {
      onClose(); // Cierra el modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[400px] bg-primary-pri3 rounded-2xl p-6 shadow-lg">
        {/* Header con el botón de cerrar */}
        <div className="flex justify-end">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>

        {/* Contenido del modal */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Alert />
          </div>

          <h2 className="text-title-sm font-title text-secondary-sec2">
            ¿Está seguro de eliminar este libro {bookName} de la Colección?
          </h2>
          <p className="text-body-sm font-body text-neutral-neu0 mt-3">
            Eliminar el libro hará que no aparezca en la Colección
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-around mt-6">
          <Button
            text="Sí, eliminar"
            onClick={handleConfirmDelete}
            variant="combCol1"
          />
          <Button text="Cancelar" onClick={onClose} variant="combCol2" />
        </div>
      </div>
    </div>
  );
};
