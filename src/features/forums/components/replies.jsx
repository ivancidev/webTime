import { CircularProgress } from "@mui/material";
import { useGetReply } from "../../../hooks/use-get-reply";
import { Reply } from "./reply";

export const Replies = ({ codComentario }) => {
  const { replies, isLoadingR, error } = useGetReply(codComentario);

  if (isLoadingR) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
    <div className="ml-5 space-y-5">
      {isLoadingR ? (
        <CircularProgress />
      ) : (
        <div
          className={`mt-5  space-y-5 ${
            replies.length > 2 ? "overflow-y-auto pb-1 pr-3" : ""
          }`}
          style={{ height: replies.length > 2 ? "200px" : "auto" }}
        >
          {replies.map((reply) => (
            <Reply
              key={reply.cod_respuesta}
              codRespuesta={reply.cod_respuesta}
              nickname={reply.usuario?.nombre || "Anónimo"}
              text={reply.respuesta}
              numLikes={reply.likes}
              numDislikes={reply.dislikes}
              time={formatTime(reply.fecha_respuesta)}
              avatar={reply.usuario?.avatar}
            />
          ))}
        </div>
      )}
    </div>
  );
};
