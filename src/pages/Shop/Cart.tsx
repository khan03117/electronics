import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base_url, base_url_img } from '../../utils';
import CartProduct from './CartProduct';


const Cart: React.FC = () => {
    const token: string | null = localStorage.getItem('_token') ?? null;
    interface Product {
        _id: string;
        title: string;
        images: string[];
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

    const [CartItems, setCartItems] = React.useState<Item[]>([]);
    const [total, setTotal] = useState(0);
    const getcart_items = async () => {
        await axios.get(base_url + 'cart', {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            setCartItems(resp.data.data)
        })
    }
    useEffect(() => {
        getcart_items();
    }, []);
    const findTotal = () => {
        const total = CartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        setTotal(total);
    }
    useEffect(() => {
        findTotal()
    }, [CartItems])

    return (
        <>
            <section className="py-10">
                <div className="container">
                    {
                        CartItems.length > 0 && (
                            <>

                                <div className="grid lg:grid-cols-6 grid-cols-1 gap-5">
                                    <div className="lg:col-span-4 col-span-12 overflow-hidden">
                                        <div className="w-full  overflow-x-auto">
                                            <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
                                                {

                                                    CartItems.map(cr => (
                                                        <>
                                                            <div className="col-span-1">
                                                                <CartProduct item={cr} />

                                                            </div>

                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-2 col-span-12">
                                        <div className="w-full px-4">
                                            <div className="w-full p-4 rounded-lg shadow-md shadow-blue-gray-100 bg-deep-orange-50">
                                                <table className="w-full">
                                                    <tbody >
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Cart total
                                                            </td>
                                                            <td>
                                                                ₹ {total}
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Delivery
                                                            </td>
                                                            <td>
                                                                ₹ {0.00}
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Discount
                                                            </td>
                                                            <td>
                                                                ₹ 0.00
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Net Amount
                                                            </td>
                                                            <td>
                                                                ₹ {total.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-4 w-full">
                                                    <Link to={'/checkout'} className="w-full shadow-lg shadow-blue-gray-300 block text-center rounded-full py-2 bg-white text-black">Checkout</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    }



                </div>
            </section>
        </>
    )
}

export default Cart