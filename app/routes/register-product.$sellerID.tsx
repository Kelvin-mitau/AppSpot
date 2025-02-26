import { json, redirect, useActionData, useParams } from '@remix-run/react'
import React from 'react'
import { Form } from '@remix-run/react';
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import { Product } from '../DB/models';

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const userID = params.sellerID
        let reqBody: any = {};
        (await request.formData()).forEach((value: any, key: any) => {
            if (key) reqBody[key] = value;
        });
        const newProduct = await new Product({ ...reqBody, features: reqBody.features.split(",") })
        await newProduct.save()
        return redirect(`/account/${userID}`)
    } catch (error) {
        console.log(error)
        return json({ error: "Oops...Something went wrong." })
    }
}

function RegisterProduct() {
    const { sellerID } = useParams()
    const actionData = useActionData<{ error: string }>()

    console.log(actionData)

    const [productFeatures, setProductFeatures] = React.useState<String[]>([])
    const [productFeature, setProductFeature] = React.useState("")
    const [productPricingModel, setItemPricingModel] = React.useState("oneTime")

    const handleSubmit = (e: any) => {

        const form = e.target
        const featuresInput = document.createElement("input")
        featuresInput.name = "features"
        featuresInput.value = productFeatures.join(",")
        featuresInput.style.display = "none"
        form.append(featuresInput)

        const sellerIDInput = document.createElement("input")
        sellerIDInput.name = "seller"
        sellerIDInput.value = sellerID || ""
        sellerIDInput.style.display = "none"
        form.append(sellerIDInput)

    }

    const productCategories = [
        {
            title: "E-Commerce",
            value: "eCom"
        },
        {
            title: "Project Management",
            value: "projectManagement"
        },
        {
            title: "Learning Management Systems",
            value: "lms"
        },
        {
            title: "Development and Deployment Tools",
            value: "ddt"
        },
        {
            title: "Customer Relationshp Management",
            value: "crm"
        },
        {
            title: "Customer support",
            value: "customerSupport"
        }
    ]
    return (
        <div className=' max-w-[500px] mx-auto bg-slate-900 p-3 my-2'>
            <p className='text-xl text-white my-2 text-center'>Please provide details of your product</p>
            <Form className="flex flex-col" onSubmit={handleSubmit} method='PUT' preventScrollReset>
                <input
                    required
                    placeholder="Product's name"
                    className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 my-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name='title'
                />
                <label htmlFor="product-type-select-input"><p>Select Product Category</p>
                    <div className='bg-gray-700 text-gray-200 my-2 rounded py-1 w-fit'>
                        <select name="category" id="product-type-select-input " defaultValue={"eCom"} className='bg-gray-700 text-gray-200 '>
                            {
                                productCategories.map((item, _index) => <option value={item.value} key={_index}>{item.title}</option>)
                            }
                        </select>
                    </div>
                </label>

                <textarea name="description" id="" className='resize-y w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1
               focus:ring-blue-500 transition ease-in-out duration-150' placeholder='Give a brief description of your product.'></textarea>
                <input
                    placeholder="Products's link"
                    className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name='productURL'
                />
                <input
                    placeholder="Documentation's link"
                    className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name='documentationURL'
                />
                <div className='flex flex-col my-2 gap-2 bg-gray-700 text-gray-200 rounded p-2'>
                    <p>Pricing Model</p>
                    <div className='flex flex-col gap-0.5'>
                        <label htmlFor="pricing-model-1">
                            <input onChange={(e) => setItemPricingModel(e.target.value)} type="radio" defaultChecked name="pricingModel" value={"oneTime"} id="pricing-model-1" className='cursor-pointer' />One time</label>
                        <label htmlFor="pricing-model-2">
                            <input onChange={(e) => setItemPricingModel(e.target.value)} type="radio" name="pricingModel" value={"subscription"} id="pricing-model-2" className='cursor-pointer' />Subscription</label>
                        <label htmlFor="pricing-model-3">
                            <input onChange={(e) => setItemPricingModel(e.target.value)} type="radio" name="pricingModel" value={"freemium"} id="pricing-model-3" className='cursor-pointer' />Freemium</label>
                    </div>
                </div>
                {productPricingModel != "freemium" && <label htmlFor="product-price-input">
                    <p>Price</p>
                    <input
                        required
                        id="product-price-input"
                        placeholder="Product's Price"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1
                         focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        type="number"
                        name='price'
                    />
                </label>}
                <p>Products Features</p>
                <div className='bg-gray-700 text-gray-200 rounded-md'>
                    <ol className='list-inside list-decimal'>
                        {
                            productFeatures.map((item, _index) => <li key={_index}>{item}</li>)
                        }
                    </ol>
                    <div className='flex items-center  rounded-md bg-slate-500'>
                        <input type="text" onChange={(e) => setProductFeature(e.target.value)}
                            className="bg-transparent text-gray-200 border-0 rounded-l-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 w-full" value={productFeature} />
                        <button type="button" onClick={() => { productFeature && setProductFeatures([...productFeatures, productFeature]); setProductFeature("") }} className='bg-slate-300 h-full rounded-r-md px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-6  fill-blue-500'>
                                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4
                       118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg></button>
                    </div>
                </div>
                <button
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    type="submit"
                >
                    Upload
                </button>
            </Form>
            {actionData?.error && <p className='text-red-500'>{actionData?.error}</p>}
        </div>
    )
}

export default RegisterProduct