import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import banner1 from '../../assets/banner1.webp';
// @ts-ignore
import banner2 from '../../assets/banner2.webp';
// @ts-ignore
import banner3 from '../../assets/banner3.jpg';
const images = [
    {
        image: banner1,
        text: "Best Smart Watch",
        para: "Lorem Ipsum is simply dummy text of the  printing and typesetting industry.",
        btn_text: "SHOP NOW",

    },
    {
        image: banner2,
        text: "Best Smart Watch",
        para: "Lorem Ipsum is simply dummy text of the  printing and typesetting industry.",
        btn_text: "SHOP NOW",

    },
    {
        image: banner3,
        text: "Best Smart Watch",
        para: "Lorem Ipsum is simply dummy text of the  printing and typesetting industry.",
        btn_text: "SHOP NOW",

    }
];


const Banner = () => {
    var settings = {
        dots: false,
        arrows : true,
        navs : true,
        autoplay:true,
        autoplaySpeed: 1000,
        infinite: true,
        speed: 500,
        loop:true,
        
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className='w-full'>
                <Slider {...settings} className="rounded-lg">

                    {
                        images.map((bnnr) => (
                            <div className='rounded-lg px-3  w-full overflow-hidden'>
                                <div className="w-full h-[375px] rounded-lg overflow-hidden " style={{ backgroundImage: `url(${bnnr.image})` }}>
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <h1 className='text-white text-[3.2rem] font-bold pt-20 pl-10'>Best Smart Watch</h1>
                                            <p className='text-white text-[1.2rem] pl-10'>Lorem Ipsum is simply dummy text of the  printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }



                </Slider>
            </div>
        </>
    )
}

export default Banner