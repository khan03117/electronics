import React from 'react'
//@ts-ignore
import about from '../../assets/about.png'
//@ts-ignore
import boximg from '../../assets/box.png'
//@ts-ignore
import delivery from '../../assets/delivery.png'
//@ts-ignore
import smily from '../../assets/smiley.png'
//@ts-ignore
import quality from '../../assets/quality.png'
import Testimonials from '../Home/Testimonials'
const About = () => {
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="grid lg:grid-cols-2 col-span-1 gap-4">
                        <div className="col-span-1">
                            <div className="w-full">
                                <img src={about} className='max-w-full rounded-lg shaodw-md shadow-primary' alt="" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <div className="w-full   sectiontitle_parent">
                                    <h2 className="sectiontitle">About Us</h2>
                                </div>
                                <div className="w-full *:text-md *:mb-4 *:text-justify">
                                    <p>
                                        Welcome to The Collection, your trusted partner in the world of mobile accessories for businesses. At The Collection, we understand the dynamic and fast-paced nature of the mobile industry. Our mission is to provide high-quality mobile accessories to businesses, ensuring that they have the tools they need to succeed in this ever-evolving market.
                                    </p>
                                    <p>
                                        We take pride in delivering top-notch mobile accessories that meet the highest standards of quality and durability. Our team of experts carefully curates a wide range of products, from protective cases and screen protectors to chargers and audio accessories, all designed to enhance the mobile experience for your customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-4  grid-cols-2 gap-0  *:border *:border-blue-gray-100 *:px-4 *:py-10">
                        <div className="col-span-1">
                            <div className="w-full">
                                <div className="lg:flex block">
                                    <div className="lg:size-12">
                                        <img src={delivery} alt=""
                                            className="lg:size-12 size-10 mx-auto" />
                                    </div>
                                    <div className="lg:w-[calc(100%-6rem)] w-full lg:ps-4 lg:text-start text-center ">
                                        <h4 className="lg:text-2xl text-md font-bold">All india shipping</h4>
                                        <p className="text-gray-700 font-light lg:text-sm text-xs">Fast shipping all india</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <div className="lg:flex block">
                                    <div className="lg:size-12">
                                        <img src={quality} alt=""
                                            className="lg:size-12 size-10 mx-auto" />
                                    </div>
                                    <div className="lg:w-[calc(100%-6rem)] w-full lg:ps-4 lg:text-start text-center ">
                                        <h4 className="lg:text-2xl text-md font-bold">Quality</h4>
                                        <p className="text-gray-700 font-light lg:text-sm text-xs">Excellent quality of products </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <div className="lg:flex block">
                                    <div className="lg:size-12">
                                        <img src={smily} alt=""
                                            className="lg:size-12 size-10 mx-auto" />
                                    </div>
                                    <div className="lg:w-[calc(100%-6rem)] w-full lg:ps-4 lg:text-start text-center ">
                                        <h4 className="lg:text-2xl text-md font-bold">Happy clients</h4>
                                        <p className="text-gray-700 font-light lg:text-sm text-xs">1000+ Happy Clients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <div className="lg:flex block">
                                    <div className="lg:size-12">
                                        <img src={boximg} alt=""
                                            className="lg:size-12 size-10 mx-auto" />
                                    </div>
                                    <div className="lg:w-[calc(100%-6rem)] w-full lg:ps-4 lg:text-start text-center ">
                                        <h4 className="lg:text-2xl text-md font-bold">Products</h4>
                                        <p className="text-gray-700 font-light lg:text-sm text-xs">Vast collection of products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10 bg-blue-gray-100">
                <div className="container">
                    <div className="w-full   sectiontitle_parent">
                        <h2 className="sectiontitle">What our client says</h2>
                    </div>
                    <Testimonials />
                </div>
            </section>
        </>
    )
}

export default About
