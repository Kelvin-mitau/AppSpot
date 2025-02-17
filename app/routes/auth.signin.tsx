import React from 'react'
import { Form } from '@remix-run/react'

export default function SignIn() {
    return (
        <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Login Into AppSpot </h2>
                <Form className="flex flex-col" >
                    <input
                        required

                        placeholder="Username or Password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='identification'
                    />

                    <input
                        required

                        placeholder="Password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        name='password'
                    />
                    <div className='flex gap-2'>
                        <input type="checkbox" name="rememberMe" id="" className='cursor-pointer' />
                        <p>Remember me</p>
                    </div>
                    <p className="text-white mt-4">
                        Have no account account?
                        <a className="mx-2 text-blue-500 -200 hover:underline mt-4" href="/sign-up"
                        >Create Account</a>
                    </p>
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </Form>
            </div>
        </div>
    )
}

