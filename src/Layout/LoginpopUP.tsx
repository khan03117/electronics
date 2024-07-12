import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { base_url } from '../utils'
import Swal from 'sweetalert2';
import { Dialog, DialogBody, DialogHeader, Input } from '@material-tailwind/react';

interface Prop {
    isopen: boolean,
    setOpen: () => void;
}
const LoginpopUP: React.FC<Prop> = ({ isopen, setOpen }) => {
    const initialstep = localStorage.getItem('_token') ? '3' : '1';
    const [mobile, setMobile] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [step, setStep] = React.useState(initialstep);
    const [msg, setMessage] = React.useState<string>('');
    const [rotp, setRotp] = React.useState<string>('');
    const [time, setTimeLeft] = React.useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const mobilehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('')
        setMobile(e.target.value);
    }
    const otphandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('')
        setOtp(e.target.value);
    }
    const signuphandle = () => {
        setOpen(!isopen);
    
    }
    const handlerequestlogin = async () => {
        if (step == "1") {
            if (mobile && mobile.length == 10) {
                await axios.post(base_url + 'user/send-otp', { mobile: mobile }).then(resp => {
                    setMessage(resp.data.message)
                    if (resp.data.success == "1") {
                        setRotp(resp.data.otp);
                        setStep('2');
                        setTimeLeft(20)
                    }
                })
            } else {
                Swal.fire({
                    title: 'Mobile must be 10 digit valid indian mobile number.',
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
                        window.location.reload();
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

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (time > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [time]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <>
            <Dialog open={open} className='z-[1059]' size='xs' handler={signuphandle} ref={ref}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="w-full flex justify-between">
                        <h4 className="text-black text-md">Login</h4>
                        {time < 20 && time > 0 && (
                            <span>{time}</span>
                        )}
                        {rotp}
                    </div>
                </DialogHeader>
                <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="w-full">
                        {msg && (
                            <div className="alertbox mb-4 p-2 bg-deep-orange-100 text-white rounded-md">
                                <p className="text-deep-orange-500 text-sm">
                                    {msg}
                                </p>
                            </div>
                        )}
                        <div className="form-group mb-4">
                            <div className="flex border border-blue-gray-200 rounded-lg overflow-hidden">
                                <span className="p-2">+91</span>
                                <input type="text" value={mobile} onChange={mobilehandle} placeholder='Enter 10 digit mobile number' className="w-full p-2 focus-within:outline-none outline-none" />
                            </div>
                        </div>
                        {step == "2" && (
                            <div className="form-group mb-4">
                                <div className="flex w-full">
                                    <Input label='Enter OTP' max={4} onChange={otphandle} crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <button type="button" onClick={handlerequestlogin} className='w-full rounded-lg p-2 bg-primary text-white'>
                                {step == "1" ? "Send OTP" : "Verify OTP"}
                            </button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default LoginpopUP
