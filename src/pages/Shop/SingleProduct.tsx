import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloseOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import Specification from './Specification';
import Reviews from './Reviews';




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
        // 'https://m.media-amazon.com/images/I/61hnO6ktjiL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71GKVUMzSCL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/51RYO482znL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71Al63qjPxL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61s1Ro7VONL._SX679_.jpg'
    ];
    // const sliderForRef = useRef(null);
    // const sliderNavRef = useRef(null);
    const [qty, setQty] = useState(1);
    const [s_section, setSection] = useState('specifications');
    const [open, setOpen] = useState(false);
    const settingsFor = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        navs: false,
        fade: true,
        // asNavFor: sliderNavRef.current,
        customPaging: (index: number) => (
            <img src={images[index]} alt="" className="w-[50px] h-[50px] object-contain border rounded-lg border-blue-gray-400 shadow-lg shadow-blue-gray-300 inline-block " />
        ),
    };

    // const settingsNav = {
    //     asNavFor: sliderForRef.current,
    //     navs: false,
    //     infinite: true,
    //     focusOnSelect: true,
    //     vertical: true,
    //     responsive: [
    //         {
    //             breakpoint: 1200, // At or below 1200px
    //             settings: {
    //                 vertical: true,
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //                 infinite: false,
    //                 dots: false,
    //                 navs: false,
    //             }
    //         },
    //         {
    //             breakpoint: 992, // At or below 992px
    //             settings: {
    //                 vertical: true,
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 infinite: false,
    //                 dots: false,
    //                 navs: false,
    //             }
    //         },
    //         {
    //             breakpoint: 768, // At or below 768px
    //             settings: {
    //                 slidesToShow: 5,
    //                 slidesToScroll: 1,
    //                 infinite: false,
    //                 dots: false,
    //                 navs: true,
    //                 arrows: true,
    //             }
    //         }
    //     ]
    // };
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
        setOpen(true)
    }
    return (
        <>

            {
                open && (
                    <>
                        <div className="fixed top-0 end-0 w-full backdrop-blur-sm h-full bg-black/30 z-[9999]">
                            <div className="absolute p-4 lg:w-96 w-full h-full end-0 top-0 bg-white">
                                <div className="w-full *:shadow-sm *:shadow-blue-gray-600 *:rounded-md ">
                                    {
                                        [...images].map(cr => (
                                            <>
                                                <div className="w-full mb-4">
                                                    <div className="w-full flex relative ">
                                                        <button title='Close button' type='button' className="size-4 bg-black/50 leading-2   text-white text-xs absolute -top-2 -end-2 rounded-full">
                                                            <CloseOutlined />
                                                        </button>
                                                        <div className="size-16">
                                                            <img src={cr} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="w-[calc(100%-5rem)] p-2">
                                                            <h4 className="text-sm font-semibold">
                                                                Realme Note 4 Cover guard
                                                            </h4>
                                                            <p className='flex justify-between text-xs text-blue-gray-500'>
                                                                <span>
                                                                    Qty :4
                                                                </span>
                                                                <span>
                                                                    ₹ 599.99
                                                                </span>
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }

                                </div>
                                <div className="w-full absolute bottom-0 start-0 bg-gray-200 mt-4 pt-4 pb-3 shadow-lg shadow-blue-gray-500 px-4">
                                    <h4 className="text-lg">Subtotal : ₹ 2999.99</h4>
                                    <div className="flex gap-4">
                                        <Link to={'/checkout'} className="w-full bg-orange-500 text-white py-2 rounded px-3 text-center uppercase tracking-widest text-sm">Checkout</Link>
                                        <button type='button' onClick={() => setOpen(false)} className='w-full bg-blue-gray-900 rounded text-white py-2 uppercase tracking-widest text-sm'>Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <section className="lg:py-10 py-4" id="singleproduct">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-8 grid-cols-1 lg:gap-5 gap-6">
                        <div className="md:col-span-5 col-span-5">
                            <div className="w-full">
                                <div className="grid lg:grid-cols-6 grid-cols-6 gap-6">

                                    <div className="lg:col-span-5 md:order-2 order-1 col-span-6 lg:pb-4 pb-10">
                                        <Slider  {...settingsFor} className='slider-for'>
                                            {
                                                images.map((itm) => (
                                                    <>
                                                        <figure className="w-full border border-blue-gray-200 shadow-lg rounded-2xl overflow-hidden shadow-blue-gray-800">
                                                            <img src={itm} alt="" className="w-full lg:h-[500px] h-[300px] object-contain" />
                                                        </figure>
                                                    </>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-5">
                            <div className="w-full md:mt-0 mt-20">
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
                                        <button type="button" aria-label="Click Me" title='Click Me' onClick={() => handleqty('minus')} className="size-12  border border-blue-gray-600">
                                            <MinusOutlined />
                                        </button>
                                        <input type="text" value={qty} readOnly name="" id="" className="size-12 text-center leading-12 border-t border-b border-blue-gray-600" />
                                        <button type='button' title='Increase button' onClick={() => handleqty('plus')} className="size-12 border border-blue-gray-600">
                                            <PlusOutlined />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full mb-4">
                                    <div className="flex flex-wrap gap-3">
                                        {
                                            images.map(varient => (
                                                <>
                                                    <Link to={'/shop'} className="size-14 shadow-md shadow-blue-gray-600 inline-block border border-blue-gray-200 overflow-hidden rounded-md">
                                                        <img src={varient} alt="" className="w-full h-full object-cover" />
                                                    </Link>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="w-full my-4">
                                    <button type='button' onClick={addtocart} className="w-full uppercase shadow-md shadow-deep-orange-700  font-light mb-4 text-md px-4 py-3 rounded-sm text-white bg-orange-700 ">Add to cart</button>
                                    <button type='button' className="w-full uppercase shadow-md shadow-blue-gray-700  font-light text-md px-4 py-3 rounded-sm text-white bg-blue-gray-900 ">Buy it now</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="flex *:p-2 *:border *:border-blue-gray-400 *:w-[120px] *:text-xs *:font-bold gap-2 items-center">
                        <button type='button' className={`${s_section == 'specifications' ? 'bg-primary text-white' : ''}`} onClick={() => setSection('specifications')}>
                            Specifications
                        </button>
                        <button type='button' className={`${s_section == 'reviews' ? 'bg-primary text-white' : ''}`} onClick={() => setSection('reviews')}>
                            Reviews
                        </button>
                        <button type='button' className={`${s_section == 'similar' ? 'bg-primary text-white' : ''}`} onClick={() => setSection('similar')}>
                            Similar Product
                        </button>
                    </div>
                    <div className="w-full my-5">
                        {
                            s_section == "specifications" && (
                                <>
                                    <Specification />
                                </>
                            )
                        }
                        {
                            s_section == "reviews" && (
                                <>
                                    <Reviews />
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct