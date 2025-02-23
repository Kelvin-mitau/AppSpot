import React, { useEffect, useState } from 'react'
import { Form, json, redirect, useActionData } from '@remix-run/react'
import imageToBase64 from '../functions/toBase64'
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node'
import { User } from '../DB/models'
import bcrypt from "bcrypt"



const SignUp = () => {
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [serverResponseError, setServerResponseError] = useState<undefined | string>("");
    const handleImageUpload = async (files: any) => {
        // console.log(await imageToBase64(file))
        const base64Val = await imageToBase64(files[0])
        setProfilePicture(base64Val);
    }
    const serverRes: any = useActionData()
    useEffect(() => { if (serverRes && typeof (serverRes.error)) setServerResponseError(serverRes.error) }, [serverRes])

    const handleSubmit = (event: any) => {
        //event.preventDefault()
        const form = event.target
        const profilePictureInput = document.createElement("input")
        profilePictureInput.style.display = "none"
        profilePictureInput.name = "profilePicture"
        profilePictureInput.value = profilePicture
        form.append(profilePictureInput)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen my-5">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Create AppSpot Account</h2>
                <Form className="flex flex-col" method='put' preventScrollReset onSubmit={handleSubmit}>
                    <div className='my-2'>
                        <p className='text-center mb-1 text-lg'>Profile Picture(Click to upload)</p>
                        <div className="flex justify-center w-full">
                            <label htmlFor='profile-picture-input' className='cursor-pointer relative h-52 rounded-full aspect-square bg-slate-500 mx-auto'>
                                <img src="/user.png" alt="" className='h-52 aspect-square rounded-full' />
                                <input id='profile-picture-input' type='file' accept='image/*' onChange={(e) => handleImageUpload(e.target.files)} className='hidden' />
                                {/* <p className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black
                                            bg-white bg-opacity-80 rounded text-center'>Click or drag and drop.</p> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <input
                            required

                            placeholder="First Name *"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name='firstName'
                        />
                        <input
                            required

                            placeholder="Last Name *"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name='lastName'
                        />
                    </div>
                    <input
                        placeholder="Middle Name"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='middleName'
                    />
                    <input
                        required

                        placeholder="Username *"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='username'
                    />

                    <input
                        required

                        placeholder="Phone Number *"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="tel"
                        name='phoneNumber'
                    />
                    <input
                        required

                        placeholder="Email *"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        name='email'
                    />
                    <input
                        required

                        placeholder="Password *"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        name="password"
                    />
                    <input
                        required

                        placeholder="Confirm Password *"
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
                    {serverResponseError && <p className='text-red-600 mt-2 mx-auto'>{serverResponseError}</p>}
                </Form>
            </div>
        </div>
    )
}
export default SignUp

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    try {
        //const newUser = new User()
        let reqBody: any = {};
        (await request.formData()).forEach((value: any, key: any) => {
            if (key) reqBody[key] = value;
        });
        if (reqBody.password != reqBody.confirmPassword) {
            return json({ error: "Passwords do not match" })
        }
        reqBody.password = await bcrypt.hash(reqBody.password, 10)
        if ((await User.find({ email: reqBody.email })).length > 0) {
            return json({ error: "This email is already registered" })
        }
        if ((await User.find({ phoneNumber: reqBody.phoneNumber })).length > 0) {
            return json({ error: "This phone number is already registered" })
        }
        if ((await User.find({ username: reqBody.username })).length > 0) {
            return json({ error: "This username is already taken" })
        }

        const newUser = new User(reqBody)
        await newUser.save()
        console.log(newUser)
        return redirect('/explore')
    } catch (err) {
        console.log(err)
        return json({ error: "Oops..Something went wrong" })
    }
}