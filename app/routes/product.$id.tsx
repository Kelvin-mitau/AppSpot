import React, { Suspense, useState, useEffect } from 'react'

import { useLoaderData, useNavigate, Link, json, useParams } from '@remix-run/react';
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';

import handleItemRating from '../components/itemRating';
import NothingHere from '../components/NothingHere';
import ProductCard from '../components/ProductCard';

import Layout from './Layout';
import { Product } from '../DB/models';

import { File } from 'megajs';

function ProductPage() {
    const { product, relatedProducts }: any = useLoaderData()

    const [screenshots, setScreenshots] = useState<string[]>([])
    const [selectedPhoto, setSelectedPhoto] = useState(0)

    /* useEffect(() => {
        setSelectedPhoto(screenshots)
    },[screenshots]) */

    useEffect(() => {
        for (let i = 0; i < product.screenshots.length; i++) {
            const file = File.fromURL(product.screenshots[i]);
            file.loadAttributes((err, file) => {
                if (err) {
                    console.error('Error loading file attributes:', err);
                    return;
                }
                file.downloadBuffer({}).then((data: Buffer) => {
                    const decoder = new TextDecoder()
                    const decodedData = decoder.decode(data)
                    if (screenshots.indexOf(decodedData) == -1) setScreenshots([...screenshots, decodedData])
                })
            });
        }
    }, []);

    const navigate = useNavigate()
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                {product ? (<div className='px-1 sm:px-2'>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-[2rem] place-items-start ml-1 my-4">
                        <div className=' mx-auto h-full'>
                            <div className=" flex   h-[100%] ">
                                <div className='w-full h-full'>
                                    <img src={screenshots[selectedPhoto]} alt="" className='h-full max-h-[32rem] rounded' />
                                </div>
                                <div className='flex flex-col gap-[2px]'>
                                    {screenshots
                                        .filter((_: any, _index: number) => _index != selectedPhoto)
                                        .map((_: string, index: number) => <button onClick={() => setSelectedPhoto(index)} className='cursor-pointer'>
                                            <img src={screenshots[index]} key={index} className={`h-10 border border-slate-400 rounded aspect-[2/1.5]`} /></button>)}
                                </div>
                            </div>
                        </div>
                        <div id="product_details-div" className='w-full px-1'>
                            <p id="product-name" className='text-white text-xl my-2'>{product.title}</p>
                            <p className="m-0 ">
                                {product.description}
                            </p>
                            {product && (
                                <div className="flex gap-3 my-4 items-center w-full">
                                    <div>{handleItemRating(product.customerReviews.reduce((accumulator: number, item: { rating: number }) => {
                                        return accumulator + item.rating;
                                    }, 0), "")} </div>
                                    <p className='text-lg'>({product.customerReviews.length})</p>
                                </div>
                            )}
                            {/* <div className='flex justify-end'>
                                
                            </div> */}
                            <p className="text-lg text-white">
                                Features
                            </p>
                            <ol className='list-inside list-decimal'>
                                {
                                    product.features.map((feature: string, _index: number) => <li key={_index}>{feature}</li>)
                                }
                            </ol>
                            <div className='my-2'>
                                {product.productURL && <p ><i className=''>Checkout the site: </i><a className='underline' href={product.productURL}>here.</a></p>}

                            </div>
                            <div className="flex justify-end  mt-[10%]">
                                <button
                                    className='bg-[var(--purple-blue)] w-fit py-1 text-lg px-4 rounded-lg'
                                    onClick={() => navigate(product.pricingModel != "freemium" ? `/checkout/${product._id}` : product.documentationURL)}
                                >
                                    {product.pricingModel != "freemium" ? <span>
                                        {product.pricingModel == "subscription" && `Subscribe $${product.price} per month`}
                                        {product.pricingModel == "oneTime" && `Buy at $${product.price} `}
                                    </span> :
                                        <span>Get the App</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                    {relatedProducts && (
                        <div>
                            {relatedProducts.legth > 0 && <h3>You may also like</h3>}
                            <div className="flex gap-2 pb-2">
                                {relatedProducts.map(({ _id, screenshots, title, description, productURL, pricingModel, price }: any) => {
                                    return (
                                        <div key={_id}>
                                            <ProductCard _id={_id} description={description} price={price} pricingModel={pricingModel} productURL={productURL} screenshots={screenshots} title={title} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>)}
                </div>) : <div><NothingHere /></div>}
            </Suspense>
        </Layout>

    )
}

export default ProductPage

export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
    const productID = params.id
    const product = await Product.findById(productID)
    const relatedProducts = await Product.find({ $and: [{ category: product.category }, { _id: { $ne: productID } }] }).limit(5)

    return json({ product, relatedProducts })
}