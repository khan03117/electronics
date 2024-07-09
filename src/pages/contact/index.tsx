import { FacebookFilled, InstagramFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import React from "react"
import { Link } from "react-router-dom"

const Contact = () => {
    return (
        <>
            <section id='shopbanner' className='lg:py-20 py-5'>
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-1">
                        <div className="col-span-1">
                            <div className="w-full text-center">
                                <h1 className='text-white lg:text-[2rem] text-lg'>Contact Us</h1>
                                <p className='text-sm text-white'>Home / contact us</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contactinfo">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 contactdata gap-5">
                        <div className="col-span-1">
                            <div className="w-full">
                                <h3 className="sectiontitle text-md font-light tracking-wider relative pt-[5rem]">CONTACT INFORMATION</h3>
                                <p className="lg:text-[1rem] pt-[2rem] leading-[1.9]">Tower Number -2 , Shree Kuberji Park -2 , Near Torrent Power Office,Cinema Road -Dehli Gate - Surat GUJARAT INDIA PINCODE - 395003 </p>
                                <div className="w-full my-3">
                                    <h3 className='lg:text-[2rem] inline border-b border-orange-700 pb-3 text-md font-light tracking-wider pt-[2rem]'>help@example.com</h3>
                                </div>
                                <p className='lg:text-[1.2rem] text-md pt-[2rem]'>Follow us</p>
                                <div className="w-full">
                                    <div className="flex gap-2 *:block *:size-12 *:border *:rounded-full *:text-orange-700 *:leading-[2] *:text-[1.5rem] *:border-orange-700 *:text-center items-center">
                                        <Link to={"/"}>
                                            <FacebookFilled />
                                        </Link>
                                        <Link to={"/"}>
                                            <TwitterOutlined />
                                        </Link>
                                        <Link to={"/"}>
                                            <InstagramFilled />
                                        </Link>
                                        <Link to={"/"}>
                                            <YoutubeFilled />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14001.008113444817!2d77.43627865432133!3d28.682106610199725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1a287cc654f%3A0x97c8c4524fe600ca!2sRaj%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1718098449046!5m2!1sen!2sin"
                                    className="w-full h-[600px] max-h-[800px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contactdata">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 contactformdata">
                        <div className="col-span-3 mb-4">
                            <div className="text-center">
                                <h1 className="text-[2rem]  inline border-b border-orange-900">Contact Form</h1>
                            </div>

                        </div>
                        <div className="lg:col-span-1 col-span-3">
                            <div className="w-full">
                                <label htmlFor="">Enter Name :</label>
                                <input type="text" name="" id="" placeholder="Enter your name" className="w-full outline-none p-3  border border-blue-gray-200" />
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-3">
                            <div className="w-full">
                                <label htmlFor="">Email :</label>
                                <input type="text" name="" id="" placeholder="Enter email id" className="w-full outline-none p-3 border border-blue-gray-200" />
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-3">
                            <div className="w-full">
                                <label htmlFor="">Mobile no :</label>
                                <input type="text" name="" id="" placeholder="Enter mobile no" className="w-full outline-none p-3 border border-blue-gray-200" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="w-full">
                                <label htmlFor="">Your Message :</label>
                                <textarea name="message" rows={6} placeholder="Enter your message" className="w-full outline-none p-3 border border-blue-gray-200" />
                            </div>
                        </div>
                        <div className="col-span-3 mb-5">
                            <button className="bg-black px-5 py-3 text-white rounded-0">Send Message</button>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Contact