import { Input } from 'postcss';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [signup, setSingup] = useState(false);
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="w-full ">
                        <div className=" lg:w-96 w-full  mx-auto shadow shadow-primary/90 p-3">
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-2">
                                        <div className="col-span-1 py-4 pb-10 px-3">
                                            <h2 className="sectiontitle mb-4">
                                                {signup ? 'Sign Up' : 'Log In'}
                                            </h2>
                                            <div className="form-group mb-4">
                                                <label htmlFor="">Enter Name</label>
                                                <input type="text" name="" placeholder='Enter name' id="" className="w-full outline-none p-2 border border-blue-gray-400" />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label htmlFor="">Enter Email</label>
                                                <input type="text" name="" placeholder='Enter name' id="" className="w-full outline-none p-2 border border-blue-gray-400" />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label htmlFor="">Enter Moblie</label>
                                                <input type="text" name="" placeholder='Enter name' id="" className="w-full outline-none p-2 border border-blue-gray-400" />
                                            </div>
                                            <div className="form-group mb-4">
                                               <button className="bg-primary shadow-lg shadow-deep-orange-600 px-5 py-2 w-full">Login</button>
                                            </div>
                                            <Link to={'/'} className="underline text-sm">Already have an account login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login