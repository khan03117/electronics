import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

const Shorting = () => {
    const arrs = [
        {
            title: "New Arrival",
            action: "new"
        },
        {
            title: "Price (High to Low)",
            action: "high_to_low"
        },
        {
            title: "Price (High to Low)",
            action: "high_to_low"
        },
    ];
    return (
        <>
            <div className="w-full p-3 bg-blue-gray-100 rounded-t-lg">
                <div className="card-header flex pb-1 border-b border-blue-gray-100 justify-between">
                    <h4 className="text-sm">SORT</h4>
                    <button type='button' title='Close button' className="text-sm">
                        <CloseOutlined />
                    </button>
                </div>
                <div className="card-body">
                    {
                        []
                    }
                </div>
            </div>
        </>
    )
}

export default Shorting
