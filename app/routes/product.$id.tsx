import React, { useRef, Suspense, useState, useEffect } from 'react'

import { useLoaderData, useNavigate, Link, json, useParams, useFetcher } from '@remix-run/react';
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';

import handleItemRating from '../components/itemRating';
import NothingHere from '../components/NothingHere';
import ProductCard from '../components/ProductCard';

import Layout from './Layout';
import { Product } from '../DB/models';

import { File } from 'megajs';
import DotsLoader from '../components/DotsLoader';

function ProductPage() {
    const { product, relatedProducts }: any = useLoaderData()
    const [screenshots, setScreenshots] = useState<string[]>([])

    const fetchImages = async () => {
        let images: string[] = [];
        let promises = [];

        for (let i: number = 0; i < product.screenshots.length; i++) {
            const file = File.fromURL(product.screenshots[i]);
            const promise = new Promise((resolve, reject) => {
                file.loadAttributes((err, file) => {
                    if (err) {
                        console.error('Error loading file attributes:', err);
                        reject(err);
                        return;
                    }
                    file.downloadBuffer({})
                        .then((data: Buffer) => {
                            const decoder = new TextDecoder();
                            const decodedData = decoder.decode(data);
                            images.push(decodedData);
                            resolve(decodedData);
                        })
                        .catch((error) => {
                            console.error('Error downloading buffer:', error);
                            reject(error);
                        });
                });
            });
            promises.push(promise);
        }

        try {
            await Promise.all(promises);
            setScreenshots(images)
        } catch (error) {
            console.error('Error processing images:', error);
        }
    };

    useEffect(() => {
        fetchImages()
    }, []);

    const navigate = useNavigate()

    const handlePurchase = () => {
        if (product.pricingModel == "freemium") {
            navigate(product.documentationURL)
        }
        else {
            navigate(product.pricingModel != "freemium" ? `/checkout/${product._id}` : product.documentationURL)
        }
    }

    const testImgs = ["/random.png", "/random.png", "/random.png", "/random.png", "/random.png",]
    const scrollRef: any = useRef(null);

    const scrollToRight = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth
            scrollRef.current.scrollLeft += width;
        }
    };

    const scrollToLeft = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth
            scrollRef.current.scrollLeft -= width;
        }
    };
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                {product ? (<div className='Product-page px-1 sm:px-2'>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-[2rem] place-items-start ml-1 my-4">
                        <div className=' mx-auto h-full w-full'>
                            {screenshots.length > 0 ? <div className=" relative h-[100%] " >
                                <div className='Screenshots-wrapper  flex flex-row  overflow-x-scroll gap-[2px]' ref={scrollRef}>
                                    {
                                        screenshots.map((i, index) => <img src={i} key={index} className='aspect-[2/1.5] h-full' />)
                                    }
                                </div>
                                <button className='absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 mx-3 py-1 bg-slate-300 rounded-lg px-2 my-1' onClick={scrollToLeft}>
                                    <svg className='h-6 fill-indigo-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" /></svg>
                                </button>
                                <button className='absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 mx-3 py-1 bg-slate-300 rounded-lg px-2 my-1' onClick={scrollToRight}>
                                    <svg className='h-6 fill-indigo-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                                </button>
                            </div> : <div className='flex items-center justify-center bg-slate-300 w-full h-full rounded'>
                                <DotsLoader />
                            </div>}
                        </div>
                        <div id="product_details-div" className='w-full px-1'>
                            <p id="product-name" className='text-white text-xl my-2'>{product.title}</p>
                            <p className="m-0 ">
                                {product.description}
                            </p>
                            {product && (
                                <div className="flex gap-3 items-center my-2">
                                    <div>{handleItemRating((product.customerTotalRating / product.productRatersCount), "")}</div> <span>({product.productRatersCount})</span>
                                </div>
                            )}
                            {product.features.length > 0 && <div>
                                <p className="text-lg text-white">
                                    Features
                                </p>
                                <ol className='list-inside list-decimal'>
                                    {
                                        product.features.map((feature: string, _index: number) => <li key={_index}>{feature}</li>)
                                    }
                                </ol>
                            </div>}
                            <div className='my-2'>
                                {product.productURL && <p ><i className=''>Checkout the site: </i><a className='underline' href={product.productURL}>here.</a></p>}

                            </div>
                            <div className="flex justify-end  mt-[10%]">
                                <button
                                    className='bg-[var(--purple-blue)] w-fit py-1 text-lg px-4 rounded-lg'
                                    onClick={handlePurchase}
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
                                {relatedProducts.map(({ _id, screenshots, title, description, productURL, pricingModel, price, customerTotalRating, productRatersCount }: any) => {
                                    return (
                                        <div key={_id}>
                                            <ProductCard _id={_id} description={description} price={price} pricingModel={pricingModel} productURL={productURL} screenshots={screenshots} title={title} customerTotalRating={customerTotalRating} productRatersCount={productRatersCount} />
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