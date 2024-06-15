import React from 'react'
import Categories from './Categories'
import Banner from './Banner'
import CategoriesSlider from './CategoriesSlider'

const Home = () => {
  return (
    <>
      <section className='pb-5'>
        <div className="container">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-2">
              <Categories />
            </div>
            <div className="col-span-10">
              <Banner />
            </div>
          </div>
        </div>
      </section>

      <CategoriesSlider />

    </>
  )
}

export default Home