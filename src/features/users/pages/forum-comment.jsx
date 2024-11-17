import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Comment } from "../components/comment";
import BackIcon from "../../../icons/back";
import { NavbarO } from "../../../components/navbar/navbarO";
import { supabase } from "../../../services/supabaseClient";
import { useEffect, useState } from "react";

export const ForumComment = ({id=14, img ="https://i1.sndcdn.com/avatars-000329607942-t9hnvm-t240x240.jpg"}) => {
    

    const [comentarios, setComentario] = useState([]);
    useEffect(() => {
        const getComentarios = async () => {
            const { data, error } = await supabase
                .from("comentarios")
                .select(`
                    cod_comentario,
                    comentario,
                    fecha,
                    usuario (
                        nombre
                    ),
                    interaccion_comentario_usuario (
                        tipo_interaccioncomentario
                    )
                `)
                .eq("id_foro", id)
                .order("fecha", { ascending: false });;
    
            if (error) {
                console.error("Error al obtener comentarios:", error);
            } else {
                const comentariosConInteracciones = data.map((comentario) => {
                    const likes = comentario.interaccion_comentario_usuario?.filter(
                        (interaccion) => interaccion.tipo_interaccioncomentario === 1
                    ).length || 0;
    
                    const dislikes = comentario.interaccion_comentario_usuario?.filter(
                        (interaccion) => interaccion.tipo_interaccioncomentario === -1
                    ).length || 0;
    
                    return {
                        ...comentario,
                        likes,
                        dislikes,
                    };
                });
                setComentario(comentariosConInteracciones);
            }
        };
    
        getComentarios();
    }, [id]);
    

    const formatTime = (fecha) => {
        const now = new Date();
        const fechaComentario = new Date(fecha);
        const diffMs = now - fechaComentario; 
        const diffSec = Math.floor(diffMs / 1000); 
        const diffMin = Math.floor(diffSec / 60); 
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24); 
      
        if (diffDays >= 1) {
          return fechaComentario.toLocaleDateString(); 
        } else if (diffHours >= 1) {
          return `Hace ${diffHours} hrs`;
        } else if (diffMin >= 1) {
          return `Hace ${diffMin} minutos`;
        } else {
          return `Hace unos segundos`;
        }
      };
      

    console.log(comentarios)
    return (
      <div className="flex max-h-screen flex-col bg-primary-pri3">
        <NavbarO/>

        <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-10 p-2 z-40">
            <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
        </div>

        <div className=" flex flex-col lg:flex-row w-full h-full">

            <div className="flex-1">
                <h1 className="text-secondary-sec2 font-title text-title-lg text-center">
                    Comentarios del foro
                </h1>
                
                <img
                    src={img}
                    className="mx-auto mt-10 rounded-3xl object-cover w-2/3"
                />
                   
            

            </div>
            <div className=" flex-1 lg:mt-0 mt-10 ">
                <div className=" mx-5 flex-col max-h-[80vh] lg:overflow-y-scroll space-y-9 lg:pr-[75px]">
                    {comentarios.length === 0 ? (
                            <p className="text-center">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                    ) : (
                        comentarios.map((reg) => (
                            <Comment
                            key={reg.cod_comentario} 
                            nickname={reg.usuario?.nombre || "Anónimo"}
                            text={reg.comentario}
                            time={formatTime(reg.fecha)}
                            numLikes={reg.likes}
                            numDislikes={reg.dislikes}
                            />
                        ))
                    )}

                   
                </div>
            </div>
        </div>

            

      </div>
    );
  };
  
