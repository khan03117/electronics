import React, { useState } from 'react'
import Testimonialbox from '../../component/Testimonialbox'
import axios from 'axios';
import { base_url } from '../../utils';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
interface Prop {
    product: string;
}
const Reviews: React.FC<Prop> = ({ product }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0) // Initial value
    const [review, setReview] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const token: string | null = localStorage.getItem('_token') ?? null;
    interface item {
        _id: string;
        name: string;
        product: {
            _id: string;
            title: string;
        },
        rating: string;
        location?: string | undefined;
        image: string | undefined;
        description: string | undefined;
        subject: string | undefined;
    }
    const [reviews, setReviews] = useState<item[]>([]);
    const getdata = async () => {
        await axios.get(base_url + 'testimonial?product' + product).then((resp) => {
            setReviews(resp.data.data);
        })
    }
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('rating', rating.toString());
        data.append('description', review);
        data.append('subject', subject);
        data.append('product', product);
        axios.post(base_url + 'testimonial', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                }
        }).then((resp) => {
            setMessage(resp.data.message);
        })
    }
    React.useEffect(() => {
        getdata();
    }, [])
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2">
                        <div className="lg:col-span-2 col-span-2">
                            <form className="mt-8 space-y-6 lg:p-8 p-4 shadow-xl shadow-blue-gray-200" onSubmit={handleSubmit}>
                                {
                                    message && (
                                        <>
                                            <div className="w-full mb-8 bg-green-800 text-white p-4 text-sm">
                                                {message}
                                            </div>
                                        </>
                                    )
                                }
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div className="mb-8">
                                        <label htmlFor="name" >Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                  
                                    <div className="mb-8 block pt-5">
                                        <label htmlFor="subject" >Subject</label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="py-5">
                                        <div className="w-full">
                                            <label htmlFor="rating" >Rating</label>
                                           <div className="w-full">
                                           <Rating className='lg:w-1/4 w-1/2' value={rating} onChange={setRating} />
                                           </div>
                                        </div>

                                    </div>
                                    <div className="mb-8 ">
                                        <label htmlFor="review" >Review</label>
                                        <textarea
                                            id="review"
                                            name="review"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Write your review here..."
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-2"></div>
                        {
                            reviews.map((itm) => (
                                <Testimonialbox data={itm} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reviews