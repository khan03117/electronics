import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//@ts-ignore
import categoryimg from '../../assets/application.png'
//@ts-ignore
import offerimg from '../../assets/gift.png';
//@ts-ignore
import brandimg from '../../assets/brand-image.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../component/Arrows";
import { base_url, base_url_img } from '../../utils'
import axios from 'axios'
import MobileSidebar from '../../Layout/MobileSidebar'



const CategoriesSlider = () => {
    const [open, setOpen] = useState(false);
    const handleCategory = () => {
        setOpen(!open);
    }
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
        slidesToShow: 8,
        slidesToScroll: 2,
        cssEase: 'linear',
        swipeToSlide: true,
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
                    cssEase: 'linear',
                    swipeToSlide: true,
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

            <MobileSidebar open={open} setOpen={setOpen} />

            <div className="w-full">
                <Slider {...settings}>
                    <div className=' block'>
                        <div onClick={handleCategory} className="w-full text-center lg:p-10 p-0">
                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                <img src={categoryimg} alt="" className="max-w-full mx-auto" />
                            </figure>
                            <div className="w-full">
                                <h2 className='text-black font-bold  lg:text-md text-xs'>Categories</h2>
                            </div>
                        </div>
                    </div>
                    <Link to={'/offers'} className=' block'>
                        <div className="w-full text-center lg:p-10 p-0">
                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                <img src={offerimg} alt="" className="max-w-full mx-auto" />
                            </figure>
                            <div className="w-full">
                                <h2 className='text-black font-bold  lg:text-md text-xs'>Offer zone</h2>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/brands'} className=' block'>
                        <div className="w-full text-center lg:p-10 p-0">
                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                <img src={brandimg} alt="" className="max-w-full mx-auto" />
                            </figure>
                            <div className="w-full">
                                <h2 className='text-black font-bold  lg:text-md text-xs'>Brands</h2>
                            </div>
                        </div>
                    </Link>
                    {
                        category.map((crr) => (
                            <Link to={'/shop/category/' + crr.url} className="block">
                                <div className="w-full text-center lg:p-10 p-0">
                                    <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                        <img src={base_url_img + crr.image} alt='image' className='  object-contain' />
                                    </figure>
                                    <div className="w-full">
                                        <h2 className='text-black font-bold  lg:text-md text-xs'>{crr.title}</h2>

                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Slider>
            </div>



        </>
    )
}

export default CategoriesSlider
