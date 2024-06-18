import React from 'react'
import { Link } from 'react-router-dom';
// @ts-ignore
import logoimg from './../assets/logo.png';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ThemeNavbar from './ThemeNavbar';


const Header = () => {
    return (
        <>
            <section className="lg:py-5 pt-5">
                <div className="container">
                    <div className="grid lg:grid-cols-12 md:grid-cols-1 grid-cols-1 gap-4">
                        <div className="lg:col-span-2 col-span-6 lg:order-1 order-1 lg:block hidden">
                            <div className="w-full">
                                <Link to={'/'}>
                                    <img src={logoimg} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12 lg:order-2 order-3">
                            <div className="w-full">
                                <div className='flex'>
                                    <input type='text' placeholder='Search our store' className='border border-blue-gray-200 w-full py-2 px-4'></input>
                                    <button className='bg-primary py-2 lg:px-7 px-2 text-white border border-1 border-primary lg:text-lg text-xs uppercase tracking-widest font-dark'>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 col-span-6 lg:order-3 order-2 lg:block hidden">
                            <div className="w-full text-end">
                                <Link to={'/'} className='text-[1.5rem] pl-4'> <ShoppingCartOutlined /></Link>
                                <Link to={'/'} className='text-[1.5rem] pl-4'> <UserOutlined /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-blue-gray-200 mb-3'>
                <ThemeNavbar />
            </section>
        </>
    )
}

export default Header