import axios from 'axios';
import React from 'react'
import { base_url, base_url_img } from '../../utils';
import MobileSidebar from '../../Layout/MobileSidebar';
import { Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
//@ts-ignore
import categoryimg from '../../assets/application.png'
//@ts-ignore
import offerimg from '../../assets/gift.png';
//@ts-ignore
import brandimg from '../../assets/brand-image.png';


const CategoriesScroll: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleCategory = () => {
        setOpen(!open);
    }
    interface Category {
        image: string;
        _id: string;
        url: string;
        title: string;
    }
    const [category, setCategories] = React.useState<Category[]>([]);
    const getcategories = async () => {
        await axios.get(base_url + 'category').then(resp => {
            setCategories(resp.data.data)
        })
    }
    React.useEffect(() => {
        getcategories();
    }, [])
    return (
        <>
            <MobileSidebar open={open} setOpen={setOpen} />
            <PerfectScrollbar className="w-full py-2">
                <div className="w-full overflow-x-auto overflow-y-hidden   flex gap-4 items-center">


                    <div className=' block sidebar__box'>
                        <div onClick={handleCategory} className="w-full text-center lg:p-10 p-0">
                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                <img src={categoryimg} alt="" className="max-w-full mx-auto" />
                            </figure>
                            <div className="w-full">
                                <h2 className='text-black font-bold  lg:text-md text-xs'>Categories</h2>
                            </div>
                        </div>
                    </div>
                    <Link to={'/offers'} className=' block sidebar__box'>
                        <div className="w-full text-center lg:p-10 p-0">
                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                <img src={offerimg} alt="" className="max-w-full mx-auto" />
                            </figure>
                            <div className="w-full">
                                <h2 className='text-black font-bold text-nowrap  lg:text-md text-xs'>Offer zone</h2>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/brands'} className=' block sidebar__box'>
                        <div className="w-full text-center lg:p-10 p-0">
                            <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                <img src={brandimg} alt="" className="max-w-full mx-auto" />
                            </figure>
                            <div className="w-full">
                                <h2 className='text-black font-bold  lg:text-md text-xs'>Brands</h2>
                            </div>
                        </div>
                    </Link>
                    {
                        category.map((crr) => (
                            <Link to={'/shop/category/' + crr.url} className="block sidebar__box">
                                <div className="w-full text-center lg:p-10 p-0">
                                    <figure className='lg:size-16 block lg:mb-5 mb-1 text-center mx-auto size-10 overflow-hidden rounded-full'>
                                        <img src={base_url_img + crr.image} alt='image' className='  object-contain' />
                                    </figure>
                                    <div className="w-full">
                                        <h2 className='text-black font-bold  lg:text-md text-xs text-nowrap'>{crr.title}</h2>

                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>

            </PerfectScrollbar>
        </>
    )
}

export default CategoriesScroll