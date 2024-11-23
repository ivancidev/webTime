import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Comment } from "../components/comment";
import BackIcon from "../../../icons/back";
import { NavbarO } from "../../../components/navbar/navbarO";
import { supabase } from "../../../services/supabaseClient";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { InputComment } from "../components/input-comment";
import { addComment } from "../../../services/comment-service";

export const ForumComment = () => {
  const { id } = useParams();

  const location = useLocation();

  const imageUrl =
    location.state?.imgUrl ||
    "https://i1.sndcdn.com/avatars-000329607942-t9hnvm-t240x240.jpg";

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState([]);
  const [comentarioText, setComentarioText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const profileImage = user?.avatar;
  const idUsuario = user?.id_usuario;
  useEffect(() => {
    const getComentarios = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("comentarios")
        .select(
          `
                    cod_comentario,
                    comentario,
                    fecha,
                    usuario (
                        nombre,
                        avatar
                    ),
                    interaccion_comentario_usuario (
                        tipo_interaccioncomentario
                    )
                `
        )
        .eq("id_foro", id)
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error al obtener comentarios:", error);
      } else {
        const comentariosConInteracciones = data.map((comentario) => {
          const likes =
            comentario.interaccion_comentario_usuario?.filter(
              (interaccion) => interaccion.tipo_interaccioncomentario === 1
            ).length || 0;

          const dislikes =
            comentario.interaccion_comentario_usuario?.filter(
              (interaccion) => interaccion.tipo_interaccioncomentario === -1
            ).length || 0;

          return {
            ...comentario,
            likes,
            dislikes,
          };
        });
        setComentarios(comentariosConInteracciones);
      }
      setIsLoading(false);
    };

    getComentarios();
  }, [id]);

  const handleCommentSubmit = async (comentarioText) => {
    if (!comentarioText.trim()) {
      return;
    }

    if (!idUsuario) {
      console.error("El ID de usuario no está definido.");
      return;
    }

    const result = await addComment(comentarioText, id, idUsuario);

    if (result.success) {
      setComentarioText("");
    } else {
      console.error("Error al enviar el comentario:", result.error);
    }
  };
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

  return (
    <div className="flex max-h-screen flex-col bg-primary-pri3 overflow-auto">
      <NavbarO />

      <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-8 p-2 z-40">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
      </div>
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="flex-1">
          <h1 className="text-secondary-sec2 font-title text-title-lg text-center">
            Comentarios del foro
          </h1>
          <div className="flex items-center justify-center lg:h-[500px]">
            <img src={imageUrl} className="rounded-3xl object-cover w-2/3" />
          </div>
        </div>
        <div className="flex-1 lg:mt-0 mt-10">
          <div className="mx-5 flex-col max-h-[360px] lg:overflow-y-scroll space-y-9 lg:pr-[75px]">
            {isLoading ? ( // Mostrar spinner mientras carga
              <div className="flex justify-center items-center h-40">
                <CircularProgress color="secondary" />
              </div>
            ) : comentarios.length === 0 ? (
              <p className="text-center">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </p>
            ) : (
              comentarios.map((reg) => (
                <Comment
                  key={reg.cod_comentario}
                  codComentario={reg.cod_comentario}
                  nickname={reg.usuario?.nombre || "Anónimo"}
                  text={reg.comentario}
                  time={formatTime(reg.fecha)}
                  numLikes={reg.likes}
                  numDislikes={reg.dislikes}
                  avatar={reg.usuario?.avatar}
                />
              ))
            )}
          </div>
          <div className="mt-8 mx-5 ">
            <InputComment
              profileImage={profileImage}
              placeholder="Agregar comentario"
              textButton="Comentar"
              onComment={handleCommentSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
