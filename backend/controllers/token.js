const axios = require("axios")
 const createToken = async (req, res, next) =>{

    const secretKey = "lk2J0CJ8nz44VYUj"
    const consumerKey = "GlczBB2hH6RPr3J0R5SuzatG76bz4ulC"

    const auth = new Buffer.from(`${consumerKey}:${secretKey}`).toString("base64");


    await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      
        {
            headers: {
                authorization: `Basic ${auth}`,

            }
        }


    ).then((data) => {
        console.log(data.data);
        next();
    }).catch((err) => {
        console.log(err)
        res.status(400).json(err.message)
    })

 }

 module.exports = {createToken}