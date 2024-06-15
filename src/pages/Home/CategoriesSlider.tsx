import { MobileOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
//@ts-ignore
import mobileimg from '../../assets/mobileimg.png'
//@ts-ignore
import smtv from '../../assets/smart-tv.png'
//@ts-ignore
import comp from '../../assets/computer.png'



const CategoriesSlider = () => {
    const content = [
        {
            title: "MOBILE",
            sub_title: "Best Collection",
            Image: mobileimg
        },
        {
            title: "SMART TV",
            sub_title: "Best Collection",
            Image: smtv
        },
        {
            title: "COMPUTER",
            sub_title: "Best Collection",
            Image: comp
        },
        {
            title: "SMART WATCH",
            sub_title: "Best Collection",
            Image:comp
        },
        {
            title: "MONITOR",
            sub_title: "Best Collection",
            Image:comp
        }
    ]

    return (
        <>

            <section className='p-5'>
                <div className="container">
                    <div className="grid lg:grid-cols-5 gap-4">
                        {
                            content.map((crr) => (
                                <div className="col-span-1">
                                    <div className="w-full bg-[#faf1ff] rounded-[0.5rem] p-10 shadow-lg border border-[#eeeeee]">
                                        <figure className='w-full'>
                                            <img src={crr.Image} alt='image' className='h-[80px]' />
                                        </figure>
                                        <div className="w-full">
                                            <h2 className='text-black font-bold pt-7'>{crr.title}</h2>
                                            <p className='pt-1'>{crr.sub_title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            
        </section >
        </>
    )
}

export default CategoriesSlider
