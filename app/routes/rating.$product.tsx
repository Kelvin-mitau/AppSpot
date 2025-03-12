
import React from 'react'
import Layout from './Layout'
import { LoaderFunction, json } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request, params }) => {
    const { product } = params
    const rating = new URL(request.url).searchParams.get('rating')
    console.log({ product, rating })
    return json({})
}

const Rating = () => {
    return (
        <Layout>
            <div className=" min-h-[80vh] flex items-center justify-center">
                <div className=" p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className='h-20 aspect-square bg-green-100 rounded-full mx-auto flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-full text-green-500 mx-auto " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
                    <p className="text-gray-300 mb-4">We appreciate you taking the time to rate our product.</p>
                    <p className="text-gray-300">Your feedback helps us improve.</p>
                    <a href="/" className="text-xl mt-6 bg-blue-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full inline-block
                    transition-colors duration-500">Return to Homepage</a>
                </div>
            </div>
        </Layout>
    )
}

export default Rating