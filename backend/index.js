const express = require("express");
const app = express();

app.use(express.json());  

const tokenRoute = require("./routes/token");

app.use("/token", tokenRoute);

app.listen(5000, () => {
    console.log('The server is up');
});

app.get("/", (req, res) => {
    res.send('Safaricom integration with Brian Itira');
});
