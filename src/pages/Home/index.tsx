import React from 'react'
import Categories from './Categories'
import Banner from './Banner'
import CategoriesSlider from './CategoriesSlider'
import SliderComponent from '../../component/SliderComponent'
import Testimonials from './Testimonials'
import { RightOutlined } from '@ant-design/icons'

const Home = () => {
  return (
    <>
      <section className='pb-5'>
        <div className="container lg:p-2 p-0">
          <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-3 gap-0">
            <div className="col-span-2 lg:block hidden">
              <Categories />
            </div>
            <div className="lg:col-span-10  col-span-12">
              <Banner />
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="w-full">
            <div className="w-full  mb-3 sectiontitle_parent">
              <h2 className="sectiontitle">Shop By Category</h2>
            </div>
          </div>
        </div>
        <CategoriesSlider />
      </section>

      {
        ['Screen Guards', 'Mobile Covers', 'Accessories', 'Gadgets'].map((itm) => (
          <>
            <section className="md:py-10 py-3">
              <div className="container">
                <div className="w-full   sectiontitle_parent">
                  <h2 className="sectiontitle">{itm}</h2>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <h4 className="md:text-xl text-sm text-primary font-bold">Start from just 99.99 only</h4>
                  <button type='button' className="  md:px-5 px-2 text-xs uppercase font-bold  py-2  text-primary">
                    View All
                    <RightOutlined className='md:ms-3 ms-1' />
                  </button>
                </div>
                <div className="w-full">
                  <SliderComponent />
                </div>
              </div>
            </section>
          </>
        ))
      }
      <section className="md:py-10 py-1">
        <div className="container">
          <div className="w-full  mb-3 sectiontitle_parent">
            <h2 className="sectiontitle">Shop By Brand</h2>
          </div>
          <div className="w-full">
            <Banner />
          </div>
        </div>
      </section>
      {
        ['Recently Viewed'].map((itm) => (
          <>
            <section className="md:py-10 py-3">
              <div className="container">
                <div className="w-full  mb-3 sectiontitle_parent">
                  <h2 className="sectiontitle">{itm}</h2>
                </div>

                <div className="w-full">
                  <SliderComponent />
                </div>
              </div>
            </section>
          </>
        ))
      }
      <section className="md:py-10 py-3">
        <div className="container">
          <div className="w-full  mb-3 sectiontitle_parent">
            <h2 className="sectiontitle">What our clients says</h2>
          </div>
          <div className="w-full">
            <Testimonials />
          </div>
        </div>
      </section>






    </>
  )
}

export default Home