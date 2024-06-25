import { EyeOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { base_url_img } from '../utils';
interface Modal {
  brand: string;
  modal: string;
  moq: number;
  stock: number;
  _id: string;
}

interface CategoryDetails {
  _id: string;
  url: string;
  image: string;
  title: string;
  description?: string;
  is_hidden: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Product {
  _id: string;
  url: string;
  category: string;
  product_type: string;
  title: string;
  price: number;
  images: string[];
  modals: Modal[];
  description: string;
  is_hidden: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const ProductSlider: React.FC<{ product: Product }> = ({ product }) => {

  return (
    <>
      <Link to={'/single-product/' + product._id} className="w-full block productbox relative lg:pt-5  lg:shadow-lg shadow-sm border border-primary/20 pt-4 shadow-blue-gray-500  rounded-xl ">
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
          <img src={base_url_img + product.images[0]} alt="" className="w-full lg:h-48 h-20 object-contain" />
        </figure>
        <div className="w-full px-5 py-4 text-center">
          <h4 className="md:text-[1.2rem] text-md md:mb-4 mb-1 font-bold truncate">{product.title}</h4>

          <p className="text-primary lg:text-lg text-sm md:mb-5 mb-2  productPrice">
            <span className="text-gray-600 me-3 lg:text-sm text-xs line-through">₹ {(product.price * 1.8).toFixed(2)}</span>  <span >₹ {product.price.toFixed(2)}</span>
          </p>
          <div className="w-full md:mb-5 mb-0 text-center flex items-center justify-center">
            <button type='button' className="md:px-4 md:py-2 px-2 py-1 uppercase text-xs   rounded-full bg-gray-700/30 text-black ">Add to Cart</button>
          </div>

        </div>
      </Link>
    </>
  )
}

export default ProductSlider