// Mpesa authentication(OAUTH)

import axios from 'axios';

export const getAccessToken = async ()=>{

    const customerKey = process.env.MPESA_CUSTOMER_KEY;
    const customerSecret = process.env.MPESA_CUSTOMER_SECRET;

    const auth = Buffer.from(`${customerKey}:${customerSecret}`).toString("base64");

    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
            headers:{
                Authorization: `Basic ${auth}`
            }
        }
    );
    return response.data.access_token;
}