import React, { useEffect, useState } from 'react'
import { Form, useActionData } from '@remix-run/react'
import bcrypt from 'bcrypt'
import { User } from '../DB/models'
import { json, redirect } from '@remix-run/react'
import { ActionFunctionArgs, ActionFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'

export default function SignIn() {
    const [rememberMe, setRememberMe] = useState(false)
    const [responseerror, setResponseError] = useState("")
    const navigate = useNavigate()

    const handeleSetRememberMe = ({ target }: any) => {
        setRememberMe(target.checked)
    }
    const serverResponse: any = useActionData()
    useEffect(() => {
        if (!serverResponse) return
        if (serverResponse && serverResponse.error) {
            setResponseError(serverResponse.error)
            return
        }
        else {
            rememberMe && localStorage.setItem("userID", serverResponse._id)
            !rememberMe && sessionStorage.setItem("userID", serverResponse._id)
            navigate("/explore")
        }


    }, [serverResponse])
    return (
        <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Login Into AppSpot </h2>
                <Form className="flex flex-col" preventScrollReset >
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
                        <input type="checkbox" name="rememberMe" id="" className='cursor-pointer' onChange={handeleSetRememberMe} />
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

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    try {
        //const newUser = new User()
        let reqBody: any = {};
        (await request.formData()).forEach((value: any, key: any) => {
            if (key) reqBody[key] = value;
        });

        const user: any = await User.findOne({
            $or:
            {
                //@ts-ignore
                email: reqBody.identification,
                username: reqBody.identification
            }
        });
        !user && json({ error: "Email or password is incorrect" })
        // const checkPassword =   
        if (!user || !(await bcrypt.compare(reqBody.password, user.password))) {
            return json({ error: "Email or password is incorrect" });
        }
        return json(user)
    }
    catch (err) {
        console.log(err)
        return json({ error: "Oops..Something went wrong" })
    }
}