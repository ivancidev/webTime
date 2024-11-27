import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Comment } from "../components/comment";
import BackIcon from "../../../icons/back";
import { NavbarO } from "../../../components/navbar/navbarO";
import { supabase } from "../../../services/supabaseClient";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { InputComment } from "../components/input-comment";
import { addComment } from "../../../services/comment-service";
import { Replies } from "../components/replies";
import { addReply } from "../../../services/reply-service";

export const ForumComment = () => {
  const { id } = useParams();
  const location = useLocation();
  const imageUrl =
    location.state?.imgUrl ||
    "https://i1.sndcdn.com/avatars-000329607942-t9hnvm-t240x240.jpg";

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState([]);
  const [text, setText] = useState("");
  const [comentarioText, setComentarioText] = useState("");
  const [activeComment, setActiveComment] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const profileImage = user?.avatar;
  const idUsuario = user?.id_usuario;
  const [showRepliesFor, setShowRepliesFor] = useState(null);
  const handleShowReplies = (codComentario) => {
    setShowRepliesFor((prev) =>
      prev === codComentario ? null : codComentario
    );
  };

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

  useEffect(() => {
    getComentarios();
  }, [id]);

  const handleReplyClick = (codComentario, usuarioNombre) => {
    setActiveComment((prev) => (prev === codComentario ? null : codComentario));
    setReplyingTo(usuarioNombre || "Anónimo");
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCommentSubmit = async (text) => {
    if (!text.trim()) {
      return;
    }

    if (!idUsuario) {
      console.error("El ID de usuario no está definido.");
      return;
    }

    if (activeComment) {
      const result = await addReply(text, activeComment, idUsuario);
      if (result.success) {
        setText("Respuesta publicada correctamente");
        setSnackbarOpen(true);
        setActiveComment(null);
        handleShowReplies(activeComment);
      } else {
        console.error("Error al enviar la respuesta:", result.error);
      }
    } else {
      const result = await addComment(text, id, idUsuario);
      if (result.success) {
        setComentarioText("");
        setText("Comentario publicado correctamente");
        setSnackbarOpen(true);
        getComentarios();
      } else {
        console.error("Error al enviar el comentario:", result.error);
      }
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
      <div className="flex flex-col lg:flex-row w-full" style={{ height: "calc(100vh - 10rem)" }}>
        <div className="flex-1">
          <h1 className="text-secondary-sec2 font-title text-title-lg text-center">
            Comentarios del foro
          </h1>
          <div className="flex items-center justify-center lg:h-[500px] mt-5">
            <img src={imageUrl} className="rounded-3xl object-cover w-2/3" />
          </div>
        </div>
        <div className="flex flex-1 flex-col mt-5 sm:mt-0">
          <div className="flex-1 mx-5 flex-col overflow-y-auto space-y-5 lg:pr-5">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : comentarios.length === 0 ? (
              <p className="text-center text-secondary-sec2 font-body text-body-md">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </p>
            ) : (
              comentarios.map((reg) => (
                <div key={reg.cod_comentario}>
                  <Comment
                    codComentario={reg.cod_comentario}
                    nickname={reg.usuario?.nombre || "Anónimo"}
                    text={reg.comentario}
                    time={formatTime(reg.fecha)}
                    avatar={reg.usuario?.avatar}
                    onReply={() =>
                      handleReplyClick(reg.cod_comentario, reg.usuario?.nombre)
                    }
                    onShowReplies={() => handleShowReplies(reg.cod_comentario)}
                  />
                  {showRepliesFor === reg.cod_comentario && (
                    <Replies codComentario={reg.cod_comentario} />
                  )}

                  {activeComment === reg.cod_comentario && (
                    <div className="ml-6 mt-5">
                      <p className="font-body text-body-sm text-neutral-neu0 mb-1">
                        Respondiendo a {replyingTo}
                      </p>
                      <InputComment
                        profileImage={profileImage}
                        placeholder="Agregar respuesta"
                        textButton="Enviar"
                        onComment={handleCommentSubmit}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="sticky bottom-0 bg-white p-4">
            <InputComment
              profileImage={profileImage}
              placeholder="Agregar comentario"
              textButton="Comentar"
              onComment={handleCommentSubmit}
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};
