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
            <div className="py-2">


                <div className="w-full rounded-xl bg-white shadow-lg shadow-gray-700 py-10 lg:px-6 px-2 ">
                    <p className="lg:text-lg text-sm mb-2 font-bold">{props.subject}</p>
                    <div className="flex text-orange-600 lg:mb-10 mb-4 items-center gap-1">
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                    </div>
                    <div className="w-full mb-4">
                        <p className="lg:text-md  text-sm  lg:font-light tracking-[1px]">
                            {props.description}
                        </p>
                    </div>
                    <div className="w-full">
                        <div className="flex ">
                            <div className="lg:size-16 size-8 lg:mx-0 mx-auto rounded-full overflow-hidden">
                                <img src={props.image} alt="" className="w-full h-full rounded-full border" />
                            </div>
                            <div className="lg:w-[calc(100%-2rem)]">
                                <div className="w-full lg:ps-5 ps-2">
                                    <h4 className="lg:text-lg text-sm font-bold">{props.name}</h4>
                                    <p className="lg:text-md text-xs font-light text-gray-800">{props.post}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonialbox