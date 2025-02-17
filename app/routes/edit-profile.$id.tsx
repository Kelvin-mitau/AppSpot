import React, { useState } from 'react'
import { Form } from '@remix-run/react'

function EditProfile() {
    const [editField, setEditField] = useState<null | string>(null)
    const sampleData = {
        _id: "1",
        username: "Kefini",
        firstName: "Kelvin",
        lastName: "Mitau",
        middleName: "John",
        profilePicture: "/random.png",
        createdAt: "March 2023",
        bio: "Hello world this is my bio",
        phone: "+254768067032",
        email: "kefini@gmail.com",
        tags: ["UI Designer", "System  Designer", "Web Developer", "Fullstack developer"]
    }

    const EditButton: React.FC<{ field: string }> = ({ field }) => {
        return (
            <button onClick={() => setEditField(field)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-6 fill-[var(--purple-blue)]'>
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 
                168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 
                31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7
                 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4
                  88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40
                   40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" /></svg>
            </button>
        )
    }

    return (
        <Form className='max-w-[600px] mx-auto my-5 text-white'>
            <h1 className='text-white text-center text-2xl my-2 '>Click the edit icon to update a field</h1>
            <img src={sampleData.profilePicture} alt="Profile picture" className='rounded-full w-40 aspect-square
                     border-lg border-white mx-auto' />

            <div className='w-full flex items-center my-2 '>
                <label htmlFor="profile-picture-update" className='bg-[var(--purple-blue)] cursor-pointer px-2 py-1 rounded mx-auto'>
                    Change Profile Picture
                    <input type="file" accept="*/image" name="" id="profile-picture-update" className='hidden' />
                </label>
            </div>
            <div className='flex item w-full'>
                <div className='flex flex-col  mx-auto w-full'>
                    <div className='flex justify-between bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                        <p className='text-center text-lg ' ><i>First Name: </i>
                            {editField == 'firstName' ? <input defaultValue={sampleData.firstName} className='outline-none rounded text-black' /> : sampleData.firstName}
                        </p>
                        <EditButton field='firstName' />
                    </div>
                    <div className='flex justify-between bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                        <p className='text-center text-lg ' > <i>Last Name: </i>
                            {editField == 'lastName' ? <input defaultValue={sampleData.lastName} className='outline-none rounded text-black' /> : sampleData.lastName}
                        </p>
                        <EditButton field='lastName' />
                    </div>
                    <div className='flex justify-between bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                        <p className='text-center text-lg ' ><i>Middle Name: </i>
                            {editField == 'middleName' ? <input defaultValue={sampleData.middleName} className='outline-none rounded text-black' /> : sampleData.middleName}
                        </p>
                        <EditButton field='middleName' />
                    </div>
                </div>
            </div>
            <div className=' bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                <div className='w-full flex justify-between'>
                    <p className='text-center text-lg ' ><i>Bio: </i>

                    </p>
                    <EditButton field='bio' />
                </div>
                <div>
                    {editField == 'bio' ? <textarea defaultValue={sampleData.bio} className='outline-none rounded text-black resize-y w-full my-2' /> : sampleData.bio}
                </div>
            </div>
            <div className='w-full flex justify-between'>
                <button className='px-3 py-1 rounded bg-[red]' type='button' onClick={() => setEditField(null)}>Cancel</button>
                <button className='px-3 py-1 rounded bg-[var(--purple-blue)]'>Confirm</button>
            </div>

        </Form>
    )
}

export default EditProfile

