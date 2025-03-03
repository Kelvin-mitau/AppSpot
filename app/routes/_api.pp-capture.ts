import { ActionFunction, json } from "@remix-run/node";
import { Product, Transaction } from "../DB/models";

export const action:ActionFunction = async({request}) => {
    try {
        const reqBody = await request.json()

        const product = await Product.findById(reqBody.product).select(["_id", "documentationURL"])

        //Generate an email to the user 

        const newTransaction = new Transaction(reqBody)
        await newTransaction.save() 

        //console.log(documentationURL)
        return json({})
    } catch (error) {
        console.log("Unable to approve payment",error)
        return json({error:"Oops...Something went wrong on pur side"})
    }
}