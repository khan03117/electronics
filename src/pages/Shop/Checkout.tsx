import React from 'react'

const Checkout = () => {
  return (
    <>  
           <section className="py-10">
                <div className="container">
                    <div className="grid lg:grid-cols-6 grid-cols-1">
                        <div className="col-span-4">
                            <div className="w-full">
                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                                    <div className="col-span-1 mb-5">
                                        <label htmlFor="" className='text-sm uppercase mb-3  font-light tracking-widest block' >Enter Pincode</label>
                                        <div className="flex">
                                            <input type="tel" maxLength={6} value={pincode} onChange={handlePincodeChange} name="pincode" id="pincode" className="p-3 border border-blue-gray-300" />
                                            <button onClick={handlepincode} className="px-4 py-2 bg-blue-gray-800 text-white">Validate</button>
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
                                            <button onClick={() => checkoutnow('online')} className="px-6 py-2 w-full   bg-deep-orange-800 rounded-full text-white shadow-md shadow-blue-gray-400">Place Order</button>

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
                                                   {CartItems.length}
                                                </td>
                                            </tr>
                                            <tr className='*:p-2 *:text-sm'>
                                                <td>
                                                    Cart total
                                                </td>
                                                <td>
                                                    ₹ {CartItems.reduce((acc, itm) => acc + itm.price, 0)}
                                                </td>
                                            </tr>
                                            <tr className='*:p-2 *:text-sm'>
                                                <td>
                                                    Delivery Charge
                                                </td>
                                                <td>
                                                    ₹ {charge.toFixed(2)}
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
                                                    ₹ {(CartItems.reduce((acc, itm) => acc + itm.price, 0) + charge).toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

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