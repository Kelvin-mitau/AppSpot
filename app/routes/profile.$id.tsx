

import { Link, Params, useLoaderData, useParams } from '@remix-run/react'
import React from 'react'

function Profile() {
    const params = useParams()
    console.log(params)

    const sampleData = {
        _id: "1",
        username: "Kefini",
        firstName: "Kelvin",
        lastName: "Mitau",
        profilePicture: "/random.png",
        createdAt: "March 2023",
        bio: "Hello world this is my bio",
        phone: "+254768067032",
        email: "kefini@gmail.com",
        tags: ["UI Designer", "System  Designer", "Web Developer", "Fullstack developer"]
    }
    return (
        <div className='mx-auto flex flex-col items-center justify-center text-white'>
            <div className='relative bg-[#0000003f] pb-5 px-3 my-36 min-w-64 sm:min-w-72 rounded-lg max-w-[28rem]'>
                <img src={sampleData.profilePicture} alt="Profile picture" className='absolute  -translate-y-1/2 rounded-full w-40 aspect-square
                 border-lg border-white left-1/2 -translate-x-1/2' />
                <p className='text-center mt-20 mx-auto rounded bg-[var(--cyan)] text-black px-2 py-1 w-fit mb-2'>
                    <Link to={`/update-profile/${sampleData._id}`} >Update Profile</Link>
                </p>
                <p className='text-center'>@{sampleData.username}</p>
                <p className='text-center text-lg my-2' >{sampleData.firstName} {sampleData.lastName}</p>
                <p className='text-slate-300 my-2 rounded bg-[#ffffff1f] p-2'>{sampleData.bio}</p>
                <div className='rounded bg-[#ffffff1f] my-2 p-2 gap-1 flex flex-col text-sm sm:text-base'>
                    <div className='flex justify-between'>
                        <p className='text-slate-300'>Icon Email</p>
                        <p>{sampleData.email}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Icon Phone</p>
                        <p>{sampleData.phone}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Icon Joined</p>
                        <p>{sampleData.createdAt}</p>
                    </div>
                </div>
                <div className='rounded bg-[#ffffff1f] my-2 p-2 gap-1 flex flex-wrap justify-around text-sm sm:text-base'>
                    {sampleData.tags.map((item, _index) => <p key={_index} className='rounded px-2 py-1 w-fit text-nowrap my-1 bg-[#ffffff2f]'>{item}</p>)}
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Profile