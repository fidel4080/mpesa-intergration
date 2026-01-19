// STK push controller
import axios from 'axios';
import { getAccessToken } from '../config/mpesa.js';

export const stkPush = async (req, res)=> {
    try {
        const {phone, amount} = req.body;

        const token = await getAccessToken();
        const timeStamp = new Date()
                            .toString()
                            .replace(/[^0-9]/g, "")
                            .slice(0, 14);

        const password = Buffer.from(
            process.env.MPESA_SHORT_CODE +
            process.env.MPESA_PASS_KEY +
            timeStamp
        ).toString("base64");

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                "BusinessShortCode": process.env.MPESA_SHORT_CODE, 
                "Password": password, 
                "Timestamp": timeStamp,
                "TransactionType": "CustomerPayBillOnline", 
                "Amount": amount, 
                "PartyA": phone, 
                "PartyB": process.env.MPESA_SHORT_CODE, 
                "PhoneNumber": phone, 
                "CallBackURL": process.env.MPESA_CALLBACK_URL,
                "AccountReference": "Mpesa test",
                "TransactionDesc": "payment"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        res.json(response.data);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({
            message: 'STK push failed'
        });
    }
}