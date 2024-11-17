import { TextLarge } from "../../register/components/text-large";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Button from "../../../components/buttons/button";
import Dislike from "../../../icons/dislike";
import Like from "../../../icons/like";
import User from "../../../icons/user";
import LikePressed from "../../../icons/like-pressed";
import { useState, useEffect } from "react";
import DislikePressed from "../../../icons/dislike-pressed";
import { supabase } from "../../../services/supabaseClient";

export const Comment = ({ nickname, text, time, numLikes, numDislikes, codComentario }) => {
    const [userInteraccion, setUserInteraccion] = useState("0");
    const [likes, setLikes] = useState(numLikes);
    const [dislikes, setDislikes] = useState(numDislikes);

    useEffect(() => {
        const fetchUserInteraccion = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                console.warn("No se encontró un usuario autenticado.");
                return;
            }

            const { data, error } = await supabase
                .from("interaccion_comentario_usuario")
                .select("tipo_interaccioncomentario")
                .eq("cod_comentario", codComentario)
                .eq("id_usuario", user.id_usuario)
                .single();

            if (error) {
                if (error.details !== "The result contains no rows") {
                    //console.error("Error al obtener la interacción del usuario:", error);
                    console.log("usuario no tiene reaccion")
                }
            } else if (data) {
                setUserInteraccion(data.tipo_interaccioncomentario.toString());
            }
        };

        fetchUserInteraccion();
    }, [codComentario]);

    const handleInteraccion = async (tipoInteraccion) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Por favor, inicia sesión para interactuar con este comentario.");
            return;
        }
    
        const userId = user.id_usuario;
        try {
            if (userInteraccion === tipoInteraccion) {
                const { error } = await supabase
                    .from("interaccion_comentario_usuario")
                    .delete()
                    .eq("cod_comentario", codComentario)
                    .eq("id_usuario", userId);
    
                if (!error) {
                    setUserInteraccion("0");
                    if (tipoInteraccion === "1") setLikes((prev) => prev - 1);
                    if (tipoInteraccion === "-1") setDislikes((prev) => prev - 1);
                } else {
                    console.error("Error al eliminar interacción:", error);
                }
            } else {
                const { error: deleteError } = await supabase
                    .from("interaccion_comentario_usuario")
                    .delete()
                    .eq("cod_comentario", codComentario)
                    .eq("id_usuario", userId);
    
                if (deleteError) {
                    console.error("Error al eliminar interacción previa:", deleteError);
                    return;
                }
    
                const { error: upsertError } = await supabase
                    .from("interaccion_comentario_usuario")
                    .upsert({
                        cod_comentario: codComentario,
                        id_usuario: userId,
                        tipo_interaccioncomentario: tipoInteraccion,
                    });
    
                if (!upsertError) {
                    if (userInteraccion === "1" && tipoInteraccion === "-1") {
                        setLikes((prev) => prev - 1);
                        setDislikes((prev) => prev + 1);
                    } else if (userInteraccion === "-1" && tipoInteraccion === "1") {
                        setDislikes((prev) => prev - 1);
                        setLikes((prev) => prev + 1);
                    } else if (tipoInteraccion === "1") {
                        setLikes((prev) => prev + 1);
                    } else if (tipoInteraccion === "-1") {
                        setDislikes((prev) => prev + 1);
                    }
                    setUserInteraccion(tipoInteraccion);
                } else {
                    console.error("Error al insertar nueva interacción:", upsertError);
                }
            }
        } catch (error) {
            console.error("Error en la transacción de interacción:", error);
        }
    };
    

    return (
        <div className="py-5 px-8 bg-primary-pri3 border border-neutral-neu1 rounded-xl w-full">
            <div className="flex flex-row items-center space-x-3">
                <ButtonIcon SvgIcon={User} variant="combColBlack2" />
                <div className="flex flex-col">
                    <h2 className="font-label text-label-md mt-1">{nickname}</h2>
                    <h2 className="text-neutral-neu0 text-body-md">{time}</h2>
                </div>
            </div>
            <div>
                <TextLarge text={text} max={100} message="Mostrar" />
            </div>
            <div className="flex flex-row items-center mt-4">
                <div className="group flex items-center hover:text-secondary-sec2">
                    <ButtonIcon
                        SvgIcon={userInteraccion === "1" ? LikePressed : Like}
                        variant="group-hover:combColBlackBlue combColBlue"
                        onClick={() => handleInteraccion("1")}
                    />
                    <h2 className="text-body-md mr-5 group-hover:text-secondary-sec2">
                        {likes}
                    </h2>
                </div>
                <div className="group flex items-center hover:text-secondary-sec2">
                    <ButtonIcon
                        SvgIcon={userInteraccion === "-1" ? DislikePressed : Dislike}
                        variant="group-hover:combColBlackBlue combColBlue"
                        onClick={() => handleInteraccion("-1")}
                    />
                    <h2 className="text-body-md mr-5 group-hover:text-secondary-sec2">
                        {dislikes}
                    </h2>
                </div>
                <Button text="Responder" variant="combColBlackBlue" />
            </div>
        </div>
    );
};
