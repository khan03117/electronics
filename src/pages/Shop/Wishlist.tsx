import axios from 'axios'
import React, { useEffect } from 'react'
import { base_url } from '../../utils'
import ProductSlider from '../../component/ProductSlider';

const Wishlist: React.FC = () => {
    interface Modal {
        brand: string;
        modal: string;
        moq: number;
        stock: number;
        _id: string;
    }


    interface Product {
        _id: string;
        url: string;
        category: string;
        product_type: string;
        title: string;
        price: number;
        images: string[];
        modals: Modal[];
        description: string;
        is_hidden: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    interface Prop {
        user : string;
        product : Product;
    }
    const [wishlist, setWishlist] = React.useState<Prop[]>([]);
    const token: string | null = localStorage.getItem('_token') ?? null;
    const getwishlit = async () => {
        await axios.get(base_url + 'cart/wishlist', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            setWishlist(resp.data.data);
        })
    }
    useEffect(() => {
        getwishlit()
    }, [])
    return (
        <>
            <section className='lg:py-10 py-5'>
                <div className="container">
                <div className="w-full">
                        <h2 className="sectiontitle">
                            My Wishlist
                        </h2>
                    </div>
                    
                    <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2">
                        {
                            wishlist.map((item) => {
                                return (
                                    <div className="col-span-1">
                                     
                                        <ProductSlider product={item.product} />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Wishlist
