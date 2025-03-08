import { json, ActionFunction } from '@remix-run/node';
import React, { useState } from 'react';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { useFetcher } from '@remix-run/react';
import { generateOTP, verifyOTP } from '../functions/generateOTP';
import { User } from '../DB/models';
import argon2 from 'argon2';
import "../styles/otp-form.css"
import Mailersend from "mailersend"

import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "Forgot Password",
            author: "Appspot"
        }
    ];
};

const ForgotPassword = () => {
    const fetcher = useFetcher();
    const navigate = useNavigate();

    const [form, setForm] = React.useState<number>(0);
    const counterRef = React.useRef(null);

    const [email, setEmail] = React.useState("");

    const actionData = useActionData<{ error: string | undefined, msg: string | undefined }>();
    const [actionError, setActionError] = useState("");

    const handleOTPResend = () => {
        const formData = new FormData();
        formData.append("email", email);
        fetcher.submit(formData, { method: "POST" });
    };

    React.useEffect(() => {
        if (actionData && actionData.error) return setActionError(actionData.error);
        if (actionData && actionData.msg == "Email sent") {
            setForm(1);
            return;
        }
        if (actionData && actionData.msg == "Password updated") {
            navigate("/sign-in");
        }
    }, [actionData]);

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">

                <div>
                    <Form style={{ display: form == 1 ? "none" : "flex" }} className="flex flex-col" preventScrollReset method='POST'>
                        <input
                            required
                            placeholder="Your Email"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="emil"
                            name='email'
                            onChange={(e) => { setEmail(e.target.value) }}
                            id='change-pass-email'
                        />
                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="submit"
                        >
                            Confirm Email
                        </button>
                        {actionData?.error && <p className='text-red-600 mt-2 mx-auto'>{actionData?.error}</p>}
                    </Form>
                </div>

                <div>
                    <Form style={{ display: form == 0 ? "none" : "block" }} className="otp-form-card" method='PUT'>
                        <input
                            required
                            minLength={7}
                            placeholder="Password"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="password"
                            name='password'
                            id='new-password'
                        />
                        <input
                            minLength={7}
                            required
                            placeholder="Confirm Password"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="password"
                            name='confirmPassword'
                        />
                        <input type="email" name='email' value={email} className='hidden' readOnly />
                        <p className="otp-form-card-title">We're calling your number to confirm it</p>
                        <p className="otp-form-card-prompt">Enter last 4 digits of the number we are calling you from</p>
                        <div className="otp-form-card-input-wrapper">
                            <input name="otp" className="otp-form-card-input" placeholder="______" maxLength={6} type="number" />
                            <div className="otp-form-card-input-bg"></div>
                        </div>
                        <p className="otp-resend"><button type='button' onClick={handleOTPResend} className="underlined" >Resend</button> </p>
                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-1 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="submit"
                        >
                            Confirm
                        </button>
                        {actionData?.error && <p className='text-red-600 mt-2 mx-auto'>{actionData?.error}</p>}
                    </Form>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;

export const action: ActionFunction = async ({ request }) => {
    try {
        if (request.method === "PUT") {
            // For updating password
            const formData = await request.formData();
            const newPassword = formData.get("password")?.toString() || "";
            const userEmail = formData.get("email")?.toString() || "";
            const confirmPassword = formData.get("confirmPassword")?.toString() || "";
            const otp = formData.get("otp")?.toString() || "";

            if (!newPassword || !userEmail) {
                return json({ error: "Email and password are required." }, { status: 400 });
            }
            if (newPassword != confirmPassword) {
                return json({ error: "Passwords do not match" }, { status: 400 });
            }

            if (!verifyOTP(otp, userEmail)) {
                console.log(userEmail)
                return json({ error: "Invalid OTP code." }, { status: 400 });
            }

            const hashedPassword = await argon2.hash(newPassword);
            const user = await User.findOneAndUpdate({ email: userEmail }, {
                $set: { password: hashedPassword }
            });

            if (!user) {
                return json({ error: "Enter a valid email." }, { status: 400 });
            }

            return json({ msg: "Password updated" });
        }

        if (request.method === "POST") {
            // For getting OTP
            const formData = await request.formData();
            const email = formData.get("email")?.toString() || "";

            if (!email) {
                return json({ error: "Email is required." }, { status: 400 });
            }

            // Generate OTP
            const secret = email;
            const otp = generateOTP(secret);
            console.log(otp);
            const Recipient = require("mailersend").Recipient;
            const EmailParams = require("mailersend").EmailParams;
            const MailerSend = require("mailersend");

            const mailersend = new MailerSend({
                apiKey: "mlsn.b04c8264cda8c13ead873268efe9bc096592f3bccaf62f63a2f0992cc2888265",
            });

            const recipients = [new Recipient("recipient@email.com", "Recipient")];

            const emailParams = new EmailParams()
                .setFrom("info@domain.com")
                .setFromName("Your Name")
                .setRecipients(recipients)
                .setSubject("Subject")
                .setHtml("Greetings from the team, you got this message through MailerSend.")
                .setText("Greetings from the team, you got this message through MailerSend.");

            mailersend.send(emailParams);
            // You would typically send the OTP via email here

            return json({ msg: "Email sent" });
        }

        return json({ error: "Invalid request method." }, { status: 405 });
    } catch (error) {
        console.error("Unable to load forgot password", error);
        return json({ error: "Oops...Something went wrong." }, { status: 500 });
    }
};