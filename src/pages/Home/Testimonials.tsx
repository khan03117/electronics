import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../component/Arrows";
import React, { useEffect } from "react";
import Testimonialbox from "../../component/Testimonialbox";
import axios from "axios";
import { base_url } from "../../utils";
const Testimonials = () => {
    interface ASK {
        location?: string;
        _id: string;
        name: string;
        subject: string;
        description: string;
        rating: string;
        image: string;
    }
    const [data, setData] = React.useState<ASK[]>([]);
    const getdata = async () => {
        await axios.get(base_url + 'testimonial').then((resp) => {
            setData(resp.data.data);
        })
    }
    useEffect(() => {
        getdata();
    }, [])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow className={'btn'} />, // Use custom next arrow
        prevArrow: <PrevArrow className={'btn'} />,
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
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>

            <Slider {...settings}>
                {
                    data.length > 0 && data.map((tesst) => (
                        <>
                            <div className='p-1'>
                                <Testimonialbox data={tesst} />
                            </div>
                        </>
                    ))
                }

            </Slider>
        </>
    )
}

export default Testimonials