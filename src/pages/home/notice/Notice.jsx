import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./notice.css";
import { EffectCards, Autoplay, Pagination } from "swiper";
import { values } from './noticedata';
import { useEffect, useState } from "react";
import { FireStoreCollection } from "../../../Firebase/FireStore/collection";
import { CircularProgress } from "@mui/material";



const Notice = () => {
    const [notices, setNotices] = useState([]);
    useEffect(() => {
      
    
       const fetchNotices = async () => {
            const noticeCollection = new FireStoreCollection("Notice");
            const allNotice = await noticeCollection.getCollectionData();
            const datas = allNotice.map(notice => notice.data());
            setNotices(datas);
      }

      fetchNotices();
    }, [])
    
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
                        Object.is(notices, []) ?
                        <SwiperSlide className="slide view" >
                            <CircularProgress />
                        </SwiperSlide> :
                        notices.map(({heading, link },index) => {
                            return (
                                <SwiperSlide className="slide view" key={index}>
                                    <h4>{heading}</h4>
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