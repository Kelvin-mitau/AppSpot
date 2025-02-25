import React from 'react'
import Navabar from '../components/Navbar'
import { LoaderFunction, json } from '@remix-run/node'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Product, Transaction, User } from '../DB/models'
import { useLoaderData, useNavigate, useParams } from '@remix-run/react'
import Layout from './Layout'

interface accountData {
    _id: string,

    businessDetails: null | undefined | { businessName: string }
}
interface product {
    _id: string, screenshots: string[], title: string, description: string, productURL: string, price: number, pricingModel: string,
}

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    try {
        const accountData = await User.findById(params.id).select(["-password"])
        const products = await Product.find({ seller: params._id }).select(["title", "description", "price"])
        const purchases = await Transaction.find({ seller: params.id }).select([])

        return json({ accountData, purchases, products })
    }
    catch (err) {
        console.log(err)
        return json({ error: "Oops...Something went wrong on our side" })
    }
}

function Account() {
    const params = useParams()
    const userID = params.id
    const { accountData, purchases, products, error } = useLoaderData<{
        accountData: accountData, purchases: {}[], error: string,
        products: product[]
    }>()


    const navigate = useNavigate()

    const handleProductReview = (event: React.MouseEvent<HTMLButtonElement>, url: string) => {
        event.stopPropagation()
        navigate(url, {})
    }
    return (
        <Layout>
            {
                accountData?.businessDetails ? (
                    <div>
                        {products.length > 0 && <div>
                            <div className='w-full flex justify-end'>
                                <button className='rounded border-[2px] border-transparent hover:border-[var(--purple-blue)] bg-slate-400 my-2 text-black mx-1 p-1 ' onClick={() => navigate(`/register-product/${userID}`)}>
                                    New +
                                </button>
                            </div>
                            <div className='flex gap-1'>
                                {products.map(product => (
                                    <div key={product._id}>
                                        <div className='Product-card h-full mx-2 flex flex-col justify-between p-1 text-white' >
                                            <img src={product.screenshots[0]} alt="" className='w-full aspect-[2/1.5] mr-1 rounded-lg' />
                                            <div className='mx-1'>
                                                <p className='text-lg my-2'>{product.title}</p>
                                                <p className='text-[0.9rem] text-slate-200'>{product.description}</p>
                                                {product.productURL && <button className='underline' onClick={(e) => handleProductReview(e, product.productURL)}>Preview</button>}
                                                <div className='flex justify-end'>
                                                    {product.pricingModel == "freemium" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>Free</p>}
                                                    {product.pricingModel == "subscription" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {product.price} per month</p>}
                                                    {product.pricingModel == "oneTime" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {product.price} one time</p>}
                                                </div>
                                                <p className=' text-slate-100 my-1'>{purchases.length} {purchases.length == 1 ? "purchase" : "purchases"}</p>
                                            </div>
                                        </div>
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