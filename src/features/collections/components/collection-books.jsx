import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/button";
import AddIcon from "../../../icons/add";
import React from "react";
import { useCollectionBooks } from "../../../hooks/use-get-collections";
import { CardCollection } from "./card-collection";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const CollectionBooks = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [collectionBooks, setCollectionBooks] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const handleCreateClick = () => {
    navigate("/profile/register-collection");
  };

  useEffect(() => {
    const getCollectionBooks = async () => {
      setIsFetching(true);
      const collections = await useCollectionBooks(user.id_usuario);
      setCollectionBooks(collections);
      setIsFetching(false);
    };

    getCollectionBooks();
  }, []);

  const MAX_ROWS = 3;
  const ITEMS_PER_ROW = 4;
  const MAX_ITEMS = MAX_ROWS * ITEMS_PER_ROW;
  const displayedCollections = showMore
    ? collectionBooks
    : collectionBooks.slice(0, MAX_ITEMS);

  const handleToggleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowMore(!showMore);
    }, 500);
  };
  return (
    <div>
      <div className="flex flex-row justify-end pr-14 mt-4">
        <Button text="Crear" SvgIcon={AddIcon} onClick={handleCreateClick} />
      </div>

      {isFetching ? (
        <div className="flex flex-col justify-center items-center my-32">
          <CircularProgress size={80} />
          <p className="font-body text-body-md mt-3">Cargando colecciones...</p>
        </div>
      ) : collectionBooks.length === 0 ? (
        <div className="flex justify-center items-center my-32 font-body text-body-md text-secondary-sec2 mx-4">
          Aún no tienes ninguna colección de libros. ¡Crea una para comenzar!
        </div>
      ) : (
        <div className="px-4 mt-4 grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedCollections.map((collection) => (
            <CardCollection
              key={collection.idColeccion}
              collectionName={collection.nombre}
              books={collection.libros}
            />
          ))}
        </div>
      )}
      {collectionBooks.length > MAX_ITEMS && (
        <div className="flex justify-center">
          <button
            onClick={handleToggleShowMore}
            className="text-secondary-sec2 font-body text-body-md hover:underline m-5 text-justify"
          >
            {showMore ? "" : "Ver más"}
          </button>
        </div>
      )}
      <Dialog
        open={isLoading}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle className="text-center text-primary-pri1">
          Cargando...
        </DialogTitle>
        <DialogContent className="flex flex-col items-center justify-center">
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
};
