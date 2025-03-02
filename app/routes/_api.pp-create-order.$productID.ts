import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import { Product } from "../DB/models";
import getPPAuth from "../functions/getPPAuth";

export const action:ActionFunction = async ({params}:ActionFunctionArgs) => {
    try {
        
        const productID = params.productID
        const {price} = await Product.findById(productID).select("price")  
        //console.log(params)

         const order = await createOrder(price);
         console.log(order)
         return json(order)
    } catch (error) {
        console.log("Unable to create order",error)
        return json({error:"Oops...Something went wrong"})
    }
}


async function createOrder(price:number) {
    const accessToken = await getPPAuth()

   const ppRequest =  fetch ("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
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
            "landing_page": "LOGIN",
            "shipping_preference": "NO_SHIPPING",
            "user_action": "PAY_NOW",
            "return_url": "https://example.com/returnUrl",
            "cancel_url": "https://example.com/cancelUrl"
          }
        }
      }
    })
  })
  return (await ppRequest).json() 
}