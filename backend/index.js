const express = require("express");
const cors = require("cors")
const app = express();


app.use(express.json());  
app.use(cors({
    origin: 'https://safaricom-mpesa-intergration-frontend.vercel.app/' // replace with your actual Vercel frontend URL
  }));

const tokenRoute = require("./routes/token");

app.use("/token", tokenRoute);

app.listen(5000, () => {
    console.log('The server is up');
});

app.get("/", (req, res) => {
    res.send('Safaricom integration with Brian Itira');
});
