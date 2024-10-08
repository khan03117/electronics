import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url, base_url_img } from '../../utils';
import SectionTitle from '../../component/SectionTitle';
import { Link } from 'react-router-dom';
import Banner from '../Home/Banner';

const Brands: React.FC = () => {
    interface Seller {
        _id: string;
        image: string;
        title: string;
        url: string;
    }
    const [sellers, setSellers] = useState<Seller[]>([]);
    const getdata = async () => {
        await axios.get(base_url + 'seller').then((resp) => {
            setSellers(resp.data.data);
        })
    }
    useEffect(() => {
        getdata();
    }, []);
    return (
        <>
            <section>
                <Banner type='brand' />
            </section>
            <section className="lg:py-10 py-5">
                <div className="container">
                    <div className="w-full mb-5">
                        <SectionTitle title='Top Brands' />
                    </div>
                    <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
                        {
                            sellers.map(sellr => (
                                <>
                                    <div className="col-span-1">
                                        <Link to={'/shop/brand/' + sellr.url} className="w-full h-full relative block border border-blue-gray-300 shadow-sm shadow-blue-gray-500 rounded-lg p-4 ">

                                            <img src={base_url_img + sellr.image} alt="" className="max-w-full mx-auto object-contain" />
                                            <div className="w-full mt-4 text-center ">
                                                <h4 className="lg:text-lg uppercase  text-md  font-bold">
                                                    {sellr.title}
                                                </h4>
                                            </div>

                                        </Link>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Brands
