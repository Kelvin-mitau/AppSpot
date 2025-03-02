import { ActionFunction, json } from "@remix-run/node";
import { Product, Transaction } from "../DB/models";

export const action:ActionFunction = async({request}) => {
    try {
        const reqBody = await request.json()

        const {documentationURL} = await Product.findById(reqBody.productID).select("documentationURL")

        //Generate an email to the user 

        const newTransaction = new Transaction(reqBody)
        newTransaction.save()

        return json({downloadURL:documentationURL})
    } catch (error) {
        console.log("Unable to approve payment",error)
        return json({error:"Oops...Something went wrong on pur side"})
    }
}