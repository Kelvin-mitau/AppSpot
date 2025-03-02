import { ActionFunctionArgs,ActionFunction, json } from "@remix-run/node";
import { Transaction } from "../../DB/models";

export const action:ActionFunction = async({request}:ActionFunctionArgs) => {
    try {
        let reqBody = await request.json()
        if (reqBody.event == "charge.success"){
            Transaction.findOneAndUpdate({reference:reqBody.data.reference},{
                $set:{
                    completed:true
                }
            })

        }
        return json({message:"Transaction completed successfully"})
    } catch (error) {
        console.log("Unable to process ps callback",error)
        return json({error:"Unable to complete transaction"})
    }
}