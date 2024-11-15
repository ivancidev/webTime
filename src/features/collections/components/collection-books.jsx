import { useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/button";
import AddIcon from "../../../icons/add";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

export const CollectionBooks = () => {
  const navigate = useNavigate();
  const collections = [];
  const handleCreateClick = () => {
    navigate("/profile/create-collection");
  };

  return (
    <div>
      <div className="flex flex-row justify-end pr-14 mt-4">
        <Button text="Crear" SvgIcon={AddIcon} onClick={handleCreateClick} />
      </div>

      {collections.length === 0 ? (
        <div className="flex justify-center items-center my-32 font-body text-body-md text-secondary-sec2 mx-4">
          Aún no tienes ninguna colección de libros. ¡Crea una para comenzar!
        </div>
      ) : (
        <div className="w-64 flex flex-col items-center">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-60 h-[285px]"
          >
            {collections.map((collection, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center rounded-2xl bg-white border"
              >
                {collection.title}
              </SwiperSlide>
            ))}
          </Swiper>
          <h3 className="mx-2 font-label text-center text-label-md mt-2 truncate px-1 hover:text-secondary-sec2">
            collection
          </h3>
        </div>
      )}
    </div>
  );
};
