import { ActionFunction, json } from "@remix-run/node";
import { Product, Transaction } from "../DB/models";
import { encrypt } from "../functions/crypto";
import sendEmail from "../functions/sendEmail";
import getPPAuth from "~/functions/getPPAuth";

export const action:ActionFunction = async({request}) => {
    try {
        const reqBody = await request.json()

        const product = await Product.findById(reqBody.product).select(["_id", "documentationURL","title"])

        const link = `${process.env.BASE_URL}/download/${product._id}?a=${encrypt("random-text","random-key")}`

        const paymentCaptureRes = await capturePayment(reqBody.orderID)
        if (paymentCaptureRes.status !== "COMPLETED") {
            console.error("Payment not completed",paymentCaptureRes)
            throw new Error("Payment not completed")
        }

        await sendEmail({
            type:"downloadLink",
            recipientEmail:reqBody.customerDetails.email,
            recepientName:reqBody.customerDetails.firstName + " " + reqBody.customerDetails.lastName,
            emailText:`Hello ${reqBody.customerDetails.name},\n\nYour download link is ready for the app ${product.title}. Use the link below to download your product. ${link}`,
            content:{appTitle:product.title,link}
        }).catch(err => {throw new Error("Unable to send email")})

        await sendEmail({
            type:"rating",
            recipientEmail:reqBody.customerDetails.email,
            recepientName:reqBody.customerDetails.firstName + " " + reqBody.customerDetails.lastName,
            emailText:`Hello ${reqBody.customerDetails.name},\n\n Please rate the app ${product.title} on this email. Your feedback is important to us.`,
            content:{productID:product._id,productName:product.title}
        }).catch(err => {throw new Error("Unable to send email")})

        const newTransaction = new Transaction({...reqBody,captureID:paymentCaptureRes.id})
        await newTransaction.save() 

        //console.log(documentationURL)
        return json({productID:product._id,auth:encrypt("random-text","random-key")})
    } catch (error) {
        console.log("Unable to approve payment",error)
        return json({error:"Oops...Something went wrong on our side"})
    }
}

const capturePayment = async (orderID:string) => {
    const ppBaseURL = process.env.ENVIRONMENT == "development" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const authToken = await getPPAuth()


    const capturePayment = await fetch(`${ppBaseURL}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': requestId,
        'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({})
});
    
    const res = await capturePayment.json()
    console.log(res)
    return {id:res.id,status:res.status}
}