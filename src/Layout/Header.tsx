import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// @ts-ignore
import logoimg from './../assets/logo.png';
import { DashboardOutlined, HeartFilled, LogoutOutlined, OrderedListOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ThemeNavbar from './ThemeNavbar';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from '@material-tailwind/react';
import LoginpopUP from './LoginpopUP';
import { useCart } from './CartContext';

const Header = () => {
    const { cartCount } = useCart();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const token: string | undefined | null = localStorage.getItem('_token');
    const signuphandle = (val: boolean) => {
        setOpen(val);
    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])
    return (
        <>
            <LoginpopUP isopen={open} setOpen={signuphandle} />
            <section className='lg:py-2 py-3 lg:bg-black bg-white lg:text-white text-black'>
                <ThemeNavbar />
            </section>
            <section className="lg:py-5  lg:mb-0 mb-3 lg:block hidden">
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
                                    <div className="flex w-full rounded-lg overflow-hidden border border-blue-gray-300">
                                        <span className="icon p-2 text-gray-600">
                                            <SearchOutlined />
                                        </span>
                                        <input type='text' placeholder='Search our store' className=' outline-none rounded-none  border-none w-full py-2 px-4 lg:text-sm text-xs'></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 col-span-6 lg:order-3 order-2 lg:block hidden">
                            <div className="w-full text-end">
                                <Link to={'/cart'} className='lg:text-[1.5rem] inline-block text-[1.2rem] pl-4 relative'>
                                    <span className='absolute -top-1 -end-2 inline-block bg-red-600 text-white rounded-full size-5 text-xs text-center leading-5'>{cartCount}</span>
                                    <ShoppingCartOutlined /></Link>
                                {
                                    !token ? (
                                        <>
                                            <button type='button' title='login button' onClick={() => signuphandle(true)} className='lg:text-[1.5rem] text-[1.2rem] pl-4'> <UserOutlined /></button>
                                        </>
                                    ) : (
                                        <>
                                            <Menu>
                                                <MenuHandler>
                                                    <button title='menu icon' className='ms-4 lg:text-[1.5rem] text-[1.2rem]'>
                                                        <DashboardOutlined />
                                                    </button>
                                                </MenuHandler>
                                                <MenuList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <MenuItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <Link to={'/orders'}>
                                                            <OrderedListOutlined />
                                                            <span className="ms-2">Orders</span>
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <Link to={'/wishlist'}>
                                                            <HeartFilled />
                                                            <span className="ms-2">Wishlist</span>
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <button onClick={logout}>
                                                            <LogoutOutlined />
                                                            <span className="ms-2">
                                                                Logout
                                                            </span>
                                                        </button>
                                                    </MenuItem>

                                                </MenuList>
                                            </Menu>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Header