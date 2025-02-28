import React, { Suspense, useState, useEffect } from 'react'

import { json, MetaFunction, useLoaderData, useNavigate, useSearchParams } from '@remix-run/react'
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'

import { Product } from '../../DB/models'
import Layout from '../Layout'

import getProductsFilter from './getProductsFilter'
import NothingHere from '../../components/NothingHere'
import ProductCard from '../../components/ProductCard'

import categories from '../../functions/productCategories'

export const meta: MetaFunction = () => {
    return (
        [{
            title: "Expolore"
        }]
    )
}



export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
    try {
        const { filter, sort } = getProductsFilter(request.url)
        //@ts-ignore
        if (sort) return json(await Product.find(filter).sort(sort))
        //@ts-ignore
        if (!sort) return json(await Product.find(filter))
    }
    catch (err) {
        console.log("Unable to fetch", err)
        return json([])
    }
}


interface productProps {
    _id: string, title: string, description: string, productURL: string, pricingModel: string, price: number, screenshots: string[], productRatersCount: number, customerTotalRating: number
}

const Explore = () => {
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const products = useLoaderData<productProps[]>()

    const handleSetSearchParams = (targetParam: string, value: string) => {
        const params: { [key: string]: string } = {
            category: targetParam == "category" ? value : searchParams.get("category") || "",
            search: targetParam == "search" ? value : searchParams.get("search") || "",
            sort: targetParam == "sort" ? value : searchParams.get("sort") || "",
        }

        let cleanedParamsObj: { [key: string]: string } = {};
        for (const key in params) {
            if (params[key]) {
                cleanedParamsObj[key as keyof typeof params] = params[key]
            }
        }
        setSearchParams(cleanedParamsObj)
    }

    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <div className='flex flex-row'>
                    <div className='float-left min-h-[90vh] hidden sm:block p-2 bg-[#1a1c89] bg-opacity-20 rounded my-2'>
                        <p className='text-lg'>Categories</p>
                        <div className='flex flex-col gap-2'>
                            {categories.slice(0, 10).map(({ title, link }, index) => <button key={index} onClick={() => handleSetSearchParams("category", link)}>
                                <span className='bg-white block py-1 px-2 rounded bg-opacity-15'>{title}</span></button>)}
                        </div>
                    </div>
                    {products && products.length > 0 ? <div className='w-full sm:w-[80%]'>
                        <div className='w-full flex items-center justify-between'>
                            <div
                                className="flex items-center border w-80 focus-within:border-indigo-500 transition duration-300 pr-3 gap-2 bg-white border-gray-500/30 h-10 rounded-[5px] overflow-hidden ml-4"
                            >
                                <input
                                    onChange={(e) => { setSearchText(e.target.value) }}
                                    type="text"
                                    placeholder="Search for products"
                                    className="w-full h-full pl-4 outline-none placeholder-gray-600 text-sm text-black"
                                />
                                <button onClick={() => { handleSetSearchParams("search", searchText) }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 30 30"
                                        fill="#6B7280"
                                    >
                                        <path
                                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className='rounded border-[2px] border-transparent has-[select:focus]:border-[var(--purple-blue)] bg-slate-400 flex gap-3 my-2
                            text-black mx-1 p-1 '>
                                <p>Sort By: </p>
                                <div>
                                    <select name="sort-by" id="" className='rounded bg-inherit outline-none' onChange={({ target }) => handleSetSearchParams("sort", target.value)}>
                                        <option value="">Random</option>
                                        <option value="ascendingPrice">Ascending Price</option>
                                        <option value="descendingPrice">Descending price</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-3  gap-1 mx-2'>
                            {
                                products.map(({ _id, title, description, productURL, pricingModel, price, screenshots, productRatersCount, customerTotalRating }) => {
                                    return (
                                        <div key={_id}>
                                            <ProductCard _id={_id} description={description} price={price} pricingModel={pricingModel} productURL={productURL} screenshots={screenshots} title={title} productRatersCount={productRatersCount} customerTotalRating={customerTotalRating} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                        <div className='h-[80vh] w-full sm:w-[80%] overflow-hidden relative '>
                            <NothingHere />
                            <p className='absolute left-1/2 -translate-x-1/2 top-[80%] text-3xl font-semibold text-white'>Oops...Nothing here.</p>
                        </div>
                    }
                </div>
            </Suspense>
        </Layout>
    )
}

export default Explore