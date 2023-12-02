const express = require("express");
 const app = express();

 const tokenRoute = require("./routes/token")

 app.use("/token", tokenRoute);

 app.listen(5000,() => {
    console.log('the server is up')
 });

 app.get("/", (req, res) => {
    res.send('safaricom intergration with Brian Itira')
 })
