import React, { useEffect, useRef, useState } from "react"
import ProductSlider from "../../component/ProductSlider"
import { Checkbox, Collapse } from "@material-tailwind/react";
import { CloseOutlined, DownOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import Shorting from "./Shorting";
import { base_url, base_url_img } from "../../utils";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";

const Shop = () => {
    const location = useLocation();
    const { url } = useParams();
    const [open, setOpen] = useState('');
    const [filo, setFilO] = useState<boolean>(false);
    const [fshow, setFshow] = useState<boolean>(false);
    const [scategory, setScategory] = useState<string>(url ? url : '');
    useEffect(() => {
        setScategory(url ? url : scategory)
    }, [location.pathname])
    const [sbrand, setSbrand] = useState<string>('')
    const [smodal, setSmodal] = useState<string>('')
    const [filterby, setFilterBy] = useState<string>('');
    const popupRef = useRef<HTMLDivElement | null>(null);
    interface Modal {
        image: string;
        _id: string;
        url: string;
        title: string;
        modals: {
            _id: string;
            url: string;
            title: string;
        }[]
    }
    interface Brand {
        image: string;
        _id: string;
        url: string;
        title: string;
    }
    interface MCategory {
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

    const [catproducts, setProduct] = useState<CategoryWithProducts[]>([]);
    const [modals, setModals] = useState<Modal[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategory] = useState<MCategory[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const getproducts = async () => {
        await axios.get(base_url + 'product/shop?category_url=' + scategory + '&brand_url=' + sbrand + '&modal_url=' + smodal).then((resp) => {
            setProduct(resp.data.data)
        })
    }
    const getbrands = async () => {
        await axios.get(base_url + 'brand').then((resp) => {
            setBrands(resp.data.data)
        })
    }
    const getmodals = async () => {
        await axios.get(base_url + 'modal').then((resp) => {
            setModals(resp.data.data)
        })
    }
    const getcategories = async () => {
        await axios.get(base_url + 'category').then((resp) => {
            setCategory(resp.data.data)
        })
    }
    useEffect(() => {
        getmodals();
        getbrands();
        getcategories();

    }, [location.pathname]);


    useEffect(() => {
        getproducts();
    }, [scategory, sbrand, smodal, location.pathname])
    const handlefilter = () => {
        setFilO(prev => !prev);
    }
    const handlescategory = (url: string) => {
        setScategory(url);
        setSbrand('')
        setSmodal('')
        setFshow(false)
    }
    const handlesbrand = (url: string) => {
        setSbrand(url);
        setFshow(false)
    }
    const handlesmodal = (url: string) => {
        setSmodal(url);
        setFshow(false)
    }

    const handleOpen = (url: string) => {
        if (open != url) {
            setOpen(url);
        } else {
            setOpen('');
        }

    }
    useEffect(() => {
        const products = catproducts.flatMap(categoryWithProducts => categoryWithProducts.category.products);
        setAllProducts(products);
    }, [catproducts]);

    const colors = [
        '#ddd', '#727272', '#FF5733', '#FF9033 ', '#FFC433', '#FFFC33 ', '#77FF33', '#3390FF', '#FF3352', '#FF33C7', '#DA33FF', '#9933FF'
    ];
    const filterdiv = (
        <>
            <div className="w-full ">
                <div onClick={() => handleOpen('category')} className="flex cursor-pointer items-center justify-between">
                    <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Categories</h3>
                    <span>
                        <PlusOutlined />
                    </span>
                </div>
                <Collapse open={open == "category"}>
                    <ul className="*:py-1 *:text-sm">
                        {
                            ['Mobile Cover', 'Covers', 'Screen Guard', 'Accessories'].map((elm) => (
                                <>
                                    <li>
                                        <button type="button" className="flex md:text-lg text-sm items-center">
                                            <Checkbox onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />     {elm}
                                        </button>
                                    </li>
                                </>
                            ))
                        }
                    </ul>
                </Collapse>

            </div>
            <div className="w-full hidden">
                <div onClick={() => handleOpen('brand')} className="flex cursor-pointer items-center justify-between">
                    <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Brand</h3>
                    <span>
                        <PlusOutlined />
                    </span>
                </div>

                <Collapse open={open == 'brand'} >
                    <ul>

                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elm) => (
                                <>
                                    <li>
                                        <button type="button" className="flex items-center gap-3">
                                            <Checkbox onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />      Brand {elm}
                                        </button>
                                    </li>
                                </>
                            ))
                        }

                    </ul>
                </Collapse>


            </div>
            <div className="w-full hidden">
                <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Types</h3>
                <div className="flex flex-wrap gap-3 *:border *:border-blue-gray-900 *:text-center *:md:px-3 *:md:py-2  *:p-1 text-sm">
                    <button type="button" title="brand button">Vivo</button>
                    <button type="button" title="brand button">Redmi</button>
                    <button type="button" title="brand button">Iphone</button>
                    <button type="button" title="brand button">Samsung</button>
                    <button type="button" title="brand button">Nokia</button>
                </div>
            </div>
            <div className="w-full hidden">
                <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Tags</h3>
                <div className="flex flex-wrap gap-3 *:border *:border-blue-gray-500 *:md:px-3 *:md:py-2  *:p-1 text-sm">
                    {
                        ['Maroon', 'Fashion', 'Popular', 'Shoes', 'Gold', 'Men', 'Boys'].map((itm) => (
                            <>
                                <button type="button" className="">{itm}</button>
                            </>
                        ))
                    }
                </div>
            </div>
            <div className="w-full hidden">
                <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Colors</h3>
                <div className="flex flex-wrap gap-3 *:border *:border-blue-gray-900  ">
                    {
                        colors.map((itm) => (
                            <>
                                <button title="color button" type="button" style={{ background: `${itm}` }} className={`md:size-9 size-5 rounded-full`}></button>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
    const hanlePopup = (id: string) => {
        setFshow(!fshow);
        setFilterBy(id);
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setFshow(false);
            }
        };

        if (fshow) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [fshow]);


    return (
        <>
            {
                filo && (
                    <>
                        <div className="fixed z-[999] top-0 start-0 w-full h-full  bg-black/30">
                            <div className="w-3/4 relative p-4 h-screen bg-white">
                                <button type="button" title="off button" onClick={handlefilter} className="absolute -end-8 top-0 size-8 bg-blue-gray-100 text-black">
                                    <CloseOutlined />
                                </button>
                                {filterdiv}
                            </div>

                        </div>
                    </>
                )
            }
            {

                <>

                    <div ref={popupRef} className={`fixed text-black overflow-y-auto transition-all duration-300 z-50 h-[70vh] bottom-0 start-0 w-full bg-white rounded-t-3xl ${fshow ? 'translate-y-0' : 'translate-y-[100%]'}`}>
                        {
                            filterby.toLowerCase() == "category" && (
                                <>
                                    <div className="w-full px-4 py-5">
                                        <div className="grid grid-cols-3 gap-5">
                                            {
                                                categories.map((catg) => (
                                                    <>
                                                        <div onClick={() => handlescategory(catg.url)} className="col-span-1">
                                                            <div className="w-full border border-blue-gray-100 p-2 h-full rounded-lg bg-white shadow-md shadow-blue-gray-200">
                                                                <figure className="w-full">
                                                                    <img src={base_url_img + catg.image} alt="" className="size-10 mx-auto  rounded-full" />
                                                                </figure>
                                                                <div className="w-full  mt-4 text-center text-xs">
                                                                    {catg.title}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </>
                            )
                        }
                        {
                            filterby == "Modal" && (
                                <>
                                    <div className="w-full px-4 py-5">
                                        <div className="grid grid-cols-3 gap-5">
                                            <div className="col-span-3"> </div>
                                            {
                                                modals.map((modl) => (
                                                    <>
                                                        {
                                                            modl.modals.map((mdl) => (
                                                                <>
                                                                    <div onClick={() => handlesmodal(mdl.url)} className="col-span-1">
                                                                        <div className="w-full border border-blue-gray-100 p-2 h-full rounded-lg bg-white shadow-md shadow-blue-gray-200">
                                                                            <figure className="w-full">
                                                                                <img src={base_url_img + modl.image} alt="" className="size-10 mx-auto  rounded-full" />
                                                                            </figure>
                                                                            <div className="w-full  mt-4 text-center text-xs">
                                                                                {mdl.title}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))
                                                        }

                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            filterby == "Brand" && (
                                <>
                                    <div className="w-full px-4 py-5">
                                        <div className="grid grid-cols-3 gap-5">
                                            <div className="col-span-3"> </div>
                                            {
                                                brands.map((modl) => (
                                                    <>

                                                        <div onClick={() => handlesbrand(modl.url)} className="col-span-1">
                                                            <div className="w-full border border-blue-gray-100 p-2 h-full rounded-lg bg-white shadow-md shadow-blue-gray-200">
                                                                <figure className="w-full">
                                                                    <img src={base_url_img + modl.image} alt="" className="size-10 mx-auto  rounded-full" />
                                                                </figure>
                                                                <div className="w-full  mt-4 text-center text-xs">
                                                                    {modl.title}
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </>

            }
            <section id='shopbanner' className='lg:py-20 py-5'>
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-1">
                        <div className="col-span-1">
                            <div className="w-full text-center">
                                <h1 className='text-white sectiontitle'>Products</h1>
                                <p className='text-sm text-white'>Home / products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="productitem" className="md:py-10 py-5">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-5 grid-cols-1">
                        <div className="lg:hidden block col-span-1 ">

                            <div className="w-full px-4 py-2 lg:block hidden sticky top-0">
                                {filterdiv}
                            </div>
                            <div className="md:hidden block mb-5">
                                <div className="grid grid-cols-2">
                                    <div className="col-span-1">
                                        <button>
                                            &#8645; Sort
                                        </button>
                                    </div>
                                    {
                                        ['Category'].map((it) => (
                                            <>
                                                <div className="col-span-1 text-end ">
                                                    <button onClick={() => hanlePopup(it)} className="text-end text-sm">
                                                        {it} <DownOutlined className="text-xs" />
                                                    </button>
                                                </div>
                                            </>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 lg:block hidden">
                            <div className="w-full flex justify-between flex-wrap ">
                                <div className="filterby">
                                    <FilterOutlined />Filter
                                </div>
                                <div className="filtercat flex gap-2 flex-wrap">
                                    {
                                        categories.map(cat => (
                                            <>
                                                <Link to={'/shop/category/' + cat.url} className={`${scategory != cat.url ? 'bg-blue-gray-100 text-blue-gray-700' : 'bg-primary text-white'} px-5 py-2 border`}>
                                                    {cat.title}
                                                </Link>
                                            </>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="lg:col-span-5 col-span-4">

                            <div className=" py-2 block">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 md:gap-4 gap-4">

                                    {
                                        allProducts.map((pdt) => (
                                            <>
                                                <div className="col-span-1">
                                                    <ProductSlider product={pdt} />
                                                </div>

                                            </>
                                        ))
                                    }

                                </div>
                            </div>




                        </div>

                    </div>
                </div>
            </section >

        </>
    )
}

export default Shop