import { StarFilled, StarOutlined } from "@ant-design/icons"
import React from "react"
import { base_url_img } from "../utils";

interface Props {
    rating: string;
    name: string | undefined;
    location?: string | undefined;
    image: string | undefined;
    description: string | undefined;
    subject: string | undefined;
}
interface Data {
    data: Props
}
const Testimonialbox: React.FC<Data> = ({ data }) => {
    return (
        <>
            <div className="py-2 w-full h-full">


                <div className="w-full h-full rounded-xl bg-white lg:shadow-lg shadow-md shadow-blue-gray-300 lg:shadow-gray-700 lg:py-10 lg:px-6 px-2 ">
                    <p className="lg:text-lg text-sm mb-2 font-bold">{data.subject}</p>
                    <div className="flex text-orange-600 lg:mb-10 mb-4 items-center gap-1">
                        {
                            [...Array(parseInt(data.rating))].map(() => (
                                <>
                                    <StarFilled />
                                </>
                            ))
                        }
                        {
                            [...Array(5 - parseInt(data.rating))].map(() => (
                                <>
                                    <StarOutlined />
                                </>
                            ))
                        }

                    </div>
                    <div className="w-full mb-4">
                        <p className="lg:text-md  text-sm   tracking-[1px]">
                            {data.description}
                        </p>
                    </div>
                    <div className="w-full">
                        <div className="flex ">
                            <div className="lg:size-16 size-8 lg:mx-0 mx-auto rounded-full overflow-hidden">
                                <img src={base_url_img + data.image} alt="" className="w-full h-full rounded-full border" />
                            </div>
                            <div className="lg:w-[calc(100%-2rem)]">
                                <div className="w-full lg:ps-5 ps-2">
                                    <h4 className="lg:text-lg text-sm font-bold">{data.name}</h4>
                                    <p className="lg:text-md text-xs font-light text-gray-800">{data?.location ?? 'End User'}</p>
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