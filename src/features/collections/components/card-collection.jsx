import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export const CardCollection = ({ collectionName, books }) => {
  const navigate = useNavigate();

  const handleCollectionClick = () => {
    // Guardar el ID de la colección en localStorage
    localStorage.setItem("collectionId", collectionId);
    // Redirigir a la página de vista de colecciones
    navigate("/profile/view-collection");
  };
  
  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-60 h-[285px]"
      >
        {books.slice(0, 4).map((book, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center rounded-2xl bg-white border"
          >
            <img
              src={book.enlacePortada}
              alt="book front"
              className="w-60 h-[285px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h3 className="w-60 mx-2 font-label text-center text-label-md mt-2 truncate px-1 hover:text-secondary-sec2 cursor-pointer">
        {collectionName}
      </h3>
    </div>
  );
};
