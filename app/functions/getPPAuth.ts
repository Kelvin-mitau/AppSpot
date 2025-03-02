import config from "dotenv"

export default async function(){
    const endpoint = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
        const clientId = process.env.PPZ_CLIENT_ID;
        const clientSecret = process.env.PP_SECRET;
        const credentials = btoa(`${clientId}:${clientSecret}`);
        const authTokenRequest = await fetch(endpoint, {
            method: "POST",
            headers: {
            "Authorization":  `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
            grant_type: "client_credentials"
            })
        });

         return (await authTokenRequest.json())["access_token"]
}