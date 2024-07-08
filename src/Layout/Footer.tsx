import { FacebookFilled, HeartOutlined, HomeFilled, HomeOutlined, InstagramFilled, PhoneFilled, RedEnvelopeFilled, ShopOutlined, ShoppingCartOutlined, TwitterSquareFilled, WhatsAppOutlined } from '@ant-design/icons'
//@ts-ignore
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
import { base_url } from '../utils'

const Footer = () => {
  interface Policy {
    title: string;
    _id: string;
    description: string;
    url: string;
  }
  interface Media {
    title: string;
    type: string;
    media_value: string;
  }
  const [policies, setPolicies] = React.useState<Policy[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);

  const getdata = async () => {
    const resp = await axios.get(base_url + 'policy');
    setPolicies(resp.data.data);
  }
  const getdata2 = async () => {
    const resp = await axios.get(base_url + 'social/contact-media');
    setMedias(resp.data.data);
  }
  React.useEffect(() => {
    getdata();
    getdata2();
  }, [])
  return (
    <>
      {/* <div className="fixed inline-block max-w-28 bottom-16 start-2 z-50">
        <Link to={'https://wa.me'} className='text-3xl text-green-900  rounded-full  inline-block'>
          <WhatsAppOutlined />
        </Link>
      </div> */}
      <section className="fixed fixednavbar w-full pe-5  bg-gray-100 *:relative *:text-sm *:text-center  z-50 bottom-0 start-0 lg:hidden block pb-0 pt-0 *:mt-1 px-4 ">

        <div className="flex justify-between *:relative w-full relative">
          <Link to={'/'} className='active'>
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
            <div className="absolute hidden size-5 rounded-full bg-primary text-white text-xs -end-0 -top-3">1</div>
            <p>
              <HeartOutlined />
            </p>

            <p>Wishlist</p>

          </Link>
          <Link to={'/cart'}>
            {/* <div className="absolute size-5 rounded-full bg-primary text-white text-xs -end-1 -top-3">1</div> */}

            <p>
              <ShoppingCartOutlined />
            </p>
            <p>Cart</p>

          </Link>
          <Link to={`https://wa.me/${medias.find(obj => obj.title == "Whatsapp")?.media_value}?text=I'm%20interested%20in%20your%20car%20for%20sale`}>
            <p >
              <WhatsAppOutlined className='text-green-700' />
            </p>
            <p>Contact</p>

          </Link>

        </div>
      </section>
      <section className="footersection lg:py-20 py-5 bg-gray-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2">
            <div className="lg:col-span-1 col-span-2">
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
                      {medias.find(obj => obj.title == "Address")?.media_value}
                    </p>
                  </div>

                </li>
                <li><p className='text-sm font-light tracking-widest'>
                  <strong className='text-md font-bold'>
                    <RedEnvelopeFilled />  Email :
                  </strong>
                  {medias.find(obj => obj.title == "Email")?.media_value}
                </p>


                </li>
                <li>
                  <p className='text-sm font-light tracking-widest'>
                    <strong className='text-md font-bold'>
                      <PhoneFilled />   Mobile :
                    </strong>
                    {medias.find(obj => obj.title == "Mobile")?.media_value}
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
                    <Link to={'/shop'}>New Arrivals</Link>
                  </li>
                  <li>
                    <Link to={'/shop'}>Sale</Link>
                  </li>

                  <li>
                    <Link to={'/testimonials'}>Reviews</Link>
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
                  {
                    policies.map(pol => (
                      <>
                        <li>
                          <Link to={'/policy/' + pol.url}>{pol.title}</Link>
                        </li>
                      </>
                    ))
                  }


                  <li>
                    <Link to={'/contact'}>Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-1 col-span-2">
              <h4 className="mb-">Follow Us</h4>
              <div className="flex">
                <input type="text" name="" id="" className="w-full outline-none px-4 py-2 border border-blue-gray-200" />
                <button className="bg-blue-gray-700 px-4 py-2 text-sm text-white">Subscribe</button>
              </div>
              <div className="flex *:size-10 *:text-lg *:text-center *:leading-10 *:rounded-full gap-3  mt-10">
                {
                  medias.find(obj => obj.title == "Facebook") && (
                    <>
                      <Link className='bg-blue-800 text-white' to={'/'}>
                        <FacebookFilled />
                      </Link>
                    </>
                  )
                }
                {
                  medias.find(obj => obj.title == "Twitter") && (
                    <>
                      <Link className='bg-blue-500 text-white' to={'/'}>
                        <TwitterSquareFilled />
                      </Link>
                    </>
                  )
                }
                {
                  medias.find(obj => obj.title == "Instagram") && (
                    <>
                      <Link className='bg-pink-400 text-white' to={'/'}>
                        <InstagramFilled />
                      </Link>
                    </>
                  )
                }
                {
                  medias.find(obj => obj.title == "Whatsapp") && (
                    <>
                      <Link className='bg-green-800 text-white' to={`https://wa.me/${medias.find(obj => obj.title == "Whatsapp")?.media_value}?text=I'm%20interested%20in%20your%20car%20for%20sale`}>
                        <WhatsAppOutlined />
                      </Link>
                    </>
                  )
                }

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