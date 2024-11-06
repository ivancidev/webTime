import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

export const CarouselImg = () => {
  return (
    <div className="w-[500px] h-[640px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          loop: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="carouselImg"
        loop={true}
        speed={1000}
      >
        <SwiperSlide>
          <img
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/registroFotos/man.PNG?t=2024-10-31T05%3A24%3A16.377Z"
            alt="Man"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/registroFotos/woman.PNG?t=2024-10-31T05%3A24%3A43.725Z"
            alt="Woman"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/registroFotos/man2.PNG?t=2024-10-31T05%3A24%3A03.523Z"
            alt="Man2"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
