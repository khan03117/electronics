import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../component/Arrows";
import React from "react";
import Testimonialbox from "../../component/Testimonialbox";
const Testimonials = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow className={'btn'} />, // Use custom next arrow
        prevArrow: <PrevArrow className={'btn'} /> ,
        responsive: [
            {
                breakpoint: 1024,  // Example breakpoint for tablets
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 600,  // Example breakpoint for mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,  // Example breakpoint for smaller devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>

            <Slider {...settings}>
                <div className='p-4'>
                    <Testimonialbox name={'John doe'} post={'Ghaziabad UP'} image={'https://foesta-demo.myshopify.com/cdn/shop/files/testimonial-3.png?v=1711252165'} description={'"I absolutely love shopping here! The selection is fantastic, the prices are competitive, Highly recommend."'} subject={'Product Quality'} />
                </div>
                <div className='p-4'>
                    <Testimonialbox name={'Abhmram James'} post={'Kerala'} image={'https://foesta-demo.myshopify.com/cdn/shop/files/testimonial-3.png?v=1711252165'} description={'"I absolutely love shopping here! The selection is fantastic, the prices are competitive, Highly recommend."'} subject={'Product Delivery'} />
                </div>
                <div className='p-4'>
                    <Testimonialbox name={'Shkte James'} post={'Andhara Pradesh'} image={'https://foesta-demo.myshopify.com/cdn/shop/files/testimonial-3.png?v=1711252165'} description={'"I absolutely love shopping here! The selection is fantastic, the prices are competitive, Highly recommend."'} subject={'Product Price'} />
                </div>
            </Slider>
        </>
    )
}

export default Testimonials