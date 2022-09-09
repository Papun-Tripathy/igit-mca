import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./notice.css";
import { EffectCards, Autoplay, Pagination } from "swiper";
import { values } from './noticedata';



const Notice = () => {
    return (

        <>
            <div className="notices">
                <h1>Notice Section</h1>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectCards, Autoplay, Pagination]}
                    className="mySwiper1"
                >

                    {
                        
                        values.map(({icon, title, link },index) => {
                            return (
                                <SwiperSlide className="slide view" key={index}>
                                    {icon}
                                    <h4>{title}</h4>
                                    <span>
                                        <button className="btn"><a href={link}>Link</a></button>
                                    </span>
                                </SwiperSlide>
                            )
                        })

                    }




                </Swiper>
            </div>
        </>
    )
}

export default Notice