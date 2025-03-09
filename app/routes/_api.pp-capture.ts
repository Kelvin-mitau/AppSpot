import { ActionFunction, json } from "@remix-run/node";
import { Product, Transaction } from "../DB/models";
import { encrypt } from "../functions/crypto";
import sendEmail from "../functions/sendEmail";

export const action:ActionFunction = async({request}) => {
    try {
        const reqBody = await request.json()

        const product = await Product.findById(reqBody.product).select(["_id", "documentationURL","title"])

        const link = `${process.env.BASE_URL}/download/${product._id}?a=${encrypt("random-text","random-key")}`

        sendEmail({
            type:"downloadLink",
            recipientEmail:reqBody.customerDetails.email,
            recepientName:reqBody.customerDetails.firstName + " " + reqBody.customerDetails.lastName,
            emailText:`Hello ${reqBody.customerDetails.name},\n\nYour download link is ready for the app ${product.title}. Use the link below to download your product. ${link}`,
            content:{appTitle:product.title,link}
        })

        const newTransaction = new Transaction(reqBody)
        await newTransaction.save() 

        //console.log(documentationURL)
        return json({productID:product._id,auth:encrypt("random-text","random-key")})
    } catch (error) {
        console.log("Unable to approve payment",error)
        return json({error:"Oops...Something went wrong on pur side"})
    }
}