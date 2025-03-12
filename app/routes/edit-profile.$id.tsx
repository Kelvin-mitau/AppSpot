import React, { useState, Suspense, useEffect } from 'react'
import { Form, Link, redirect } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import imageToBase64 from '../functions/toBase64'
import { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node'
import { User } from '../DB/models'
import Layout from './Layout'
import { File } from 'megajs'

import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "Edit Profile",
            author: "Appspot"
        }
    ];
};


export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const userID = params.id
    const user = await User.findById(userID)
    return json(user)
}

export const action: ActionFunction = async ({ params, request }: ActionFunctionArgs) => {
    const userID = params.id
    const formData: any = {};
    (await request.formData()).forEach((value: any, key: any) => {
        if (key && value) formData[key] = value;
    });
    await User.findByIdAndUpdate(userID, {
        $set: formData
    })

    return redirect(`/account/${userID}`)
}

function EditProfile() {
    const [editField, setEditField] = useState<null | string>(null)
    interface userData {
        _id: string,
        username: string,
        firstName: string,
        lastName: string,
        middleName: string,
        profilePicture: string,
        createdAt: string,
        bio: string,
        phone: string,
        email: string,
        tags: string[]
    }
    const userData: userData = useLoaderData()
    const [fieldsData, setFieldData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        middleName: userData.middleName,
        bio: userData.bio
    })
    const [profilePicture, setProfilePicture] = useState<string>("/random.png")
    const [profilePictureIsChanged, setProfilePictureIsChanged] = useState(false)


    const EditButton: React.FC<{ field: string }> = ({ field }) => {
        return (
            <button onClick={() => setEditField(field)} type='button'>
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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (profilePictureIsChanged) {
            const formData = new FormData()
            formData.append("productFile", profilePicture)
            formData.append("productFileType", ".txt")
            formData.append("sellerID", userData._id || "")

            fetch("/megaUpload", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(({ link, error }) => {
                    if (error) {
                        return;
                    }
                    else {
                        handleDeletePrevProfilePic()
                        const profilePicInput = document.createElement("input")
                        profilePicInput.name = "profilePicture"
                        profilePicInput.value = link
                        profilePicInput.style.display = "hidden"
                        event.target.append(profilePicInput)
                        event.target.submit()
                    }
                }).catch(err => console.error(err))
        } else {
            event.target.submit()
        }
    }
    const handleProfilePictureUpload = (event: any) => {
        imageToBase64(event.target.files[0]).then(data => {
            setProfilePicture(data)
            setProfilePictureIsChanged(true)
        }).catch(err => console.log(err))

    }
    const handleDeletePrevProfilePic = async () => {
        fetch("/megaDelete", {
            method: "POST",
            body: JSON.stringify({ fileLink: userData.profilePicture })
        })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getMegaProfilePic()
    }, []);
    const getMegaProfilePic = () => {
        if (userData.profilePicture) {
            const file = File.fromURL(userData.profilePicture);
            file.loadAttributes((err, file) => {
                if (err) {
                    console.error('Error loading file attributes:', err);
                    return;
                }
                file.downloadBuffer({}).then(data => {
                    const decoder = new TextDecoder()
                    setProfilePicture(decoder.decode(data))
                })
            }).catch(err => {
                console.error(err)
                setProfilePicture("/random.png")
            });
        }
        else {
            setProfilePicture("/random.png")
        }
    }
    return (
        <Layout>
            <Suspense fallback={<div>Loading</div>}>
                <div className='flex flex-col items-center justify-center w-screen min-h-[80vh]'>
                    <Form method='post' className='min-w-[250px]  sm:min-w-[350px] max-w-[600px] mx-auto my-5 text-white ' onSubmit={handleSubmit}>
                        <h1 className='text-white text-center text-2xl my-2 '>Click the edit icon to update a field</h1>
                        <img src={profilePicture} alt="Profile picture" className='rounded-full w-40 aspect-square
                                 border-lg border-white mx-auto' />
                        <div className='w-full flex items-center my-2 '>
                            <label htmlFor="profile-picture-update" className='bg-[var(--purple-blue)] cursor-pointer px-2 py-1 rounded mx-auto'>
                                Change Profile Picture
                                <input type="file" accept="image/*" name="" id="profile-picture-update" className='hidden' onChange={handleProfilePictureUpload} />
                            </label>
                        </div>
                        <div className='flex item w-full'>
                            <div className='flex flex-col  mx-auto w-full'>
                                <div className='flex justify-between bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                                    <p className='text-center text-lg flex ' > <i className='mx-1'>First Name: </i>
                                        <input defaultValue={userData.firstName}
                                            onChange={({ target }) => setFieldData({ ...fieldsData, [target.name]: target.value })}
                                            name="firstName" className={`mx-1 px-1 -none rounded text-black ${editField == 'firstName' ? "block" : "hidden"}`} />
                                        {editField != 'firstName' && fieldsData.firstName}
                                    </p>
                                    <EditButton field='firstName' />
                                </div>
                                <div className='flex justify-between bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                                    <p className='text-center text-lg flex ' > <i className='mx-1'>Last Name: </i>
                                        <input defaultValue={userData.lastName} onChange={({ target }) => setFieldData({ ...fieldsData, [target.name]: target.value })}
                                            name="lastName" className={`mx-1 px-1 -none rounded text-black ${editField == 'lastName' ? "block" : "hidden"}`} />
                                        {editField != 'lastName' && fieldsData.lastName}
                                    </p>
                                    <EditButton field='lastName' />
                                </div>
                                <div className='flex justify-between bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                                    <p className='text-center text-lg flex ' > <i className='mx-1'>Middle Name: </i>
                                        <input defaultValue={userData.middleName} onChange={({ target }) => setFieldData({ ...fieldsData, [target.name]: target.value })}
                                            name="middleName" className={`mx-1 px-1 -none rounded text-black ${editField == 'middleName' ? "block" : "hidden"}`} />
                                        {editField != 'middleName' && fieldsData.middleName}
                                    </p>
                                    <EditButton field='middleName' />
                                </div>
                            </div>
                        </div>
                        <div className=' bg-[#ffffff1f] my-2 py-1 px-2 rounded'>
                            <div className='w-full flex justify-between'>
                                <p className='text-center text-lg mx-1 ' ><i>Bio: </i>
                                </p>
                                <EditButton field='bio' />
                            </div>
                            <div>
                                <textarea defaultValue={userData.bio} onChange={({ target }) => setFieldData({ ...fieldsData, [target.name]: target.value })}
                                    name='bio' className={`outline-none rounded text-black resize-y w-full my-2 ${editField != 'bio' && "hidden"}`} />
                                {editField != 'bio' && fieldsData.bio}
                            </div>
                        </div>
                        <div className='w-full flex justify-between'>
                            <Link className='px-3 py-1 rounded bg-[red]' type='button' to={`/account/${userData._id}`}>Cancel</Link>
                            <button className='px-3 py-1 rounded bg-[var(--purple-blue)]'>Confirm</button>
                        </div>
                    </Form>
                </div>
            </Suspense>
        </Layout>
    )
}

export default EditProfile

