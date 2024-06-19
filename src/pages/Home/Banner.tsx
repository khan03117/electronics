import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// @ts-ignore
import banner2 from '../../assets/banner2.webp';
// @ts-ignore
import banner3 from '../../assets/banner3.jpg';
const images = [
    {
        image: 'https://www.shutterstock.com/image-illustration/smart-watch-red-strap-over-260nw-1476559310.jpg',
        text: "Best Smart Watch",
        para: "Lorem Ipsum is simply dummy text of the  printing and typesetting industry.",
        btn_text: "SHOP NOW",

    },
    {
        image: 'https://www.shutterstock.com/image-photo/white-wireless-headphones-on-red-260nw-2122728104.jpg',
        text: "Best Smart Watch",
        para: "Lorem Ipsum is simply dummy text of the  printing and typesetting industry.",
        btn_text: "SHOP NOW",

    },
    {
        image: 'https://media.wired.com/photos/5f2b2e792f0075bf6e0a1de6/2:1/w_2399,h_1199,c_limit/Gear-Sony-WH-1000XM4-1-SOURCE-Sony.jpg',
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
        dots: true,


        arrows: false,
        navs: true,
        customPaging: (index: number) => (
            <span className='inline-block border border-blue-gray-600 bannerdot size-4 bg-blue-gray-300 rounded-full  '></span>
        ),
        // autoplay: true,
        // autoplaySpeed: 1000,
        infinite: true,
        speed: 500,
        loop: true,

        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className='w-full'>
                <Slider {...settings} className="" >
                    {
                        images.map((bnnr) => (
                            <div className='lg:rounded-lg rounded-none lg:px-3 p-0  w-full '>
                                <div className="w-full max-h-[375px] relative lg:rounded-lg rounded-none overflow-hidden ">
                                    <img src={bnnr.image} alt="" className="w-full h-full" />
                                    <div className="absolute top-[50%] translate-y-[-50%] start-5 z-10 lg:w-1/2 w-3/4 ">

                                        <div className="w-full">
                                            <h1 className='text-white lg:text-[3.2rem] text-3xl lg:mb-10 mb-6 font-bold '>Best Smart Watch</h1>
                                            <p className='text-white lg:text-[1.2rem] text-sm tracking-widest '>Lorem Ipsum is simply dummy text of the  printing and typesetting industry.</p>
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