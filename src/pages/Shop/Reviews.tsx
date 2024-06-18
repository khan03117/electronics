import React from 'react'
import Testimonialbox from '../../component/Testimonialbox'

const Reviews = () => {
    return (
        <>
            <div className="w-full">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
                    {
                        [...Array(10)].map(() => (
                            <>
                                <div className="col-span-1">
                                    <Testimonialbox name={'John doe'} post={'Ghaziabad UP'} image={'https://foesta-demo.myshopify.com/cdn/shop/files/testimonial-3.png?v=1711252165'} description={'"I absolutely love shopping here! The selection is fantastic, the prices are competitive, Highly recommend."'} subject={'Product Quality'} />

                                </div>
                            </>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default Reviews