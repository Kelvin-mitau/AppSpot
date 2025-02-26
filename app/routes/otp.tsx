
import React, { useEffect, useState } from 'react'
import { Form } from '@remix-run/react'
import "../styles/otp-form.css"
import { useNavigate } from '@remix-run/react'
import { useFetcher } from '@remix-run/react'

function OTPForm() {
    const [resendCountdown, setResendCountdown] = useState(45)
    const navigate = useNavigate()
    const fetcher = useFetcher()
    useEffect(() => {
        const intervalId = setInterval(() => {
            setResendCountdown(prev => prev - 0.5);
        }, 1000);

        if (resendCountdown === 0) {
            clearInterval(intervalId);
        }

        //  return () => clearInterval(intervalId);
    }, [])
    useEffect(() => {
        console.log("flnsfkosn")
    }, [])
    return (

        <Form className="otp-form-card" >
            <p className="otp-form-card-title">We're calling your number to confirm it</p>
            <p className="otp-form-card-prompt">Enter last 4 digits of the number we are calling you from</p>
            <div className="otp-form-card-input-wrapper">
                <input className="otp-form-card-input" placeholder="____" maxLength={4} type="tel" />
                <div className="otp-form-card-input-bg"></div>
            </div>
            <p className="otp-resend"><button onClick={() => fetcher.load(window.location.pathname)} className="underlined" >Resend</button> in 0:{resendCountdown} seconds</p>
            <button>Verify Me</button>

        </Form>



    )
}

export default OTPForm