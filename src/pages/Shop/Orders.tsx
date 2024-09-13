import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url, base_url_img } from '../../utils';
//@ts-ignore
import loadingimg from '../../assets/loading.gif'

const Orders = () => {
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
    const [orders, setOrder] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const getorders = async () => {
        setLoading(true)
        await axios.get(base_url + 'cart/orders', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('_token')
            }
        }).then(resp => {
            setOrder(resp.data.data);
            setLoading(false);
        })

    }
    useEffect(() => {
        getorders();
    }, [])
    return (
        <>
            {
                loading ? (
                    <>
                        <div className="w-full flex justify-center">
                            <img src={loadingimg} alt="" className="max-w-[400px] mx-auto" />
                        </div>
                    </>
                ) : (
                    <>

                        <section className="py-10">
                            <div className="container">
                                <div className="w-full">
                                    <h2 className="sectiontitle">
                                        My Orders
                                    </h2>
                                </div>
                                <div className="w-full overflow-y-auto max-w-full">
                                    <table className="table w-full">
                                        <thead>
                                            <tr className='*:text-start *:border *:border-blue-gray-200 *:p-2 *:text-sm'>
                                                <th>Sr No</th>
                                                <th>Order</th>
                                                <th>Payment</th>
                                                <th>Products</th>
                                                <th>Delivery</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((item, index) => (
                                                    <>
                                                        <tr className='*:text-start *:border *:border-blue-gray-200 *:p-2 *:text-md'>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                <ul>
                                                                    <li>
                                                                        <strong>Order No :</strong> <small>{item.order_id}</small>
                                                                    </li>
                                                                    <li>
                                                                        <strong>Transaction Id :</strong>
                                                                        <small>
                                                                            {item.payment_response.payment_gateway_response.txn_id}
                                                                        </small>
                                                                    </li>
                                                                    <li>
                                                                        <strong>Status : </strong>
                                                                        <small>
                                                                            {item.payment_response.payment_gateway_response.resp_message}
                                                                        </small>
                                                                    </li>
                                                                    <li>
                                                                        <strong>Payment Mode :</strong>
                                                                        <small>
                                                                            {item.payment_response?.txn_detail?.txn_flow_type}
                                                                        </small>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <ul>
                                                                    <li>
                                                                        <strong>Total Amount : </strong> <small>{item.amount}</small>
                                                                    </li>
                                                                    <li>
                                                                        <strong>Discount Amount : </strong> <small>{item.discount}</small>
                                                                    </li>
                                                                    <li>
                                                                        <strong>Net Paid Amount : </strong> <small>{item.paid_amount}</small>
                                                                    </li>

                                                                </ul>
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.carts.map(pd => (
                                                                        <>
                                                                            <div className="w-full mb-3 max-w-[250px]">
                                                                                <div className="grid grid-cols-12 gap-2">
                                                                                    <div className="col-span-3">
                                                                                        <div className="w-full">
                                                                                            <img src={base_url_img + pd.product.images[0]} className='w-full h-full border border-blue-gray-400 min-h-12 object-cover' alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-9">
                                                                                        <h4 className="text-sm text-black truncate">
                                                                                            {pd.product.title}
                                                                                        </h4>
                                                                                        <div className="w-full flex gap-2 flex-wrap">
                                                                                            <span className='text-xs inline-block text-gray-800'>
                                                                                                {pd.product.category.title}
                                                                                            </span>
                                                                                            {
                                                                                                pd.brand?.title && (
                                                                                                    <>
                                                                                                        <span className='text-xs text-gray-600'>
                                                                                                            {pd.brand?.title}
                                                                                                        </span>
                                                                                                    </>
                                                                                                )
                                                                                            }
                                                                                            {pd.modal?.title && (
                                                                                                <>
                                                                                                    <span className='text-xs text-gray-600'>
                                                                                                        {pd.modal?.title}
                                                                                                    </span>
                                                                                                </>
                                                                                            )}

                                                                                        </div>
                                                                                        <div className="w-full text-sm text-gray-600">
                                                                                            <span>
                                                                                                Qty : {pd.quantity}
                                                                                            </span>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className="w-52 truncate text-wrap">
                                                                    <p className="text-sm">
                                                                        {item.user_address.address + " " + item.user_address.city + " " + item.user_address.state + " " + item.user_address.pincode}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                        </tr >
                                                    </>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Orders