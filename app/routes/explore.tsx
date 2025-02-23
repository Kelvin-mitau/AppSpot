import { json, Link, MetaFunction, useFetcher, useLoaderData, useNavigate, useSearchParams } from '@remix-run/react'
import React, { Suspense, useState } from 'react'
import Navabar from '../components/Navbar'
import { ActionFunction, LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Product } from '../DB/models'
import Layout from './Layout'

export const meta: MetaFunction = () => {
    return (
        [{
            title: "Expolore"
        }]
    )
}

const productCategories = [
    {
        title: "E-Commerce",
        link: "eCom"
    },
    {
        title: "Project Management",
        link: "projectManagement"
    },
    {
        title: "Learning Management Systems",
        link: "lms"
    },
    {
        title: "Development and Deployment Tools",
        link: "ddt"
    },
    {
        title: "Customer Relationshp Management",
        link: "crm"
    },
    {
        title: "Customer support",
        link: "customerSupport"
    }
]

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
    try {
        const sortBy = new URL(request.url).searchParams.get("sort")
        const category = new URL(request.url).searchParams.get("category")

        const categoryFilter = category ? { category } : {}
        const handleSort = async () => {
            if (sortBy == "ascendingPrice") {
                return await Product.find(categoryFilter).limit(50).sort({ price: 1 })
            }
            else if (sortBy == "descendingPrice") {
                return await Product.find(categoryFilter).limit(50).sort({ price: -1 })
            }
            else if (sortBy == "rating") {
                return await Product.find(categoryFilter).limit(50).sort({ rating: -1 })
            }
            else {
                return await Product.find(categoryFilter).limit(50)
            }
        }
        const products = await handleSort()
        return json(products)
    }
    catch (err) {
        console.log("Unable to fetch", err)
    }
}


interface productProps {
    _id: string, title: string, description: string, productURL: string, pricingModel: string, price: number, screenshots: string[]
}

const Explore = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const loaderData = useLoaderData<typeof loader>()
    const [products, setProducts] = useState<productProps[]>(loaderData)

    const handleProductReview = (event: React.MouseEvent<HTMLButtonElement>, url: string) => {
        event.stopPropagation()
        navigate(url, {})
    }

    const handleSort = ({ target }: any) => {
        //navigate(target.value ? `/explore?sort=${target.value}` : "/explore")
        const categoryParam = searchParams.get("category")
        if (categoryParam && !target.value) return setSearchParams({ category: categoryParam })
        categoryParam && setSearchParams({ sort: target.value, category: categoryParam })
        !categoryParam && setSearchParams({ sort: target.value })
    }
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <div className='flex flex-row'>
                    <div className='float-left min-h-[90vh] hidden sm:block p-2 bg-[#1a1c89] bg-opacity-20 rounded my-2'>
                        <p className='text-lg'>Categories</p>
                        <div className='flex flex-col gap-2'>
                            {productCategories.map(({ title, link }, index) => <Link key={index} to={`/explore?category=${link}`}>
                                <span className='bg-white block py-1 px-2 rounded bg-opacity-15'>{title}</span></Link>)}
                        </div>
                    </div>
                    <div className='w-[80%]'>
                        <div className='w-full flex justify-end'>
                            <div className='rounded border-[2px] border-transparent has-[select:focus]:border-[var(--purple-blue)] bg-slate-400 flex gap-3 my-2
                            text-black mx-1 p-1 '>
                                <p>Sort By: </p>
                                <div>
                                    <select name="sort-by" id="" className='rounded bg-inherit outline-none' onChange={handleSort}>
                                        <option value="">Random</option>
                                        <option value="ascendingPrice">Ascending Price</option>
                                        <option value="descendingPrice">Descending price</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-1 mx-2'>
                            {
                                products.map(({ _id, title, description, productURL, pricingModel, price, screenshots }) => {
                                    return (
                                        <Link to={`/product/${_id}`} key={_id}>
                                            <div className='Product-card h-full mx-2 flex flex-col justify-between p-1 text-white' >
                                                <img src={screenshots[0]} alt="" className='w-full aspect-[2/1.5] mr-1 rounded-lg' />
                                                <div className='mx-1'>
                                                    <p className='text-lg my-2'>{title}</p>
                                                    <p className='text-[0.9rem] text-slate-200'>{description}</p>
                                                    {productURL && <button className='underline' onClick={(e) => handleProductReview(e, productURL)}>Preview</button>}
                                                    <div className='flex justify-end'>
                                                        {pricingModel == "freemium" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>Free</p>}
                                                        {pricingModel == "subscription" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {price} per month</p>}
                                                        {pricingModel == "oneTime" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {price} one time</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Suspense>
        </Layout>
    )
}

export default Explore