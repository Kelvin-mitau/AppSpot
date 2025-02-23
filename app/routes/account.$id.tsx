import React from 'react'
import Navabar from '../components/Navbar'
import { LoaderFunction, json } from '@remix-run/node'
import { LoaderFunctionArgs } from '@remix-run/node'
import { User } from '../DB/models'
import { useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const accountData = await User.findById(params.id).select(["-password"]).populate("product", ["title", "description", "price"])
    return json(accountData)
}

function Account() {
    const accountData = useLoaderData()
    return (
        <>
            <nav className='w-full'><Navabar /></nav>
            <div>Account</div>
        </>
    )
}

export default Account