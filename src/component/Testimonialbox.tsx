import { StarFilled } from "@ant-design/icons"
import React from "react"

interface Props {
    name: string | undefined,
    post: string | undefined,
    image: string | undefined,
    description: string | undefined,
    subject: string | undefined
}
const Testimonialbox = (props: Props) => {
    return (
        <>
            <div className="w-full rounded-xl bg-white shadow-lg shadow-gray-700 py-10 px-6">
                <p className="text-lg mb-2 font-bold">{props.subject}</p>
                <div className="flex text-orange-600 mb-10 items-center gap-1">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                </div>
                <div className="w-full mb-4">
                    <p className="text-md   font-light tracking-[1px]">
                        {props.description}
                    </p>
                </div>
                <div className="w-full">
                    <div className="flex">
                        <div className="size-16 rounded-full overflow-hidden">
                            <img src={props.image} alt="" className="w-full h-full rounded-full border" />
                        </div>
                        <div className="w-[calc(100%-6rem)]">
                            <div className="w-full ps-5">
                                <h4 className="text-lg font-bold">{props.name}</h4>
                                <p className="text-md font-light text-gray-800">{props.post}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonialbox