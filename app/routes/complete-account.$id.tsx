import { useState } from 'react'
import { Form, redirect } from '@remix-run/react'
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node'
import imageToBase64 from '../functions/toBase64'

function CompleteAccount() {
    const [currentForm, setCurrentForm] = useState(2)

    const [profilePicture, setProfilePicture] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])

    const [tagInputValue, setCurrentInputValue] = useState<string>("")

    const popularTags = `#crmexpert#marketingautomation#projectmanagement#hrsoftware#accountingsoftware#ecommerceplatform#customerengagement#analyticsguru#collaborationtools#cybersecurity#fintechsolutions#healthtech#edtech#iotplatform#aiandml#ecommerce#landing-page#SAAS`
    const popularTagsArr = popularTags.split("#")

    const handleImageUpload = async (files: any) => {
        // console.log(await imageToBase64(file))
        const base64Val = await imageToBase64(files[0])
        setProfilePicture(base64Val);
    }
    const handleSubmit = (event: any) => {
        //event.preventDefault()
        const form = event.target
        const profilePictureInput = document.createElement("input")
        profilePictureInput.style.display = "none"
        profilePictureInput.name = "profilePicture"
        profilePictureInput.value = profilePicture
        form.append(profilePictureInput)
        const tagsInput = document.createElement("input")
        tagsInput.style.display = "none"
        tagsInput.name = "tags"
        tagsInput.value = tags.join(",")
        form.append(tagsInput)
    }
    const handleCurrentTagInput = (e: any) => {
        setCurrentInputValue(e.target.value)
    }
    const handleAppendTag = () => {
        const tagInput: any = document.getElementById("tag-input")
        setTags([...tags, tagInputValue])
        tagInput.value = ""
    }
    return (
        <Form className="flex flex-col w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 mx-auto my-2" method='put' preventScrollReset onSubmit={handleSubmit}>
            <div>
                <div className={currentForm != 1 ? "hidden" : ""}>
                    <h2 className='text-white text-center text-2xl my-2'>Tell Us More About You</h2>
                    <p className='text-center mb-1 text-lg'>Profile Picture(Click to upload)</p>
                    <div className="flex justify-center w-full">
                        <label htmlFor='profile-picture-input' className='cursor-pointer relative h-52 rounded-full aspect-square bg-slate-500 mx-auto'>
                            <img src={profilePicture ? profilePicture : `/user.png`} alt="" className='h-52 aspect-square rounded-full' />
                            <input id='profile-picture-input' type='file' accept='image/*' onChange={(e) => handleImageUpload(e.target.files)} className='hidden' />
                            {/* <p className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black
                                            bg-white bg-opacity-80 rounded text-center'>Click or drag and drop.</p> */}
                        </label>
                    </div>
                    <textarea name="bio" id="bio-input" cols={3}
                        placeholder='Bio'
                        className="w-full my-2 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 
                        focus:ring-blue-500 transition ease-in-out duration-150 resize-y"
                    ></textarea>
                    <div>
                        <div className='flex gap-1'>
                            {
                                tags.map((tag, index) => <div className='flex rounded bg-slate-700 pl-1 my-0.5' key={index}>
                                    <span># {tag}</span>
                                    <button className='aspect-square ' onClick={() => {
                                        setTags(tags.filter(selectedTag => selectedTag != tag))
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-4 w-6 fill-red-600  aspect-square'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                                    </button>
                                </div>)
                            }
                        </div>
                        <p>Add tags below describing your products</p>
                        <div className='flex items-center gap-1'>
                            <input onChange={handleCurrentTagInput} list='tags-input-datalist' type="text" name="tag-input" id="tag-input" className='w-full my-2 bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 
                        focus:ring-blue-500 transition ease-in-out duration-150 resize-y'/>
                            <datalist id='tags-input-datalist'>
                                {
                                    popularTagsArr.map((item, _index) => <option value={item} />)
                                }
                            </datalist>
                            <button onClick={handleAppendTag} className='bg-white bg-opacity-15 h-full px-2 py-2 rounded' type='button'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 fill-green-600'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                        <button
                            onClick={() => setCurrentForm(2)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="button"
                        >
                            Next
                        </button>
                    </div>
                </div>



                <div className={currentForm != 2 ? "hidden" : ""}>
                    <h2 className='text-white text-center text-2xl my-2'>Tell Us More About Your business</h2>

                    <input
                        required
                        placeholder="Business Name *"
                        className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='businessName'
                    />
                    <input
                        placeholder="Business Website URL"
                        className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name='businessWebsiteURL'
                    />
                    <input
                        required
                        placeholder="Business Phone Number *"
                        className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="tel"
                        name='businessPhoneNumber'
                    />
                    <input
                        required
                        placeholder="Business Email *"
                        className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        name='businessEmail'
                    />
                    <textarea name="businessDescrition" id="bs-description-input" cols={3} required
                        placeholder='Business Description *'
                        className="w-full my-2 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 
                        focus:ring-blue-500 transition ease-in-out duration-150 resize-y"
                    ></textarea>

                    <div className='flex justify-between w-full'>
                        <button
                            onClick={() => setCurrentForm(1)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="button"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => setCurrentForm(3)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="button"
                        >
                            Next
                        </button>
                    </div>
                </div>



                <div className={currentForm != 3 ? "hidden" : ""}>
                    <h2 className='text-white text-center text-2xl my-2'>Payment Collection Information</h2>

                    <div>
                        <label htmlFor="cardholder-name">Cardholder Name:</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" id="cardholder-name" name="cardholder-name" required /><br />
                    </div>

                    <div>
                        <label htmlFor="card-number">Card Number:</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" id="card-number" name="card-number" required /><br />
                    </div>

                    <div>
                        <label htmlFor="expiration-date">Expiration Date (MM/YY):</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" id="expiration-date" name="expiration-date" placeholder="MM/YY" required /><br />
                    </div>

                    <div>
                        <label htmlFor="cvv">CVV:</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" id="cvv" name="cvv" required /><br />
                    </div>

                    <div>
                        <label htmlFor="billing-address">Billing Address:</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" id="billing-address" name="billing-address" required /><br />
                    </div>

                    <div className='flex gap-1 justify-between'>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text" id="city" name="city" required /><br />
                        </div>
                        <div>
                            <label htmlFor="country">Country:</label>
                            <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text" id="country" name="country" required /><br />
                        </div>
                    </div>

                    {/* <label htmlFor="state">State/Province:</label>
                    <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text" id="state" name="state" required /><br /> */}

                    <div>
                        <label htmlFor="postal-code">Postal Code:</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text" id="postal-code" name="postal-code" required /><br />
                    </div>


                    <div>
                        <label htmlFor="email">Email Address:</label>
                        <input className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="email" id="email" name="email" required /><br />
                    </div>

                    <div className='flex justify-between w-full'>
                        <button
                            onClick={() => setCurrentForm(2)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="button"
                        >
                            Back
                        </button>
                        <button

                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="submit"
                        >
                            Finish
                        </button>
                    </div>

                </div>
            </div>
        </Form>
    )
}

export default CompleteAccount

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const userID = await params
        const formData = await request.json()
        console.log(formData)

        return redirect("/account/")

    }
    catch (err) {
        console.log(err)
    }
}