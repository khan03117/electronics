import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url, base_url_img } from '../../utils';
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';
import { Carousel } from "@material-tailwind/react";

const Orders = () => {
    interface Product {
        _id: string;
        title: string;
        images: string[];
        url: string;
    }

    interface Brand {
        _id: string;
        title: string;
        image: string;
    }

    interface Modal {
        _id: string;
        title: string;
    }

    interface Item {
        _id: string;
        user: string;
        product: Product;
        brand: Brand;
        modal: Modal;
        price: number;
        quantity: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    const [orders, setOrder] = useState<Item[]>([]);
    const getorders = async () => {
        await axios.get(base_url + 'cart/orders', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('_token')
            }
        }).then(resp => {
            setOrder(resp.data.data);
        })

    }
    useEffect(() => {
        getorders();
    }, [])
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="w-full">
                        <h2 className="sectiontitle">
                            My Orders
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
                        {
                            orders.map((item) => (
                                <>
                                    <Link to={'/single-product/' + item.product.url} className="w-full h-full block productbox relative lg:pt-5  lg:shadow-lg shadow-sm border border-primary/20 pt-4 shadow-blue-gray-500  rounded-xl ">

                                        <figure className="w-full">
                                            <Carousel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                {
                                                    item.product.images.map(img => (
                                                        <>
                                                            <img src={base_url_img + img} alt="" className="w-full lg:h-28 h-20 object-contain" />
                                                        </>
                                                    ))
                                                }
                                            </Carousel>

                                        </figure>
                                        <div className="w-full px-5 py-1 text-center">
                                            <h4 className="md:text-[1.2rem] text-md md:mb-4 mb-1 font-bold ">
                                                {item.product.title} /  {item.brand.title} /  {item.modal.title}
                                            </h4>
                                            <table className="w-full">
                                                <tbody className='*:text-sm'>
                                                    <tr className='*:py-1 border-b border-blue-gray-100'>
                                                        <td className='text-start '>
                                                            Unit Price
                                                        </td>
                                                        <td className='text-end '>
                                                            {item.price}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:py-1 border-b border-blue-gray-100'>
                                                        <td className='text-start '>
                                                            Quantity
                                                        </td>
                                                        <td className='text-end '>
                                                            {item.quantity}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:py-1'>
                                                        <td className='text-start '>
                                                            Total Price
                                                        </td>
                                                        <td className='text-end '>
                                                            {item.price * item.quantity}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="w-full mt-2 pt-2">
                                                <div className="w-1/2 mx-auto border border-blue-gray-80"></div>
                                                <div className="w-full mt-1">
                                                    <span className="font-bold text-sm">
                                                        Status :</span>
                                                    <span className="ms-2 text-sm text-primary">
                                                        New Order
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Orders