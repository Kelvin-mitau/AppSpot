const ppBaseURL = process.env.ENVIRONMENT == "development" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"
export default async function(){
    const endpoint = `${ppBaseURL}/v1/oauth2/token`;
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
    const response = await authTokenRequest.json()
    return (await response)["access_token"]
}