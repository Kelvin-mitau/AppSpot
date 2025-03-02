
export default async function(){
    const endpoint = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
        const clientId = "AajGhAoim_v_1lq9EvZcpcribRqHynGwDSouoGQF_UmhdGwSaWwaJk8iE_XFrqBhP4_ZaK8jDdzjBPkm";
        const clientSecret = "EC_v4XiW7mUJdfVR-IWK8Wd28gpZmE2CfUMVZq4endHX-SYGa_XDay0NOlILmJgPckcUgkf5KD7Tkiy1";
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