import React, { useEffect } from 'react'
import ReportAProblem from '../components/ReportProblem'
import "../styles/help.css"
import Layout from './Layout'
import { ActionFunction, json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { Issue } from '~/DB/models'

import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "About",
            description: "Need assistance? Our Help page is your comprehensive resource for navigating and maximizing your experience with AppSpot. Find answers to frequently asked questions, detailed tutorials, troubleshooting guides, and contact information for our support team. Whether you're a new user or a seasoned pro, we're here to help you resolve any issues and get the most out of our platform. We aim to provide clear, concise, and accessible support to ensure a seamless and enjoyable user experience.",
            keywords: "help,support,assostance,contact",
            author: "Appspot"
        }
    ];
};

function Help() {
    const actionData = useActionData<{ error: undefined | string, msg: undefined | string }>()
    const error = actionData?.error
    const msg = actionData?.msg

    //console.log(actionData)
    return (
        <Layout>
            <div className='text-white'>
                <div>
                    <h1 className="font-semibold text-3xl text-center mt-10">
                        AppSpot Help <span className="text-[var(--purple-blue)]">Center</span>
                    </h1>
                </div>
                <div className="my-3">
                    <div
                        className="mt-10 mb-10  w-[97%] sm:w-[90%] mx-auto"
                        id="FAQs-section"
                    >
                        <h2 className="w-full text-center text-2xl font-semibold mb-2">
                            Frequently Asked Questions (FAQs)
                        </h2>
                        <p className="text-center">
                            Our website has a list of questions and answers that aim to provide
                            clarity on particular subject. If you need assistance, feel free to
                            check out our FAQs.
                        </p>
                        <div className="flex flex-col ">
                            <label
                                htmlFor="faq-input-a"
                                className="Faq-input-div cursor-pointer my-2 rounded-md px-2 py-1 border-2 border-[#ffffff28]"
                            >
                                <input
                                    type="radio"
                                    name="faq-input"
                                    value=""
                                    className="hidden"
                                    id="faq-input-a"
                                    defaultChecked
                                />
                                <div className="flex flex-row justify-between items-center">
                                    <h4 className="text-xl font-semibold my-2">
                                        What features does your app offer to help me sell my SaaS product?
                                    </h4>
                                    <div
                                        className={`Arrow-right-icon transition-all duration-1000 `}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                            fill="white"
                                            className="h-6 w-6"
                                        >
                                            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='answer-wrapper'>
                                    <div>
                                        <p >
                                            AppSpot provides a comprehensive suite of tools to streamline your sales process. Key features include customizable product
                                            pages, integrated payment gateways, automated billing, customer relationship management (CRM), marketing automation,
                                            and analytics dashboards. These features ensure that you can manage and optimize your sales funnel effectively.
                                        </p>
                                    </div>
                                </div>
                            </label>
                            <label
                                htmlFor="faq-input-b"
                                className="Faq-input-div cursor-pointer my-2 rounded-md px-2 py-1 border-2 border-[#ffffff28]"
                            >
                                <input
                                    type="radio"
                                    name="faq-input"
                                    value=""
                                    className="hidden"
                                    id="faq-input-b"
                                />
                                <div className="flex flex-row justify-between items-center">
                                    <h4 className="text-xl font-semibold my-2">
                                        Can I customize the sales process within your app to fit my business needs?
                                    </h4>
                                    <div
                                        className={`Arrow-right-icon transition-all duration-1000 `}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                            fill="white"
                                            className="h-6 w-6"
                                        >
                                            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='answer-wrapper '>
                                    <div>
                                        <p>
                                            Absolutely! Our app is highly customizable to fit your unique business requirements. You can configure product plans,
                                            pricing tiers, and trial periods. The app also allows you to create custom workflows, automate repetitive tasks, and
                                            integrate with third-party tools to enhance your sales process.
                                        </p>
                                    </div>
                                </div>
                            </label>
                            <label
                                htmlFor="faq-input-c"
                                className="Faq-input-div cursor-pointer my-2 rounded-md px-2 py-1 border-2 border-[#ffffff28]"
                            >
                                <input
                                    type="radio"
                                    name="faq-input"
                                    value=""
                                    className="hidden"
                                    id="faq-input-c"
                                />
                                <div className="flex flex-row justify-between items-center">
                                    <h4 className="text-xl font-semibold my-2">
                                        How does your app ensure data security and privacy for my customers' information?
                                    </h4>
                                    <div
                                        className={`Arrow-right-icon transition-all duration-1000 `}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                            fill="white"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8
                            0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className='answer-wrapper'>
                                    <div>
                                        <p>
                                            We take data security and privacy seriously. Our app uses industry-standard encryption protocols to protect sensitive
                                            information. We comply with GDPR, CCPA, and other data protection regulations. Additionally, we offer features
                                            such as user access controls, secure payment processing, and regular security audits to ensure that your
                                            customers' data remains safe and confidential.
                                        </p>
                                    </div>
                                </div>
                            </label>
                            <label
                                htmlFor="faq-input-d"
                                className="Faq-input-div cursor-pointer my-2 rounded-md px-2 py-1 border-2 border-[#ffffff28]"
                            >
                                <input
                                    type="radio"
                                    name="faq-input"
                                    value=""
                                    className="hidden"
                                    id="faq-input-d"
                                />
                                <div className="flex flex-row justify-between items-center">
                                    <h4 className="text-xl font-semibold my-2">
                                        What kind of customer support is available if I need assistance?
                                    </h4>
                                    <div
                                        className={`Arrow-right-icon transition-all duration-1000 `}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                            fill="white"
                                            className="h-6 w-6"
                                        >
                                            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='answer-wrapper'>
                                    <div>
                                        <p>
                                            We provide comprehensive customer support to ensure you have a smooth experience using our app. Our support team
                                            is available 24/7 through multiple channels, including live chat, email, and phone. We also offer a detailed
                                            knowledge base, video tutorials, and community forums to help you find answers to common questions and troubleshoot issues.
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <h2 className="w-[full] text-center text-2xl font-semibold mb-2">
                    Report An Issue
                </h2>
                <div className=" w-[97%] sm:w-[90%] mx-auto  mt-3 mb-4">
                    <ReportAProblem error={error} msg={msg} />
                </div>
                <h2 className="w-[full] text-center text-2xl font-semibold mb-2">
                    Contact US
                </h2>
                <div className="flex flex-col items-center gap-3 mb-7">
                    <div className="flex gap-2">
                        <svg
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="h-6"
                        >
                            <path
                                d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48
                   384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384
                    0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"
                            />
                        </svg>
                        Example@gmail.com
                    </div>
                    <div className="flex gap-2">
                        <svg
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="h-6"
                        >
                            <path
                                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1
                38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144
                207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                            />
                        </svg>
                        +254713245755
                    </div>
                    <div className="flex gap-2">
                        <svg
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="h-6"
                        >
                            <path
                                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1
                38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144
                207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                            />
                        </svg>
                        +254714245647
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Help

export const action: ActionFunction = async ({ request }) => {
    try {
        const issue = (await request.formData()).get("issue")
        const newIssue = await new Issue({ issue })
        await newIssue.save()
        return json({ msg: "We have received your request. We will worl on it as soon as possible" })
    } catch (error) {
        return json({ error: "Oops...Something went wrong on our side. Try again later" })
    }
}