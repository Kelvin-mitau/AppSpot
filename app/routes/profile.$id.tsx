import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node'
import { User } from '../DB/models'

import { Link, Params, useLoaderData, useNavigate, useParams } from '@remix-run/react'
import React from 'react'
import Navabar from '../components/Navbar'
import Layout from './Layout'


import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "Profile",
            author: "Appspot"
        }
    ];
};

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const userID = params.id
    const user = await User.findById(userID)
    return json(user)
}

function Profile() {

    interface userData {
        _id: string,
        username: string,
        firstName: string,
        lastName: string,
        middleName: string,
        profilePicture: string | null,
        createdAt: string,
        bio: string,
        phoneNumber: string,
        email: string,
        tags: string
    }
    const userData: userData = useLoaderData()

    const navigate = useNavigate()

    const formatDate = (originalDate: string) => {
        const dateObject = new Date(originalDate);
        const splittedDate = dateObject.toISOString().split('T')[0];
        const formattedDate = splittedDate.split("-").reverse().join("/")
        return formattedDate;
    }

    const handleLogOut = () => {
        localStorage.removeItem("userID")
        sessionStorage.removeItem("userID")
        navigate("/explore")
    }
    return (
        <Layout>

            {userData ? (<div className='mx-auto flex flex-col items-center justify-center text-white'>
                <div className='relative bg-[#0000003f] pb-5 px-3 my-36 min-w-64 sm:min-w-72 rounded-lg max-w-[28rem]'>
                    <img src={userData.profilePicture ? userData.profilePicture : "/random.png"} alt="Profile picture" className='absolute  -translate-y-1/2 rounded-full w-40 aspect-square
                     border-lg border-white left-1/2 -translate-x-1/2' />
                    <p className='text-center mt-20 mx-auto rounded bg-[var(--cyan)] text-black px-2 py-1 w-fit mb-2'>
                        <Link to={`/edit-profile/${userData._id}`} >Update Profile</Link>
                    </p>
                    <p className='text-center'>@{userData.username}</p>
                    <p className='text-center text-lg my-2' >{userData.firstName} {userData.middleName} {userData.lastName}</p>
                    <p className='text-slate-300 my-2 rounded bg-[#ffffff1f] p-2'>{userData.bio}</p>
                    <div className='rounded bg-[#ffffff1f] my-2 p-2 gap-1 flex flex-col text-sm sm:text-base'>
                        <div className='flex justify-between'>
                            <p className='text-slate-300 flex gap-1 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-4 fill-slate-300'>
                                    <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8
                                7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7
                                 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" /></svg>
                                <span>Email</span></p>
                            <p>{userData.email}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='flex gap-1 items-center text-slate-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-4 fill-slate-300'>
                                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1
                                 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144
                                  207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                <span>Phone</span>
                            </p>
                            <p>{userData.phoneNumber}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='flex gap-1 items-center text-slate-300' >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-4 fill-slate-300'>
                                    <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160
                                 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" /></svg>
                                <span>Joined</span>
                            </p>
                            <p>{formatDate(userData.createdAt)}</p>
                        </div>
                    </div>
                    {userData.tags && <div className='rounded bg-[#ffffff1f] my-2 p-2 gap-1 flex flex-wrap justify-around text-sm sm:text-base'>
                        {userData.tags.split(",").map((item, _index) => <p key={_index} className='rounded px-2 py-1 w-fit text-nowrap my-1 bg-[#ffffff2f]'>{item}</p>)}
                    </div>}
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 w-full"
                        onClick={() => navigate(`/account/${userData._id}`)}
                    >
                        My Account
                    </button>

                    <button
                        onClick={handleLogOut}
                        className="bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-red-800 hover:to-red-600 transition ease-in-out duration-150 w-full"
                    >
                        Log Out
                    </button>
                </div>
                <div>
                </div>
            </div>)
                : <div>Nothing here </div>}
        </Layout>
    )
}

export default Profile