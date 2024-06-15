import { MenuOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
// @ts-ignore
import hpimage from '../../assets/hp.png'

const Categories = () => {
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
                            [...Array(6)].map(() => (
                                <>
                                    <li>
                                        <Link to={'/'} className='w-full  mb-3 py-2 px-4 rounded-md flex gap-4 items-center'>
                                            <img src={hpimage} alt="" className="text-sm font-bold" />
                                            <span className=''>
                                                Home applicance
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