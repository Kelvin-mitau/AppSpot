
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Product, Transaction } from "../DB/models";
import getPPAuth from "../functions/getPPAuth";

export const loader:LoaderFunction = async({params}) => {
    try {
        const search = params.search || ""
        const queryRegExp = new RegExp(search, "gim")
        const transactions = search ? await Transaction.find({$or:[{'customerDetails.email':queryRegExp},{'customerDetails.phoneNumber':queryRegExp},{productID:queryRegExp}]}).populate("product",["_id","price","category"]).limit(200) : await Transaction.find().populate("product",["_id","price","category"]).limit(200)
        return json(transactions)
    } catch (error) {
        console.log("Unable to get transactions",error)
        return json({error:"Oops...Something went wrong on our side"})
    }
}

export const action:ActionFunction = async ({request}) => {
    try {
        const {transactionID,productID} = await request.json()
        //Send money to user
        const {_id,price,seller,title} = await Product.findById(productID).select(["price","_id","title","seller"]).populate("seller",["paymentsDetails",
            "businessDetails"])
    
        console.log(seller)

        const ppEmail = seller.paymentsDetails.paypalEmail

        //The provide values are for testing only
        const phoneNumber = "768067032"
        const countryCode = "254"
       // const phoneNumber = seller.businessDetails.businessPhoneNumber
       // const countryCode = seller.businessDetails.businessCountryCode || "91"

        const accessToken = await getPPAuth()

        const payout = await fetch('https://api-m.sandbox.paypal.com/v1/payments/payouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(
            { "sender_batch_header": 
                { "sender_batch_id": transactionID, "email_subject": "You have a payout!", "email_message": `You have received a payout for your product ${title}! Thanks for using our service!` },
                "items": [ { "recipient_type": "EMAIL", "amount": { "value": price*0.9, "currency": "USD" }, "note": "Thanks for using AppSpot!", "sender_item_id": _id, "receiver": ppEmail, "alternate_notification_method": { "phone": { "country_code": countryCode, "national_number": phoneNumber } }, "notification_language": "en-EN" }] 
            })
        });

        if (payout.status == 201){
            await Transaction.findByIdAndUpdate(transactionID,{
                $set:{approved:true}
            })
        }
        else{
            console.log(await payout.json())
            throw new Error("Unable to complete payout")
        }
        return json({})
    } catch (error) {
         console.log(error)
        return json({error:"Transaction verification failed"})
    }
}