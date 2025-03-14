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
import Layout from './Layout';


import { MetaFunction } from '@remix-run/react';
import StackOptions from '~/functions/stackOptions';
export const meta: MetaFunction = () => {
    return [
        {
            title: "New Product",
            author: "Appspot"
        }
    ];
};

function RegisterProduct() {
    const [loading, setLoading] = useState(false)

    const { sellerID } = useParams()
    const actionData = useActionData<{ error: string }>()
    const [error, setError] = useState("")

    const [productFeatures, setProductFeatures] = React.useState<String[]>([])
    const [productFeature, setProductFeature] = React.useState("")
    const [productPricingModel, setItemPricingModel] = React.useState("oneTime")

    const [productImages, setProductImages] = useState<string[]>([])
    const [productFile, setProductFile] = useState<any>(null)
    const [productFileTypeVal, setProductFileType] = useState("")

    const [stackInputVal, setStackInputVal] = useState("")
    const [selectedStack, setSelectedStack] = useState<string[]>([])

    const [appType, setAppType] = useState("web")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("productFile", productFile)
        formData.append("productFileType", productFileTypeVal)
        formData.append("sellerID", sellerID || "")

        fetch("/megaUpload", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(({ link, error }) => {
                if (error) {
                    setLoading(false)
                    setError(error)
                    return;
                }
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

                const productFileLink = document.createElement("input")
                productFileLink.name = "productDownloadURL"
                productFileLink.value = link || ""
                productFileLink.style.display = "none"
                form.append(productFileLink)

                const stackInput = document.createElement("input")
                stackInput.name = "stackOptions"
                stackInput.value = selectedStack.join(",") || ""
                stackInput.style.display = "none"
                form.append(stackInput)

                form.submit()
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
                setError("Oops...Something went wrong.")
            })

    }


    const handleScreenshotUpload = (target: any) => {
        imageToBase64(target.files[0]).then((img) => setProductImages([...productImages, img])).catch(err => console.log(err))
    }

    const handleRemoveImage = (image: string) => {
        const newProductImagesArr = productImages.filter(item => item != image)
        setProductImages(newProductImagesArr)
    }

    const handleProductFileUpload = (target: any) => {
        setProductFileType(target.value.slice(target.value.length - 4))
        setProductFile(target.files[0])
    }

    const handleRemoveStack = (stack: string) => {
        const filteredStack = selectedStack.filter(item => item != stack)
        setSelectedStack(filteredStack)
    }

    return (
        <Layout>
            <div className=' max-w-[500px] mx-auto bg-slate-900 p-3 my-2'>
                <p className='text-xl text-white my-2 text-center'>Please provide details of your product</p>
                <Form className="flex flex-col" onSubmit={handleSubmit} method='PUT' preventScrollReset>
                    <div className='h-30'>
                        <ClickToUpload handleFileUpload={handleScreenshotUpload} title="Click to upload a screenshot(max 5)" disabled={productImages.length > 4} acceptedFormat="image/*" id="Product-screenshots-upload" />
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
                    <div className='my-2'>
                        <p>Select App Type</p>
                        <div className='my-1 flex flex-col gap-1 bg-gray-700 py-2 px-1 rounded-md'>
                            <label htmlFor='web-type-app-input' className='gap-1 flex'>
                                <input type="radio" name="type" onChange={({ target }) => setAppType(target.value)} id='web-type-app-input' defaultChecked value={"web"} />
                                <span>Web App</span>
                            </label>
                            <label htmlFor='mobile-type-app-input' className='gap-1 flex'>
                                <input type="radio" name="type" onChange={({ target }) => setAppType(target.value)} id='mobile-type-app-input' value={"mobile"} />
                                <span>Mobile App</span>
                            </label>
                            <label htmlFor='desktop-type-app-input' className='gap-1 flex'>
                                <input type="radio" name="type" onChange={({ target }) => setAppType(target.value)} id='desktop-type-app-input' value={"desktop"} />
                                <span>Desktop App</span>
                            </label>
                        </div>
                    </div>
                    <label htmlFor="product-type-select-input"><p>Select Product Category</p>
                        <div className='bg-gray-700 text-gray-200 mb-3 mt-1 rounded py-1 px-1 w-fit'>
                            <select name="category" id="product-type-select-input" defaultValue={"eCom"} className='bg-gray-700 text-gray-200 outline-none  '>
                                {
                                    categories.slice(1).map((item, _index) => <option value={item.link} key={_index}>{item.title}</option>)
                                }
                            </select>
                        </div>
                    </label>
                    <div className='my-2'>
                        <p className='mb-1'>App's Stack</p>
                        <div className=' text-gray-200 rounded-md'>
                            <div className='flex gap-1 flex-wrap'>
                                {
                                    selectedStack.map((item, _index) =>
                                        <div className='flex gap-1 items-center bg-slate-700 px-1 py-0.5 rounded my-0.5' key={_index} >
                                            <span >{item}</span>
                                            <button onClick={() => handleRemoveStack(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                                    className='h-5 fill-red-500'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                        <div className='flex items-center  rounded-md bg-slate-500'>
                            <input type="text" onChange={(e) => setStackInputVal(e.target.value)}
                                className="bg-transparent text-gray-200 border-0 rounded-l-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 w-full" value={stackInputVal} list='stack-input-list' />
                            <datalist id='stack-input-list'>
                                {
                                    StackOptions(appType).map((item, _index) => <option key={_index} value={item} />)
                                }
                            </datalist>
                            <button type="button"
                                onClick={() => { stackInputVal && setSelectedStack([...selectedStack, stackInputVal]); setStackInputVal("") }}
                                className='bg-slate-100 h-10 rounded-r-md px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 fill-green-600'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg></button>
                        </div>
                    </div>

                    <textarea required name="description" id="" className='resize-y w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1
                   focus:ring-blue-500 transition ease-in-out duration-150' placeholder='Give a brief description of your product.'></textarea>
                    <input
                        placeholder="Product Preview link"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='productURL'
                    />
                    <input
                        placeholder="Product Documentation link"
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
                            id="product-price-input"
                            placeholder="Product's Price"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1
                             focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                            type="number"
                            name='price'
                            step={"0.01"}
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
                    <div className='mt-4'>
                        <ClickToUpload acceptedFormat={'.rar,.zip'} title='Click to upload your product files here(.zip or .rar)' disabled={false} handleFileUpload={handleProductFileUpload} id="Product-files-upload" name="productFiles" styles={`border-[3px] ${!productFile ? "border-red-600" : "border-green-600"} rounded-[0.8rem]`} />
                    </div>
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit" disabled={!productFile || productImages.length == 0}
                    >
                        {loading && !actionData ? <DotsLoader /> : "Upload"}
                    </button>
                </Form>
                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </Layout>
    )
}

export default RegisterProduct

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const userID = params.sellerID
        let reqBody: any = {};
        (await request.formData()).forEach((value: any, key: any) => {
            if (key) reqBody[key] = value;
        });

        const storage = await new Storage({
            email: process.env.MEGA_EMAIL || "",
            password: process.env.MEGA_PASS || "",
            keepalive: true,

        }).ready;

        const base64Files = await reqBody.screenshots
        const splittedImages = typeof base64Files == "string" ? base64Files.split("%") : []

        let filesURLS: string[] = [];
        for await (let file of splittedImages) {
            const fileName = `${userID}${Date.now()}`
            const uploadedFile = await (storage.upload(`${fileName}.txt`, file).complete)
            filesURLS.push(await uploadedFile.link({}))
        }

        const newProduct = await new Product({
            ...reqBody,
            features: reqBody?.features && reqBody.features.length > 0 ? reqBody.features.split(",") : [],
            screenshots: filesURLS,
            stack: reqBody?.stackOptions && reqBody.stackOptions.length > 0 ? reqBody.stackOptions.split(",") : [],
        })
        await newProduct.save()
        return redirect(`/account/${userID}`)


    } catch (error) {
        console.log(error)
        return json({ error: "Oops...Something went wrong." })
    }
}