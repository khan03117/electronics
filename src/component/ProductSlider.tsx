import { EyeOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import React from 'react'
interface Prop {
  image: string
}
const ProductSlider = (props: Prop) => {
  return (
    <>
      <div className="w-full productbox relative pt-5 shadow-lg shadow-blue-gray-800  rounded-xl ">
        <div className="absolute shopincon z-10 *:size-10 *:shadow-md *:shadow-blue-gray-400 *:bg-white *:text-center *:rounded-full *:leading-10 flex w-10 flex-col gap-5 top-20 end-3">
          <a className='quicklink'>
            <HeartOutlined />
          </a>
          <a className='quicklink'>
            <ShoppingOutlined />
          </a>
          <a className='quicklink'>
            <EyeOutlined />
          </a>
        </div>
        <figure className="w-full">
          <img src={props.image} alt="" className="w-full h-48 object-contain" />
        </figure>
        <div className="w-full px-5 py-4 text-center">
          <h4 className="lg:text-[1.6rem] text-lg mb-4 font-bold">Wireless Buds</h4>

          <p className="text-primary text-lg mb-5  productPrice">
            <span className="text-gray-600 me-3 text-sm line-through">₹ 599.99</span>  <span>₹ 399.99</span>
          </p>
          <div className="w-full mb-5 text-center flex items-center justify-center">
            <button className="px-4 py-2 uppercase text-xs tracking-widest font-light rounded-full bg-primary text-white shadow-sm shadow-deep-orange-600">Add to Cart</button>
          </div>
          <div className="w-full text-center px-5 mt-5">
            <p className='inline-flex px-2 border border-blue-gray-200 rounded-2xl justify-center  text-sm items-center gap-2'>
              <span className="inline-block size-4 rounded-full bg-green-400 border border-blue-gray-200"></span>
              <span className="text-sm font-light">
                6 Stock availble
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSlider