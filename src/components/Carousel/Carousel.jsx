import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import image from "../../assets/image.png";
import { Skeleton } from "../ui/skeleton";

function Carousel({ data, isLoading }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // ✅ Track active slide

  return (
    <>
      <div className="slider w-[90%] lg:w-200 relative">
        <Swiper
          spaceBetween={10}
          //   loop={true}
          className="mySwiper user-select-none"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton className="w-full h-100 bg-gray-700"></Skeleton>
              </SwiperSlide>
            ))
          ) : data?.length > 0 ? (
            data?.map((item) => (
              <SwiperSlide key={item.id} className="">
                <div className="slide flex flex-col sm:flex-row justify-center items-center sm:items-end md:items-end">
                  <div className="slide-img">
                    <figure className="w-100 h-120 rounded-t-lg rounded-bl-lg bg-main/20 overflow-hidden p-2">
                      <img
                        src={item?.image || image}
                        alt=""
                        className=" h-full w-full rounded-lg rounded-br-none object-contain"
                      />
                    </figure>
                  </div>
                  <div className="slide-body bg-second h-105 text-left p-5 lg:pr-20 flex flex-col justify-center rounded-br-lg rounded-tr-lg w-full">
                    <h2 className="font-[600] mb-5 text-2xl capitalize">
                      {item?.title || "No title"}
                    </h2>
                    <p className="text-[18px] font-[450] opacity-70">
                      {item?.description || "No description"}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center flex flex-col justify-center items-center h-full ">
                <img
                  src={"/not-found.png"}
                  alt="search"
                  className="w-100 h-100 bg-main/20 rounded-lg"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`cursor-pointer absolute top-1/2 -left-5 lg:-left-20  transform -translate-y-1/2 text-main text-4xl z-10 ${
            activeIndex === 0 ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => swiperInstance && swiperInstance.slidePrev()}
        >
          ❮
        </button>
        <button
          className={`cursor-pointer absolute top-1/2 -right-5 lg:-right-20 transform -translate-y-1/2 text-main text-4xl z-10 transition-opacity ${
            swiperInstance && activeIndex === swiperInstance?.slides?.length - 1
              ? "opacity-50"
              : "opacity-100"
          }`}
          onClick={() => swiperInstance && swiperInstance.slideNext()}
        >
          ❯
        </button>
      </div>
    </>
  );
}

export default Carousel;
