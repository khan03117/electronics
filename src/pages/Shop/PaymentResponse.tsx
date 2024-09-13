import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { base_url } from '../../utils';
import moment from 'moment';
import { IoCheckmarkOutline } from "react-icons/io5";

const PaymentResponse = () => {
    const { orderId } = useParams();
    // Interfaces for the nested objects

    interface User {
        _id: string;
        mobile: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        email: string;
        name: string;
    }

    interface UserAddress {
        _id: string;
        user: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    interface PromoCode {
        _id: string;
        promo_code: string;
    }

    interface ProductCategory {
        _id: string;
        title: string;
    }

    interface Product {
        _id: string;
        category: ProductCategory;
        title: string;
        images: string[];
    }

    interface Brand {
        _id: string;
        url: string;
        title: string;
        image: string;
    }

    interface Modal {
        _id: string;
        url: string;
        title: string;
    }

    interface Cart {
        _id: string;
        user: string;
        product: Product;
        brand: Brand;
        modal: Modal;
        price: number;
        quantity: number;
        is_ordered: boolean;
        order: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        order_id: string;
        user_address: string;
    }

    interface PaymentLinks {
        iframe: string;
        mobile: string;
        web: string;
    }

    interface PaymentResponse {
        customer_email: string;
        customer_phone: string;
        customer_id: string;
        status_id: number;
        status: string;
        id: string;
        merchant_id: string;
        amount: number;
        currency: string;
        order_id: string;
        date_created: string;
        last_updated: string;
        return_url: string;
        product_id: string;
        payment_links: PaymentLinks;
        udf1: string;
        udf2: string;
        udf3: string;
        udf4: string;
        udf5: string;
        udf6: string;
        udf7: string;
        udf8: string;
        udf9: string;
        udf10: string;
        txn_id: string;
        payment_method_type: string;
        auth_type: string;
        payment_method: string;
        refunded: boolean;
        amount_refunded: number;
        effective_amount: number;
        resp_code: string | null;
        resp_message: string | null;
        bank_error_code: string;
        bank_error_message: string;
        txn_uuid: string;
        txn_detail: {
            txn_id: string;
            order_id: string;
            status: string;
            error_code: string | null;
            net_amount: number;
            surcharge_amount: number | null;
            tax_amount: number | null;
            txn_amount: number;
            offer_deduction_amount: number | null;
            gateway_id: number;
            currency: string;
            metadata: {
                payment_channel: string;
            };
            express_checkout: boolean;
            redirect: boolean;
            txn_uuid: string;
            gateway: string;
            error_message: string;
            created: string;
            last_updated: string;
            txn_flow_type: string;
            txn_amount_breakup: {
                name: string;
                amount: number;
                sno: number;
                method: string;
            }[];
        };
        payment_gateway_response: {
            resp_code: string;
            rrn: string;
            created: string;
            epg_txn_id: string;
            resp_message: string;
            auth_id_code: string;
            txn_id: string;
            network_error_message: string | null;
            network_error_code: string | null;
            arn: string | null;
            gateway_merchant_id: string;
            eci: string | null;
            auth_ref_num: string | null;
        };
        gateway_id: number;
        emi_details: {
            additional_processing_fee_info: string | null;
            bank: string | null;
            emi_type: string | null;
            interest: number | null;
            monthly_payment: number | null;
            principal_amount: number | null;
            subvention_info: any[];
            tenure: number | null;
        };
        gateway_reference_id: string | null;
        offers: any[];
        maximum_eligible_refund_amount: number;
        order_expiry: string;
        resp_category: string | null;
        http: {
            headers: {
                [key: string]: string[];
            };
            statusCode: number;
            url: string;
            method: string | null;
            httpVersion: string;
            httpVersionMajor: number;
            httpVersionMinor: number;
            headersDistinct: {
                [key: string]: string[];
            };
            rawHeaders: string[];
            statusMessage: string;
        };
    }

    interface Order {
        _id: string;
        order_id: string;
        order_date: string;
        user: User;
        user_address: UserAddress;
        amount: number;
        paid_amount: number;
        status: string;
        promo_code: PromoCode;
        discount: number;
        payment_mode: string;
        order_placed: boolean;
        payment_response: PaymentResponse;
        carts: Cart[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    // The Order interface can be used to type-check the order data you receive
    const [order, setOrder] = React.useState<Order>()
    const getorderdetails = async () => {
        const token = localStorage.getItem('_token');
        await axios.get(base_url + "cart/order/" + orderId, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((resp) => {
            setOrder(resp.data.data);
        })
    }
    React.useEffect(() => {
        if (orderId) {
            getorderdetails();
        }

    }, [orderId])


    return (
        <>
            <section className="lg:py-10 py-10 bg-white">
                <div className="container">
                    <div className="grid grid-cols-12">
                        {
                            order && (
                                <>
                                    <div className="col-span-4"></div>
                                    <div className="lg:col-span-4 col-span-12">
                                        <div className="w-full py-4 px-6 bg-blue-gray-50 shadow shadow-blue-gray-700 rounded-t-[2rem]">
                                            <figure className="w-full mb-10 relative statusImage before:content-[''] before:absolute before:-bottom-6 before:start-0 before:w-full before:border before:border-dashed before:border-blue-gray-300 flex justify-center ">
                                                <div className="inline-flex  justify-items-center items-center text-[5rem] text-green-700  border size-28 p-4 border-green-700 mx-auto rounded-full text-center ">
                                                    <IoCheckmarkOutline />
                                                </div>

                                            </figure>
                                            <div className="over_cuts relative w-full"></div>
                                            <table className="w-full  table-fixed *:text-sm *:lg:text-md">
                                                <tbody>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>Order Id</td>
                                                        <td className='text-end'>
                                                            {order.order_id}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            Order Date
                                                        </td>
                                                        <td className='text-end'>
                                                            {moment(order.order_date).format('DD-MM-YYYY')}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            Status
                                                        </td>
                                                        <td className='text-end'>
                                                            {order.status == "Success" && (
                                                                <>
                                                                    <span className="px-2 inline-block rounded text-sm bg-green-700 text-white">
                                                                        Success
                                                                    </span>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            Order Placed
                                                        </td>
                                                        <td className='text-end'>
                                                            {order.order_placed ? 'Yes' : 'No'}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            Total Amount
                                                        </td>
                                                        <td className='text-end'>
                                                            {order.amount}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            Discount
                                                        </td>
                                                        <td className='text-end'>
                                                            {order.discount}
                                                        </td>
                                                    </tr>
                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            Paid Amount
                                                        </td>
                                                        <td className='text-end'>
                                                            {order.paid_amount}
                                                        </td>
                                                    </tr>

                                                    <tr className='*:w-1/2 *:py-2'>
                                                        <td>
                                                            No of Products
                                                        </td>
                                                        <td className='text-end'>
                                                            {order.carts.length}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default PaymentResponse