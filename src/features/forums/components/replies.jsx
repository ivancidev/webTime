import { useGetReply } from "../../../hooks/use-get-reply";
import { Reply } from "./reply";

export const Replies = ({ codComentario }) => {
  const { replies, isLoadingR, error } = useGetReply(codComentario);

  if (isLoadingR) {
    return <p>Cargando respuestas...</p>;
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
      ) : replies.length === 0 ? (
        <p className="font-body text-body-md text-secondary-sec2 text-center mt-2 mb-4">
          No hay respuestas para este comentario.
        </p>
      ) : (
        <div className="mt-5 overflow-y-auto pr-3" style={{ height: "200px" }}>
          {replies.map((reply) => (
            <Reply
              key={reply.cod_respuesta}
              nickname={reply.usuario?.nombre || "Anónimo"}
              text={reply.respuesta}
              time={formatTime(reply.fecha_respuesta)}
              avatar={reply.usuario?.avatar}
            />
          ))}
        </div>
      )}
    </div>
  );
};
