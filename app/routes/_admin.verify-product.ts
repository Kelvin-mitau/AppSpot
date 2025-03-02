import { ActionFunction, json } from "@remix-run/node";
import { Product } from "../DB/models";

export const action:ActionFunction = async ({request}) => {
    try {
        const {productID} = await request.json()
        await Product.findByIdAndUpdate(productID,{
            $set:{verified:true}
        })
        return json({})
    } catch (error) {
        console.log(error)
        return json({error:"Product verification failed"})
    }
}