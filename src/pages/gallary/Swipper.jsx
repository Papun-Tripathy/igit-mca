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
                    <img src="https://firebasestorage.googleapis.com/v0/b/image-be39d.appspot.com/o/PICNIC%2Fphoto_2022-11-17_00-28-01.jpg?alt=media&token=0b0ffa92-98f5-4fa3-85f4-3652ad7c2835" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/image-be39d.appspot.com/o/PICNIC%2Fphoto_2022-11-17_00-28-29.jpg?alt=media&token=cffefc8d-51f5-4629-912e-49d28177d041" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/image-be39d.appspot.com/o/PICNIC%2Fphoto_2022-11-17_00-28-31.jpg?alt=media&token=5b070e5a-7f7c-4302-be14-1dd516b4d90b" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/image-be39d.appspot.com/o/PICNIC%2Fphoto_2022-11-17_00-28-32.jpg?alt=media&token=be549eac-ab4b-4424-94ab-84030a5f5dd2" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/image-be39d.appspot.com/o/PICNIC%2Fphoto_2022-11-17_00-28-34.jpg?alt=media&token=ece9b367-0f4d-405e-849d-e2169f40c08c" alt="" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/image-be39d.appspot.com/o/PICNIC%2Fphoto_2022-11-17_00-28-36.jpg?alt=media&token=f0b9230c-04a9-43f6-ad31-2c6ad3ceac86" alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
