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
  mrp: number;
  images: string[];
  modals: Modal[];
  description: string;
  is_hidden: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Offer {
  discount_percent: number | undefined,
}
interface Prop {
  product: Product,
  offer: Offer
}


const ProductSlider: React.FC<Prop> = ({ product, offer }) => {
  const image = (product.images && product.images.length > 0) ? product.images[0] : '';
  const offertag = (offer.discount_percent && offer.discount_percent > 0) ? offer.discount_percent : false;
  const discount = (offer.discount_percent && offer.discount_percent > 0) ? offer.discount_percent * 0.01 : 0;
  return (
    <>
      <Link to={'/single-product/' + product.url} className="w-full block productbox overflow-hidden relative lg:shadow-lg shadow-sm border border-primary/20  shadow-blue-gray-500  rounded-xl ">
        {
          offertag && (
            <>
              <div className="inline-block absolute lg:top-0 lg:-start-10 -start-5 w-1/2 text-white text-center -rotate-45 bg-deep-orange-500">
                <span className='lg:me-10 me-2 text-xs'>
                  {offertag} % off
                </span>
              </div>
            </>
          )
        }
        <figure className="w-full lg:h-80 h-52 flex justify-center items-center overflow-hidden">
          <img src={base_url_img + image} alt="" className="h-auto object-contain max-w-full mx-auto" />
        </figure>
        <div className="w-full lg:px-5 px-1 py-4 text-center">
          <h4 className="md:text-[1.2rem] text-md md:mb-4 mb-1 font-bold truncate">{product.title}</h4>

          <p className="text-primary lg:text-lg text-sm md:mb-5 mb-2  productPrice">
            <span className="text-gray-600 me-3 lg:text-sm text-xs line-through">₹ {(product.price * 1.18).toFixed(2)}</span>  <span >₹ {(product.price * (1 - discount)).toFixed(2)}</span>
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