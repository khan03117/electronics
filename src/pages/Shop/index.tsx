import React, { useState } from "react"
import ProductSlider from "../../component/ProductSlider"
import { Checkbox, Collapse } from "@material-tailwind/react";
import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined, DownOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";

const Shop = () => {
    const [open, setOpen] = useState('');
    const [filo, setFilO] = useState(false);
    const handlefilter = () => {
        setFilO(prev => !prev);
    }
    const items = [
        'https://m.media-amazon.com/images/I/41N0Avct1kL._SY679_.jpg',
        'https://m.media-amazon.com/images/I/61M6p7VahNL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61SDuTH3XkL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61VJpLpweHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51jLrGrPBpL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51EwFkHeO8L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71xMd0d6xcL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61RofAW9BML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61hnO6ktjiL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71GKVUMzSCL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/51RYO482znL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71Al63qjPxL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61s1Ro7VONL._SX679_.jpg'
    ];
    const handleOpen = (url: string) => {
        if (open != url) {
            setOpen(url);
        } else {
            setOpen('');
        }

    }

    const colors = [
        '#ddd', '#727272', '#FF5733', '#FF9033 ', '#FFC433', '#FFFC33 ', '#77FF33', '#3390FF', '#FF3352', '#FF33C7', '#DA33FF', '#9933FF'
    ];
    const filterdiv = (
        <>
            <div className="w-full ">
                <div onClick={() => handleOpen('category')} className="flex cursor-pointer items-center justify-between">
                    <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Categories</h3>
                    <span>
                        <PlusOutlined />
                    </span>
                </div>
                <Collapse open={open == "category"}>
                    <ul className="*:py-1 *:text-sm">
                        {
                            ['Mobile Cover', 'Covers', 'Screen Guard', 'Accessories'].map((elm) => (
                                <>
                                    <li>
                                        <button type="button" className="flex md:text-lg text-sm items-center">
                                            <Checkbox onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />     {elm}
                                        </button>
                                    </li>
                                </>
                            ))
                        }
                    </ul>
                </Collapse>

            </div>
            <div className="w-full">
                <div onClick={() => handleOpen('brand')} className="flex cursor-pointer items-center justify-between">
                    <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Brand</h3>
                    <span>
                        <PlusOutlined />
                    </span>
                </div>

                <Collapse open={open == 'brand'} >
                    <ul>

                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elm) => (
                                <>
                                    <li>
                                        <button type="button" className="flex items-center gap-3">
                                            <Checkbox onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />      Brand {elm}
                                        </button>
                                    </li>
                                </>
                            ))
                        }

                    </ul>
                </Collapse>


            </div>
            <div className="w-full">
                <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Types</h3>
                <div className="flex flex-wrap gap-3 *:border *:border-blue-gray-900 *:text-center *:md:px-3 *:md:py-2  *:p-1 text-sm">
                    <button type="button" title="brand button">Vivo</button>
                    <button type="button" title="brand button">Redmi</button>
                    <button type="button" title="brand button">Iphone</button>
                    <button type="button" title="brand button">Samsung</button>
                    <button type="button" title="brand button">Nokia</button>
                </div>
            </div>
            <div className="w-full">
                <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Tags</h3>
                <div className="flex flex-wrap gap-3 *:border *:border-blue-gray-500 *:md:px-3 *:md:py-2  *:p-1 text-sm">
                    {
                        ['Maroon', 'Fashion', 'Popular', 'Shoes', 'Gold', 'Men', 'Boys'].map((itm) => (
                            <>
                                <button type="button" className="">{itm}</button>
                            </>
                        ))
                    }
                </div>
            </div>
            <div className="w-full">
                <h3 className="md:text-[1.2rem] text-md my-5 border-l-2 relative filtertitle border-black px-2">Colors</h3>
                <div className="flex flex-wrap gap-3 *:border *:border-blue-gray-900  ">
                    {
                        colors.map((itm) => (
                            <>
                                <button title="color button" type="button" style={{ background: `${itm}` }} className={`md:size-9 size-5 rounded-full`}></button>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
    return (
        <>
            {
                filo && (
                    <>
                        <div className="fixed z-[999] top-0 start-0 w-full h-full  bg-black/30">
                            <div className="w-3/4 relative p-4 h-screen bg-white">
                                <button type="button" title="off button" onClick={handlefilter} className="absolute -end-8 top-0 size-8 bg-blue-gray-100 text-black">
                                    <CloseOutlined />
                                </button>
                                {filterdiv}
                            </div>

                        </div>
                    </>
                )
            }
            <section id='shopbanner' className='lg:py-20 py-5'>
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-1">
                        <div className="col-span-1">
                            <div className="w-full text-center">
                                <h1 className='text-white sectiontitle'>Products</h1>
                                <p className='text-sm text-white'>Home / products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="productitem" className="md:py-20 py-5">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-5 grid-cols-1">
                        <div className="col-span-1 ">
                            <div className="w-full px-4 py-2 lg:block hidden sticky top-0">
                                {filterdiv}
                            </div>
                            <div className="md:hidden block mb-5">
                                <div className="grid grid-cols-4">
                                    <div className="col-span-1">
                                        <button>
                                            &#8645; Sort
                                        </button>
                                    </div>
                                    {
                                        ['Category', 'Brand'].map((it) => (
                                            <>
                                                <div className="col-span-1  ">
                                                    <button className="text-start text-sm">
                                                        {it} <DownOutlined className="text-xs" />
                                                    </button>
                                                </div>
                                            </>
                                        ))
                                    }
                                    <div className="col-span-1">
                                        <button>
                                            Filter <FilterOutlined />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="w-full">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 md:gap-4 gap-4">
                                    {
                                        [...items].map((img) => (
                                            <>
                                                <div className="col-span-1">
                                                    <ProductSlider image={img} />
                                                </div>

                                            </>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Shop