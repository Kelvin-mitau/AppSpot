import Layout from './Layout'
import React from 'react'
import Contacts from '../components/Contacts'
import { useNavigate } from '@remix-run/react'

const Guide = () => {
    const navigate = useNavigate()
    return (
        <Layout>
            <div className='max-h-[90vh] overflow-y-scroll w-screen '>
                <div className='max-w-[900px]  mx-auto text-white border border-slate-500 rounded-md p-3 m-3 bg-slate-900 bg-opacity-60'>
                    <div className='fixed top-14 left-1 text-black flex flex-col  p-2 bg-slate-300  rounded my-2  has-[button:focus]:overflow-visible overflow-hidden has-[div:focus]:overflow-visible '>
                        <div className='relative max-h-5 overflow-visible'>
                            <button className='px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-4'><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                            </button>
                            <div className='absolute -bottom-2 bg-slate-800 bg-opacity-90 py-2 px-1 rounded w-fit flex flex-col gap-2 translate-y-full  z-20 text-white left-full '>
                                <button onClick={() => navigate("#buy")} className='block my-[1px] bg-slate-700 px-1 rounded min-w-max '>Buying a product</button>
                                <button onClick={() => navigate("#downloading")} className='block my-[1px] bg-slate-700 px-1 rounded min-w-max '>Downloading a product</button>
                                <button onClick={() => navigate("#selling")} className='block my-[1px] bg-slate-700 px-1 rounded min-w-max '>Selling a product</button>
                                <button onClick={() => navigate("#earning")} className='block my-[1px] bg-slate-700 px-1 rounded min-w-max '>Earn with us</button>
                                <button onClick={() => navigate("#contact")} className='block my-[1px] bg-slate-700 px-1 rounded min-w-max '>Contact us</button>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-3xl text-center'>AppSpot Guide</h1>
                    <div id='buy'>
                        <h2 className='text-xl mt-2 underline underline-offset-2'>How to buy</h2>
                        Ready to bring your favorite items home? Follow these simple steps to complete your purchase:
                        <div className='ml-2'>
                            <div>
                                <p className='italic'>1. Discover Your Perfect Product:</p>
                                Explore: Start by browsing our "Explore" page. You'll find a wide variety of products to pique your interest.
                                Search: If you know what you're looking for, use the search bar at the top of the page. Enter keywords or product names to find specific items.
                                Filter by Category: Refine your search by using our category filters. Select the category that best matches your interests to narrow down your options.
                            </div>
                            <div>
                                <p className='italic'>2. View Product Details:</p>
                                Once you've found a product you like, click on it to access the product page. Here, you'll find detailed information, including descriptions, images, and pricing.
                            </div>
                            <div>
                                <p className='italic'>3. Add to Cart and Proceed to Checkout:</p>
                                If you're ready to buy, click the "Buy" button.
                                This will take you directly to our secure checkout page.
                            </div>
                            <div>
                                <img src="/guide/product-page.PNG" className='w-full  border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            <div>
                                <p className='italic'>4. Secure Payment:</p>
                                At checkout, you'll have the option to pay using:
                                PayPal: Log in to your PayPal account to complete your purchase quickly and securely.
                                Credit/Debit Card: Enter your card details directly for a seamless transaction.
                                Follow the on screen instructions to complete the payment process.
                                Review your order details and confirm your purchase.
                            </div>
                            <div>
                                <img src="/guide/checkout.PNG" className='w-full  border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            <div>
                                <p className='italic'>5. Confirmation:</p>
                                After your payment is processed, you'll receive a confirmation email with your order details.
                                Enjoy your new purchase!
                            </div>
                            <div className='mt-2'>
                                <p className='italic'>Tips for a Smooth Experience:</p>
                                <ol className='list-inside list-disc'>
                                    <li>Ensure you have a stable internet connection.</li>
                                    <li>Double-check your  payment details before confirming your purchase.</li>
                                    <li>If you encounter any issues, please contact our customer support team for assistance.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div id='downloading'>
                        <h2 className='text-xl mt-2 underline underline-offset-2'>How to download an app on AppSpot </h2>
                        We've made it easy to download an app on AppSpot. Follow these steps::
                        <div>
                            <p className='italic'>1. Find the App on Our explore Page:</p>
                            Browse the list or search and select the app you're interested in downloading.
                            <p className='italic'>2. Initiate the Download:</p>
                            <ul className='list-inside list-disc'>
                                <li>For Free Apps: Simply click the "Get the App" button. The download process will begin shortly.</li>
                                <li>For Paid Apps: Click the "Buy" button. You'll be guided through our secure checkout process.After completing your purchase for the paid app, you'll be automatically redirected to a download page. We'll also send you an email containing a direct download link. This ensures you can access the app anytime.
                                </li>
                            </ul>
                            <div>
                                <img src="/guide/download.PNG" className='w-full  border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            <div className='mt-2'>
                                <p className='italic'>Tips for a Smooth download Experience:</p>
                                <ol className='list-inside list-disc'>
                                    <li>Ensure you have a stable internet connection for fast download.</li>
                                    <li>Double-check your payment details before confirming your purchase.</li>
                                    <li>If you encounter any issues, please contact our customer support team for assistance.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div id='create-account'>
                        <h2 className='text-xl mt-2 underline underline-offset-2'>How to create a seller's account</h2>
                        <h3 className='text-lg'>Welcome to Our Seller Community!</h3>
                        <p>Ready to start selling on our platform? Follow these simple steps to create your seller account and begin reaching customers:</p>
                        <div className='ml-2'>
                            <p className='italic'>1. Initiate Account Creation:</p>
                            <p>
                                Begin by clicking the "Login" button located in the top right corner of the homepage.
                                Don't Have an Account? If you're new here, click the "Don't have an account?" link below the login form.
                            </p>
                            <div >
                                <img src="/guide/login-btn.PNG" className='max-h-20  border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            <p className='italic'>2. Fill Out the Registration Form:</p>
                            You'll be directed to our registration page.
                            Carefully fill out the required information, including your first name, last name,middle name, username, email address, phone number and phone number country code and password.
                            Ensure your email address is correct, as you'll need it for verification.
                            <div className='border-[2px] border-red-500 rounded my-2'>
                                <img src="/guide/create-account-page.PNG" className=' w-full max-w-96 mx-auto' alt="" />
                            </div>
                            <p className='italic'>3. Verify Your Email:</p>
                            After submitting the registration form, you'll receive an email from us.
                            Open the email and click the verification link provided.
                            This step confirms your email address and activates your account.
                            <p className='italic'>4. Complete Your Seller Profile:</p>
                            Once your email is verified, log in to your account.
                            Go to Profile by clicking the profile button, that should be located  in the top right corner of the navigation bar.
                            You'll be prompted to complete your seller profile with additional details. This includes:
                            <ol className='list-inside list-disc'>
                                <li>Personal Information: Provide more details about yourself.</li>
                                <li>Business Details: Enter information about your business, such as your business name,business email address and phone number, and description.</li>
                                <li>Payment Details: Set up your payment preferences to receive earnings from your sales.</li>
                            </ol>
                            <div className='border-[2px] border-red-500 rounded my-2'>
                                <div className='grid grid-cols-3 place-content-center divide-x-2 divide-red-500'>
                                    <img src="/guide/account-info-1.PNG" className=' w-full h-full max-w-96 mx-auto ' alt="" />
                                    <img src="/guide/account-info-2.PNG" className=' w-full h-full max-w-96 mx-auto' alt="" />
                                    <img src="/guide/account-info-3.PNG" className=' w-full h-full max-w-96 mx-auto ' alt="" />
                                </div>
                            </div>
                            <p className='italic'>5. Start Selling!</p>
                            After completing your profile, you're ready to start listing your software products  and connecting with customers.
                            <p className='italic mt-1'>Important Notes:</p>
                            Please ensure all information provided is accurate and up-to-date.
                            If you encounter any issues during the registration process, please contact our support team at <a href="#contacts" className='underline'>here</a>.
                            We're excited to have you join our seller community!
                        </div>
                    </div>
                    <div id='selling'>
                        <h2 className='text-xl mt-2 underline underline-offset-2'>How to Sell</h2>
                        <p>Ready to share your amazing products with the world? Our platform makes it simple to list and sell your creations. Follow these easy steps to get started:</p>
                        <div className='ml-2'>
                            <p className='italic'>Step 1: Access Your Account Page</p>
                            Click the profile icon located in the top left corner of the screen.
                            <div >
                                <img src="/guide/profile-btn.png" className='max-h-20  border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            For New Users (No Products Yet):
                            You will be automatically redirected to your account page, where you can begin uploading your first product.
                            <div >
                                <img src="/guide/click-to-upload.PNG" className='w-full border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            <br />
                            For Existing Users (Already Uploaded Products):
                            Click the profile icon in the top left corner.
                            Once on your account page, Locate and click the "New +" button on the top right. This will take you to the product upload form.
                            <div >
                                <img src="/guide/new-btn.png" className='w-full  border-[2px] border-red-500 rounded my-2' alt="" />
                            </div>
                            <p className='italic'>Step 2: Fill Out the Product Details Form</p>
                            Once you've reached the product upload form, you'll need to provide essential information about your product. Please fill out all fields accurately and completely.
                            <ol className='list-inside list-disc'>
                                <li>Images: Upload high-quality images of your product. Multiple images are encouraged.</li>
                                <li>Product Title: Give your product a short, clear and descriptive name.</li>
                                <li>Product Type: Select the type of your app. This could be a web, mobile or desktop app.</li>
                                <li>Category: Select the appropriate category for your product.</li>
                                <li>Stack: Select the tech stack for your product. By clicking the green check button, you will append the value of the field to your stack. This enables you to have multiple technologies/frameworks on the product's stack.</li>
                                <li>Product Description: Provide a detailed description of your product, highlighting its features, benefits, and any relevant information. Be sure to include relevant keywords to help customers find your product.</li>
                                <li>Preview link(Mostly for web): Set the URL for your product where users can preview it.</li>
                                <li>Documentation: Set the URL for your product where users can read the app's documentation.</li>
                                <li>Pricing model: Set the pricing you wish to sell your product for. This could be free or one time pricing.</li>
                                <li>Price: Set the price you wish to sell your product for.</li>
                                <li>Features: Set the features customers should expect your app to have. By clicking the green check button, you will append the value of the field to your features list.</li>
                                <li>
                                    Software File (for Software Products):
                                    If you're selling software, you'll need to upload your product in a compressed format, either as a .zip or .rar file.
                                    Ensure your file is free of errors and viruses.
                                    The file should contain all the needed files for your software to function properly.
                                </li>
                            </ol>
                            <div className='border-[2px] border-red-500 rounded my-2'>
                                <div className='grid grid-cols-2 place-content-center divide-x-2 divide-red-500'>
                                    <img src="/guide/register-product.PNG" className=' w-full max-w-96 mx-auto' alt="" />
                                    <img src="/guide/register-product-2.PNG" className=' w-full max-w-96 mx-auto' alt="" />
                                </div>
                            </div>
                            <p className='italic'>Step 3: Review and Submit</p>
                            Carefully review all the information you've entered.
                            Make any necessary edits.
                            Once you're satisfied, click the  "Upload" button.
                            <p>Step 4: Your Product is Live!</p>
                            Your product will now be listed on our platform after a review by the team.
                            Customers can browse and purchase your product.
                            You can view and manage your products from your account page.
                            <p className='italic'>Tips for Success:</p>
                            <ol className='list-inside list-disc'>
                                <li>High-Quality Images: Use clear and professional images to showcase your product.</li>
                                <li>Detailed Descriptions: Provide comprehensive and informative descriptions.</li>
                                <li>Accurate Pricing: Set a competitive and fair price.</li>
                                <li>Customer Support: Be responsive to customer inquiries.</li>
                                <li>File integrity: double check that your compressed files are not corrupted.</li>
                            </ol>
                            <p className='italic'>Troubleshooting:</p>
                            If you encounter any issues during the upload process, please contact our support team.
                            We're excited to have you as a seller!
                        </div>
                    </div>
                    <div id='earning'>
                        <h2 className='text-xl mt-2 underline underline-offset-2'>How to earn from AppSpot</h2>
                        Welcome to AppSpot, where turning your sales into earnings is seamless and secure. We've designed a straightforward process to ensure you get paid promptly and reliably. Here's how it works:
                        <div>
                            <p className='italic'>1. Make a Sale:</p>
                            Focus on what you do best: selling your products. Once a customer makes a purchase through AppSpot, you're on your way to earning!
                            <p className='italic'>2. Payment Verification:</p>
                            We take care of the details. Our system securely verifies the customer's payment to ensure a smooth transaction for everyone.
                            <p className='italic'>3. Customer Satisfaction:</p>
                            Your customer's happiness is our priority. We confirm that the customer is satisfied with their purchase, ensuring a positive experience.
                            <p className='italic'>4. Earnings Payout:</p>
                            Once verification and customer satisfaction are confirmed, we process your earnings.
                            Your earnings, less a 7.6% commission, will be sent directly to the payment details you provided during your AppSpot setup.
                            We make payouts quickly and efficiently.
                        </div>
                    </div>
                    <div id="contact">
                        <h2 className='text-xl mt-2 underline underline-offset-2'>How to Contact us</h2>
                        Need Help? We're Here!
                        We're committed to providing you with the best experience. If you encounter any issues or have questions, please don't hesitate to reach out.
                        <div className='ml-2'>
                            <p className='italic'>1. Report an Issue:</p>
                            For the fastest resolution, please use the form for reporting a problem on the help page bottom <section></section> to report any problems you're experiencing. Provide as much detail as possible, and we'll get back to you promptly.
                            <p className='italic'>Other Inquiries:</p>
                            For general questions, feedback, or other inquiries, you can also contact us via:
                            <div className='my-3'>
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
                        </div>
                    </div>
                    <Contacts />
                </div>
            </div>
        </Layout>
    )
}

export default Guide