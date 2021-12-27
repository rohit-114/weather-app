import fetch from "node-fetch";
import express from "express";
import dotenv from "dotenv";
import * as path from "path";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api/:query", async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?${req.params.query}&units=metric&appid=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.get("/api/:latitude/:longitude", async (req, res) => {
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
