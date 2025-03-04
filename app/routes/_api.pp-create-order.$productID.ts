import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import { Product } from "../DB/models";
import getPPAuth from "../functions/getPPAuth";

const ppBaseURL = process.env.ENVIRONMENT == "development" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

export const action:ActionFunction = async ({params}:ActionFunctionArgs) => {
    try {
        const productID = params.productID
        const {price} = await Product.findById(productID).select("price")  
         const order = await createOrder(price);
         return json(order)
    } catch (error) {
        console.log("Unable to create order",error)
        return json({error:"Oops...Something went wrong"})
    }
}

async function createOrder(price:number) {
    const accessToken = await getPPAuth()
   const ppRequest =  fetch (`${ppBaseURL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": price
          },
          "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
        },
      ],
      "intent": "CAPTURE",
      "payment_source": {
        "paypal": {
          "experience_context": {
            "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
            "payment_method_selected": "PAYPAL",
            "brand_name": "AppSPot",
            "locale": "en-US",
            "landing_page": "NO_PREFERENCE",
            "shipping_preference": "NO_SHIPPING",
            "user_action": "PAY_NOW",
            "return_url": "",
            "cancel_url": ""
          }
        }
      }
    })
  })
  return (await ppRequest).json() 
}