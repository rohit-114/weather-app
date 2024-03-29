const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}

app.get("/", async (req, res) => {
  res.send("Hello from weather backend");
});

app.get("/api/:query", async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?${req.params.query}&units=metric&appid=${process.env.API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.get("/api/:latitude/:longitude", async (req, res) => {
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${process.env.API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
