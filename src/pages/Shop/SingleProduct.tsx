import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloseOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import Specification from './Specification';
import Reviews from './Reviews';
import axios from 'axios';
import { base_url, base_url_img } from '../../utils';
import Swal from 'sweetalert2';


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
        category: string;
        product_type: string;
        title: string;
        price: number;
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
    const { id } = useParams();
    const token: string | null = localStorage.getItem('_token') ?? null;
    interface Quantity { product: string | undefined; modal: string | undefined; brand: string | undefined; quantity: number | undefined; price: number | undefined; }
    const [qty, setQty] = useState<Quantity[]>([]);
    // const [mobj, setMobj] = useState<Quantity>();
    const [s_section, setSection] = useState('specifications');
    const [product, setProduct] = useState<Product>();
    const [copen, setCopen] = useState<boolean>(false);
    const getProduct = async () => {
        await axios.get(base_url + 'product/show/' + id).then(resp => {
            setProduct(resp.data.data)
        })
    }
    useEffect(() => {
        getProduct();
    }, []);
    const [open, setOpen] = useState(false);
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


    const handleqty = (action: string, id: string, bid: string) => {
        if (token) {


            const modal = product?.modals.find(obj => obj.modal._id == id && obj.brand._id == bid);
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

                            // Update arr[idx] with new quantity
                            arr[idx].quantity = newQuantity;
                            addtocart(arr[idx]);
                            setQty(arr);
                        }
                    }

                }
                setCopen(true);
                setTimeout(() => {
                    setCopen(false);
                }, 2000)
            }
        } else {

            Swal.fire({
                title: 'Error',
                text: 'Please login to add to cart' + token,
                icon: 'error',

            })
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
                setOpen(true);
            }

        })


    }

    return (
        <>

            {
                open && (
                    <>
                        <div className="fixed top-0 end-0 w-full backdrop-blur-sm h-full bg-black/30 z-[9999]">
                            <div className="absolute p-4 lg:w-96 w-full h-full end-0 top-0 bg-white">
                                <div className="w-full *:shadow-sm *:shadow-blue-gray-600 *:rounded-md ">
                                    <div className="w-full mb-4">
                                        <div className="w-full flex relative ">
                                            <button title='Close button' type='button' className="size-4 bg-black/50 leading-2   text-white text-xs absolute -top-2 -end-2 rounded-full">
                                                <CloseOutlined />
                                            </button>
                                            <div className="size-16">
                                                <img src={'fadsfads'} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="w-[calc(100%-5rem)] p-2">
                                                <h4 className="text-sm font-semibold">
                                                    Realme Note 4 Cover guard
                                                </h4>
                                                <p className='flex justify-between text-xs text-blue-gray-500'>
                                                    <span>
                                                        Qty :4
                                                    </span>
                                                    <span>
                                                        ₹ 599.99
                                                    </span>
                                                </p>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="w-full absolute bottom-0 start-0 bg-gray-200 mt-4 pt-4 pb-3 shadow-lg shadow-blue-gray-500 px-4">
                                    <h4 className="text-lg">Subtotal : ₹ 2999.99</h4>
                                    <div className="flex gap-4">
                                        <Link to={'/checkout'} className="w-full bg-orange-500 text-white py-2 rounded px-3 text-center uppercase tracking-widest text-sm">Checkout</Link>
                                        <button type='button' onClick={() => setOpen(false)} className='w-full bg-blue-gray-900 rounded text-white py-2 uppercase tracking-widest text-sm'>Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <section className="lg:py-10 py-4" id="singleproduct">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-8 grid-cols-1 lg:gap-5 gap-6">
                        <div className="md:col-span-4 col-span-5">
                            <div className="w-full">
                                <div className="grid lg:grid-cols-6 grid-cols-6 gap-6">

                                    <div className="lg:col-span-5 md:order-2 order-1 col-span-6 lg:pb-4 pb-10">
                                        <Slider  {...settingsFor} className='slider-for'>
                                            {
                                                product?.images.map((itm) => (
                                                    <>
                                                        <figure className="w-full border border-blue-gray-200  rounded-2xl overflow-hidden ">
                                                            <img src={base_url_img + itm} alt="" className="w-full lg:h-[500px] h-[300px] object-contain" />
                                                        </figure>
                                                    </>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="md:col-span-4 col-span-5">
                            <div className="w-full md:mt-0 mt-20">
                                <h1 className="productname lg:text-[2rem] font-bold text-[18px] mb-4">{product?.title}</h1>
                                <div className="pricebox">

                                    <span className="text-red-600 price">
                                        ₹ {product?.price.toFixed(2)}
                                    </span>
                                    {/* <span className="oldprice ms-1 strike relative line-through">  </span> */}

                                </div>
                                <div className="w-full pb-4 border-b border-blue-gray-200">
                                    <span className="text-xs text-blue-gray-500 block">Inclusive of all taxes</span>
                                    <div className="flex text-orange-500 items-center">
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled /> (42)
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className='text-sm font-bold'>
                                        Availabel modal list {product?.modals.length}
                                    </p>
                                    {
                                        product?.modals.map(mdl => (
                                            <>
                                                <div className="w-full py-2">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="col-span-1">
                                                            <label htmlFor="" className=''>
                                                                {mdl.brand.title}  /  {mdl.modal.title}
                                                            </label>

                                                        </div>
                                                        <div className="col-span-1">
                                                            <div className="w-full flex justify-end">
                                                                <div className="inline-flex">
                                                                    <button type="button" aria-label="Click Me" title='Click Me' onClick={() => handleqty('minus', mdl.modal._id, mdl.brand._id)} className="size-10  border border-blue-gray-600">
                                                                        <MinusOutlined />
                                                                    </button>
                                                                    <input type="text" value={qty.find(obj => obj.modal == mdl.modal._id)?.quantity} readOnly name="" id="" className="size-10 text-center leading-12 border-t text-xs font-bold border-b border-blue-gray-600" />
                                                                    <button type='button' title='Increase button' onClick={() => handleqty('plus', mdl.modal._id, mdl.brand._id)} className="size-10 border border-blue-gray-600">
                                                                        <PlusOutlined />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>



                                <div className={`w-full fixed bottom-0 transition-all duration-500  bg-gray-200 start-0 ${copen ? 'translate-y-0' : 'translate-y-full'}`}>
                                    <div className="flex justify-between p-4 ">
                                        <div className="w-1/2">
                                            Total Items : {qty.length}
                                        </div>
                                        <button type='button' className=" uppercase shadow-md shadow-blue-gray-700  font-light text-md px-4 py-3 rounded-sm text-white bg-primary ">Buy it now</button>

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
                        <button type='button' className={`${s_section == 'similar' ? 'bg-primary text-white' : ''}`} onClick={() => setSection('similar')}>
                            Similar Product
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
                                    <Reviews />
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