import { EyeOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
interface Prop {
  image: string
}
const ProductSlider = (props: Prop) => {
  return (
    <>
      <Link to={'/single-product'} className="w-full block productbox relative lg:pt-5  lg:shadow-lg shadow-md border border-primary/20 pt-4 shadow-blue-gray-800  rounded-xl ">
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
          <img src={props.image} alt="" className="w-full lg:h-48 h-20 object-contain" />
        </figure>
        <div className="w-full px-5 py-4 text-center">
          <h4 className="md:text-[1.2rem] text-md md:mb-4 mb-1 font-bold truncate">Wireless Buds LeadFold - Lead Generation HTML Landing Page Template</h4>

          <p className="text-primary lg:text-lg text-sm md:mb-5 mb-2  productPrice">
            <span className="text-gray-600 me-3 lg:text-sm text-xs line-through">₹ 599.99</span>  <span >₹ 399.99</span>
          </p>
          <div className="w-full md:mb-5 mb-0 text-center flex items-center justify-center">
            <button type='button' className="md:px-4 md:py-2 px-2 py-1 uppercase text-xs tracking-widest font-light rounded-full bg-primary text-white shadow-sm shadow-deep-orange-600">Add to Cart</button>
          </div>
          <div className="w-full lg:block hidden text-center md:px-5 px-1 mt-5">
            <p className='inline-flex px-2 border border-blue-gray-200 rounded-full justify-center  text-sm items-center gap-2'>
              <span className="inline-block md:size-4 size-2 rounded-full bg-green-400 border border-blue-gray-200"></span>
              <span className="md:text-sm text-xs md:font-light text-nowrap ">
                6 Stock availble
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductSlider