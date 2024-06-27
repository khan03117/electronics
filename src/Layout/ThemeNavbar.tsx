import { CloseOutlined, HeartFilled, MenuOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import {
    Navbar,
    Collapse
} from "@material-tailwind/react";
// @ts-ignore
import suportimg from '../assets/support.png';
// @ts-ignore
import logoimg from './../assets/logo.png';
import React, { useState } from 'react'
import { Link } from "react-router-dom";

const ThemeNavbar = () => {
    const [openNav, setOpenNav] = useState(false);

    function NavList() {
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li



                    className="p-1 text-black font-medium"
                >
                    <Link to={'/shop'} className="flex items-center hover:text-blue-500 transition-colors">
                        Shop
                    </Link>
                </li>
                <li
                    className="p-1 text-black font-medium"
                >
                    <Link to={'/login'} className="flex items-center hover:text-blue-500 transition-colors">
                        Account
                    </Link>
                </li>
                <li



                    className="p-1 text-black font-medium"
                >
                    <Link to={'/contact'} className="flex items-center hover:text-blue-500 transition-colors">
                        Contact us
                    </Link>
                </li>
                <li



                    className="p-1 text-black font-medium"
                >
                    <Link to={'/'} className="flex items-center hover:text-blue-500 transition-colors">
                        Faq's
                    </Link>
                </li>
            </ul>
        );
    }
    return (
        <>
            <Navbar className="mx-auto rounded-none max-w-full w-full px-3 py-0  shadow-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex w-full items-center justify-between text-black">
                    <div className="lg:hidden block">
                        <button

                            className="  inline-block h-6 w-6 relative -top-1 me-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"

                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <CloseOutlined />
                            ) : (
                                <MenuOutlined />
                            )}
                        </button>
                        <Link className="inline-block" to={'/'}>
                            <img src={logoimg} className="w-20" alt="" />
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <div className="call_us ms-auto  ">
                        <Link className="lg:inline-flex hidden items-center gap-4" to={'tel:+91-9090909090'}>
                            <img src={suportimg} alt="" className="size-6 object-contain" />
                            +91-909090090
                        </Link>
                        <div className="lg:hidden inline-block">
                            <Link to={'/cart'} className='text-[1.2rem] text-primary'> <HeartFilled /></Link>
                            <Link to={'/cart'} className='text-[1.2rem] ps-1'> <ShoppingCartOutlined /></Link>
                            <Link to={'/orders'} className='text-[1.2rem] ps-1'> <UserOutlined /></Link>
                        </div>
                    </div>

                </div>
                {/* <Collapse open={openNav}>
                    <NavList />
                </Collapse> */}




            </Navbar>
            <>
                <div className={`w-3/4 transition-all z-[9999999] duration-500 fixed top-10 start-0 h-screen bg-white ${!openNav ? 'translate-x-[-100%]' : 'translate-x-[0]'}`}>

                    <NavList />

                </div>
            </>

        </>
    )
}

export default ThemeNavbar