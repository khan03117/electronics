import React from 'react'
import Testimonials from '../Home/Testimonials'

const Testimonial = () => {
    return (
        <>
            <section id='shopbanner' className='lg:py-20 py-5'>
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-1">
                        <div className="col-span-1">
                            <div className="w-full text-center">
                                <h1 className='text-white sectiontitle'>Testimonials</h1>
                                <p className='text-sm text-white'>Home / Testimonials</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="w-full">
                        <Testimonials />
                    </div>
                </div>
            </section>
        </>

    )
}

export default Testimonial
