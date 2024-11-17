import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/button";
import AddIcon from "../../../icons/add";
import React from "react";
import { useCollectionBooks } from "../../../hooks/use-get-collections";
import { CardCollection } from "./card-collection";

export const CollectionBooks = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [collectionBooks, setCollectionBooks] = useState([]);
  const handleCreateClick = () => {
    navigate("/profile/create-collection");
  };

  useEffect(() => {
    const getCollectionBooks = async () => {
      const collections = await useCollectionBooks(user.id_usuario);
      setCollectionBooks(collections);
    };

    getCollectionBooks();
  }, []);

  console.log(collectionBooks);

  return (
    <div>
      <div className="flex flex-row justify-end pr-14 mt-4">
        <Button text="Crear" SvgIcon={AddIcon} onClick={handleCreateClick} />
      </div>

      {collectionBooks.length === 0 ? (
        <div className="flex justify-center items-center my-32 font-body text-body-md text-secondary-sec2 mx-4">
          Aún no tienes ninguna colección de libros. ¡Crea una para comenzar!
        </div>
      ) : (
        <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collectionBooks.map((collection) => (
            <CardCollection
              key={collection.idColeccion}
              collectionName={collection.nombre}
              books={collection.libros}
            />
          ))}
        </div>
      )}
    </div>
  );
};
