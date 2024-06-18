import React from 'react'
import ProductSlider from '../../component/ProductSlider';

const Orders = () => {
    const images = [
        'https://m.media-amazon.com/images/I/41N0Avct1kL._SY679_.jpg',
        'https://m.media-amazon.com/images/I/61M6p7VahNL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61SDuTH3XkL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61VJpLpweHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51jLrGrPBpL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51EwFkHeO8L._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71xMd0d6xcL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61RofAW9BML._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61hnO6ktjiL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71GKVUMzSCL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/51RYO482znL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71Al63qjPxL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61s1Ro7VONL._SX679_.jpg'
    ];
  return (
    <>
    <section className="py-10">
        <div className="container">
            <div className="w-full">
                <h2 className="sectiontitle">
                    My Orders
                </h2>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
                {
                    [...images].map((img) => (
                        <>
                            <ProductSlider image={img}/>
                        </>
                    ))
                }
            </div>
        </div>
    </section>
    </>
  )
}

export default Orders