import React, { useEffect } from 'react'
import Categories from './Categories'
import Banner from './Banner'
import CategoriesSlider from './CategoriesSlider'
import SliderComponent from '../../component/SliderComponent'
import Testimonials from './Testimonials'
// import { RightOutlined } from '@ant-design/icons'
import SectionDevider from '../../component/SectionDevider'
import { useState } from 'react';
import axios from 'axios'
import { base_url } from '../../utils'
import ViewAll from './ViewAll'

const Home = () => {
  interface Product {
    _id: string;
    url: string;
    category: string;
    categoryDetails: {
      _id: string;
      url: string;
      title: string;
    };
    product_type: string;
    title: string;
    price: number;
    images: string[];
    modals: {
      brand: string;
      modal: string;
      moq: number;
      stock: number;
      _id: string;
    }[];
    description: string;
    is_hidden: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface CategoryWithProducts {
    category: {
      _id: string;
      title: string;
      url: string;
      products: Product[];
    };
  }
  const [catproducts, setProduct] = useState<CategoryWithProducts[]>([]);
  const [rproducts, setRecommended] = useState<Product[]>([]);
  const getproducts = async () => {
    await axios.get(base_url + 'product/shop').then((resp) => {
      setProduct(resp.data.data)
    })
  }
  const recommended = async () => {
    await axios.get(base_url + 'product/recommended').then((resp) => {
      setRecommended(resp.data.data)
    })
  }
  useEffect(() => {
    recommended();
    getproducts();
  }, [])
  return (
    <>
      <section className='lg:pb-5 pb-0'>
        <div className="container lg:p-2 p-0">
          <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-3 gap-0">
            <div className="col-span-2 lg:block hidden">
              <Categories />
            </div>
            <div className="lg:col-span-10  col-span-12">
              <Banner type='Banner' />
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container">
          <div className="w-full lg:block hidden">
            <div className="w-full  mb-3 sectiontitle_parent">
              <h2 className="sectiontitle">Shop By Category</h2>
            </div>
          </div>
        </div>
        <CategoriesSlider />
      </section>
      <SectionDevider />
      {
        catproducts.map((itm) => (
          <>
            <section className="md:py-10 py-3">
              <div className="container">
                <div className="w-full   sectiontitle_parent">
                  <h2 className="sectiontitle">{itm.category.title}</h2>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <h4 className="md:text-xl text-sm text-primary font-bold">Start from just 99.99 only</h4>
                  <ViewAll url={itm.category.products[0].categoryDetails.url} />
                </div>
                <div className="w-full">
                  <SliderComponent products={itm.category.products} />
                </div>
              </div>
            </section>
            <SectionDevider />
          </>
        ))
      }
      <section className="md:py-10 py-1">
        <div className="container">
          <div className="w-full  mb-3 sectiontitle_parent">
            <h2 className="sectiontitle">Shop By Brand</h2>
          </div>
          <div className="w-full">
            <Banner type='CTA' />
          </div>
        </div>
      </section>
      <SectionDevider />
      {
        ['Recently Viewed'].map((itm) => (
          <>
            <section className="md:py-10 py-3">
              <div className="container">
                <div className="w-full  mb-3 sectiontitle_parent">
                  <h2 className="sectiontitle">{itm}</h2>
                </div>

                <div className="w-full">
                  <SliderComponent products={rproducts} />
                </div>
              </div>
            </section>
          </>
        ))
      }
      <SectionDevider />
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