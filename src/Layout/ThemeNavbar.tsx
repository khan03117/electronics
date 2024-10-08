import { DashboardOutlined, OrderedListOutlined, LogoutOutlined, MenuOutlined, PhoneOutlined, UserOutlined, CloseOutlined, SearchOutlined, HeartFilled } from "@ant-design/icons";
import {
    Navbar,
    Menu, MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";

// @ts-ignore
// import suportimg from '../assets/support.png';
// @ts-ignore
import logoimg from './../assets/logo.jpeg';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import axios from "axios";
import { base_url, base_url_img } from "../utils";
// import axios from "axios";
// import { base_url, base_url_img } from "../utils";
interface Media {
    title: string;
    type: string;
    media_value: string;
}
interface Product {
    _id: string;
    title: string;
    url: string;
    images: string[]
}
const ThemeNavbar = () => {
    const [sopen, setSopen] = useState<boolean>(false);
    const [medias, setMedias] = useState<Media[]>([]);
    const [products, setProucts] = useState<Product[]>([]);
    const searchhandle = () => {
        setSopen(!sopen);
    }
    const token: string | null = localStorage.getItem('_token')
    const [openNav, setOpenNav] = useState(false);
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const getdata2 = async () => {
        const resp = await axios.get(base_url + 'social/contact-media?type=Contact');
        setMedias(resp.data.data);
    }
    const searachproduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length > 2) {
            const resp = await axios.get(base_url + 'product/search/' + val);
            setProucts(resp.data.data)
        } else {
            setProucts([])
        }
    }
    useEffect(() => {
        getdata2();
    }, []);
    const { pathname } = useLocation();
    useEffect(() => {
        setProucts([])
        setSopen(false);
    }, [pathname])


    function NavList() {
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li className="p-1  font-medium" >
                    <Link to={'/shop'} className="flex items-center hover:text-blue-500 transition-colors">
                        Shop
                    </Link>
                </li>
                <li className="p-1  font-medium" >
                    <Link to={'/login'} className="flex items-center hover:text-blue-500 transition-colors">
                        Account
                    </Link>
                </li>
                <li className="p-1  font-medium" >
                    <Link to={'/contact'} className="flex items-center hover:text-blue-500 transition-colors">
                        Contact us
                    </Link>
                </li>
                <li className="p-1  font-medium" >
                    <Link to={'/faq'} className="flex items-center hover:text-blue-500 transition-colors">
                        Faq's
                    </Link>
                </li>
            </ul>
        );
    }
    return (
        <>
            {
                sopen && (
                    <>
                        <div className="w-full p-4 fixed top-0 start-0 bg-black/20 z-50">
                            <button onClick={searchhandle} title="Close" className="absolute top-2 start-2 size-4 text-xs rounded-full bg-primary text-white">
                                <CloseOutlined />
                            </button>
                            <div className="flex border border-blue-gray-200 relative">
                                <input type="text" onChange={searachproduct} className="w-full p-2 outline-none   border-none" />
                                <button title="Search" className="bg-primary text-white px-3 text-sm">
                                    <SearchOutlined />
                                </button>
                                {
                                    products.length > 0 && (
                                        <>
                                            <div className="absolute p-2 rounded-lg max-h-64 overflow-y-auto overflow-x-hidden top-full start-0 w-full bg-white">
                                                <ul>
                                                    {
                                                        products.map(pdt => (
                                                            <>
                                                                <li className="*:py-1 *:ps-1 last:border-none *:border-b *:border-blue-gray-300">
                                                                    <Link className="w-full block" to={"/single-product/" + pdt.url}>
                                                                        <div className="flex ">
                                                                            <img src={base_url_img + pdt.images[0]} alt="" className="size-10 rounded-full" />
                                                                            <div className="inline">
                                                                                <h4 className="text-xs">
                                                                                    {pdt.title}
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            </>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        </>
                                    )
                                }

                            </div>

                        </div>
                    </>
                )
            }

            <Navbar className="mx-auto rounded-none lg:bg-opacity-100 lg:bg-transparent lg:border-none max-w-full w-full px-3 py-0  shadow-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex w-full items-center justify-between ">
                    <div className="lg:hidden inline-flex items-center gap-3 text-black">
                        <button className="  inline-block text-black h-6 w-6 relative -top-1 me-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"

                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <CloseOutlined />
                            ) : (
                                <MenuOutlined />
                            )}
                        </button>
                        <Link className="inline-block" to={'/'}>
                            <img src={logoimg} className="max-w-[160px]" alt="" />
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <div className="call_us ms-auto  ">
                        {

                            <>
                                <Link className="lg:inline-flex hidden items-center gap-4" to={`tel:${medias.find(obj => obj.title == "Mobile")?.media_value}`}>
                                    <PhoneOutlined className="inline-block rotate-[100deg]" />
                                    {medias.find(obj => obj.title == "Mobile")?.media_value}
                                </Link>
                            </>

                        }

                        <div className="lg:hidden inline-block text-black">
                            {/* <Link to={'/cart'} className='text-[1.2rem] text-primary'> <HeartFilled /></Link> */}
                            {/* <Link to={'/cart'} className='text-[1.2rem] ps-1'> <ShoppingCartOutlined /></Link> */}
                            <button onClick={searchhandle} title="Search button" className="text-[1.2rem] ps-1">
                                <SearchOutlined />
                            </button>
                            {
                                token ? (
                                    <>
                                        <Menu>
                                            <MenuHandler>
                                                <button title='menu icon' className='ms-4 lg:text-[1.5rem] text-[1.2rem]'>
                                                    <UserOutlined />
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
                                ) : (
                                    <>
                                        <Link to={'/login'} className='text-[1.2rem] ps-1'> <UserOutlined /></Link>
                                    </>
                                )
                            }

                        </div>
                    </div>

                </div>
                {/* <Collapse open={openNav}>
                    <NavList />
                </Collapse> */}

            </Navbar>

            <MobileSidebar open={openNav} setOpen={setOpenNav} />


        </>
    )
}

export default ThemeNavbar