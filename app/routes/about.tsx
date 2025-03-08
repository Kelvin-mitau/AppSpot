import React from 'react'
import Contacts from '../components/Contacts'
import Layout from './Layout'
import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "About",
            description: "Welcome to Appspot! Get to know more about us, our mission, vision and what we offer.",
            keywords: "about, mission,vision",
            author: "Appspot"
        }
    ];
};

function About() {
    return (
        <Layout>
            <div className='max-w-[900px] mx-auto text-white border border-slate-500 rounded-md p-3 m-3 bg-slate-900 bg-opacity-60'>
                <h1 className='text-3xl text-center'>About Us</h1>
                <h2 className='text-xl'>Our Mission</h2>
                <p>At AppSpot, our mission is to empower developers and businesses to succeed by providing an intuitive and comprehensive platform for discovering, buying, and managing SaaS products. We strive to create a seamless experience that bridges the gap between innovative solutions and those who need them most.</p>
                <h2 className='text-xl'>Our Vision</h2>
                <p>Our vision is to become the leading marketplace for SaaS products, fostering a thriving community of developers and businesses. We aim to drive innovation, collaboration, and growth by offering a platform that supports both emerging startups and established enterprises.</p>
                <h2 className='text-xl'>Who We Are</h2>
                <p>AppSpot was founded in 2025 by a team of passionate technologists and entrepreneurs who recognized the growing demand for efficient and effective SaaS solutions. With backgrounds in software development, product management, and business strategy, our founders set out to create a platform that would make it easier for developers to showcase their products and for businesses to find the tools they need to thrive.</p>
                <h2 className='text-xl'>What We Offer</h2>
                <p><i>Comprehensive Marketplace</i>: Our platform features a wide range of SaaS products across various categories, including project management, customer relationship management (CRM), marketing automation, data analytics, and more.</p>
                <p><i>Easy Integration</i>: We provide seamless integration options to ensure that the SaaS products you choose work effortlessly with your existing systems and workflows.</p>
                <p><i>Transparent Pricing</i>: We believe in transparent pricing and offer detailed information on all products, including free trials, subscription options, and pricing tiers.</p>
                <p><i>Expert Support</i>: Our dedicated support team is available to assist you with any questions or concerns, ensuring a smooth and enjoyable experience.</p>
                <h2 className='text-xl'>Our Values</h2>
                <p><i>Innovation</i>: We are committed to staying at the forefront of technology and continuously improving our platform to meet the evolving needs of our users.</p>
                <p><i>Integrity</i>: We operate with honesty and transparency in all our interactions, building trust with our community of developers and businesses.</p>
                <p><i>Customer-Centricity</i>: Our users are at the heart of everything we do. We listen to their feedback and work tirelessly to provide solutions that meet their needs.</p>
                <p><i>Collaboration</i>: We believe in the power of collaboration and foster a supportive environment where developers and businesses can connect and grow together.</p>
                <h2 className='text-xl'>Our Team</h2>
                <p>Our team is made up of talented professionals who are passionate about technology and committed to making a difference. From software engineers to customer support specialists, each member of our team plays a vital role in delivering an exceptional experience for our users.</p>
                <h2 className='text-xl'>Join Us</h2>
                <p>Whether you’re a developer looking to showcase your SaaS products or a business in search of the perfect tools, AppSpot is here to help. Join our community today and discover how we can support your journey to success.</p>
                <h2 className='text-xl'>Contact Us</h2>
                <p>We love hearing from our users! If you have any questions, feedback, or inquiries, please don't hesitate to reach out to us using the contact options provided below.
                    You can also follow us on social media at these account to stay updated on the latest news and updates.</p>
                <div className='w-full my-4 scale-90 sm:scale-100'>
                    <Contacts />
                </div>
            </div>
        </Layout>
    )
}

export default About