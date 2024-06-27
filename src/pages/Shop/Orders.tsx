import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url } from '../../utils';
import CartProduct from './CartProduct';

const Orders = () => {
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
                    <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
                            {
                                orders.map((order, index) => (
                                    <>
                                    <CartProduct item={order}/>
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