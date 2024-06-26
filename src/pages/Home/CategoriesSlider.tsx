import React from 'react'
import { Link } from 'react-router-dom'
//@ts-ignore
import mobileimg from '../../assets/mobileimg.png'
//@ts-ignore
import smtv from '../../assets/smart-tv.png'
//@ts-ignore
import comp from '../../assets/computer.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../component/Arrows";
import { base_url, base_url_img } from '../../utils'
import axios from 'axios'



const CategoriesSlider = () => {
    interface Category {
        image: string;
        _id: string;
        url: string;
        title: string;
    }
    const [category, setCategories] = React.useState<Category[]>([]);
    const getcategories = async () => {
        await axios.get(base_url + 'category').then(resp => {
            setCategories(resp.data.data)
        })
    }
    React.useEffect(() => {
        getcategories();
    }, [])
    const settings = {
        dots: false,
        navs: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,

        nextArrow: <NextArrow className={'btn'} />, // Use custom next arrow
        prevArrow: <PrevArrow className={'btn'} />,  // Use custom prev arrow,
        responsive: [
            {
                breakpoint: 1200, // At or below 1200px
                settings: {
                    slidesToShow: 8,
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
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    navs: true,
                }
            },
            {
                breakpoint: 768, // At or below 768px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                    navs: false,
                    arrows: false
                }
            }
        ]

    };

    return (
        <>

            <section className='py-4'>
                <div className="container">
                    <div className="w-full">
                        <Slider {...settings}>
                            {
                                category.map((crr) => (
                                    <div className="">
                                        <div className="w-full text-center lg:p-10 p-0">
                                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                                <img src={base_url_img + crr.image} alt='image' className='  object-contain' />
                                            </figure>
                                            <div className="w-full">
                                                <h2 className='text-black font-bold  lg:text-md text-xs'>{crr.title}</h2>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>

            </section >
        </>
    )
}

export default CategoriesSlider
