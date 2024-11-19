import { useNavigate } from "react-router-dom";

export const CardForo = ({ imgUrl, title, description, id_foro }) => {
  const navigate = useNavigate();
  const toComment = () => {
    navigate(`/comment/${id_foro}`, {
      state: { imgUrl },
    });
  };
    return (
    <div
      onClick={() => toComment()}
      className="flex flex-col w-full max-w-[350px] bg-neutral-neu4 rounded-lg hover:cursor-pointer hover:bg-secondary-sec3 hover:text-neutral-neu2 transition-all"
    >
      <div>
        <img
          className="w-full h-[160px] object-cover rounded-t-lg"
          src={imgUrl}
          alt={title}
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-body-lg font-title font-semibold mb-4 text-center sm:text-left">
          {title}
        </h3>
        <p className="font-body text-body-md leading-5 text-center sm:text-left">
          {description}
        </p>
      </div>
    </div>
  );
};
