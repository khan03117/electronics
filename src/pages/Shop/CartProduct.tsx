import React from 'react'
import { base_url_img } from '../../utils';

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
interface CartProductProps {
    item: Item;
}

const CartProduct: React.FC<CartProductProps> = ({ item }) => {
    return (
        <>
            <div className="w-full block productbox relative lg:pt-5  lg:shadow-lg shadow-sm border border-primary/20 pt-4 shadow-blue-gray-500  rounded-xl ">

                <figure className="w-full">
                    <img src={base_url_img + item.product.images[0]} alt="" className="w-full lg:h-28 h-20 object-contain" />
                </figure>
                <div className="w-full px-5 py-4 text-center">
                    <h4 className="md:text-[1.2rem] text-md md:mb-4 mb-1 font-bold truncate">
                        {item.product.title}
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



                </div>
            </div>
        </>
    )
}

export default CartProduct
