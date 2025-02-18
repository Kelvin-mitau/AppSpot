import React, { Suspense } from 'react'
import { useState } from 'react';
import { useParams } from '@remix-run/react';
import handleItemRating from '../components/itemRating';
import { Link } from '@remix-run/react';
import { products } from './--sampleProductData';
import Navabar from '../components/Navabar';

function Product() {

    const { id } = useParams();
    const product = products[1]
    const [selectedPhoto, setSelectedPhoto] = useState(product.screenshots[0])
    const [selectedNoOfItems, setSelectedNoOfItems] = useState(0)

    const relatedProducts = [{
        _id: "2",
        itemPhotos: ["/random.png", "/random.png", '/logo.png'],
        rating: 4,
        price: 500,
        description: "Something here..."
    }, {
        _id: "3",
        itemPhotos: ["/random.png", "/random.png", '/logo.png'],
        rating: 4,
        price: 500,
        description: "Something here..."
    }]
    function handleSelectedNoOfItems(val: number) {
        setSelectedNoOfItems(val);
    }
    function handleBuyNow() {

    }

    return (
        <>
            <nav className='w-full'>
                <Navabar />
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="sm:grid grid-cols-2 gap-[2rem] place-items-start ml-1 my-4">
                    <div className=' mx-auto h-full'>
                        <div className=" flex   h-[100%] ">
                            <div className='w-full h-full'>
                                <img src={selectedPhoto} alt="" className='h-full max-h-[32rem] rounded' />
                            </div>
                            <div className='flex flex-col gap-[2px]'>
                                {product.screenshots
                                    .filter((item, _index) => product.screenshots[_index] != selectedPhoto)
                                    .map((item, index) => <button onClick={() => setSelectedPhoto(item)} className='cursor-pointer'>
                                        <img src={item} key={index} className={`h-10 border border-slate-400 rounded aspect-[2/1.5]`} /></button>)}
                            </div>
                        </div>

                    </div>
                    <div id="product_details-div">
                        <p id="product-name" className='text-white text-xl my-2'>{product.title}</p>
                        <p className="m-0 ">
                            {product.description}
                        </p>
                        {product && (
                            <div className="flex gap-[50%] w-full">
                                <p>{handleItemRating(product.customerReviews.reduce((accumulator, item) => {
                                    return accumulator + item.rating;
                                }, 0), "")} </p>
                                <p>({product.customerReviews.length})</p>
                            </div>
                        )}
                        <div className='flex justify-end'>
                            {product.pricingModel == "freemium" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>Free</p>}
                            {product.pricingModel == "subscription" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {product.price} per month</p>}
                            {product.pricingModel == "oneTime" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {product.price} one time</p>}

                        </div>


                        <p className="text-lg text-white">
                            Features
                        </p>
                        <ol className='list-inside list-decimal'>
                            {
                                product.features.map((feature, _index) => <li key={_index}>{feature}</li>)
                            }
                        </ol>
                        <div className='my-2'>
                            {product.productURL && <p ><i className=''>Checkout the site: </i><a className='underline' href={product.productURL}>here.</a></p>}
                            {product.documentationURL && <p ><i className=''>Checkout the site's documentation: </i><a className='underline' href={product.documentationURL}>here.</a></p>}
                        </div>
                        <div className="flex justify-end  mt-[10%]">
                            <button
                                className='bg-[var(--purple-blue)] w-fit py-1 text-lg px-4 rounded-lg'
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>
                        </div>

                        <div id="product_reviews-div" className='my-4 text-lg text-white'>
                            <h3>Product reviews</h3>
                            {product.customerReviews.length == 0 && <p>There are no customer revies yet.</p>}
                        </div>
                    </div>
                </div>
                {relatedProducts && (
                    <div>
                        <h3>You may also like</h3>
                        <div className="flex gap-2 pb-2">
                            {relatedProducts.map((item) => {
                                return (
                                    <Link to={`/product/${item._id}`}
                                        key={Math.random()}
                                        className="relative rounded cursor-pointer text-black bg-lm-bg w-[18vw] pb-1"
                                    >
                                        <img
                                            className="w-[19vw] h-[19vw] rounded-tl rounded-tr"
                                            src={item.itemPhotos[0]}
                                        />
                                        <div className="flex justify-between my-1 mx-2">
                                            <p className="m-0">item x</p>
                                            <p className="m-0"> {item.price}/=</p>
                                        </div>
                                        <p className="my-1 mx-2 overflow-hidden truncate">
                                            {item.description}
                                        </p>
                                        {handleItemRating(item.rating, "text-[6px] sm:text-[10px]")}
                                    </Link>
                                )
                            })}

                        </div>
                    </div>)}
            </Suspense>
        </>

    )
}

export default Product