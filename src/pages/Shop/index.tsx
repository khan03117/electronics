import React, { useEffect, useRef, useState } from "react"
import ProductSlider from "../../component/ProductSlider"
import { Checkbox, Collapse } from "@material-tailwind/react";
import { CloseOutlined, DownOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
// import Shorting from "./Shorting";
import { base_url, base_url_img } from "../../utils";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Banner from "../Home/Banner";
import CategoriesSlider from "../Home/CategoriesSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../component/Arrows";
// import SectionTitle from "../../component/SectionTitle";
import SectionDevider from "../../component/SectionDevider";

const Shop = () => {
    const location = useLocation();
    const { url, suburl, burl, type } = useParams();

    const [open, setOpen] = useState('');
    const [filo, setFilO] = useState<boolean>(false);
    const [fshow, setFshow] = useState<boolean>(false);
    const [scategory, setScategory] = useState<string>(url ? url : '');

    const [filterby, setFilterBy] = useState<string>('');
    const popupRef = useRef<HTMLDivElement | null>(null);

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
        mrp: number;
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
    interface Subcategory {
        _id: string;
        url: string;
        title: string;
        image: string;
        category: MCategory
    }
    interface Seller {
        _id: string;
        title: string;
        url: string;
        image: string;
    }
    const [catproducts, setProduct] = useState<CategoryWithProducts[]>([]);
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [seller_id, setSellerId] = useState<string>(burl ?? '');
    const [categories, setCategory] = useState<MCategory[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [subcategory_id, setSubcategoryId] = useState<string>(suburl ?? 'null');
    const [sub_type, setSubType] = React.useState('');

    const settings = {
        dots: false,
        navs: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        nextArrow: <NextArrow className={'btn'} />, // Use custom next arrow
        prevArrow: <PrevArrow className={'btn'} />,  // Use custom prev arrow,
        responsive: [
            {
                breakpoint: 1200, // At or below 1200px
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                    navs: true,
                }
            },
            {
                breakpoint: 992, // At or below 992px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    navs: true,
                }
            },
            {
                breakpoint: 768, // At or below 768px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                    navs: false,
                    arrows: false
                }
            }
        ]

    };
    useEffect(() => {
        setScategory(url ? url : scategory)
    }, [location.pathname, categories])
    const getproducts = async () => {
        await axios.get(base_url + 'product/shop?category_url=' + scategory + '&seller=' + seller_id + '&subcategory=' + subcategory_id).then((resp) => {
            setProduct(resp.data.data)
        })
    }
    const getsubcategory = async () => {
        const foundcategory = categories.find(obj => obj.url == scategory);
        if (foundcategory) {
            await axios.get(base_url + 'subcategory?category=' + foundcategory._id).then(resp => {
                setSubcategories(resp.data.data);
            })
        }
    }
    useEffect(() => {
        getsubcategory();
    }, [location.pathname, categories, scategory]);

    useEffect(() => {
        setSubcategoryId('')
    }, [scategory]);

    useEffect(() => {
        const found = subcategories.find(obj => obj.url == suburl);
        if (found) {
            setSubcategoryId(found._id)
        }
    }, [subcategories])


    const getsellers = async () => {
        await axios.get(base_url + 'seller').then((resp) => {
            setSellers(resp.data.data)
        })
    }
    useEffect(() => {
        const findSid = () => {
            if (type == "brand") {
                const found = sellers.find(obj => obj.url == seller_id);
                if (found) {
                    setSubType(found._id)
                }
            }
            if (type == "category") {
                const found = categories.find(obj => obj.url == scategory);
                if (found) {
                    setSubType(found._id)
                }
            }
        }
        findSid();
    }, [sellers])
    const getcategories = async () => {
        await axios.get(base_url + 'category').then((resp) => {
            setCategory(resp.data.data)
        })
    }
    useEffect(() => {
        getsellers();
        getcategories();
        if (burl) {
            setSellerId(burl);
            setScategory('')
        } else {
            setSellerId('')
        }
        const found = subcategories.find(obj => obj.url == suburl);
        if (found) {
            setSubcategoryId(found._id)
        }
        setFshow(false);
    }, [location.pathname]);


    useEffect(() => {
        getproducts();
        console.log(seller_id)
    }, [scategory, subcategory_id, location.pathname, sellers, seller_id,])
    const handlefilter = () => {
        setFilO(prev => !prev);
    }
    const handlescategory = (url: string) => {
        setScategory(url);
        //navigate('/shop/category/' + url);
        setFshow(false)
    }
    const handleSellerId = (url: string) => {
        setSellerId(url);
        setFshow(false)
    }
    const handleSubcategoryid = (url: string) => {
        setSubcategoryId(url);
        const fsubcategory = subcategories.find(obj => obj._id == url);
        // if (fsubcategory) {
        //     navigate('/shop/category/' + scategory + '/' + fsubcategory.url);
        // }
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
                    <div ref={popupRef} className={`fixed text-black overflow-y-auto transition-all duration-300 z-50 h-[65vh] bottom-0 start-0 w-full bg-gray-300 pb-10 scroll-pb-10 rounded-t-3xl ${fshow ? 'translate-y-0' : 'translate-y-[100%]'}`}>
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
                            filterby == "Subcategory" && (
                                <>
                                    <div className="w-full px-4 py-5">
                                        <div className="grid grid-cols-3 gap-5">
                                            <div className="col-span-3"> </div>
                                            {
                                                subcategories.map((mdl) => (
                                                    <>
                                                        {


                                                            <div onClick={() => handleSubcategoryid(mdl._id)} className="col-span-1">
                                                                <div className="w-full border border-blue-gray-100 p-2 h-full rounded-lg bg-white shadow-md shadow-blue-gray-200">
                                                                    <figure className="w-full">
                                                                        <img src={base_url_img + mdl.image} alt="" className="size-10 mx-auto  rounded-full" />
                                                                    </figure>
                                                                    <div className="w-full  mt-4 text-center text-xs">
                                                                        {mdl.title}
                                                                    </div>
                                                                </div>
                                                            </div>


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
                                                sellers.map((modl) => (
                                                    <>

                                                        <button onClick={() => handleSellerId(modl.url)} className="col-span-1">
                                                            <div className="w-full border border-blue-gray-100 p-2 h-full rounded-lg bg-white shadow-md shadow-blue-gray-200">
                                                                <div className="w-full  mt-4 text-center text-xs">
                                                                    {modl.title}
                                                                </div>
                                                            </div>
                                                        </button>


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

            <>
                <section >
                    <div className="w-full mx-auto">
                        {

                            <>
                                <Banner type={type ?? 'product'} sub_type={sub_type ?? false} />
                            </>

                        }

                    </div>
                </section>
            </>








            <section id="productitem" className="md:py-10 py-5">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-5 grid-cols-1">
                        <div className="hidden col-span-1 ">
                            <div className="md:hidden hidden mb-5">
                                <div className="grid grid-cols-4">
                                    <div className="col-span-1">
                                        <button>
                                            &#8645; Sort
                                        </button>
                                    </div>

                                    <div className="col-span-1 text-end ">
                                        <button onClick={() => hanlePopup('Category')} className="text-end text-xs">
                                            Category <DownOutlined className="text-xs" />
                                        </button>
                                    </div>
                                    {
                                        subcategories.length > 0 && (
                                            <>
                                                <div className="col-span-1 text-end ">
                                                    <button onClick={() => hanlePopup('Subcategory')} className="text-end text-xs">
                                                        Product <DownOutlined className="text-xs" />
                                                    </button>
                                                </div>
                                            </>
                                        )
                                    }

                                    <div className="col-span-1 text-end ">
                                        <button onClick={() => hanlePopup('Brand')} className="text-end text-xs">
                                            Brand <DownOutlined className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5">
                            {
                                subcategories.length == 0 && (
                                    <>
                                        <div className="w-full ">
                                            <CategoriesSlider />
                                        </div>
                                        <div className="w-full mb-4">
                                            <SectionDevider />
                                        </div>
                                    </>
                                )
                            }


                            {
                                subcategories.length > 0 && (
                                    <>


                                        <div className="w-full">

                                            <Slider {...settings} >
                                                {
                                                    subcategories.map((mdl) => (
                                                        <div onClick={() => handleSubcategoryid(mdl._id)} className="w-full p-1">
                                                            <div className="w-full">
                                                                <figure className="w-full">
                                                                    <img src={base_url_img + mdl.image} alt="" className="size-10 mx-auto  rounded-full" />
                                                                </figure>
                                                                <div className="w-full  mt-4 text-center text-xs">
                                                                    {mdl.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </Slider>
                                            <SectionDevider />
                                        </div>
                                    </>
                                )
                            }


                            <div className="pb-5 hidden">
                                <Slider {...settings} >
                                    {
                                        sellers.map((modl) => (
                                            <div className="p-1">
                                                <button onClick={() => handleSellerId(modl.url)} className="w-full block">
                                                    <div className="w-full h-full  bg-white">
                                                        <img src={base_url_img + modl.image} alt="" className=" w-full lg:h-10 h-5 lg:object-contain object-contain  mx-auto block" />
                                                        <div className="w-full  mt-4 text-center text-xs">
                                                            {modl.title}
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </div>
                        <div className="lg:col-span-5 col-span-4">

                            <div className=" py-2 block">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 md:gap-4 gap-4">

                                    {
                                        allProducts.map((pdt) => (
                                            <>
                                                <div className="col-span-1">
                                                    <ProductSlider product={pdt} offer={{ discount_percent: 0 }} />
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