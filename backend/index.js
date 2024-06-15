const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// Allow all origins
app.use(cors());

// Manually add CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const tokenRoute = require("./routes/token");
app.use("/token", tokenRoute);

app.listen(5000, () => {
  console.log('The server is up');
});

app.get("/", (req, res) => {
  res.send('Safaricom integration with Brian Itira');
});
