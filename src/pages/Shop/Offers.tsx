import React, { useEffect, useState } from 'react'
import ProductSlider from '../../component/ProductSlider';
import axios from 'axios';
import { base_url } from '../../utils';

const Offers: React.FC = () => {
    interface Modal {
        brand: string;
        modal: string;
        moq: number;
        stock: number;
        _id: string;
    }

    interface Product {
        _id: string;
        category: string;
        title: string;
        price: number;
        images: string[];
        modals: Modal[];
        product_type: string;
        description: string;
        is_hidden: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
        url: string;
        mrp: number;
        seller: string;
    }

    interface Itm {
        _id: string;
        product: Product;
        start_at: string;
        end_at: string;
        discount_percent: number;
        is_Active: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    const [items, setItem] = useState<Itm[]>([]);
    const getdata = async () => {
        await axios.get(base_url + 'offer/active').then(rsp => {
            setItem(rsp.data.data)
        })
    }
    useEffect(() => {
        getdata();
    }, []);
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        {
                            items.map(pdt => (
                                <>
                                    <ProductSlider product={pdt.product} offer={pdt} />
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Offers
