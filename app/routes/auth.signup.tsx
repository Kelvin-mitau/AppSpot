import React from 'react'
import { Form } from '@remix-run/react'

export default function SignUp() {
    return (
        <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Create ProSkill Account</h2>
                <Form className="flex flex-col">
                    <p className='text-white'>Choose Account Type</p>
                    <div className='flex justify-between items-center bg-gray-700 text-gray-200 mt-2 mb-4 p-2 rounded-md'>
                        <label htmlFor="student-account-type" className='flex gap-1 cursor-pointer'>
                            <input required type="radio" name="role" value="student" id="student-account-type" defaultChecked /> Student</label>
                        <label htmlFor="coach-account-type" className='flex gap-1 cursor-pointer'>
                            <input type="radio" name="role" id="coach-account-type" value="coach" /> Coach</label>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <input
                            required

                            placeholder="First Name"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name='firstName'
                        />
                        <input
                            required

                            placeholder="Last Name"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name='lastName'
                        />
                    </div>
                    <input
                        required

                        placeholder="Username"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='username'
                    />
                    <input
                        required

                        placeholder="Email"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        name='email'
                    />
                    <input
                        required

                        placeholder="Password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        name="password"
                    />
                    <input
                        required

                        placeholder="Confirm Password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        name="confirmPassword"
                    />

                    <p className="text-white mt-4">
                        Already have an account?
                        <a className="mx-2 text-blue-500 -200 hover:underline mt-4" href="/sign-in"
                        >Login</a>
                    </p>
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    {/* {response && <p className='text-red-600 mt-2 mx-auto'>{response}</p>} */}
                </Form>
            </div>
        </div>
    )
}

//export default SignUp