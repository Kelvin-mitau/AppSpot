import { useState } from 'react'
import Layout from './Layout'
import { useNavigate, useParams } from '@remix-run/react'

import {
    PayPalButtons,
    PayPalButtonsComponentProps,
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "Checkout",
            author: "Appspot"
        }
    ];
};

interface OrderData {
    id: string;
    details?: Array<{
        issue: string;
        description: string;
    }>;
    debug_id?: string;
}


function Checkout() {
    const navigate = useNavigate()
    const productID = useParams().id
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: "AaZ_HPPmW0lfjrSkTL41-UlGauHcESpviPKBDOacEAUp4OUaI4f-OQTThGgU_b6S1mzkzH__d8Afo7sD",
    };

    interface userDetails {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string
    }
    const [userDetails, setUserDetails] = useState<userDetails>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
    })

    const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
        try {
            const response = await fetch(`/pp-create-order/${productID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cart: [{ id: productID, quantity: "1" }],
                }),
            });
            const res = await response.json()
            const payerActionLink: string = res.link;
            const orderID = res.id || "";
            const resError: string | undefined = res.error

            if (resError) {
                throw new Error(resError);
            }

            return orderID;

        } catch (error) {
            console.error(error);
            throw error;
            return ""
        }
    };

    const onApprove = async (data: any) => {
        const response = await fetch("/pp-capture", {
            method: "POST",
            body: JSON.stringify({
                customerDetails: userDetails,
                product: productID,
                orderID: data.orderID
            })
        });

        const res = await response.json();
        if (!res.error) {
            navigate(`/download/${res.productID}?a=${res.auth}`)
        }
    }
    const handleUserDetailsChange = ({ target }: any) => {
        setUserDetails({ ...userDetails, [target.name]: target.value })
    }
    return (
        <Layout>
            <div className=' w-full min-h-[80vh] grid place-content-center items-center'>
                <div className='flex flex-col gap-2 my-4'>
                    <div className='grid grid-cols-none sm:grid-cols-2 gap-1'>
                        <input
                            required
                            onChange={handleUserDetailsChange}

                            placeholder="First Name *"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                            type="text"
                            name='firstName'
                        />
                        <input
                            required
                            onChange={handleUserDetailsChange}

                            placeholder="Last Name *"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name='lastName'
                        />
                    </div>
                    <input
                        required
                        onChange={handleUserDetailsChange}

                        placeholder="Phone Number *"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="tel"
                        name='phoneNumber'
                    />
                    <input
                        required
                        onChange={handleUserDetailsChange}
                        placeholder="Email *"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        name='email'
                    />
                </div>
                <div className="App">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove}
                            disabled={userDetails.firstName == "" || userDetails.lastName == "" || userDetails.email == "" || userDetails.phoneNumber == ""} />
                    </PayPalScriptProvider>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout

