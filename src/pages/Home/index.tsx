import React from 'react'
import Categories from './Categories'
import Banner from './Banner'
import CategoriesSlider from './CategoriesSlider'
import SliderComponent from '../../component/SliderComponent'
import Testimonials from './Testimonials'

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
      <section className="lg:block hidden">
        <div className="w-full text-center mb-10">
          <h2 className="sectiontitle">Shop By Category</h2>
        </div>
        <CategoriesSlider />
      </section>

      {
        ['Screen Guards', 'Mobile Covers', 'Accessories', 'Gadgets'].map((itm) => (
          <>
            <section className="md:py-10 py-3">
              <div className="container">
                <div className="w-full text-center mb-10">
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
          <div className="w-full text-center mb-10">
            <h2 className="sectiontitle">Shop By Brand</h2>
          </div>
          <div className="w-full">
            <Banner />
          </div>
        </div>
      </section>
      {
        ['Most Viewd', 'Recently Viewed'].map((itm) => (
          <>
            <section className="md:py-10 py-3">
              <div className="container">
                <div className="w-full text-center mb-10">
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
          <div className="w-full text-center mb-10">
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