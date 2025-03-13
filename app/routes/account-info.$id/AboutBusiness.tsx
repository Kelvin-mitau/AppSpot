import React from 'react'

const AboutBusiness: React.FC<{ setCurrentForm: (form: number) => void }> = ({ setCurrentForm }) => {
    const [businessPhoneNumber, setBusinessPhoneNumber] = React.useState("")
    const [businessName, setBusinessName] = React.useState("")
    const [businessEmail, setBusinessEmail] = React.useState("")
    const [businessDescrition, setBusinessDescription] = React.useState("")
    const [phoneCountryCode, setPhoneContryCode] = React.useState("91")
    return (
        <>
            <input
                onChange={({ target }) => setBusinessName(target.value)}
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
            <div className='grid grid-cols-[15%_auto] gap-0.5'>
                <input
                    onChange={({ target }) => setPhoneContryCode(target.value)}
                    required
                    placeholder="Code"
                    className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="tel"
                    name='businessPhoneNumberCountryCode'
                    defaultValue={"+91"}
                />
                <input
                    onChange={({ target }) => setBusinessPhoneNumber(target.value)}
                    required
                    placeholder="Business Phone Number *"
                    className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="tel"
                    name='businessPhoneNumber'
                />
            </div>
            <input
                onChange={({ target }) => setBusinessEmail(target.value)}
                required
                placeholder="Business Email *"
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
                name='businessEmail'
            />
            <textarea name="businessDescrition" id="bs-description-input" cols={3} required
                onChange={({ target }) => setBusinessDescription(target.value)}
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
                    className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 ${(!phoneCountryCode || !businessDescrition || !businessEmail || !businessPhoneNumber || !businessName) ? "opacity-50" : ""} `}
                    type="button"
                    disabled={!phoneCountryCode || !businessDescrition || !businessEmail || !businessPhoneNumber || !businessName}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default AboutBusiness