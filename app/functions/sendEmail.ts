import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

interface options{
    type:"otp" | "downloadLink" | "receivePayment" | "signUp" | "rating",
    recipientEmail:string,
    recepientName:string ,
    emailText:string,
    content:{
        otp?:string,
        link?:string,
        name?:string,
        amount?:string | number,
        appTitle?:string,
        productName?:string,
        productID?:string
    }
}

export default async function sendEmail(options:options){
    try {
        let html;
        switch (options.type){
            case "otp":
                html = otpHTML(options.content.otp || "" );
                break;
            case "downloadLink":
                html = downLoadLinkHTML(options.content.appTitle  || "",options.content.link  || "")
                break;
            case "receivePayment":
                html = receivePaymentHTML(options.content.name || "", options.content.amount || "",getDate());
                break;
            case "signUp":
                html = signUpHTML(options.content.link || "");
                break;
            case "rating":
                //productID:string,productName:string
                html = ratingHTML(process.env.BASE_URL || "",options.content.productID || "",options.content.productName || "");
                break;
            default:
                html = "";
        }
        const mailersend = new MailerSend({
                apiKey: process.env.MAILERSEND_KEY || "",
            });

            const sentFrom = new Sender("appspot@trial-neqvygmqd2z40p7w.mlsender.net", "AppSpot");
            const recipients = [new Recipient(options.recipientEmail, options.recepientName ? options.recepientName : "")];

            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setSubject("Appspot OTP")
                .setHtml(html)
                .setText(options.emailText);

            await mailersend.email.send(emailParams);
    } catch (error) {
        console.log(error);
        throw new Error("Error sending email")
    }
}

const otpHTML = (otp:string) => {
    const html = `
            <!DOCTYPE html>
                <html>
                <head>
                <title>Your OTP</title>
                <style>
                body {
                    font-family: sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                .otp-container {
                    background-color: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    display: inline-block;
                }
                .otp {
                    font-size: 2em;
                    font-weight: bold;
                    color: #007bff; /* Blue color */
                    letter-spacing: 10px;
                }
                </style>
                </head>
                <body>
                <h1>Your One-Time Password (OTP)</h1>
                <p>Please use the following OTP to complete your verification:</p>
                <div class="otp-container">
                    <p class="otp">${otp}</p>  </div>
                <p>This OTP is valid for a limited time.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                </body>
            </html>
            `
    return html
}

const downLoadLinkHTML = (title:string,link:string) => {
    const html = `
            <!DOCTYPE html>
                <html>
                <head>
                <title>App Download</title>
                <style>
                body {
                    font-family: sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                .link-container {
                    background-color: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    display: inline-block;
                }
                .link {

                    decoration:underline;
                    color: #007bff; /* Blue color */
                }
                </style>
                </head>
                <body>
                <h1>App download link</h1>
                <p>Please click this link to download your app ${title}:</p>
                <div class="link-container">
                    <a href=${link} class="link">${link}</a> 
                </div>
                <p>You can always click this link to redownload the app. In case of any issues please contact us.</p>
                </body>
            </html>
            `
        return html;
}

const receivePaymentHTML = (name:string,amount:number|string,date:string) => {
    const html = `
            <!DOCTYPE html>
                <html>
                <head>
                <title>Payout Confirmation</title>
                <style>
                body {
                    font-family: sans-serif;
                    line-height: 1.6;
                    margin: 20px;
                }
                .container {
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 8px;
                }
                .amount {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #28a745; /* Green for positive confirmation */
                }
                </style>
                </head>
                <body>
                <div class="container">
                    <h1>Payout Confirmation</h1>
                    <p>Dear ${name},</p>
                    <p>This email confirms that a payout of <span class="amount">${amount}</span> has been sent to you.</p>
                    <p>The payout was processed on ${date}.</p>
                    <p>If you have any questions, please contact our support team.</p>
                    <p>Thank you.</p>
                    <p>Sincerely,<br>Your Payout Team</p>
                </div>
                </body>
                </html>

            `
        return html;
}

const signUpHTML = (link:string) => {
    const html = `
            <!DOCTYPE html>
                <html>
                <head>
                <title>Verify account</title>
                <style>
                body {
                    font-family: sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                .link-container {
                    background-color: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    display: inline-block;
                }
                .link {

                    decoration:underline;
                    color: #007bff; /* Blue color */
                }
                </style>
                </head>
                <body>
                <h1>Appspot Account Verification</h1>
                <p>Please click this link to verify your account details:</p>
                <div class="link-container">
                    <a href=${link} class="link">${link}</a> 
                </div>
                <p>This link is valid for a limited time.</p>
                <p>In case of any issues please contact us.</p>
                </body>
            </html>
            `
        return html;
}

const ratingHTML = (baseURL:string,productID:string,productName:string) => {
    const html =`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rate ${productName}</title>
    <style>
        .container{
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items:center;
        }
        .text{
            font-weight: 600;
            font-size: 1.3em;
            font-family: sans-serif;
        }
        .stars-wrapper{
            display: flex;
            gap: 10px;
        }
        a{
            width: 27px;
            height: 27px;
            background: #a3d4ff69;
            border-radius: 50%;
            padding: 4px;
            place-content: center;
        }
        .star{
            width:100%;
            height:100%;
            fill: #007bff;

        }
        .small-text{
            font-size:1em;
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div class="container">
        <p class="text">Please rate our product ${productName}</p>
        <div class="stars-wrapper">
            <a href="${baseURL}/rating/${productID}?rating=1">
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
            </a>
            <a href="${baseURL}/rating/${productID}?rating=2">
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                 </svg>
                </a>
                <a href="${baseURL}/rating/${productID}?rating=3">
                    <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                        d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                    </svg>
            </a>
            <a href="${baseURL}/rating/${productID}?rating=4">
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                        d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                </svg>
            </a>
            <a href="${baseURL}/rating/${productID}?rating=5">
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                </svg>
            </a>
           
            
        </div>
        <p class="small-text">Your feedback helps us improve. Thank you.</p>
    </div>
</body>
</html>`
    return html;
}

const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); 
    const day = now.getDate();

    return `${year}-${month + 1}-${day}`; 
}