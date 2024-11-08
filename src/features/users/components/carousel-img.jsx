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
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/registroFotos/register_1.jpg"
            alt="register_1"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/registroFotos/register_2.jpg"
            alt="register_2"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/registroFotos/register_3.jpg?t=2024-11-08T11%3A13%3A49.385Z"
            alt="register_3"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
