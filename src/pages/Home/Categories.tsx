import { MenuOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// @ts-ignore
import hpimage from '../../assets/hp.png'
import axios from 'axios'
import { base_url, base_url_img } from '../../utils'

const Categories = () => {
    interface Category {
        image: string;
        _id: string;
        url: string;
        title: string;
    }
    const [category, setCategories] = useState<Category[]>([]);
    const getcategories = async () => {
        await axios.get(base_url + 'category').then(resp => {
            setCategories(resp.data.data)
        })
    }
    useEffect(() => {
        getcategories();
    }, [])
    return (
        <>
            <div className="w-full">
                <div className="w-full   bg-black text-white py-4 px-4 rounded-md flex gap-4 items-center">
                    <span>
                        <MenuOutlined />
                    </span>
                    <h4 className="text-sm font-bold">Browse Categories</h4>
                </div>
                <div className="w-full">
                    <ul className='p-0 m-0 list-none *:border-b border-blue-gray-100 shadow-lg shadow-blue-gray-700 rounded-b-md'>
                        {
                            category.map((cat) => (
                                <>
                                    <li>
                                        <Link to={'/shop/category/' + cat.url} className='w-full  mb-3 py-2 px-4 rounded-md flex gap-4 items-center'>
                                            <img src={base_url_img + cat.image} alt="" className="text-sm size-6 object-contain font-bold" />
                                            <span className=''>
                                                {cat.title}
                                            </span>
                                        </Link>
                                    </li>
                                </>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Categories