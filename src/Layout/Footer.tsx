import { FacebookFilled, HeartOutlined, HomeFilled, HomeOutlined, InstagramFilled, PhoneFilled, RedEnvelopeFilled, ShopOutlined, ShoppingCartOutlined, TwitterSquareFilled, WhatsAppOutlined } from '@ant-design/icons'
//@ts-ignore
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import React from 'react'
const Footer = () => {
  return (
    <>
      <section className="fixed fixednavbar w-full pe-5  bg-gray-200 *:relative *:text-sm *:text-center shadow-lg rounded-t-3xl shadow-blue-gray-300 z-50 bottom-0 start-0 lg:hidden flex py-2 pt-5 *:mt-1 px-4 justify-between">
        <Link to={'/'}>
          <p>
            <HomeOutlined />
          </p>
          <p>Home</p>

        </Link>
        <Link to={'/shop'}>
          <p>
            <ShopOutlined />
          </p>
          <p>Shop</p>

        </Link>
        <Link to={'/wishlist'}>
          <div className="absolute size-5 rounded-full bg-primary text-white text-xs -end-0 -top-3">1</div>
          <p>
            <HeartOutlined />
          </p>

          <p>Wishlist</p>

        </Link>
        <Link to={'/cart'}>
          <div className="absolute size-5 rounded-full bg-primary text-white text-xs -end-1 -top-3">1</div>

          <p>
            <ShoppingCartOutlined />
          </p>
          <p>Cart</p>

        </Link>
      </section>
      <section className="footersection py-20 bg-indigo-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            <div className="col-span-1">
              <figure className="w-full mb-5">
                <img src={logo} alt="" className="max-w-full invert" />
              </figure>
              <ul className='*:py-2 *:text-sm'>
                <li>
                  <div className="flex items-start gap-2">
                    <HomeFilled />
                    <p className='text-sm font-light tracking-widest'>
                      <strong className='text-md font-bold'>
                        Address :
                      </strong>
                      Frantic Infotech Private Limited. Near Torrent Power Office,Cinema Road , Dehli Gate - Noida - 201301
                    </p>
                  </div>

                </li>
                <li><p className='text-sm font-light tracking-widest'>
                  <strong className='text-md font-bold'>
                    <RedEnvelopeFilled />  Email :
                  </strong>
                  krishnaboutique2023@gmail.com
                </p>


                </li>
                <li>
                  <p className='text-sm font-light tracking-widest'>
                    <strong className='text-md font-bold'>
                      <PhoneFilled />   Mobile :
                    </strong>
                    +91-8866030337
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <div className="w-full">
                <h4 className="mb-4">
                  Main Menu
                </h4>
                <ul className='*:py-2 *:text-sm'>
                  <li>
                    <Link to={'/about-us'}>About Us</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>New Arrivals</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Sale</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Store Location</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Reviews</Link>
                  </li>

                </ul>
              </div>
            </div>
            <div className="col-span-1">
              <div className="w-full">
                <h4 className="mb-4">
                  QUICK LINKS
                </h4>
                <ul className='*:py-2 *:text-sm'>
                  <li>
                    <Link to={'/about-us'}>Terms & Condition</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Shipping & Delivery</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Refund and Cancellation</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Privacy Policies</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Privacy Policies</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>FAQs</Link>
                  </li>
                  <li>
                    <Link to={'/about-us'}>Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-1">
              <h4 className="mb-">Follow Us</h4>
              <div className="flex">
                <input type="text" name="" id="" className="w-full outline-none px-4 py-2 border border-blue-gray-200" />
                <button className="bg-blue-gray-700 px-4 py-2 text-sm text-white">Subscribe</button>
              </div>
              <div className="flex *:size-10 *:text-lg *:text-center *:leading-10 *:rounded-full gap-3  mt-10">
                <Link className='bg-blue-800 text-white' to={'/'}>
                  <FacebookFilled />
                </Link>
                <Link className='bg-blue-500 text-white' to={'/'}>
                  <TwitterSquareFilled />
                </Link>
                <Link className='bg-pink-400 text-white' to={'/'}>
                  <InstagramFilled />
                </Link>
                <Link className='bg-green-800 text-white' to={'/'}>
                  <WhatsAppOutlined />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="w-full">
          <div className="w-full text-white p-3 text-center text-xs">
            <p>Copyright {new Date().getFullYear()}, All Rights Reserved  <Link className='text-white/80 underline' to={'/'}>Krishna Botique</Link> </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer