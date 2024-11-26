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
                <div
                    className="w-[65px] h-[90px] flex justify-center items-center rounded-lg bg-gray-300"
                    style={{ backgroundColor: "#D9D9D9" }} // Color plomo
                >
                    <span className="text-2xl font-bold text-gray-700">+</span>
                </div>
                <div className="rounded-full"></div>
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
