import React from 'react'
import { base_url_img } from '../../utils';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


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
interface CartProductProps {
    item: Item;
    deleteitem: () => void | Promise<void>;
}

const CartProduct: React.FC<CartProductProps> = ({ item, deleteitem }) => {
    return (
        <>
            <Link to={'/single-product/' + item.product.url} className="w-full h-full block productbox relative lg:pt-5  lg:shadow-lg shadow-sm border border-primary/20 pt-4 shadow-blue-gray-500  rounded-xl ">

                <figure className="w-full">
                    <img src={base_url_img + item.product.images[0]} alt="" className="w-full lg:h-28 h-20 object-contain" />
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



                </div>
                <div className="w-full mt-4">
                    <div className="w-1/2 mx-auto border-t border-blue-gray-800 py-4">
                        <button onClick={() => deleteitem()} className="w-full text-xs bg-primary rounded-md shadow-md shadow-blue-gray-300 text-white py-1">
                            Remove
                        </button>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CartProduct
