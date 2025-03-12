
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Product, Transaction } from "../DB/models";
import getPPAuth from "../functions/getPPAuth";
import sendEmail from "../functions/sendEmail";

const ppBaseURL = process.env.ENVIRONMENT == "development" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

export const loader:LoaderFunction = async({params}) => {
    try {
        const search = params.search || ""
        const queryRegExp = new RegExp(search, "gim")
        const transactions = search ? await Transaction.find({$or:[{'customerDetails.email':queryRegExp},{'customerDetails.phoneNumber':queryRegExp},{productID:queryRegExp}]}).populate("product",["_id","price","category"]).limit(200) : await Transaction.find().populate("product",["_id","price","category"]).sort({createdAt:-1}).limit(200)
        return json(transactions)
    } catch (error) {
        console.log("Unable to get transactions",error)
        return json({error:"Oops...Something went wrong on our side"})
    }
}

export const action:ActionFunction = async ({request}) => {
    try {
        const COMMISSION = 0.076
        const {transactionID,productID} = await request.json()
        //Send money to user
        const {_id,price,seller,title} = await Product.findById(productID).select(["price","_id","title","seller"]).populate("seller",["paymentsDetails",
            "businessDetails","firstName","lastName"])

        const ppEmail = seller.paymentsDetails.paypalEmail

        const phoneNumber = seller.businessDetails.businessPhoneNumber
        const countryCode = seller.businessDetails.businessPhoneNumberCountryCode 

        console.log("Country code",countryCode)

        const accessToken = await getPPAuth()

        const payout = await fetch(`${ppBaseURL}/v1/payments/payouts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(
            { "sender_batch_header": 
                {
                     "sender_batch_id": transactionID,
                      "email_subject": "You have a payout!", 
                      "email_message": `You have received a payout for your product ${title}! Thanks for using our service!` 
                },
                "items":
                    [ 
                        { 
                            "recipient_type": "EMAIL", 
                            "amount": { "value": price*(1-COMMISSION), "currency": "USD" },
                             "note": "Thanks for using AppSpot!", 
                             "sender_item_id": _id, 
                             "receiver": ppEmail, 
                             "alternate_notification_method": { "phone": { "country_code": countryCode.replace("+",""), "national_number": phoneNumber } }, "notification_language": "en-EN" 
                        }
                    ] 
            })
        });

        if (payout.status == 201){
            await sendEmail({
                type:"receivePayment",
                recipientEmail:seller.businessDetails.businessEmail,
                recepientName:seller.firstName + " " + seller.lastName,
                emailText:`Hello ${seller.firstName},\n\nYou have received a payout for your product ${title}! Thanks for using our service!`,
                content:{name:seller.firstName,amount:price*(1-COMMISSION)}
            })
            await Transaction.findByIdAndUpdate(transactionID,{
                $set:{approved:true}
            })
        }
        else{
            console.error("Unable to complete payout",await payout.json())
            throw new Error("Unable to complete payout")
        }
        return json({})
    } catch (error) {
         console.error(error)
        return json({error:"Transaction verification failed"})
    }
}