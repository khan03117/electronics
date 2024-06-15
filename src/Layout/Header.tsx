import React from 'react'
import { Link } from 'react-router-dom';
// @ts-ignore
import logoimg from './../assets/logo.png';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ThemeNavbar from './ThemeNavbar';
 

const Header = () => {
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-12">
                        <div className="col-span-2">
                            <div className="w-full">
                                <Link to={'/'}>
                                    <img src={logoimg} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-8">
                            <div className="w-full">
                                <div className='flex'>
                                    <input type='text' placeholder='Search our store' className='border border-blue-gray-200 w-full py-2 px-4'></input>
                                    <button className='bg-primary py-2 px-7 text-white border border-1 border-primary text-lg uppercase tracking-widest font-dark'>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="w-full text-end">
                            <Link to={'/'} className='text-[1.5rem] pl-4'> <ShoppingCartOutlined /></Link>
                            <Link to={'/'} className='text-[1.5rem] pl-4'> <UserOutlined /></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section>
                <ThemeNavbar/>
            </section>
        </>
    )
}

export default Header