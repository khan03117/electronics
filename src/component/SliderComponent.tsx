import React from 'react'
import Slider from "react-slick";
import { NextArrow, PrevArrow } from './Arrows';
import ProductSlider from './ProductSlider';
interface Product {
    _id: string;
    url: string;
    category: string;
    product_type: string;
    title: string;
    price: number;
    mrp: number;
    images: string[];
    modals: {
        brand: string;
        modal: string;
        moq: number;
        stock: number;
        _id: string;
    }[];
    description: string;
    is_hidden: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
const SliderComponent: React.FC<{ products: Product[] }> = ({ products }) => {

    const settings = {
        dots: false,
        navs: true,
        infinite: products.length > 1 ? true : false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow className={'btn'} />, // Use custom next arrow
        prevArrow: <PrevArrow className={'btn'} />,  // Use custom prev arrow,
        responsive: [
            {
                breakpoint: 1200, // At or below 1200px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                
                    dots: false,
                    navs: true,
                    infinite: products.length > 1 ? true : false,
                }
            },
            {
                breakpoint: 992, // At or below 992px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: products.length > 1 ? true : false,
                    dots: false,
                    navs: true,
                }
            },
            {
                breakpoint: 768, // At or below 768px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: products.length > 1 ? true : false,
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
                    [...products].map((itm) => (
                        <>
                            <div className="lg:p-4 p-1">
                                <ProductSlider product={itm} offer={{ discount_percent: 0 }} />
                            </div>

                        </>
                    ))
                }
            </Slider>


        </>
    )
}

export default SliderComponent