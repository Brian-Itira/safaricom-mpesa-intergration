const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// Dynamic CORS setup
const allowedOrigins = ['https://safaricom-mpesa-intergration-frontend.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

const tokenRoute = require("./routes/token");
app.use("/token", tokenRoute);

app.listen(5000, () => {
  console.log('The server is up');
});

app.get("/", (req, res) => {
  res.send('Safaricom integration with Brian Itira');
});
