import { ActionFunction, ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Product } from "../DB/models";
import getPPAuth from "../functions/getPPAuth";
import {encrypt} from "../functions/crypto";

const ppBaseURL = process.env.ENVIRONMENT == "development" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

export const action:ActionFunction = async ({params}:ActionFunctionArgs) => {
    try {
        const productID = params.productID || ""
        const {price} = await Product.findById(productID).select(["_id","price"])  
         const {link,id} = await createOrder(price,productID);
         return json({link,id})
    } catch (error) {
        console.log("Unable to create order",error)
        return json({error:"Oops...Something went wrong"})
    } 
}

async function createOrder(price:number,productID:string) {
    const accessToken = await getPPAuth()
   const ppRequest = await fetch (`${ppBaseURL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await accessToken}`,
    },
    body: JSON.stringify({
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": price
          },
          "reference_id": `${productID}-${Date.now()}`,
        },
      ],
      "intent": "CAPTURE",
      "payment_source": {
        "paypal": {
          "experience_context": {
            "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
            "payment_method_selected": "PAYPAL",
            "brand_name": "AppSpot",
            "locale": "en-US",
            "landing_page": "NO_PREFERENCE",
            "shipping_preference": "NO_SHIPPING",
            "user_action": "PAY_NOW",
            "return_url":  `${process.env.BASE_URL}/download/${productID}?a=${encrypt("random-text","random-key")}`,
            "cancel_url": `${process.env.BASE_URL}/product/${productID}`
          }
        }
      }
    })
  })

  if (!ppRequest.ok) {
      const errorResponse = await ppRequest.text();
      console.error("PayPal API error response:", errorResponse);
      throw new Error(`PayPal API error: ${ppRequest.status} ${ppRequest.statusText}`);
    }
  // return {msg:"Order created"})
  const response = await ppRequest.json()
  return {link:await response.links[1].href,id:await response.id}
}