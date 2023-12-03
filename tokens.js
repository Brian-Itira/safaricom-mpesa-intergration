const axios = require("axios");
const crypto = require("crypto"); 

let token; 

const createToken = async (req, res, next) => {
    const secretKey = "lk2J0CJ8nz44VYUj";
    const consumerKey = "GlczBB2hH6RPr3J0R5SuzatG76bz4ulC";
    const auth = new Buffer.from(`${consumerKey}:${secretKey}`).toString("base64");

    await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                authorization: `Basic ${auth}`,
            },
        }
    )
        .then((data) => {
            token = data.data.access_token;
            console.log(data.data);
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err.message);
        });
};

const getStkPush = async (req, res) => {
    const shortCode = 174379;
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    const passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const timestamp = new Date().toISOString().replace(/[-:.T]/g, "").substring(0, 14);
    console.log("Timestamp:", timestamp);

    const concatenatedString = `${shortCode}${passKey}${timestamp}`;
    const password = crypto.createHash("sha256").update(concatenatedString).digest("hex");
    console.log("Password:", password);

    const data = {
        BusinessShortCode: shortCode,
        password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPaybillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        CallBackUrl: 'https://mydomain.com/path',
        AccountReference: 'Mpesa Test',
        TransactionDesc: 'Testing stk push',
    };

    await axios.post(url, data, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
        .then((data) => {
            console.log(data);
            res.status(200).json(data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = { createToken, getStkPush };
