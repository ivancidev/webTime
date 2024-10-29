import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

export const CarouselImg = () => {
  return (
    <div className="w-[500px] h-[640px] border-2">
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
            src="/src/assets/images/man.PNG"
            alt="Man"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/src/assets/images/woman.PNG"
            alt="Woman"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/src/assets/images/man2.PNG"
            alt="Man2"
            className="w-[550px] h-[640px] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
