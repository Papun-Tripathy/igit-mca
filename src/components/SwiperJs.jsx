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
export default function SwiperJs() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
            
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2F-6082361470475153298_121.jpg?alt=media&token=fb54ff91-c522-4889-86d4-59d0ad367c37" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2F-6082361470475153276_121.jpg?alt=media&token=8451a906-0782-4255-9bc8-939021d3fd24" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2FWhatsApp%20Image%202022-08-31%20at%2012.14.00%20AM.jpeg?alt=media&token=bd7273de-1941-4260-85f8-c29036018b8f" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2FIMG-20220401-WA0051.jpg?alt=media&token=21db2950-66b3-48d6-9a80-dc34209db854" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2FIMG-20220521-WA0015.jpg?alt=media&token=0f0b04a3-6434-4211-8fc7-e62bf30d5129" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2FIMG-20220303-WA0060.jpg?alt=media&token=3a60f3ad-36e0-4df4-97f9-f987d667a378" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/music-player-eaeef.appspot.com/o/Photos%2FIMG-20220324-WA0022.jpg?alt=media&token=309b3eca-e6f5-48c0-a8b0-3705e67e564d" alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
