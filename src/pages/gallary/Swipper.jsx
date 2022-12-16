import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiperjs.css";

// import required modules
import { Autoplay, Pagination, Navigation, Thumbs } from "swiper";
export default function SwiperJs({picnic}) {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}

                navigation={true}
                modules={[Autoplay, Pagination, Navigation, Thumbs]}
                className="mySwiper"
            >
                {picnic.map((p, i) => {
                    return (
                        <SwiperSlide className='swiper-slide' key={i}>
                            <img loading="lazy" src={p} alt="" />
                        </SwiperSlide>
                    )

                })
                }

            </Swiper>
        </>
    );
}
