import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import img1 from '../../public/image/pexels-a-darmel-7642041.jpg'
import img2 from '../../public/image/pexels-kindelmedia-7578901.jpg'
import img3 from '../../public/image/pexels-pavel-danilyuk-7937750.jpg'
import img4 from '../../public/image/pexels-pixabay-210617.jpg'
import img5 from '../../public/image/pexels-rdne-8292791.jpg'

const Banner = () => {
    return (
        <div className='sm:px-10'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className=''>
                    <img className=' lg:h-[550px] lg:w-full    object-cover' src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className=' lg:h-[550px] sm:w-full   object-cover' src={img3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className=' lg:h-[550px] sm:w-full   object-cover' src={img4} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className=' lg:h-[550px] sm:w-full   object-cover' src={img5} alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;