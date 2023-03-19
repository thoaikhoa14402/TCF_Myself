// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Carousel.module.css";
import "./Carousel.css";

// import required modules
import { Autoplay, Pagination } from "swiper";

import slider_1 from "../../../assets/image/carousel/slider1.png";
import slider_2 from "../../../assets/image/carousel/slider2.png";
import slider_3 from "../../../assets/image/carousel/slider3.png";

const Carousel = () => {
  return (
    <>
      <Swiper
        className={styles.swiper}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide className={styles["swiper-slide"]}>
          <img src={slider_1} alt="Banner 1"></img>
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          <img src={slider_2} alt="Banner 2"></img>
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          <img src={slider_3} alt="Banner 3"></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
