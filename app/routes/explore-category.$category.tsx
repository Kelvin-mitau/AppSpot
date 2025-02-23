
import React, { Suspense } from 'react'
import { useParams } from '@remix-run/react'
import Navabar from '../components/Navbar'
import { products } from './--sampleProductData'
import { Link } from '@remix-run/react'
import { useNavigate } from '@remix-run/react'
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Product } from '../DB/models'
import { json } from '@remix-run/react'

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
    const category = new URL(request.url).pathname.split("/")
    const sortBy = new URL(request.url).searchParams.get("sort")
    console.log(category)

    const handleSort = async () => {
        if (sortBy == "ascendingPrice") {
            return await Product.find({ category }).limit(50).sort({ price: 1 })
        }
        else if (sortBy == "descendingPrice") {
            return await Product.find({ category }).limit(50).sort({ price: -1 })
        }
        else if (sortBy == "rating") {
            return await Product.find({ category }).limit(50).sort({ rating: -1 })
        }
        else {
            return await Product.find({ category }).limit(50)
        }
    }
    //const products = await handleSort()
    //console.log(products)
    return json([])
}


function ExploreCategory() {
    const { category } = useParams()
    const navigate = useNavigate()
    const handleProductReview = (event: React.MouseEvent<HTMLButtonElement>, url: string) => {
        event.stopPropagation()
        navigate(url, {})
    }
    return (
        <div className=''>
            <nav className='w-full'>
                <Navabar />
            </nav>
            <div className='w-full flex justify-end'>
                <div className='rounded border-[2px] border-transparent has-[select:focus]:border-[var(--purple-blue)] bg-slate-400 flex gap-3 my-2 
                        text-black mx-1 p-1 '>
                    <p>Sort By: </p>
                    <select name="sort-by" id="" className='rounded bg-inherit outline-none'>
                        <option value="">Random</option>
                        <option value="ascendingPrice">Ascending Price</option>
                        <option value="descendingPrice">Descending price</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>
            <Suspense>
                <div className='grid grid-cols-3 sm:grid-cols-4'>
                    {
                        products.map(({ _id, title, description, productURL, pricingModel, price, screenshots }) => {
                            return (
                                <Link to={`/product/${_id}`} key={_id} className='my-3'>
                                    <div className='Product-card h-full mx-2 flex flex-col justify-between p-1 text-white' >
                                        <img src={screenshots[0]} alt="" className='w-full aspect-[2/1.5] mr-1 rounded-lg' />
                                        <div className='mx-1'>
                                            <p className='text-lg my-2'>{title}</p>
                                            <p className='text-[0.9rem] text-slate-200'>{description}</p>
                                            <div className='flex justify-between my-2'>
                                                {productURL && <button className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded'
                                                    onClick={(e) => handleProductReview(e, productURL)}>Preview</button>}
                                                {pricingModel == "freemium" && <p className='text-lg w-fit py-0.5 px-2 rounded'>Free</p>}
                                                {pricingModel == "subscription" && <p className='text-lg w-fit py-0.5 px-2 rounded'>${price} per month</p>}
                                                {pricingModel == "oneTime" && <p className='text-lg w-fit py-0.5 px-2 rounded'>${price} one time</p>}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </Suspense>

        </div>
    )
}

export default ExploreCategory