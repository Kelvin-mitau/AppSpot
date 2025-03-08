import React from 'react'
import Navabar from '../components/Navbar'
import { LoaderFunction, json } from '@remix-run/node'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Product, Transaction, User } from '../DB/models'
import { useLoaderData, useNavigate, useParams } from '@remix-run/react'
import Layout from './Layout'
import ProductCard from '../components/ProductCard'

import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "Account",
            description: "View your profile information, edit profile infomation and check your products",
            author: "Appspot"
        }
    ];
};

interface accountData {
    _id: string,
    businessDetails: null | undefined | { businessName: string }
}
interface product {
    _id: string, screenshots: string[], title: string, description: string, productURL: string, price: number, pricingModel: string, customerTotalRating: number, purchasesCount: number, productRatersCount: number
}

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    try {
        const accountData = await User.findById(params.id).select(["-password"])
        const products = await Product.find({ seller: params.id }).select(["title", "description", "pricingModel", "price", "screenshots", "price", "purchasesCount", "productRatersCount", "customerTotalRating"])
        const purchases = await Transaction.find({ seller: params.id }).select([])

        return json({ accountData, purchases, products })
    }
    catch (err) {
        console.log(err)
        return json({ error: "Oops...Something went wrong on our side" })
    }
}

const Account = () => {
    const params = useParams()
    const userID = params.id
    const { accountData, purchases, products, error } = useLoaderData<{
        accountData: accountData, purchases: {}[], error: string,
        products: product[]
    }>()
    const navigate = useNavigate()
    return (
        <Layout>
            {
                accountData?.businessDetails ? (
                    <div>

                        {products.length > 0 && <div>
                            <div className='w-full flex justify-between items-center px-2'>
                                <h2 className='text-3xl font-semibold mx-2'>My Products</h2>
                                <button className='rounded border-[2px] border-transparent hover:border-[var(--purple-blue)] bg-slate-400 my-2 text-black mx-1 p-1 ' onClick={() => navigate(`/register-product/${userID}`)}>
                                    New +
                                </button>
                            </div>
                            <div className='flex gap-1'>
                                {products.map(product => (
                                    <div key={product._id} className='max-w-80'>
                                        <ProductCard _id={product._id} description={product.description} price={product.price} pricingModel={product.pricingModel} productURL={product.productURL} screenshots={product.screenshots} title={product.title} customerTotalRating={product.customerTotalRating} productRatersCount={product.productRatersCount} purchases={product.purchasesCount} />
                                    </div>
                                ))}
                            </div>
                        </div>}
                        {
                            <div>
                                {
                                    products.length <= 0 && (
                                        <div className='w-full min-h-[80vh] grid justify-items-center place-content-center'>
                                            <p className='text-lg my-2'>You haven't uploaded any product yet.</p>
                                            <a
                                                role="button"
                                                className="border border-white group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                                                title="Sign Up"
                                                href={`/register-product/${userID}`}
                                            >Click to upload a product.<svg
                                                aria-hidden="true"
                                                viewBox="0 0 10 10"
                                                height="10"
                                                width="10"
                                                fill="none"
                                                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                                            >
                                                    <path
                                                        d="M0 5h7"
                                                        className="transition opacity-0 group-hover:opacity-100"
                                                    ></path>
                                                    <path
                                                        d="M1 1l4 4-4 4"
                                                        className="transition group-hover:translate-x-[3px]"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                )
                    : (
                        <div className='w-full min-h-[80vh] grid justify-items-center place-content-center'>
                            <p className='text-lg my-2'>Please complete your account to upload products on the site.</p>

                            <a
                                role="button"
                                className="border border-white group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                                title="Sign Up"
                                href={`/account-info/${userID}`}
                            >Complete Account<svg
                                aria-hidden="true"
                                viewBox="0 0 10 10"
                                height="10"
                                width="10"
                                fill="none"
                                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                            >
                                    <path
                                        d="M0 5h7"
                                        className="transition opacity-0 group-hover:opacity-100"
                                    ></path>
                                    <path
                                        d="M1 1l4 4-4 4"
                                        className="transition group-hover:translate-x-[3px]"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    )
            }
        </Layout>
    )
}

export default Account