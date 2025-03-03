import { json, redirect, useActionData, useParams } from '@remix-run/react'
import React, { useState } from 'react'
import { Form } from '@remix-run/react';
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import { Product } from '../DB/models';
import ClickToUpload from '../components/ClickToUpload';
import imageToBase64 from '../functions/toBase64';
import { Storage } from 'megajs'
import DotsLoader from '../components/DotsLoader';
import categories from '../functions/productCategories';

function RegisterProduct() {
    const [loading, setLoading] = useState(false)

    const { sellerID } = useParams()
    const actionData = useActionData<{ error: string }>()

    const [productFeatures, setProductFeatures] = React.useState<String[]>([])
    const [productFeature, setProductFeature] = React.useState("")
    const [productPricingModel, setItemPricingModel] = React.useState("oneTime")

    const [productImages, setProductImages] = useState<string[]>([])

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

        const screenshotsInput = document.createElement("input")
        screenshotsInput.name = "screenshots"
        screenshotsInput.value = productImages.join("%") || ""
        screenshotsInput.style.display = "none"
        form.append(screenshotsInput)

        setLoading(true)
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

    const handleScreenshotUpload = (target: any) => {
        imageToBase64(target.files[0]).then((img) => setProductImages([...productImages, img])).catch(err => console.log(err))
    }

    const handleRemoveImage = (image: string) => {
        const newProductImagesArr = productImages.filter(item => item != image)
        setProductImages(newProductImagesArr)
    }
    return (
        <div className=' max-w-[500px] mx-auto bg-slate-900 p-3 my-2'>
            <p className='text-xl text-white my-2 text-center'>Please provide details of your product</p>
            <Form className="flex flex-col" onSubmit={handleSubmit} method='PUT' preventScrollReset>
                <div className='h-30'>
                    <ClickToUpload handleFileUpload={handleScreenshotUpload} title="Click to upload a screenshot(max 5)" disabled={productImages.length > 4} />
                </div>
                <div className='w-full grid grid-cols-5 my-2'>
                    {
                        productImages.map((item, index) => (<div key={index} className='relative'>
                            <button type='button' className='absolute right-4 top-0.5 w-5 aspect-square rounded-full bg-red-600 flex items-center justify-center' onClick={() => handleRemoveImage(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='fill-white h-4'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                            </button>
                            <img src={item} className='max-w-20 rounded aspect-[2/1.5]' />
                        </div>))
                    }
                </div>
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
                                categories.slice(1).map((item, _index) => <option value={item.link} key={_index}>{item.title}</option>)
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
                            <input onChange={(e) => setItemPricingModel(e.target.value)} type="radio" defaultChecked name="pricingModel" value={"oneTime"} id="pricing-model-1" className='cursor-pointer' />One Time</label>
                        {/* <label htmlFor="pricing-model-2">
                            <input onChange={(e) => setItemPricingModel(e.target.value)} type="radio" name="pricingModel" value={"subscription"} id="pricing-model-2" className='cursor-pointer' />Subscription</label> */}
                        <label htmlFor="pricing-model-3">
                            <input onChange={(e) => setItemPricingModel(e.target.value)} type="radio" name="pricingModel" value={"freemium"} id="pricing-model-3" className='cursor-pointer' />Freemium</label>
                    </div>
                </div>
                {productPricingModel != "freemium" && <label htmlFor="product-price-input">
                    <p>Price (Dollars)</p>
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
                        <button type="button" onClick={() => { productFeature && setProductFeatures([...productFeatures, productFeature]); setProductFeature("") }} className='bg-slate-100 h-10 rounded-r-md px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 fill-green-600'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg></button>
                    </div>
                </div>
                <button
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    type="submit"
                >
                    {loading && !actionData ? <DotsLoader /> : "Upload"}
                </button>
            </Form>
            {actionData?.error && <p className='text-red-500'>{actionData?.error}</p>}
        </div>
    )
}

export default RegisterProduct

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const userID = params.sellerID
        let reqBody: any = {};


        const storage = await new Storage({
            email: 'kelvinmitau05@gmail.com',
            password: 'kelvin@MEGA'
        }).ready;

        (await request.formData()).forEach((value: any, key: any) => {
            if (key) reqBody[key] = value;
        });

        const base64Files = reqBody.screenshots
        const splittedImages = typeof base64Files == "string" ? base64Files.split("%") : []

        let filesURLS: string[] = [];
        for await (let file of splittedImages) {
            const fileName = `${userID}${Date.now()}`

            const uploadedFile = await (storage.upload(`${fileName}.txt`, file).complete)
            filesURLS.push(await uploadedFile.link({}))
        }


        const newProduct = await new Product({ ...reqBody, features: reqBody.features.split(","), screenshots: filesURLS })
        await newProduct.save()
        return redirect(`/account/${userID}`)

    } catch (error) {
        console.log(error)
        return json({ error: "Oops...Something went wrong." })
    }
}