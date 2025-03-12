import React, { useEffect, useState } from 'react'
import Navabar from '../components/Navbar'
import { LoaderFunction, json } from '@remix-run/node'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Product, Transaction, User } from '../DB/models'
import { useLoaderData, useNavigate, useParams } from '@remix-run/react'
import Layout from './Layout'
import ProductCard from '../components/ProductCard'
import { File } from 'megajs'

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
    businessDetails: null | undefined | { businessName: string },
    firstName: string,
    lastName: string,
    middleName: string,
    profilePicture: string
}
interface product {
    _id: string, screenshots: string[], title: string, description: string, productURL: string, price: number, pricingModel: string, customerTotalRating: number, purchasesCount: number, productRatersCount: number, verified: boolean,
}

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    try {
        const accountData = await User.findById(params.id).select(["-password"])
        const products = await Product.find({ seller: params.id }).select(["title", "description", "pricingModel", "price", "screenshots", "price", "purchasesCount", "productRatersCount", "customerTotalRating", "verified"])
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
    const [profilePicture, setProfilePicture] = useState("/random.png")

    const handleLogout = () => {
        localStorage.removeItem("userID")
        sessionStorage.removeItem("userID")
        navigate("/explore")
    }

    const getMegaProfilePic = () => {
        if (accountData.profilePicture) {
            const file = File.fromURL(accountData.profilePicture);
            file.loadAttributes((err, file) => {
                if (err) {
                    console.error('Error loading file attributes:', err);
                    return;
                }
                file.downloadBuffer({}).then(data => {
                    const decoder = new TextDecoder()
                    setProfilePicture(decoder.decode(data))
                })
            }).catch(err => {
                console.error(err)
                setProfilePicture("/random.png")
            });
        }
        else {
            setProfilePicture("/random.png")
        }
    }
    useEffect(() => {
        getMegaProfilePic()
    }, [])
    return (
        <Layout>
            {
                accountData?.businessDetails ? (
                    <div>
                        <div className='h-10 w-full mt-1 mb-3 bg-slate-700 flex justify-between items-center px-2'>
                            <div className='flex gap-1 items-center'>
                                <img src={profilePicture} className='h-6 rounded-full aspect-square' alt="" />
                                <p className='text-xl'>{accountData.firstName} {accountData.middleName} {accountData.lastName}</p>
                            </div>

                            <div className='Sort-wrapper-div text-black flex flex-col  p-2 bg-slate-300  rounded my-2 relative has-[button:focus]:overflow-visible overflow-hidden'>
                                <button className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-4'><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                                </button>
                                <div className='absolute -bottom-2 bg-slate-900 bg-opacity-90 py-2 px-1 rounded w-fit flex flex-col gap-2 translate-y-full -translate-x-full z-20 text-white left-full'>
                                    <div className='w-full'>
                                        <button className='w-full text-start min-w-max rounded py-0.5 px-2 bg-slate-800 my-0.5'
                                            onClick={() => navigate(`/edit-profile/${accountData._id}`)} value="">Edit Profile</button>
                                        <button className='w-full text-start min-w-max rounded py-0.5 px-2 bg-red-800 my-0.5'
                                            onClick={handleLogout} value="ascendingPrice">Log Out</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {products.length > 0 && <div>
                            <div className='w-full flex justify-between items-center px-2'>
                                <h2 className='text-3xl font-semibold mx-2'>My Products</h2>
                                <button className='rounded border-[2px] border-transparent hover:border-[var(--purple-blue)] bg-slate-400 my-2 text-black mx-1 p-1 ' onClick={() => navigate(`/register-product/${userID}`)}>
                                    New +
                                </button>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap 2x:gap-1'>
                                {products.map(product => (
                                    <div key={product._id} className={`max-w-80  relative overflow-hidden`} >
                                        <div className={`${product.verified ? "opcatity-100" : "opacity-50"} w-full h-full`}>
                                            <ProductCard _id={product._id} description={product.description} price={product.price} pricingModel={product.pricingModel} productURL={product.productURL} screenshots={product.screenshots} title={product.title} customerTotalRating={product.customerTotalRating} productRatersCount={product.productRatersCount} purchases={product.purchasesCount} />
                                        </div>
                                        {!product.verified && <div className='absolute inset-0 z-10  rounded flex justify-center items-center '>
                                            <p className='text-center text-white  bg-red-700 w-fit text-lg rounded px-3 py-1'>Not verified</p>
                                        </div>}
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