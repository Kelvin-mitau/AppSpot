import React from 'react'

const AboutBusiness: React.FC<{ setCurrentForm: (form: number) => void }> = ({ setCurrentForm }) => {
    return (
        <>
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
        </>
    )
}

export default AboutBusiness