import { BarsOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
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
                <p


                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                        Pages
                    </a>
                </p>
                <p


                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                        Account
                    </a>
                </p>
                <p


                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                        Blocks
                    </a>
                </p>
                <p


                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                        Docs
                    </a>
                </p>
            </ul>
        );
    }
    return (
        <>
            <Navbar className="mx-auto rounded-none max-w-full w-full px-3  shadow-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex w-full items-center justify-between text-blue-gray-900">
                    <div className="lg:hidden block">
                        <Link to={'/'}>
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
                            <Link to={'/cart'} className='text-[1.5rem] pl-4'> <ShoppingCartOutlined /></Link>
                            <Link to={'/orders'} className='text-[1.5rem] pl-4'> <UserOutlined /></Link>
                        </div>
                    </div>
                    <button

                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"

                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <MenuOutlined />
                        ) : (
                            <BarsOutlined />
                        )}
                    </button>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                </Collapse>
            </Navbar>

        </>
    )
}

export default ThemeNavbar