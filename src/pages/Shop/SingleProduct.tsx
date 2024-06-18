import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import { Collapse } from '@material-tailwind/react';
import React from 'react';



const SingleProduct = () => {
    const images = [
        'https://m.media-amazon.com/images/I/41N0Avct1kL._SY679_.jpg',
        'https://m.media-amazon.com/images/I/61M6p7VahNL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61SDuTH3XkL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61VJpLpweHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51jLrGrPBpL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51EwFkHeO8L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71xMd0d6xcL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61RofAW9BML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61hnO6ktjiL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71GKVUMzSCL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51RYO482znL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71Al63qjPxL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61s1Ro7VONL._SX679_.jpg'
    ];
    const sliderForRef = useRef(null);
    const sliderNavRef = useRef(null);
    const [qty, setQty] = useState(1);
    const settingsFor = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        navs: false,
        fade: true,
        asNavFor: sliderNavRef.current ?? undefined
    };

    const settingsNav = {
        vertical: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: sliderForRef.current ?? undefined,
        dots: false,
        arrows: false,
        navs: false,
        infinite: true,
        loop: true,
        centerMode: true,
        focusOnSelect: true
    };
    const handleqty = (action: string) => {
        if (action == 'minus') {
            if (qty > 1) {
                setQty(qty - 1);
            }
        }
        if (action == "plus") {
            setQty(qty + 1);
        }
    }
    const addtocart = () => {
        // add to cart logic here
    }
    return (
        <>
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-8 grid-cols-1 gap-0">
                        <div className="col-span-5">
                            <div className="w-full">
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="col-span-1">

                                        <Slider ref={sliderNavRef} {...settingsNav} className='slider-nav'>
                                            {
                                                images.map((itm) => (
                                                    <>
                                                        <figure className="size-24 my-2 border border-blue-gray-200 shadow-lg shadow-gray-900">
                                                            <img src={itm} alt="" className="w-full h-full object-cover" />
                                                        </figure>
                                                    </>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                    <div className="col-span-4">
                                        <Slider ref={sliderForRef} {...settingsFor} className='slider-for'>
                                            {
                                                images.map((itm) => (
                                                    <>
                                                        <figure className="w-full border border-blue-gray-200 shadow-lg rounded-2xl overflow-hidden shadow-blue-gray-800">
                                                            <img src={itm} alt="" className="w-full h-[500px] object-contain" />
                                                        </figure>
                                                    </>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="w-full">
                                <h1 className="productname lg:text-[2rem] font-bold text-[18px] mb-4">Redmi 12 Pro Mobile Cover</h1>
                                <div className="pricebox">

                                    <span className="text-red-600 price">
                                        ₹ 299.99
                                    </span>
                                    <span className="oldprice ms-1 strike">  ₹{399.99}</span>

                                </div>
                                <div className="w-full pb-4 border-b border-blue-gray-200">
                                    <span className="text-xs text-blue-gray-500 block">Inclusive of all taxes</span>
                                    <div className="flex text-orange-500 items-center">
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled /> (42)
                                    </div>
                                </div>
                                <div className="w-full grid grid-cols-2 my-4">
                                    <div className="col-span-1">
                                        Color : <span className="inline-block size-7 rounded-full bg-primary"></span>
                                    </div>
                                </div>
                                <div className="w-full my-4">
                                    <div className="inline-flex">
                                        <button onClick={() => handleqty('minus')} className="size-12  border border-blue-gray-600">
                                            <MinusOutlined />
                                        </button>
                                        <input type="text" value={qty} readOnly name="" id="" className="size-12 text-center leading-12 border-t border-b border-blue-gray-600" />
                                        <button onClick={() => handleqty('plus')} className="size-12 border border-blue-gray-600">
                                            <PlusOutlined />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full mb-4">
                                    <div className="flex flex-wrap gap-3">
                                        {
                                            images.map(varient => (
                                                <>
                                                    <Link to={'/shop'} className="size-24 inline-block border border-blue-gray-200 overflow-hidden rounded-lg">
                                                        <img src={varient} alt="" className="w-full h-full object-cover" />
                                                    </Link>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="w-full my-4">
                                    <button onClick={addtocart} className="w-full uppercase shadow-md shadow-deep-orange-700  font-extralight mb-4 text-md px-4 py-3 rounded-sm text-white bg-orange-700 ">Add to cart</button>
                                    <button className="w-full uppercase shadow-md shadow-blue-gray-700  font-extralight text-md px-4 py-3 rounded-sm text-white bg-blue-gray-900 ">Buy it now</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct