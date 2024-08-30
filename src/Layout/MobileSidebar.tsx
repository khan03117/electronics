import React, { useEffect } from 'react'
import { base_url, base_url_img } from '../utils';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons';
// @ts-ignore
import logoimg from './../assets/logo.jpeg';
// @ts-ignore
import brandimg from "../assets/brand-image.png";

interface Prop {
    open: boolean;
    setOpen: (open: boolean) => void;
}
const MobileSidebar: React.FC<Prop> = ({ open, setOpen }) => {
    const location = useLocation();
    useEffect(() => {
        setOpen(false);
    }, [location.pathname])
    const token: string | null = localStorage.getItem('_token');
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
    const [category, setCategories] = React.useState<Category[]>([]);
    const [scat, setScat] = React.useState<string>('');
    const [catproducts, setProduct] = React.useState<CategoryWithProducts[]>([]);
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
    const handlesidebar = () => {
        setOpen(!open)
    }
    React.useEffect(() => {
        getcategories();
    }, []);
    React.useEffect(() => {
        getproducts();
    }, [category, scat])
    return (
        <>
            <div className={`w-full transition-all py-3 z-[9999999] duration-500 fixed top-0 start-0 h-screen bg-white ${!open ? 'translate-x-[-100%]' : 'translate-x-[0]'}`}>
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                        <div className="w-full p-3">
                            <div className="flex gap-1">
                                <button onClick={handlesidebar} type='button' className='me-4' title='Close button'>
                                    <CloseOutlined />
                                </button>
                                <Link className="inline-block" to={'/'}>
                                    <img src={logoimg} className="w-20" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="w-full h-full flex flex-col">
                            <Link to={'/brands'}>
                                <button className=' w-full text-xs  bg-[#d9d9e3] text-start border px-2 border-blue-gray-200 py-6'>
                                    <div className='text-center'>
                                        <div className="flex justify-center">
                                            <img src={brandimg} alt="" className={` size-10 p-[8px] rounded-full  bg-[#d9d9e3]`} />
                                        </div>
                                        <p>Top Brand</p>
                                    </div>
                                </button>
                            </Link>
                            {
                                category.map(cat =>
                                (
                                    <>
                                        <button onClick={() => setScat(cat.url)} className={`w-full text-xs text-start border px-2 border-blue-gray-200 py-6 ${scat == cat.url ? 'bg-white border-0 border-l-4 border-primary' : 'bg-[#ecedf1] '}`}>
                                            <div className=" gap-2 text-center">
                                                <div className="flex justify-center">
                                                    <img src={base_url_img + cat.image} alt="" className={` size-10 p-[8px] rounded-full ${scat == cat.url ? ' bg-[#ffe5fb]' : 'bg-[#d9d9e3]'}`} />
                                                </div>
                                                <h5 className={`${scat == cat.url ? ' text-primary font-bold' : 'text-black'}`}> {cat.title}</h5>
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
                                                            <Link to={'/single-product/' + prod.url}>
                                                                <figure className="w-full p-4  ">
                                                                    <img
                                                                        src={base_url_img + prod.images[0]}
                                                                        onError={(e) => {
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.src = "https://upciclo.com/media/catalog/product/cache/6005d9038b6e8ecaa962eaa7c92a6c42/d/e/desk.jpg";
                                                                        }}
                                                                        alt=""
                                                                        className="size-10 mx-auto "
                                                                    />
                                                                    {/* <h5 className='text-sm'>{prod.title}</h5> */}
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
    )
}

export default MobileSidebar
