import React from 'react'
import Layout from './Layout'
import { ActionFunction, ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Product, Transaction } from '../DB/models'
import { Form, useParams } from '@remix-run/react'

import {
    PayPalButtons,
    PayPalButtonsComponentProps,
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

interface OrderData {
    id: string;
    details?: Array<{
        issue: string;
        description: string;
    }>;
    debug_id?: string;
}


/* 
ID: AajGhAoim_v_1lq9EvZcpcribRqHynGwDSouoGQF_UmhdGwSaWwaJk8iE_XFrqBhP4_ZaK8jDdzjBPkm
Secret : EC_v4XiW7mUJdfVR-IWK8Wd28gpZmE2CfUMVZq4endHX-SYGa_XDay0NOlILmJgPckcUgkf5KD7Tkiy1
*/


function Checkout() {
    const productID = useParams().id
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: "AajGhAoim_v_1lq9EvZcpcribRqHynGwDSouoGQF_UmhdGwSaWwaJk8iE_XFrqBhP4_ZaK8jDdzjBPkm",
    };

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

            const orderData: OrderData = await response.json();

            if (!orderData.id) {
                const errorDetail = orderData.details ? orderData.details[0] : undefined;
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : "Unexpected error occurred, please try again.";

                throw new Error(errorMessage);
            }

            return orderData.id;

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onApprove = async (data: any) => {
        //Use this to update transactions
        // Capture the funds from the transaction.
        const response = await fetch("/my-server/capture-paypal-order", {
            method: "POST",
            body: JSON.stringify({
                productID: productID,
                orderID: data.orderID
            })
        });

        const details = await response.json();

        // Show success message to buyer
        alert(`Transaction completed by ${details.payer.name.given_name}`);
    }

    return (
        <Layout>
            <div className=' w-full min-h-[80vh] grid place-content-center items-center'>
                <div className="App">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                    </PayPalScriptProvider>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout

/* export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const secretKey = ""

        const itemDetails = await Product.findById(params.id).select(["price"])
        const itemPrice = await itemDetails.price
        const formData = await request.formData()
        const userEmail = formData.get("email")
        const userPhoneNumber = formData.get("phoneNumber")
        const userFirstName = formData.get("firstName")
        const userLastName = formData.get("lastName")

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail, amount: itemPrice })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        if (res.status != true) {
            throw new Error('Unable to initialize transaction')
        }

        const newTransaction = new Transaction({
            product: params.id,
            buyer: {
                firstName: userFirstName,
                lastName: userLastName,
                phoneNumber: userPhoneNumber,
                email: userEmail
            },
            "access_code": res.data["access_code"],
            reference: res.data.reference,
            completed: false
        })
        newTransaction.save()

        return redirect(res.data["authorization_url"])
    } catch (err) {
        console.log("Unable to process checkout")
        return json({ error: 'Unable to process payment' })
    }
} */