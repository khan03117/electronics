import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { base_url, base_url_img } from '../../utils';


const Banner = () => {
    interface Banner {
        image: string;
        _id: string;
        heading?: string;
        text?: string;
    }
    const [banner, setData] = React.useState<Banner[]>([]);
    const getcategories = async () => {
        await axios.get(base_url + 'banner').then(resp => {
            setData(resp.data.data)
        })
    }
    React.useEffect(() => {
        getcategories();
    }, [])
    var settings = {
        dots: true,
        arrows: false,
        navs: true,
        customPaging: (index: number) => (
            <span className='inline-block border border-blue-gray-100 bannerdot size-2 bg-gray-100 rounded-full  '></span>
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
            <div className='w-full' id='banner'>
                <Slider {...settings} className="" >
                    {
                        banner.map((bnnr) => (
                            <div className='lg:rounded-lg rounded-none lg:px-3 p-0  w-full '>
                                <div className="w-full max-h-[375px] relative lg:rounded-lg rounded-none overflow-hidden ">
                                    <img src={base_url_img + bnnr.image} alt="" className="w-full h-full" />
                                    <div className="absolute top-[50%] translate-y-[-50%] start-5 z-10 lg:w-1/2 w-3/4 ">
                                        {
                                            bnnr?.heading && (
                                                <>
                                                    <div className="w-full">
                                                        <h1 className='text-white lg:text-[3.2rem] text-3xl lg:mb-10 mb-6 font-bold '>
                                                            {bnnr?.heading}
                                                        </h1>
                                                        <p className='text-white lg:text-[1.2rem] text-sm tracking-widest '>
                                                            {bnnr?.text}
                                                        </p>
                                                    </div>
                                                </>
                                            )
                                        }


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