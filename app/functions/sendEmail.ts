import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

interface options{
    type:"otp" | "downloadLink" | "receivePayment" | "signUp",
    recipientEmail:string,
    recepientName:string ,
    emailText:string,
    content:{
        otp?:string,
        link?:string,
        name?:string,
        amount?:string | number,
        appTitle?:string
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

const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); 
    const day = now.getDate();

    return `${year}-${month + 1}-${day}`; 
}