import { useState, useEffect } from "react";
import BackIcon from "../../../icons/back";
import Star from "../../../icons/star";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookDetails } from "../../../hooks/use-book-details";
import { StarRow } from "../components/star-row";
import { DetailRow } from "../components/detail-row";
import { CircularProgress } from "@mui/material";
import { ReadBook } from "../components/readBook";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { TextLarge } from "../../register/components/text-large";
import { useAudio } from "../../../context/audio-context";
import { IconOclock } from "../icons/oclock";
import { IconDocument } from "../icons/document";
import { supabase } from "../../../services/supabaseClient";
import { ModalQualifi } from "../modals/modal-qualifi";
import { ModalCollection } from "../modals/modal-collecion";
import addToColection from "../../../icons/addToColection";

export const BookInfo = () => {
    const location = useLocation();
    const { book } = location.state || {};
    const navigate = useNavigate();
    const { bookDetails, error, loading } = useBookDetails(book);
    const [showReadBook, setShowReadBook] = useState(false);
    const { showAudioPlay, setShowAudioPlay } = useAudio();
    const [showCollection, setShowCollection] = useState(false);
    const [showQualifiti, setshowQualifiti] = useState(false);
    const [showMean, setShowMean] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [mean, setMean] = useState(0); // Estado para almacenar el promedio
    const [starRating, setStarRating] = useState(0);
    const [mensajeConfirmacion, setmensajeC] = useState(false);

    const handleStarRatingChange = async (rating) => {
        setStarRating(rating);
    };

    useEffect(() => {
        const fetchCalifications = async () => {
            try {
                const { data: califications, error } = await supabase
                    .from("calificacion")
                    .select("calificacion")
                    .eq("codLibro", book.codLibro);

                if (error) {
                    console.error(
                        "Error al obtener las calificaciones:",
                        error
                    );
                    return;
                }

                if (!califications || califications.length === 0) {
                    setMean(0);
                } else {
                    const calificaciones = califications.map(
                        (item) => item.calificacion
                    );
                    const suma = calificaciones.reduce(
                        (acumulador, valorActual) => acumulador + valorActual,
                        0
                    );
                    setMean(suma / calificaciones.length);
                    setShowMean(true);
                }
            } catch (e) {
                console.error("Error inesperado:", e);
            }
        };

        fetchCalifications();
    }, [book.codLibro, starRating, showMean]);

    const submitQalification = async () => {
        try {
            let { data: datainfo, error: errorUser } = await supabase
                .from("calificacion")
                .select("idUsuario")
                .eq("codLibro", book.codLibro)
                .eq("idUsuario", user.id_usuario);

            console.log(datainfo);
            if (datainfo.length > 0) {
                const { error: ratingErroru } = await supabase
                    .from("calificacion")
                    .update({ calificacion: starRating })
                    .eq("idUsuario", user.id_usuario)
                    .eq("codLibro", book.codLibro);

                if (ratingErroru) {
                    console.error(
                        "Error al actualizar la calificación:",
                        ratingErroru
                    );
                } else {
                    console.log("Calificación actualizada correctamente.");
                }
            } else {
                const { error: ratingErrori } = await supabase
                    .from("calificacion")
                    .insert([
                        {
                            idUsuario: user.id_usuario,
                            codLibro: book.codLibro,
                            calificacion: starRating,
                        },
                    ]);

                if (ratingErrori) {
                    console.error(
                        "Error al insertar la calificación:",
                        ratingErrori
                    );
                } else {
                    console.log("Calificación insertada correctamente.");
                }
            }
            setmensajeC(true);
        } catch (error) {
            console.log("Error inesperado: " + error);
        }
        setTimeout(() => {
            closeQAModal();
        }, 1500);

        // setmensajeC(false);
    };

    const setinitialValue = async () => {
        try {
            const { data, error } = await supabase
                .from("calificacion")
                .select("calificacion")
                .eq("idUsuario", user.id_usuario)
                .eq("codLibro", book.codLibro);

            if (error) {
                console.error(
                    "Error al obtener la calificación previa:",
                    error
                );
                setStarRating(0);
                return;
            }

            if (data.length > 0) {
                setStarRating(data[0].calificacion);
            } else {
                setStarRating(0);
            }
        } catch (err) {
            console.error("Error inesperado al obtener la calificación:", err);
            setStarRating(0);
        }
    };

    const openQAModal = async () => {
        await setinitialValue();
        setshowQualifiti(true);
    };

    const closeQAModal = () => {
        setStarRating(0);
        setmensajeC(false);
        setshowQualifiti(false);
    };

    if (!book) {
        return (
            <div className="text-neutral-50">
                ¡No se encontraron detalles del libro!
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
                <CircularProgress color="primary" size={80} />
                <h2 className="mt-4 text-xl">Cargando libro...</h2>
            </div>
        );
    }

    if (error) {
        return <div>Error al obtener detalles del libro: {error.message}</div>;
    }

    return (
        <div className="flex max-h-screen flex-col bg-primary-pri3">
            <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-8 p-2 z-40">
                <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
            </div>
            <div className="flex flex-col lg:flex-row items-center md:justify-evenly px-5 md:mt-8">
                <div className="flex flex-col w-full md:w-auto items-center sm:mb-8">
                    <div className="relative w-full max-w-[80%] aspect-square sm:w-[500px] sm:h-[400px] bg-neutral-neu2 rounded-3xl">
                        <img
                            src={book.enlacePortada}
                            className="w-full max-w-[85%] h-[115%] sm:w-80 md:h-[470px] rounded-3xl absolute inset-0 m-auto object-cover"
                        />
                    </div>
                    <div className="flex justify-center w-full max-w-[80%] sm:w-[440px] mt-11 md:mt-14">
                        <Button
                            text="Calificar"
                            variant="combExp2"
                            onClick={openQAModal}
                        />
                    </div>
                </div>

                <div className="mx-5">
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <h1 className="max-w-[500px] font-display text-display-sm sm:text-display-lg text-secondary-sec2 mt-8 md:mt-5">
                            {book.nombreLibro}
                        </h1>
                        <div className="flex flex-row space-x-8 mt-4">
                            <ButtonIcon
                                SvgIcon={ListenIcon}
                                variant={`${
                                    showAudioPlay
                                        ? "combColBlue"
                                        : "combColBlack"
                                }`}
                                onClick={() => setShowAudioPlay(true)}
                            />
                            <ButtonIcon
                                SvgIcon={ReadIcon}
                                variant={`${
                                    showReadBook
                                        ? "combColBlue"
                                        : "combColBlack"
                                }`}
                                onClick={() => setShowReadBook(true)}
                            />
                            <ButtonIcon
                                SvgIcon={addToColection}
                                variant={`${
                                    showReadBook
                                        ? "combColBlue"
                                        : "combColBlack"
                                }`}
                                onClick={() => setShowCollection(true)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col h-40 justify-around sm:justify-between mt-8">
                        <DetailRow
                            label="Autor"
                            value={bookDetails.nombreAutor}
                        />
                        <DetailRow label="Idioma" value={bookDetails.idioma} />
                        <DetailRow
                            label="Categoría"
                            value={bookDetails.nombreCategoria}
                        />
                        <div className="flex gap-2 sm:gap-4">
                            <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg gap-2">
                                <IconDocument className="w-5 h-5 mr-2" />
                                <p className="text-body-sm font-body">
                                    {book.numero_paginas} páginas
                                </p>
                            </div>
                            <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg gap-2">
                                <IconOclock className="w-5 h-5 mr-2" />
                                <p className="text-body-sm font-body">
                                    {book.duracion_audio} min
                                </p>
                            </div>
                            {showMean && (
                                <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg gap-2">
                                    <Star className="w-5 h-5 mr-2" size="22" />
                                    <p className="text-body-sm font-body">
                                        {mean.toFixed(1)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="max-w-[500px] mt-8 mb-8 sm:my-10">
                        <TextLarge
                            text={book.sinopsis}
                            max={250}
                            message="Leer"
                        />
                    </div>
                </div>
            </div>
            {showReadBook && (
                <div>
                    <ReadBook
                        pdfUrl={book.enlacePdf}
                        onClose={() => setShowReadBook(false)}
                        id_user={user.id_usuario}
                        limited_page={book.numero_paginas}
                        codBook={book.codLibro}
                    />
                </div>
            )}
            {showCollection && (
                <ModalCollection
                    onClose={() => setShowCollection(false)}
                    text={"Añadir a colección"}
                    codLibro={book.codLibro}
                />
            )}
            {showQualifiti && (
                <ModalQualifi
                    onClose={closeQAModal}
                    status={handleStarRatingChange}
                    onClick={submitQalification}
                    stars={starRating}
                    initialValue={starRating}
                    mensajeConfirmacion={mensajeConfirmacion}
                />
            )}
        </div>
    );
};
