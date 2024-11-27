import { useState } from "react";
import AddLarge from "../icons/addLarge";
import { CardBookCol } from "./card-book-col";
import FooterButtonsCol from "./footer-buttons-collection";
import { ModalBooks } from "./modal-books";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import { useForm } from "react-hook-form";
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import CheckRegister from "../../../icons/checkRegister";
import Button from "../../../components/buttons/button";
import Modal from "../../../modals/modal";

export const FormCollection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const [addBooks, setAddBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageBook, setErrorMessageBook] = useState("");
    const [charCount, setCharCount] = useState(0);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [isModalOpenC, setIsModalOpenC] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setOpenDialog(true);

        const { nameCollection, description } = data;
        //console.log(nameCollection);
        //console.log(description);

        if (addBooks.length === 0) {
            setIsLoading(false);

            setOpenDialog(false);
            setErrorMessageBook(
                "Selecciona al menos un libro para la colección."
            );
            return;
        }

        if (!user || !user.id_usuario) {
            setIsLoading(false);
            setErrorMessage(
                "Usuario no definido. Intenta iniciar sesión nuevamente."
            );
            return;
        }

        try {
            // Insertar en la tabla "Coleccion"
            const { data: collectionData, error: collectionError } =
                await supabase
                    .from("Coleccion")
                    .insert({
                        idUsuario: user.id_usuario,
                        nombre: nameCollection,
                        descripcion: description,
                    })
                    .select("idColeccion")
                    .single();

            if (collectionError) {
                //console.error("Error al insertar colección:", collectionError);
                setIsLoading(false);
                setErrorMessage("Hubo un error al guardar la colección.");
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
                    //console.error("Error al insertar libro:", bookError);
                    return { error: bookError };
                }
                return { success: true };
            });

            await Promise.all(bookInsertions);
            setIsLoading(false);
            setIsSuccess(true);
        } catch (error) {
            //console.error("Error inesperado al guardar la colección:", error);
            setIsLoading(false);
            setErrorMessage("Hubo un error inesperado. Intenta nuevamente.");
        }
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
                        !prevBooks.some(
                            (prevBook) => prevBook.codLibro === book.codLibro
                        )
                );
                if (uniqueBooks.length > 0) {
                    setErrorMessageBook("");
                }
                return [...prevBooks, ...uniqueBooks];
            });
        }
    };

    const handleDeleteBook = (codLibro) => {
        setAddBooks((prevBooks) =>
            prevBooks.filter((book) => book.codLibro !== codLibro)
        );
    };

    const openmod = () => {
        setIsModalOpenC(true);
    };
    const closemod = () => {
        setIsModalOpenC(false);
    };

    const handleCancel = () => {
        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col items-center justify-center flex-grow">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center w-full"
                >
                    <h1 className="text-secondary-sec2 font-title text-title-lg mt-2 px-10">
                        Crear Colección de Libro
                    </h1>
                    <div className="w-full p-10 mt-2">
                        <div className="flex">
                            <div>
                                <h3 className="py-1 text-primary-pri2 font-label text-label-lg">
                                    Nombre de la colección
                                    <span className="text-error-err2">*</span>
                                </h3>
                                <input
                                    id="nameCollection"
                                    name="nameCollection"
                                    type="text"
                                    label="Nombre de la colección"
                                    placeholder="Escribe aquí"
                                    {...register("nameCollection", {
                                        required:
                                            "Debes introducir un nombre de colección",
                                        pattern: {
                                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ_\-\(\)\[\]\s]*$/,
                                            message:
                                                "Sólo se permiten  A-z, a-z, 0-9, á, é, í, ó, ú, ü, ñ, _, -,(), []",
                                        },
                                        maxLength: {
                                            value: 60,
                                            message:
                                                "Elige un nombre de colección más corto",
                                        },
                                        onChange: (e) => {
                                            setCharCount(e.target.value.length);
                                        },
                                    })}
                                    className="w-full bg-transparent border-[1px] rounded border-neutral-neu0 md:w-[340px] h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
                                    errors={errors}
                                />
                            </div>
                            <div className="flex items-end">
                                {charCount > 60 && (
                                    <span className="text-error-err2 ml-2">
                                        {charCount}/60
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="h-7">
                            {errors.nameCollection && (
                                <span className="text-error-err2">
                                    {errors.nameCollection.message}
                                </span>
                            )}
                        </div>
                        <label
                            htmlFor="description"
                            className=" text-primary-pri2 font-label text-label-lg"
                        >
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            {...register("description", {
                                pattern: {
                                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ_\-\(\)\[\]\!\?\.\,\:\;\s]*$/,
                                    message:
                                        "Sólo se permiten  A-z, a-z, 0-9, á, é, í, ó, ú, ü, ñ, _, -,(), [], !. ?,.,,,:,;",
                                },
                                maxLength: {
                                    value: 500,
                                    message:
                                        "Ingresa una descripción más corta",
                                },
                            })}
                            placeholder="Escribe aquí"
                            className="w-full h-24 bg-transparent border-[1px] rounded border-neutral-neu0 p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md mt-2 resize-none"
                        />
                        <div className="h-7 mb-1">
                            {errors.description && (
                                <span className="text-error-err2">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>

                        <label
                            htmlFor="selectBooks"
                            className="text-primary-pri2 font-label text-label-lg pt-3"
                        >
                            Seleccionar libros:
                        </label>
                        <div className="flex flex-wrap mt-2 mr-5 ml-0">
                            {addBooks.map((book) => (
                                <CardBookCol
                                    key={book.codLibro}
                                    titleBook={book.nombreLibro}
                                    frontBook={book.enlacePortada}
                                    deleteBook={() =>
                                        handleDeleteBook(book.codLibro)
                                    }
                                />
                            ))}
                            <div
                                onClick={handleOpenModal}
                                className="w-[140px] h-40 mt-2 bg-neutral-neu2 rounded-2xl flex items-center justify-center hover:text-secondary-sec2 cursor-pointer hover:border hover:border-secondary-sec2 mr-5"
                            >
                                <AddLarge />
                            </div>
                        </div>
                        <div className="h-7 mt-1">
                            {errorMessageBook && (
                                <span className="text-error-err2">
                                    {errorMessageBook}
                                </span>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <FooterButtonsCol
                onCancel={openmod}
                onSubmit={handleSubmit(onSubmit)}
            />
            {isModalOpenC && (
                <Modal
                    onClose={closemod}
                    text="¿Está seguro de que desea cancelar?"
                    onConfirm={handleCancel}
                />
            )}
            <Dialog
                open={openDialog}
                onClose={null}
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: "16px",
                    },
                }}
            >
                {isLoading ? (
                    <>
                        <DialogTitle className="text-center text-primary-pri1">
                            Cargando...
                        </DialogTitle>
                        <DialogContent className="flex flex-col items-center justify-center">
                            <CircularProgress />
                        </DialogContent>
                    </>
                ) : isSuccess ? (
                    <>
                        <DialogTitle className=" text-center flex flex-col items-center text-primary-pri1">
                            <div className="mt-1">
                                <CheckRegister />
                            </div>
                            <h3 className="font-body text-body-lg mt-1 ">
                                Colección creada exitosamente
                            </h3>
                        </DialogTitle>

                        <DialogContent className="flex flex-col items-center justify-center space-y-2">
                            <Button
                                text="Aceptar"
                                onClick={() => {
                                    setOpenDialog(false);
                                    navigate("/profile");
                                }}
                            />
                        </DialogContent>
                    </>
                ) : errorMessage ? (
                    <>
                        <DialogTitle className="text-center text-secondary-sec2">
                            Error
                        </DialogTitle>
                        <DialogContent className="flex flex-col items-center justify-center">
                            <p>
                                {errorMessage ||
                                    "Ocurrió un error. Inténtalo de nuevo."}
                            </p>
                            <Button
                                text="Aceptar"
                                onClick={() => setOpenDialog(false)}
                            />
                        </DialogContent>
                    </>
                ) : (
                    ""
                )}
            </Dialog>

            {isModalOpen && <ModalBooks onClose={handleCloseModal} />}
        </div>
    );
};
