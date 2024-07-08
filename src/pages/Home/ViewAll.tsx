import { RightOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

interface Prop {
    url: string;
}
const ViewAll: React.FC<Prop> = ({ url }) => {
    return (
        <>
            <Link to={'/shop/category/' + url} className="  md:px-5 px-2 text-xs uppercase font-bold  py-2  text-primary">
                View All
                <RightOutlined className='md:ms-3 ms-1' />
            </Link>
        </>
    )
}

export default ViewAll
