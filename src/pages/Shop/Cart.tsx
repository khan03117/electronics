import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    interface VariantDetail {
        id: number;
        product_id: number;
        varient_id: string;
        v_key: string;
        v_val: string;
        created_at: string | null;
        is_deleted: string;
        updated_at: string | null;
    }
    interface Product {
        id: number;
        category_id: number;
        subcategory_id: number;
        endcategory_id: number | null;
        url: string;
        name: string;
        sku: string;
        description: string;
        is_hide: string;
        created_at: string;
        updated_at: string | null;
    }
    interface Variant {
        id: number;
        url: string;
        product_id: number;
        varient_id: string;
        mrp: number;
        price: number;
        images: string;
        skuid: string;
        is_deleted: string;
        created_at: string | null;
        updated_at: string | null;
        details: VariantDetail[];
    }
    interface CartItem {
        id: number;
        session_id: string;
        user_id: string;
        product_id: number;
        varient_id: string;
        quantity: number;
        price: number;
        is_deal: string;
        size: string;
        is_paid: string;
        delivery_status: number;
        transaction_id: string | null;
        created_at: string;
        updated_at: string | null;
        product: Product;
        varient: Variant;
    }

    const [CartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [charge, setCharge] = useState(0);
    const images = [
        'https://m.media-amazon.com/images/I/41N0Avct1kL._SY679_.jpg',
        'https://m.media-amazon.com/images/I/61M6p7VahNL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61SDuTH3XkL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61VJpLpweHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51jLrGrPBpL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51EwFkHeO8L._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71xMd0d6xcL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61RofAW9BML._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61hnO6ktjiL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71GKVUMzSCL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/51RYO482znL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/71Al63qjPxL._SX679_.jpg',
        // 'https://m.media-amazon.com/images/I/61s1Ro7VONL._SX679_.jpg'
    ];

    return (
        <>
            <section className="py-10">
                <div className="container">
                    {
                        images.length > 0 && (
                            <>

                                <div className="grid lg:grid-cols-6 grid-cols-1 gap-5">
                                    <div className="lg:col-span-4 col-span-12 overflow-hidden">
                                        <div className="w-full min-w-[600px] overflow-x-auto">
                                            <table className="w-full *:text-sm table-fixed bg-white shadow-md shadow-blue-gray-500 rounded-xl overflow-hidden">
                                                <thead>
                                                    <tr className='*:p-2 *:border *:border-blue-gray-200  *:bg-white *:text-black'>
                                                        <th>Image</th>
                                                        <th>Product</th>
                                                        <th>Quantity</th>
                                                        <th>Size</th>
                                                        <th>Price</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        images.map(cr => (
                                                            <>
                                                                <tr className='*:p-2 *:border *:border-blue-gray-200'>
                                                                    <td>
                                                                        <img src={cr} alt="" className="size-24 object-cover" />

                                                                    </td>
                                                                    <td>
                                                                        Redmi Note 12 Pro max Cover Guard
                                                                    </td>
                                                                    <td>
                                                                        3
                                                                    </td>
                                                                    <td>
                                                                        Compatiable
                                                                    </td>
                                                                    <td>
                                                                        ₹ 899.99
                                                                    </td>
                                                                    <td>
                                                                        <button className="size-6 bg-black/50 leading-6 text-white text-sm rounded-full">
                                                                            <CloseOutlined />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
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
                                                                ₹ {CartItems.reduce((acc, itm) => acc + itm.price, 0)}
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Delivery
                                                            </td>
                                                            <td>
                                                                ₹ {charge.toFixed(2)}
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
                                                                ₹ {(CartItems.reduce((acc, itm) => acc + itm.price, 0) + charge).toFixed(2)}
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