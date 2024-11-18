import { useNavigate } from "react-router-dom";

export const CardForo = ({ imgUrl, title, description, id_foro}) => {
    const navigate = useNavigate()
    const toComment = () => {

        console.log("iddddddddddddddddddddd ",id_foro)
        console.log("fotoooo ",imgUrl)
        
        navigate(`/comment/${id_foro}?imgUrl=${encodeURIComponent(imgUrl)}`);
    };
    return (
    <div 
        onClick={() => toComment(title,imgUrl)}
        className="flex flex-col w-[352px] min-h-[240px] h-full bg-neutral-neu4 rounded-lg hover:cursor-pointer hover:bg-secondary-sec3 hover:text-neutral-neu2">
      <div>
        <img
          className="w-full h-[160px] object-cover rounded-t-lg"
          src={imgUrl}
          alt={title}
        />
      </div>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-body-lg font-title font-semibold mb-4 ">{title}</h3>
        <p className="font-body text-body-md leading-5">{description}</p>
      </div>
    </div>
  );
};
