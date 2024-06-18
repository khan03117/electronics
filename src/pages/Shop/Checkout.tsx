import { Checkbox } from '@material-tailwind/react';
import React, { useState } from 'react'

const Checkout = () => {
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
    const [states, setState] = useState<State[]>([]);
    const [pincode, setPincode] = useState<string>('');
    const [fdata, setFdata] = useState<FormData>({});
    const [errors, setErrors] = useState<Error[]>([]);
    const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPincode(e.target.value);
    }
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
        if (!fdata?.address) {
            err.push({ path: 'address', msg: "Address is required" });
        }
        if (!fdata?.city) {
            err.push({ path: 'city', msg: "city is required" })
        }

        if (!fdata?.state_id) {
            err.push({ path: 'state_id', msg: "state is required" })
        }
        if (err.length > 0) {
            setErrors(err);
            return false;
        }
        return true;
    }
    const checkoutnow = async (action: string) => {
        if (validation()) {
            try {
                fdata['action'] = action;
                fdata['pincode'] = pincode;

            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="grid lg:grid-cols-6 grid-cols-1">
                        <div className="col-span-4">
                            <div className="w-full mb-10">
                                <h4 className="py-2 sectiontitle">
                                    Shipping Details
                                </h4>
                            </div>
                            <div className="w-full">
                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                                    <div className="col-span-1 mb-5">
                                        <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block' >Enter Pincode</label>
                                        <div className="flex">
                                            <input type="tel" maxLength={6} value={pincode} onChange={handlePincodeChange} name="pincode" id="pincode" className="p-3 border border-blue-gray-300" />
                                        </div>
                                    </div>
                                    <div className="col-span-3 mb-5">
                                        <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Enter Address</label>
                                        <input type="text" name="address" onChange={handlefdata} className="px-4 py-2 w-full border border-blue-gray-300" />
                                        <span className="text-deep-orange-500">
                                            {errors.find(obj => obj.path == "address")?.msg}
                                        </span>
                                    </div>


                                    <div className="col-span-1 mb-5">
                                        <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Enter city </label>
                                        <input type="text" name="city" onChange={handlefdata} className="px-4 py-2 w-full border border-blue-gray-300" />
                                        <span className="text-deep-orange-500">
                                            {errors.find(obj => obj.path == "city")?.msg}
                                        </span>
                                    </div>
                                    <div className="col-span-1 mb-5">
                                        <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Enter State </label>
                                        <select name="state_id" onChange={handlefdata} className="px-4 py-2 w-full border border-blue-gray-300" >
                                            <option value="">---Select---</option>
                                            {
                                                states.map(st => (
                                                    <>
                                                        <option value={st.id}>{st.state}</option>
                                                    </>
                                                ))
                                            }
                                        </select>
                                        <span className="text-deep-orange-500">
                                            {errors.find(obj => obj.path == "state_id")?.msg}
                                        </span>
                                    </div>
                                    <div className="col-span-1 mb-5">
                                        <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block'>Select Mode</label>
                                        <select name="" id="" className="py-2 px-2 w-full outline-none border border-blue-gray-500">
                                            <option value="">---Select---</option>
                                            <option value="Online">Online</option>
                                            <option value="COD">COD</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1 mb-5">
                                        <div className="w-full">
                                            <button onClick={() => checkoutnow('online')} className="px-3 py-2 w-full   bg-primary rounded-lg text-white shadow-md shadow-blue-gray-400">Place Order</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="w-full px-4">
                                <div className="w-full p-4 rounded-lg shadow-md shadow-blue-gray-100 bg-deep-orange-50">
                                    <table className="w-full">
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
                                        <li>
                                            <div className="w-full rounded-lg text-sm tracking-wider  bg-deep-orange-50">
                                                <Checkbox className='border border-blue-gray-600' color='red' crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                H N 89 Street No 8 Main Road Ghaziabad 201102
                                            </div>
                                        </li>
                                        <li>
                                            <div className="w-full rounded-lg text-sm tracking-wider  bg-deep-orange-50">
                                                <Checkbox className='border border-blue-gray-600' color='red' crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                H N 89 Street No 8 Main Road Ghaziabad 201102
                                            </div>
                                        </li>
                                        <li>
                                            <div className="w-full rounded-lg text-sm tracking-wider  bg-deep-orange-50">
                                                <Checkbox className='border border-blue-gray-600' color='red' crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                H N 89 Street No 8 Main Road Ghaziabad 201102
                                            </div>
                                        </li>
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

export default Checkout