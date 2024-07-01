import { Input } from '@material-tailwind/react';
import React, { useState } from 'react'
import { base_url } from '../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const token: string | null = localStorage.getItem('_token')
    React.useEffect(() => {
        const token = localStorage.getItem('_token');
        if (token) {
            navigate('/orders');
        }
    }, [navigate]);
    const [signup, setSingup] = useState<boolean>(true);

    const [mobile, setMobile] = useState<string>('');

    const [step, setStep] = useState('1');
    const [msg, setMessage] = useState<string>('');
    const [otp, setOtp] = useState<string>('')
    const handlerequestlogin = async () => {
        if (step == "1") {
            if (mobile && mobile.length == 10) {
                await axios.post(base_url + 'user/send-otp', { mobile: mobile }).then(resp => {
                    setMessage(resp.data.message)
                    if (resp.data.success == "1") {
                        setStep('2');
                    }
                })
            } else {
                setMessage('Mobile number is invalid');
            }

        }
        if (step == "2") {
            if (otp && otp.length == 4) {
                await axios.post(base_url + 'user/verify-otp', { mobile: mobile, otp: otp }).then(resp => {
                    setMessage(resp.data.message)
                    if (resp.data.success == "1") {
                        localStorage.setItem('_token', resp.data.data);
                        setStep('3');
                        window.location.href = "/"
                    }
                })
            } else {
                setMessage('Otp is invalid')
            }

        }
    }

    const mobilehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('')
        setMobile(e.target.value);
    }
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="w-full ">
                        <div className=" lg:w-96 w-full  mx-auto shadow shadow-primary/90 p-3">
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-2">
                                        {
                                            msg && (
                                                <>
                                                    <div className="w-full p-3 rounded-md mb-4 text-deep-orange-600 bg-deep-orange-200">
                                                        {msg}
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className="col-span-1 py-4 pb-10 px-3">
                                            <div className="form-group mb-4">
                                                <div className="flex border border-blue-gray-200 rounded-lg overflow-hidden">
                                                    <span className="p-2">
                                                        +91
                                                    </span>
                                                    <input type="tel" value={mobile} onChange={mobilehandle} placeholder='Enter 10 digit mobile number' className="w-full p-2 focus-within:outline-none outline-none" />
                                                </div>
                                            </div>
                                            {
                                                step == "2" && (
                                                    <>
                                                        <div className="form-group mb-4">
                                                            <div className="flex w-full">
                                                                <Input label='Enter OTP' max={4} onChange={(e) => setOtp(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                            <div className="form-group mb-4">
                                                <button onClick={handlerequestlogin} className="bg-primary rounded-md shadow-lg text-white shadow-deep-orange-600 px-5 py-2 w-full">
                                                    {
                                                        step == "1" && (
                                                            <>
                                                                Send OTP
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        step == "2" && (
                                                            <>
                                                                Verify OTP
                                                            </>
                                                        )
                                                    }
                                                </button>
                                            </div>
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