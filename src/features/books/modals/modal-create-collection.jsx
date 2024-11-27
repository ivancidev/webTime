import { useForm } from "react-hook-form";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import { useState } from "react";
import FooterButtonsCol from "../../collections/components/footer-buttons-collection";
import { supabase } from "../../../services/supabaseClient";
import Modal from "../../../modals/modal";
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import CheckRegister from "../../../icons/checkRegister";
import Button from "../../../components/buttons/button";
export const ModalCreateCollection = ({
    codLibro,
    onClose,
    text,
    onConfirm,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isModalOpenC, setIsModalOpenC] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const onSubmit = async (data) => {
        console.log("desde el boton");
        setIsLoading(true);
        setOpenDialog(true);

        const { nameCollection, description } = data;
        //console.log(nameCollection);
        //console.log(description);

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
                setIsLoading(false);
                setErrorMessage("Hubo un error al guardar la colección.");
                return;
            }

            const idColeccion = collectionData.idColeccion;
            try {
                const { data: bookData, error: bookError } = await supabase
                    .from("RegistroColeccion")
                    .insert({
                        idColeccion,
                        codLibro,
                    })
                    .select("*");

                if (bookError) {
                    console.error(
                        "Error al insertar en RegistroColeccion:",
                        bookError
                    );
                    setErrorMessage(
                        "Hubo un error al agregar el libro a la colección."
                    );
                    return;
                }
            } catch (error) {
                console.error(
                    "Error inesperado al insertar en RegistroColeccion:",
                    error
                );
                setErrorMessage(
                    "Error inesperado al guardar el libro en la colección."
                );
            }

            setIsLoading(false);
            setIsSuccess(true);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Hubo un error inesperado. Intenta nuevamente.");
        }
    };
    const openmod = () => {
        setIsModalOpenC(true);
    };
    const closemod = () => {
        setIsModalOpenC(false);
    };
    const handleCancel = () => {
        onClose();
    };
    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50"
            onClick={(e) => {
                if (e.target.id === "modal-backdrop") {
                    onClose();
                }
            }}
        >
            <div
                className=" lg:w-[521px] h-auto bg-primary-pri3 rounded-xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex items-center">
                    <div className="flex justify-center w-full">
                        <h1 className="text-secondary-sec2 w-auto text-center text-title-md font-semibold pt-8">
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
                {/*desde aqui*/}
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center w-full"
                    >
                        <div className="w-full p-10 mt-2">
                            <div className="flex">
                                <div>
                                    <h3 className="py-1 text-primary-pri2 font-label text-label-lg">
                                        Nombre de la colección
                                        <span className="text-error-err2">
                                            *
                                        </span>
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
                                                setCharCount(
                                                    e.target.value.length
                                                );
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
                        </div>
                    </form>
                </div>

                <FooterButtonsCol
                    onCancel={openmod}
                    onSubmit={handleSubmit(onSubmit)}
                    pr="10"
                />
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
                                        onClose();
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
            </div>
            {isModalOpenC && (
                <Modal
                    onClose={closemod}
                    text="¿Está seguro de que desea cancelar?"
                    onConfirm={handleCancel}
                />
            )}
        </div>
    );
};
