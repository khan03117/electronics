import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../utils';
// import CartProduct from './CartProduct';
//@ts-ignore
import empty from '../../assets/cart.png'
import { CloseOutlined } from '@ant-design/icons';
import { useCart } from '../../Layout/CartContext';


const Cart: React.FC = () => {
    const { setCartCount } = useCart();
    const token: string | null = localStorage.getItem('_token') ?? null;
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

    const [CartItems, setCartItems] = React.useState<Item[]>([]);
    const [total, setTotal] = useState(0);
    const [code, setCode] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);

    const apply_promo = async () => {
        const data = await axios.post(base_url + 'cart/apply-promo', { promo_code: code }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // Ensure the token is set correctly
            },
        });
        console.log(data);
        setDiscount(data.data.discount);
    }
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
        if (token) {
            getcart_items();
        }

    }, []);
    const findTotal = () => {
        const total = CartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        setTotal(total);
    }
    useEffect(() => {
        findTotal()
    }, [CartItems]);
    const get_cart_count = async () => {
        await axios.get(base_url + 'cart/cart_count', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            setCartCount(resp.data.data);
        })
    }
    const deleteCart = async (id: string) => {
        const token = localStorage.getItem('_token');
        if (!token) {
            throw new Error('No authorization token found');
        }
        await axios.delete(base_url + 'cart/' + id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // Ensure the token is set correctly
            },
        });
        await getcart_items();
        get_cart_count();
    }


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
                                            <div className="grid lg:grid-cols-1 grid-cols-1">
                                                <div className="w-full overflow-x-auto overflow-y-hidden">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className='*:border *:border-blue-gray-200 *:text-xs *:p-2'>
                                                                <th>Sr No</th>
                                                                <th>Product</th>

                                                                <th>Modal</th>
                                                                <th>Qty</th>
                                                                <th>Price</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {

                                                                CartItems.length > 0 && CartItems.map((cr, idx) => (
                                                                    <>
                                                                        <tr className='*:border *:truncate *:overflow-hidden *:text-nowrap *:border-blue-gray-200 *:text-xs *:p-2'>
                                                                            <td>
                                                                                {idx + 1}
                                                                            </td>
                                                                            <td>
                                                                                {cr.product.title}
                                                                            </td>

                                                                            <td>
                                                                                {cr?.brand?.title}  {cr?.modal?.title}
                                                                            </td>
                                                                            <td>
                                                                                {cr.quantity}
                                                                            </td>
                                                                            <td>
                                                                                {cr.quantity * cr.price}
                                                                            </td>
                                                                            <td>
                                                                                <button onClick={() => deleteCart(cr._id)} title="remove" className='text-gray-600 size-6 rounded-full bg-gray-200'>
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
                                                                Enter Promo Code
                                                            </td>
                                                            <td>
                                                                <div className="flex w-full">
                                                                    <input onChange={(e) => setCode(e.target.value)} type="text" placeholder='Enter Promo Code' className="p-2 w-full outline-none border border-primary" />
                                                                    <button onClick={apply_promo} className="bg-primary px-2 text-sm text-white ">Apply</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {
                                                            discount && (
                                                                <>
                                                                    <tr className='*:p-2 *:text-sm'>
                                                                        <td colSpan={2}>
                                                                            <div className="w-full block">
                                                                                <p className="text-green-800">Promo Code applied successfully</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Discount
                                                            </td>
                                                            <td>
                                                                ₹ {discount}

                                                            </td>
                                                        </tr>



                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Net Amount
                                                            </td>
                                                            <td>
                                                                ₹ {(total - discount).toFixed(2)}
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

                    {
                        CartItems.length == 0 && (
                            <>
                                <div className="lg:col-span-4 col-span-2">
                                    <img src={empty} alt="" className="lg:w-48 w-32 mx-auto" />
                                    <div className="text-center">
                                        <h2 className="text-primary lg:text-[2rem] font-bold">
                                            Your cart is empty
                                        </h2>
                                        <Link to={'/shop'} title='Shop' className="bg-primary text-center  text-white rounded-md px-6 py-3 inline-block mt-4">Shop Now</Link>
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