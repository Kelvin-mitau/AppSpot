import React, { useState } from 'react'
import { Form } from '@remix-run/react'
import imageToBase64 from '../functions/toBase64'
//@ts-ignore
import DropZone from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'

export default function SignUp() {
    const [profilePicture, setProfilePicture] = useState<String | String[]>("");
    const handleImageUpload = async (file: any) => {
        // console.log(await imageToBase64(file))
        const base64Val = await imageToBase64(file)
        setProfilePicture(base64Val);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen my-5">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Create AppSpot Account</h2>
                <Form className="flex flex-col">
                    <div className='my-2'>
                        <p className='text-center mb-1 text-lg'>Profile Picture</p>
                        {/* <DropZone

                            onDrop={async (file: any) => handleImageUpload(file)}
                        /> */}
                        <DropZone onDrop={(file: any) => handleImageUpload(file)} accept="/image*" multiple={false}>
                            {
                                () => (
                                    <div className='cursor-pointer relative h-52 rounded-full aspect-square bg-slate-500 mx-auto'>
                                        <img src="/user.png" alt="" />
                                        <p className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black
                                        bg-white bg-opacity-80 rounded text-center'>Click or drag and drop.</p>
                                    </div>)
                            }
                        </DropZone>
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

                        placeholder="Phone Number"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="tel"
                        name='phoneNumber'
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