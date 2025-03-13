import React, { useEffect } from 'react'
import DotsLoader from '../../components/DotsLoader'
import { useParams } from '@remix-run/react'

interface props {
    paymentOption: "card" | "paypal",
    setPaymentOption: (option: "card" | "paypal") => void,
    setCurrentForm: (form: number) => void,
    errorMSG: string | undefined,
    profilePicture: string
}

const PaymentCollection: React.FC<props> = ({ setPaymentOption, paymentOption, setCurrentForm, errorMSG, profilePicture }) => {
    const id = useParams().id
    const [error, setError] = React.useState(errorMSG)
    const [submitDisabled, setSubmitDisabled] = React.useState(false)
    const handleSubmit = (event: any) => {
        event.preventDefault()
        setSubmitDisabled(true)

        const formData = new FormData()
        formData.append("productFile", profilePicture)
        formData.append("productFileType", ".txt")
        formData.append("sellerID", id || "")

        fetch("/megaUpload", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(({ link, error }) => {
                if (error) {
                    return;
                }
                else {
                    const profilePicInput = document.createElement("input")
                    profilePicInput.name = "profilePicture"
                    profilePicInput.value = link
                    profilePicInput.style.display = "hidden"
                    event.target.append(profilePicInput)
                    event.target.submit()
                }
            }).catch(err => {
                setError("Oops...Something went wrong on our side.")
                setSubmitDisabled(false)
                console.error(err)
            })
    }
    useEffect(() => {
        if (errorMSG) {
            setSubmitDisabled(false)
            setError(errorMSG)
        }
    }, [errorMSG])
    return (
        <>
            <div>
                <div>
                    <label htmlFor="paypalName">Your Full Name*</label>
                    <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text" id="paypalName" name="paypalName" required /><br />
                </div>
                <div>
                    <label htmlFor="paypalEmail">Associated Email*</label>
                    <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email" id="paypalEmail" name="paypalEmail" required /><br />
                </div>
                <div className='flex justify-between w-full'>
                    <button
                        onClick={() => setCurrentForm(2)}
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="button"
                    >
                        Back
                    </button>

                    {!submitDisabled ? <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit"
                    >
                        Finish
                    </button> :
                        <div className='h-14 flex items-center'>
                            <DotsLoader />
                        </div>}

                </div>
                {error && <p className='text-center text-red-600'>{error}</p>}
            </div>

        </>
    )
}

export default PaymentCollection

//For card payment collection

{/* <p >Select Payment Collection Option</p>
<div className='w-full flex justify-between'>
    <div className='flex gap-1'>
        <input type="radio" name="paymentCollectionMethod" id="card-collection-method" defaultChecked
            onChange={() => setPaymentOption("card")} />
        <label htmlFor="card-collection-method">Card</label>
    </div>
    <div className='flex gap-1'>
        <input type="radio" name="paymentCollectionMethod" id="card-collection-method"
            onChange={() => setPaymentOption("paypal")} />
        <label htmlFor="paypal-collection-method">Paypal</label>
    </div>
</div> */}
{/* {paymentOption == "card" ? <div>
    <div>
        <label htmlFor="cardholder-name">Cardholder Name:</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text" id="cardHolderName" name="cardholder-name" required /><br />
    </div>
    <div>
        <label htmlFor="card-number">Card Number:</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text" id="cardNumber" name="card-number" required /><br />
    </div>
    <div>
        <label htmlFor="expiration-date">Expiration Date (MM/YY):</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text" id="expirationDate" name="expiration-date" placeholder="MM/YY" required /><br />
    </div>
    <div>
        <label htmlFor="cvv">CVV:</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text" id="cvv" name="CVV" required /><br />
    </div>
    <div>
        <label htmlFor="billing-address">Billing Address:</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text" id="billing-address" name="billingAddress" required /><br />
    </div>
    <div className='flex gap-1 justify-between'>
        <div>
            <label htmlFor="city">City:</label>
            <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text" id="city" name="city" required /><br />
        </div>
        <div>
            <label htmlFor="country">Country:</label>
            <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text" id="country" name="country" required /><br />
        </div>
    </div>
        
    <div>
        <label htmlFor="postal-code">Postal Code:</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text" id="postal-code" name="postalCode" required /><br />
    </div>
    <div>
        <label htmlFor="email">Payment Confirmation Email Address:</label>
        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email" id="email" name="paymentEmail" required /><br />
    </div>
    <div className='flex justify-between w-full'>
        <button
            onClick={() => setCurrentForm(2)}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="button"
        >
            Back
        </button>
        <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
        >
            Finish
        </button>
    </div>
</div> : */}