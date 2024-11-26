import { useState } from "react";
import { ModalCreateCollection } from "../modals/modal-create-collection";

export const CardCreateCollection = ({
    collectionName = "Crear una nueva colección",
    codLibro,
}) => {
    const [showCreateColectionk, setshowCreateColectionk] = useState(false);
    //console.log("llega libro ", codLibro);
    return (
        <>
            <div
                className="flex items-center w-full hover:text-secondary-sec2 cursor-pointer mt-3"
                onClick={() => setshowCreateColectionk(true)}
            >
                <div className="rounded-full w-20"></div>
                <div className="flex flex-col">
                    <h3 className="mx-2 font-label text-center text-label-md mt-2 truncate px-1">
                        {collectionName}
                    </h3>
                </div>
            </div>

            {showCreateColectionk && (
                <ModalCreateCollection
                    codLibro={codLibro}
                    onClose={() => setshowCreateColectionk(false)}
                    text={"Crear Colección de Libro"}
                />
            )}
        </>
    );
};
