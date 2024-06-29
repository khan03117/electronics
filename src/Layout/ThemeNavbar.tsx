import { CloseOutlined, HeartFilled, MenuOutlined, PhoneOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
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
import axios from "axios";
import { base_url, base_url_img } from "../utils";

const ThemeNavbar = () => {
    const [openNav, setOpenNav] = useState(false);
    interface Category {
        image: string;
        _id: string;
        url: string;
        title: string;
    }
    interface Product {
        _id: string;
        url: string;
        category: string;
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
            products: Product[];
        };
    }
    const [category, setCategories] = useState<Category[]>([]);
    const [catproducts, setProduct] = useState<CategoryWithProducts[]>([]);
    const [scat, setScat] = useState<string>('');
    const getproducts = async () => {
        const caturl = scat ? scat : category.length > 0 ? category[0].url : '';
        await axios.get(base_url + 'product/shop?category_url=' + caturl).then((resp) => {
            setProduct(resp.data.data)
        })
    }
    const getcategories = async () => {
        await axios.get(base_url + 'category').then(resp => {
            setCategories(resp.data.data)
        })
    }
    React.useEffect(() => {

        getcategories();
    }, [])
    React.useEffect(() => {
        getproducts();
    }, [category, scat])

    function NavList() {
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li



                    className="p-1  font-medium"
                >
                    <Link to={'/shop'} className="flex items-center hover:text-blue-500 transition-colors">
                        Shop
                    </Link>
                </li>
                <li
                    className="p-1  font-medium"
                >
                    <Link to={'/login'} className="flex items-center hover:text-blue-500 transition-colors">
                        Account
                    </Link>
                </li>
                <li



                    className="p-1  font-medium"
                >
                    <Link to={'/contact'} className="flex items-center hover:text-blue-500 transition-colors">
                        Contact us
                    </Link>
                </li>
                <li



                    className="p-1  font-medium"
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
            <Navbar className="mx-auto rounded-none lg:bg-opacity-100 lg:bg-transparent lg:border-none max-w-full w-full px-3 py-0  shadow-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex w-full items-center justify-between ">
                    <div className="lg:hidden block text-black">
                        <button

                            className="  inline-block text-black h-6 w-6 relative -top-1 me-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"

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
                            <PhoneOutlined className="inline-block rotate-[100deg]" />
                            +91-909090090
                        </Link>
                        <div className="lg:hidden inline-block text-black">
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
                <div className={`w-full transition-all py-3 z-[9999999] duration-500 fixed top-10 start-0 h-screen bg-white ${!openNav ? 'translate-x-[-100%]' : 'translate-x-[0]'}`}>

                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4">
                            <div className="w-full h-full flex flex-col">
                                {
                                    category.map(cat =>
                                    (
                                        <>
                                            <button onClick={() => setScat(cat.url)} className={`w-full text-xs  text-start border px-2 border-blue-gray-200 py-6 ${scat == cat.url ? 'bg-blue-gray-100' : 'bg-white'}`}>
                                                <div className="inline-flex gap-2">
                                                    <img src={base_url_img + cat.image} alt="" className="size-4" />  {cat.title}
                                                </div>
                                            </button>
                                        </>
                                    )
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-span-8">
                            <div className="w-full">
                                <div className="grid grid-cols-3 gap-2">
                                    {
                                        catproducts.map(pdt => (
                                            <>
                                                {
                                                    pdt.category.products.map(prod => (
                                                        <>
                                                            <div className="col-span-1 ">
                                                                <Link to={'/'}>
                                                                    <figure className="w-full p-4 border border-blue-gray-200">
                                                                        <img
                                                                            src={base_url_img + prod.images[0]}
                                                                            onError={(e) => {
                                                                                const target = e.target as HTMLImageElement;
                                                                                target.src = "https://upciclo.com/media/catalog/product/cache/6005d9038b6e8ecaa962eaa7c92a6c42/d/e/desk.jpg";
                                                                            }}
                                                                            alt=""
                                                                            className="size-10 mx-auto "
                                                                        />
                                                                    </figure>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    ))
                                                }


                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default ThemeNavbar