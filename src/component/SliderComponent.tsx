import React from 'react'
import Slider from "react-slick";
import { NextArrow, PrevArrow } from './Arrows';
import ProductSlider from './ProductSlider';

const SliderComponent: React.FC = () => {
    const items = [
        'https://rukminim2.flixcart.com/image/850/1000/ksxjs7k0/cases-covers/bumper-case/a/h/m/viv-y21-jaipurcrafts-original-imag6e6kubtfujdj.jpeg',
        'https://ringke.co.in/cdn/shop/products/71qzKhaghAL._SL1500.jpg',
        'https://stationeryshop.in/wp-content/uploads/2024/01/iphone-back-cover-MagsafePremium.jpg',
        'https://m.media-amazon.com/images/I/51UZY09sM-L._AC_UF1000,1000_QL80_.jpg',
        'https://m.media-amazon.com/images/I/51dm8rwDwDL.jpg',
        'https://dsta-demo.myshopify.com/cdn/shop/files/air_buds1_large.jpg?v=1698265253'
    ];
    const settings = {
        dots: false,
        navs: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <NextArrow className={'btn'} />, // Use custom next arrow
        prevArrow: <PrevArrow className={'btn'} />,  // Use custom prev arrow,
        responsive: [
            {
                breakpoint: 1200, // At or below 1200px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                    navs: true,
                }
            },
            {
                breakpoint: 992, // At or below 992px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                    navs: true,
                }
            },
            {
                breakpoint: 768, // At or below 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    navs: true,
                }
            }
        ]

    };
    return (
        <>
            <Slider {...settings}>
                {
                    [...items].map((itm) => (
                        <>
                        <div className="p-4">
                        <ProductSlider image={itm} />
                        </div>
                           
                        </>
                    ))
                }
            </Slider>


        </>
    )
}

export default SliderComponent