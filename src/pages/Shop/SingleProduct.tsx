import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeartFilled, HeartOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import Specification from './Specification';
import Reviews from './Reviews';
import axios from 'axios';
import { base_url, base_url_img } from '../../utils';
import Swal from 'sweetalert2';
import SimilarProducts from './SimilarProducts';
import SectionTitle from '../../component/SectionTitle';
import SectionDevider from '../../component/SectionDevider';
import LoginpopUP from '../../Layout/LoginpopUP';


const SingleProduct: React.FC = () => {

    interface Brand {
        _id: string;
        title: string;
    }
    interface Modal {
        _id: string;
        title: string;
    }
    interface Product {
        _id: string;
        category: {
            _id: string;
            url: string;
            title: string;
        };
        product_type: string;
        title: string;
        price: number;
        mrp: number;
        images: string[];
        modals: {
            brand: Brand;
            modal: Modal;
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
    interface ProductDiscount {
        _id: string;
        product: string;
        start_at: string;
        end_at: string;
        discount_percent: number;
        is_Active: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    const { id } = useParams();
    const token: string | null = localStorage.getItem('_token') ?? null;
    interface Quantity { product: string | undefined; modal: string | undefined; brand: string | undefined; quantity: number | undefined; price: number | undefined; }
    const [qty, setQty] = useState<Quantity[]>([]);
    // const [mobj, setMobj] = useState<Quantity>();
    const [s_section, setSection] = useState('specifications');
    const [product, setProduct] = useState<Product>();
    const [copen, setCopen] = useState<boolean>(false);
    const [wishlist, setWishlist] = useState<boolean>(false);
    const [lopen, setLopen] = useState(false);
    const [discount, setDiscount] = useState<ProductDiscount>()
    const getProduct = async () => {
        await axios.get(base_url + 'product/show/' + id).then(resp => {
            setProduct(resp.data.data);
            setDiscount(resp.data.offer)
        })
    }

    const checkwishlist = async () => {
        await axios.get(base_url + 'cart/wishlist/' + product?._id, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            setWishlist(resp.data.data)
        })
    }
    const addtowishlist = async () => {
        if (token) {
            const pid = product?._id;
            await axios.post(base_url + 'cart/wishlist', { product_id: pid }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                setWishlist(resp.data.success == "1" ? true : false);
            });
        } else {
            setLopen(true)
        }
    }

    const getproductincart = async () => {
        await axios.get(base_url + 'cart/product/' + product?._id, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            const apdta = resp.data.data;
            const transformedData: Quantity[] = apdta.map((item: { product: any; modal: any; brand: any; quantity: any; price: any; }) => ({
                product: item.product,
                modal: item.modal,
                brand: item.brand,
                quantity: item.quantity,
                price: item.price
            }));
            setQty(transformedData);
        })
    }
    useEffect(() => {
        if (product && token) {
            getproductincart();
            checkwishlist();
        }

    }, [product]);
    const location = useLocation();
    useEffect(() => {
        getProduct();
    }, [location.pathname]);

    const settingsFor = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        navs: false,
        fade: true,
        // asNavFor: sliderNavRef.current,
        customPaging: (index: number) => (
            <img src={base_url_img + product?.images[index]} alt="" className="w-[50px] h-[50px] object-contain border rounded-lg border-blue-gray-400 shadow-lg shadow-blue-gray-300 inline-block " />
        ),
    };
    const handlelopen = (val: boolean) => {
        setLopen(val);
    }

    const handleqty = (action: string, id: string, bid: string) => {
        if (token) {
            const modal = product?.modals.find(obj => obj?.modal?._id == id && obj?.brand?._id == bid);
            if (modal) {
                const arr = [...qty];
                const idx = arr.findIndex(obj => obj.modal == modal?.modal._id && obj.brand == modal.brand._id);
                if (action == "plus") {
                    if (idx > -1) {
                        const nqty = (arr[idx]?.quantity ?? 0) + (modal?.moq ?? 0);
                        arr[idx].quantity = nqty;
                        addtocart(arr[idx]);
                        setQty(arr);
                    } else {
                        const obj = {
                            product: product?._id,
                            modal: modal?.modal._id,
                            brand: modal?.brand._id,
                            quantity: modal?.moq,
                            price: product?.price
                        }
                        addtocart(obj)
                        arr.push(obj);
                        setQty(arr);
                    }
                }
                if (action == 'minus') {
                    if (arr[idx]) {
                        if (idx > -1 && typeof arr[idx]?.quantity === 'number') {
                            const currentQuantity = arr[idx].quantity ?? 0;
                            const moq = modal?.moq ?? 0; // Default moq to 0 if modal is undefined
                            const newQuantity = Math.max(currentQuantity - moq, 0); // Ensure new quantity is non-negative
                            arr[idx].quantity = newQuantity;
                            addtocart(arr[idx]);
                            setQty(arr);
                        }
                    }

                }
                setCopen(true);
            }
        } else {
            setLopen(true);
        }

    }

    const addtocart = async (obj: Quantity) => {

        await axios.post(base_url + 'cart', obj, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.data.succes == "1") {
                setCopen(true);
            }

        })


    }
    const discountvalue = discount ? discount.discount_percent * 0.01 : 0;
    const price = product?.price ?? 0;
    return (
        <>

            <LoginpopUP isopen={lopen} setOpen={handlelopen} />
            <section className="lg:py-10 py-4" id="singleproduct">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-8 grid-cols-1 lg:gap-5 gap-6">
                        <div className="md:col-span-4 col-span-5">
                            <div className="w-full">
                                <div className="grid lg:grid-cols-6 grid-cols-6 lg:gap-6 gap-2">

                                    <div className="lg:col-span-5 md:order-2 order-1 col-span-6 lg:pb-4 pb-0">
                                        <Slider  {...settingsFor} className='slider-for'>
                                            {
                                                product?.images.map((itm) => (
                                                    <>
                                                        {
                                                            ['jpg', 'jpeg', 'png', 'avif', 'webp'].includes(itm.split('.')[itm.split('.').length - 1].toLocaleLowerCase()) && (
                                                                <>
                                                                    <figure className="w-full border border-blue-gray-200  rounded-2xl overflow-hidden ">
                                                                        <img src={base_url_img + itm} alt="" className="w-full lg:h-[500px] h-[430px] object-contain" />
                                                                    </figure>
                                                                </>
                                                            )
                                                        }

                                                    </>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="md:col-span-4 col-span-5">
                            <div className="w-full md:mt-0 mt-10">
                                <h1 className="productname lg:text-[2rem] font-bold text-[18px] mb-4">{product?.title}</h1>
                                <div className="pricebox flex justify-between ">
                                    <div className="w-3/4">
                                        <span className="text-red-600 price">
                                            ₹ {(price * (1 - discountvalue)).toFixed(2)}
                                        </span>
                                        <span className="oldprice text-gray-700 ms-1 strike relative line-through">
                                            ₹ {discountvalue > 0 ? price : product?.mrp}
                                        </span>

                                    </div>
                                    {
                                        discountvalue > 0 && (
                                            <>
                                                <div className="inline-block  text-wrap  text-center text-md border border-primary rounded text-primary  px-2 ">
                                                    {discountvalue * 100} % off
                                                </div>
                                            </>
                                        )
                                    }


                                </div>
                                <div className="w-full pb-4 border-b border-blue-gray-200 relative">
                                    <span className="text-xs text-blue-gray-500 block">Inclusive of all taxes</span>
                                    <div className="flex text-orange-500 items-center">
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                    </div>
                                    <button onClick={addtowishlist} title='Wishlist' className='text-primary absolute end-0 top-0 text-2xl'>
                                        {
                                            wishlist ? <HeartFilled /> : <HeartOutlined />
                                        }
                                    </button>
                                </div>
                                <div className="w-full">
                                    <p className='text-sm font-bold'>
                                        Availabel modal list {product?.modals.length}
                                    </p>
                                    {
                                        product?.modals.map(mdl => (
                                            <>
                                                {
                                                    mdl?.modal?._id && (
                                                        <>

                                                            <div className="w-full py-2">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="col-span-1">
                                                                        <label htmlFor="" className=''>
                                                                            {mdl?.brand?.title}  &nbsp;  {mdl?.modal?.title}
                                                                        </label>

                                                                    </div>
                                                                    <div className="col-span-1">
                                                                        <div className="w-full flex justify-end">
                                                                            <div className="inline-flex">
                                                                                <button type="button" aria-label="Click Me" title='Click Me' onClick={() => handleqty('minus', mdl?.modal?._id, mdl.brand?._id)} className="size-10  border border-blue-gray-600">
                                                                                    <MinusOutlined />
                                                                                </button>
                                                                                <input type="text" value={qty.find(obj => obj.modal == mdl?.modal?._id)?.quantity ?? 0} readOnly className="size-10 text-center leading-12 border-t text-xs font-bold border-b border-blue-gray-600" />
                                                                                <button type='button' title='Increase button' onClick={() => handleqty('plus', mdl?.modal?._id, mdl?.brand?._id)} className="size-10 border border-blue-gray-600">
                                                                                    <PlusOutlined />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        ))
                                    }
                                </div>



                                <div className={`w-full fixed lg:bottom-0 bottom-10 transition-all duration-500  bg-gray-200 start-0 ${copen ? 'translate-y-0' : 'translate-y-full'}`}>
                                    <div className="flex justify-between p-4 ">
                                        <div className="w-1/2">
                                            Total Items : {qty.length}
                                        </div>
                                        <Link to={'/cart'} type='button' className=" uppercase shadow-md shadow-blue-gray-700  font-light text-md px-4 py-3 rounded-sm text-white bg-primary ">Buy it now</Link>

                                    </div>
                                    {/* <button type='button' onClick={addtocart} className="w-full uppercase shadow-md shadow-deep-orange-700  font-light mb-4 text-md px-4 py-3 rounded-sm text-white bg-orange-700 ">Add to cart</button> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="flex *:p-2 *:border *:border-blue-gray-400 *:w-[120px] *:text-xs *:font-bold gap-2 items-center">
                        <button type='button' className={`${s_section == 'specifications' ? 'bg-primary text-white' : ''}`} onClick={() => setSection('specifications')}>
                            Specifications
                        </button>
                        <button type='button' className={`${s_section == 'reviews' ? 'bg-primary text-white' : ''}`} onClick={() => setSection('reviews')}>
                            Reviews
                        </button>

                    </div>
                    <div className="w-full my-5">
                        {
                            s_section == "specifications" && (
                                <>
                                    <Specification description={product?.description} />
                                </>
                            )
                        }
                        {
                            s_section == "reviews" && (
                                <>
                                    {
                                        product && (
                                            <>
                                                <Reviews product={product?._id} />
                                            </>
                                        )
                                    }

                                </>
                            )
                        }
                        {
                            (
                                <>
                                    <div className="w-full my-3">
                                        <SectionDevider />
                                    </div>
                                    <SectionTitle title='Related Products' />
                                    <SimilarProducts category_url={product?.category?.url} />
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct