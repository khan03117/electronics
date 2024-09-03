import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons';
// @ts-ignore
import logoimg from './../assets/logo.jpeg';
// @ts-ignore
import brandimg from "../assets/brand-image.png";
import { base_url, base_url_img } from '../utils';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface Prop {
    open: boolean;
    setOpen: (open: boolean) => void;
}

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

interface Brand {
    url: string;
    image: string;
    title: string;
}

const MobileSidebar: React.FC<Prop> = ({ open, setOpen }) => {
    const location = useLocation();
    const [category, setCategories] = useState<Category[]>([]);
    const [scat, setScat] = useState<string>('');
    const [catproducts, setProduct] = useState<CategoryWithProducts[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const getCategories = async () => {
        try {
            const response = await axios.get(base_url + 'category');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getProducts = async () => {
        if (scat && hasMore) {
            setLoading(true);
            try {
                const response = await axios.get(base_url + 'product/shop?category_url=' + scat);
                if (response.data.data.length > 0) {
                    setProduct(prev => [...prev, ...response.data.data]);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchBrands = async () => {
        setScat('');
        try {
            const response = await axios.get(base_url + 'seller');
            setBrands(response.data.data);
            setProduct([]);
            setHasMore(true); // Reset hasMore when switching to brands
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (scat) {
            getProducts();
        }
    }, [scat]);

    useEffect(() => {
        if (loaderRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && hasMore) {
                        getProducts();
                    }
                },
                { threshold: 1.0 }
            );

            observer.observe(loaderRef.current);

            return () => {
                if (loaderRef.current) {
                    observer.unobserve(loaderRef.current);
                }

            };
        }
    }, [hasMore, scat]);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <div className={`w-full transition-all overflow-hidden z-[9999999] duration-500 fixed top-0 start-0 h-screen bg-white ${!open ? 'translate-x-[-100%]' : 'translate-x-[0]'}`}>
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12">
                    <div className="w-full p-3">
                        <div className="flex gap-1">
                            <button onClick={() => setOpen(!open)} type='button' className='me-4' title='Close button'>
                                <CloseOutlined />
                            </button>
                            <Link className="inline-block" to={'/'}>
                                <img src={logoimg} className="max-w-[160px]" alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <PerfectScrollbar className='max-h-[85vh] overflow-x-hidden'>
                        <div className="w-full h-full flex flex-col">
                            <button onClick={fetchBrands} className={`w-full text-xs text-start border px-2 border-blue-gray-200 py-6 ${brands.length > 0 ? 'bg-white border-0 border-l-4 border-primary' : 'bg-[#ecedf1] '}`}>
                                <div className='text-center'>
                                    <div className="flex justify-center">
                                        <img src={brandimg} alt="" className={`size-10 p-[8px] rounded-full bg-[#d9d9e3]`} />
                                    </div>
                                    <p>Top Brand</p>
                                </div>
                            </button>
                            {category.map(cat => (
                                <button key={cat._id} onClick={() => setScat(cat.url)} className={`w-full text-xs text-start border px-2 border-blue-gray-200 py-6 ${scat === cat.url ? 'bg-white border-0 border-l-4 border-primary' : 'bg-[#ecedf1] '}`}>
                                    <div className="gap-2 text-center">
                                        <div className="flex justify-center">
                                            <img src={base_url_img + cat.image} alt="" className={`size-10 p-[8px] rounded-full ${scat === cat.url ? 'bg-[#ffe5fb]' : 'bg-[#d9d9e3]'}`} />
                                        </div>
                                        <h5 className={`${scat === cat.url ? 'text-primary font-bold' : 'text-black'}`}>{cat.title}</h5>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </PerfectScrollbar>
                </div>
                <div className="col-span-9">
                    <PerfectScrollbar className='max-h-[85vh] pe-3 overflow-x-hidden'>
                        <div className="w-full">
                            {brands.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {brands.map(brand => (
                                        <div key={brand.url} className="col-span-1">
                                            <Link to={`/shop/brand/${brand.url}`} className='w-full h-full flex items-center justify-center'>
                                                <figure className="w-full p-2 h-full border border-blue-gray-400 rounded-lg">
                                                    <img
                                                        src={base_url_img + brand.image}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "https://upciclo.com/media/catalog/product/cache/6005d9038b6e8ecaa962eaa7c92a6c42/d/e/desk.jpg";
                                                        }}
                                                        alt=""
                                                        loading='lazy'
                                                        className="max-w-full h-20 object-contain mx-auto"
                                                    />
                                                    <h5 className='text-sm'>{brand.title}</h5>
                                                </figure>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="grid grid-cols-3 gap-2">
                                {catproducts.map(pdt => (
                                    pdt.category.products.map(prod => (
                                        <div key={prod._id} className="col-span-1">
                                            <Link to={`/single-product/${prod.url}`} className='w-full h-full flex items-center justify-center'>
                                                <figure className="w-full p-2 h-full border border-blue-gray-400 rounded-lg">
                                                    <img
                                                        src={base_url_img + prod.images[0]}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "https://upciclo.com/media/catalog/product/cache/6005d9038b6e8ecaa962eaa7c92a6c42/d/e/desk.jpg";
                                                        }}
                                                        alt=""
                                                        loading='lazy'
                                                        className="max-w-full h-20 object-contain mx-auto"
                                                    />
                                                    {/* <h5 className='text-sm'>{prod.title}</h5> */}
                                                </figure>
                                            </Link>
                                        </div>
                                    ))
                                ))}
                                <div ref={loaderRef} className="w-full text-center py-4">
                                    {loading ? 'Loading more products...' : hasMore ? 'Scroll down to load more...' : 'No more products'}
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
};

export default MobileSidebar;
