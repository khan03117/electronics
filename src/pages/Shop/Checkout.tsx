import { Checkbox } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const token: string | null = localStorage.getItem('_token');

    interface InputEvent {
        target: HTMLInputElement | HTMLSelectElement;
    }
    interface Error {
        msg: string,
        path: string
    }
    interface State {
        id: number,
        name: string | undefined,
        state: string | undefined
    }
    interface FormData {
        [key: string]: string;
    }
    interface PostOffice {
        Name: string;
        Description: string | null;
        BranchType: string;
        DeliveryStatus: string;
        Circle: string;
        District: string;
        Division: string;
        Region: string;
        Block: string;
        State: string;
        Country: string;
        Pincode: string;
    }
    interface User {
        _id: string;
        name: string;
        email: string;
        mobile: string;
    }
    interface UserAddress {
        _id: string;
        user: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState<string>('0');
    const [pincode, setPincode] = useState<string>('');
    const [fdata, setFdata] = useState<FormData>({});
    const [errors, setErrors] = useState<Error[]>([]);
    const [location, setLocation] = useState<PostOffice[]>();
    const [user, setUser] = useState<User>();
    const [address_id, setAddressId] = useState<string>('')
    const [loading, setLoading] = React.useState(false);
    const [alladd, setAlladd] = useState<UserAddress[]>([]);
    const getaddress = async () => {
        const resp = await axios.get(base_url + 'user/address', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        setAlladd(resp.data.data);
    }


    const getuser = async () => {
        const udt = await axios.get(base_url + 'user', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(udt.data.data);
    }

    const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPincode(e.target.value);
        const data = { ...fdata };
        data['state'] = '';
        data['city'] = '';
        setFdata(data);
    }
    const getlocation = async () => {
        await axios.get('https://api.postalpincode.in/pincode/' + pincode).then((resp) => {
            if (resp.data[0].Status === "Success") {
                const postoffice = resp.data[0].PostOffice;
                setLocation(postoffice)
            }
        })
    }
    const setfdata = () => {
        const data = { ...fdata };

        if (location) {
            const arr = {};
            arr['name'] = data?.name;
            arr['email'] = data?.email;
            arr['state'] = location[0].State;
            arr['city'] = location[0].District;
            setFdata(arr);
        }
    }
    useEffect(() => {
        setfdata();
        getuser();
        getaddress();
    }, [location])
    useEffect(() => {
        if (pincode.length == 6) {
            getlocation();
        }
    }, [pincode])
    const handlefdata = (e: InputEvent) => {
        const key = e.target.name;
        const val = e.target.value;
        setFdata((prev) => ({ ...prev, [key]: val }));
    }
    interface ValidationError {
        path: string;
        msg: string;
    }
    const validation = () => {
        const err: ValidationError[] = [];
        if (!name) {
            err.push({ path: 'name', msg: "Name is required" });
        }
        if (!email) {
            err.push({ path: 'email', msg: "Email is required" });
        }
        if (!address_id) {
            if (!fdata?.address) {
                err.push({ path: 'address', msg: "Address is required" });
            }
            if (!fdata?.city) {
                err.push({ path: 'city', msg: "city is required" })
            }

            if (!fdata?.state) {
                err.push({ path: 'state_id', msg: "state is required" })
            }
        }

        if (err.length > 0) {
            setErrors(err);
            return false;
        }
        return true;
    }
    useEffect(() => {
        console.log(fdata)
    }, [fdata])
    const checkoutnow = async (action: string) => {
        if (validation()) {
            try {
                setLoading(true)
                const data = { ...fdata };
                data['name'] = name;
                data['email'] = email;
                data['pincode'] = pincode;
                data['address_id'] = address_id;
                const resp = await axios.post(base_url + 'cart/checkout', data, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setLoading(false);
                if (resp.data.success == "1") {
                    window.location.href = resp.data.data.payment_links?.web;
                }


            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleaddressid = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressId(e.target.value);
    }
    const setAddressvalue = () => {
        const found = alladd.find(obj => obj._id == address_id);
        if (found) {
            setPincode(found.pincode);
            let obj = {
                address: found.address,
                pincode: found.pincode,
                state: found.state,
                city: found.city
            }
            const data = { ...fdata, ...obj };
            setFdata(data);
        }
    }
    const setUserdata = () => {
        if (user && user?.name && user?.email) {
            const obj = {
                name: user?.name,
                email: user?.email
            }
            const data = { ...fdata, ...obj };
            setName(user?.name);
            setEmail(user?.email);
            setFdata(data);
        }
    }
    useEffect(() => {
        setAddressvalue();
    }, [address_id])
    useEffect(() => {
        setUserdata();
    }, [user])
    const navigate = useNavigate();

    useEffect(() => {
        if (success == "1") {
            navigate('/orders');
        }
    }, [success])
    return (
        <>
            {
                loading ? (
                    <>
                        <section>
                            <div className="container">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-1"></div>
                                    <div className="col-span-1">
                                        <div className="w-full">
                                            <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" className="mx-auto max-w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <>

                        <section className="py-10">
                            <div className="container">
                                <div className="grid lg:grid-cols-6 grid-cols-1">
                                    <div className="col-span-4">
                                        <div className="w-full">
                                            <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                                                <div className="lg:col-span-1 col-span-12 mb-5">
                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block' >Enter Name</label>
                                                    <div className="flex w-full">
                                                        <input type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" value={name} className="p-2 w-full border border-blue-gray-300" />
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-1 col-span-12 mb-5">
                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block' >Enter Email</label>
                                                    <div className="flex w-full">
                                                        <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" id="email" value={email} className="p-2 w-full border border-blue-gray-300" />
                                                    </div>
                                                </div>
                                                <div className="col-span-4">
                                                    <div className="w-full mb-10">
                                                        <h4 className="py-2 sectiontitle">
                                                            Shipping Details
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-1 col-span-12 mb-5">
                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block' >Enter Pincode</label>
                                                    <div className="flex w-full">
                                                        <input type="tel" maxLength={6} value={pincode} onChange={handlePincodeChange} name="pincode" id="pincode" className="p-2 w-full border border-blue-gray-300" />
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-3 col-span-12 mb-5">

                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Enter Address</label>
                                                    <input type="text" name="address" value={fdata?.address} onChange={handlefdata} className="px-4 py-2 w-full border border-blue-gray-300" />
                                                    <span className="text-deep-orange-500">
                                                        {errors.find(obj => obj.path == "address")?.msg}
                                                    </span>
                                                </div>
                                                <div className="lg:col-span-1 col-span-12 mb-5">
                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Enter city </label>
                                                    <input type="text" value={fdata?.city} readOnly name="city" onChange={handlefdata} className="px-4 py-2 w-full border border-blue-gray-300" />
                                                    <span className="text-deep-orange-500">
                                                        {errors.find(obj => obj.path == "city")?.msg}
                                                    </span>
                                                </div>
                                                <div className="lg:col-span-1 col-span-12 mb-5">
                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Enter State </label>
                                                    <input type="text" value={fdata?.state} readOnly name="state" onChange={handlefdata} className="px-4 py-2 w-full border border-blue-gray-300" />
                                                    <span className="text-deep-orange-500">
                                                        {errors.find(obj => obj.path == "state_id")?.msg}
                                                    </span>
                                                </div>
                                                <div className="lg:col-span-1 col-span-12 mb-5 hidden">
                                                    <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Select Mode</label>
                                                    <select title='payment_mode' name="payment_mode" onChange={handlefdata} id="payment_mode" className="py-2 px-2 w-full outline-none border border-blue-gray-500">
                                                        <option value="">---Select---</option>
                                                        <option value="Online">Online</option>
                                                        <option value="COD">COD</option>
                                                    </select>
                                                </div>
                                                <div className="lg:col-span-4 col-span-12 mb-5">
                                                    <div className="w-full">
                                                        <button title='online' onClick={() => checkoutnow('online')} className="px-3 py-2   bg-primary  text-white shadow-md shadow-blue-gray-400">Place Order</button>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full px-4">
                                            <div className="w-full p-4 rounded-lg hidden shadow-md shadow-blue-gray-100 bg-deep-orange-50">
                                                <table className="w-full hidden">
                                                    <tbody >
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Cart Items
                                                            </td>
                                                            <td>
                                                                2
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Cart total
                                                            </td>
                                                            <td>
                                                                ₹ 2999.99
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Delivery Charge
                                                            </td>
                                                            <td>
                                                                ₹ 180.99
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm'>
                                                            <td>
                                                                Discount
                                                            </td>
                                                            <td>
                                                                ₹ 0.00
                                                            </td>
                                                        </tr>
                                                        <tr className='*:p-2 *:text-sm border-t border-blue-gray-200'>
                                                            <td>
                                                                Net Amount
                                                            </td>
                                                            <td>
                                                                ₹ 2999.99
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div className="w-full mt-5">
                                                <h4 className="text-xl mb-3">Use Saved Address</h4>
                                                <ul className='*:mb-3'>
                                                    {
                                                        alladd.map((add) => (
                                                            <>
                                                                <li>
                                                                    <div className="w-full rounded-lg text-sm tracking-wider  ">
                                                                        <Checkbox checked={add._id == address_id} value={add._id} onChange={handleaddressid} className='border border-blue-gray-600' color='red' crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                                        {add.address} {add.city} {add.state} {add.pincode}
                                                                    </div>
                                                                </li>
                                                            </>
                                                        ))
                                                    }


                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Checkout