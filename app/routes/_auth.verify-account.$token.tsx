import React, { useEffect } from 'react'
import "../styles/Verify-account.css"
import { json, useLoaderData, redirect, useNavigate } from '@remix-run/react'
import { LoaderFunctionArgs, LoaderFunction } from '@remix-run/node'
import { User } from '../DB/models'

function VerifyAccount() {
    const serverRes = useLoaderData<{ error: string | undefined | null, userID: string | null | undefined }>()
    const navigate = useNavigate()
    useEffect(() => {
        if (serverRes.userID) {
            navigate("/sign-in")
        }
    }, [serverRes])
    return (
        <div className='h-screen w-full grid justify-items-center place-content-center'>
            <div className="Verify-account-loader"></div>
            <div className='my-5 text-2xl text-white'>
                {serverRes?.error ? serverRes.error : "Just a sec..."}
            </div>
        </div>
    )
}

export default VerifyAccount

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    try {
        const dsalnkna = ["fksnv", "fkjsa", "rjkwb", "zfjwb", "nwvei", "jxbvs", "viosj", "ibnwe", "vbmqw", "vngvz", "vneir", "gneia", "cbquw", "cnwrn", "obewe", "gbrup", "vn9rw", "go94n", "iovbi", "ivnrv", "finea", "hoxns", "saonv", "iqnoi", "vwvin", "cvnwi", "vmlsa", "knwoe", "vnrir", "vndos", "osidv", "veris", "ainer", "vnovx", "avnve"]

        const token = params.token || ""
        const tokenAuth = token.slice(0, 5)

        if (!token || !dsalnkna.find(item => item === tokenAuth) || token.length < 24) {
            console.log("jubwubw")
            return json({ error: "Invalid authentication link" })
        }
        const userID = token.slice(5)
        await User.findByIdAndUpdate(userID, {
            $set: {
                active: true
            }
        })
        return json({ userID })

    } catch (error) {
        console.log("Unable to verify user account", error)
        return json({ error: "Oops..Something went wrong on our side." })
    }

}