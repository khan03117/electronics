import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// @ts-ignore
import logoimg from './../assets/logo.png';
import { DashboardOutlined, LogoutOutlined, OrderedListOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ThemeNavbar from './ThemeNavbar';
import {
    Dialog, DialogBody, DialogHeader, Input, Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from '@material-tailwind/react';
import axios from 'axios';
import { base_url } from '../utils';
import Swal from 'sweetalert2';



const Header = () => {
    const [open, setOpen] = useState(false);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const initialstep = localStorage.getItem('_token') ? '3' : '1';
    const [step, setStep] = useState(initialstep);
    const [msg, setMessage] = useState<string>('');
    const [time, setTimeLeft] = useState(0);


    const mobilehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('')
        setMobile(e.target.value);
    }
    const otphandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('')
        setOtp(e.target.value);
    }
    const signuphandle = () => {
        setOpen(!open);
    }
    useEffect(() => {
        let timer: number | undefined;
        if (time > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [time]);

    const handlerequestlogin = async () => {
        if (step == "1") {
            if (mobile && mobile.length == 10) {
                await axios.post(base_url + 'user/send-otp', { mobile: mobile }).then(resp => {
                    setMessage(resp.data.message)
                    if (resp.data.success == "1") {
                        setStep('2');
                        setTimeLeft(20)
                    }
                })
            } else {
                Swal.fire({
                    title: 'Mobile must be 10  digit valid indian mobile number.',
                    text: 'mobile is invalid',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                })
            }

        }
        if (step == "2") {
            if (otp && otp.length == 4) {
                await axios.post(base_url + 'user/verify-otp', { mobile: mobile, otp: otp }).then(resp => {
                    setMessage(resp.data.message)
                    if (resp.data.success == "1") {
                        localStorage.setItem('_token', resp.data.data);
                        setStep('3');
                        setOpen(false);
                    }
                })
            } else {
                Swal.fire({
                    title: 'OTP must be 4 digit number.',
                    text: 'otp is invalid',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                })
            }

        }
    }



    return (
        <>
            <Dialog open={open} className='z-[1059]' size='xs' handler={signuphandle} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="w-full flex justify-between">
                        <h4 className="text-black text-md">Login</h4>

                        {time < 20 && time > 0 && (
                            <>
                                <span>
                                    {time}
                                </span>
                            </>
                        )}


                    </div>
                </DialogHeader>
                <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="w-full">
                        {
                            msg && (
                                <>
                                    <div className="alertbox mb-4 p-2 bg-deep-orange-100 text-white rounded-md">
                                        <p className="text-deep-orange-500 text-sm">
                                            {msg}
                                        </p>
                                    </div>
                                </>
                            )
                        }
                        <div className="form-group mb-4">
                            <div className="flex border border-blue-gray-200 rounded-lg overflow-hidden">
                                <span className="p-2">
                                    +91
                                </span>
                                <input type="text" value={mobile} onChange={mobilehandle} placeholder='Enter 10 digit mobile number' className="w-full p-2 focus-within:outline-none outline-none" />
                            </div>
                        </div>
                        {
                            step == "2" && (
                                <>
                                    <div className="form-group mb-4">
                                        <div className="flex w-full">
                                            <Input label='Enter OTP' max={4} onChange={otphandle} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                        </div>
                                    </div>
                                </>
                            )
                        }


                        <div className="form-group">
                            <button type="button" onClick={handlerequestlogin} title='button' className='w-full rounded-lg p-2 bg-primary text-white'>
                                {step == "1" && (
                                    <>
                                        Send OTP
                                    </>
                                )}
                                {step == "2" && (
                                    <>
                                        Verify OTP
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
            <section className='lg:py-2 py-3'>
                <ThemeNavbar />
            </section>
            <section className="lg:py-5  lg:mb-0 mb-3">
                <div className="container">
                    <div className="grid lg:grid-cols-12 md:grid-cols-1 grid-cols-1 gap-4">
                        <div className="lg:col-span-2 col-span-6 lg:order-1 order-1 lg:block hidden">
                            <div className="w-full">
                                <Link to={'/'}>
                                    <img src={logoimg} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12 lg:order-2 order-3">
                            <div className="w-full">
                                <div className='flex'>
                                    <div className="flex w-full rounded-lg overflow-hidden border border-blue-gray-300">
                                        <span className="icon p-2 text-gray-600">
                                            <SearchOutlined />
                                        </span>
                                        <input type='text' placeholder='Search our store' className=' outline-none rounded-none  border-none w-full py-2 px-4 lg:text-sm text-xs'></input>
                                    </div>
                                    {/* <button className='bg-primary py-2 lg:px-7 px-2  rounded-e-lg text-white border border-1 border-primary lg:text-lg text-xs uppercase tracking-widest font-dark'>Search</button> */}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 col-span-6 lg:order-3 order-2 lg:block hidden">
                            <div className="w-full text-end">
                                <Link to={'/cart'} className='lg:text-[1.5rem] text-[1.2rem] pl-4'> <ShoppingCartOutlined /></Link>
                                {
                                    step != "3" ? (
                                        <>
                                            <button type='button' title='login button' onClick={signuphandle} className='lg:text-[1.5rem] text-[1.2rem] pl-4'> <UserOutlined /></button>
                                        </>
                                    ) : (
                                        <>
                                            <Menu>
                                                <MenuHandler>
                                                    <button title='menu icon' className='ms-4 lg:text-[1.5rem] text-[1.2rem]'>
                                                        <DashboardOutlined />
                                                    </button>
                                                </MenuHandler>
                                                <MenuList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <MenuItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <Link to={'/orders'}>
                                                            <OrderedListOutlined />
                                                            <span className="ms-2">Orders</span>
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <Link to={'/logout'}>
                                                            <LogoutOutlined />
                                                            <span className="ms-2">
                                                                Logout
                                                            </span>
                                                        </Link>
                                                    </MenuItem>

                                                </MenuList>
                                            </Menu>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Header