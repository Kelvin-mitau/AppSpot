import React from 'react'
import Layout from './Layout'
import { ActionFunction, ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Product, Transaction } from '~/DB/models'
import { Form } from '@remix-run/react'

function Checkout() {
    return (
        <Layout>
            <div className='grid place-content-center justify-center min-h-[70vh]'>
                <Form method='POST' className='flex flex-col max-w-[600px] p-4 bg-white bg-opacity-5 rounded-lg' preventScrollReset>
                    <h2 className='text-lg my-3'>Please Fill in this form</h2>
                    <input
                        required
                        placeholder="First Name"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='firstName'
                    />
                    <input
                        required
                        placeholder="Last Name"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='lastName'
                    />
                    <input
                        required
                        placeholder="Email"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        name='email'
                    />
                    <input
                        required
                        placeholder="Phone Number"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="tel"
                        name='phoneNumber'
                    />
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit"
                    >
                        Submit
                    </button>
                </Form>
            </div>
        </Layout>
    )
}

export default Checkout

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
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
}