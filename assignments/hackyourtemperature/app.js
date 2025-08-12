import express from "express";
import handlebars from "express-handlebars";
import fetch from "node-fetch";
import keys from "./sources/keys.js";
const port = process.env.PORT || 8000;

const app = express();

// Middleware MUST come before routes
app.use(express.json()); // Parse JSON bodies. I must use it before routes

app.get("/", (req, res) => {
  res.type("html"); // Express shortcut for setting Content-Type
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  // Validate input
  if (!cityName || cityName.trim() === "") {
    return res.status(400).json({
      status: "Error",
      message: "City name is required",
    });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keys.API_KEY}`
    );
    const data = await response.json();

    // Convert cod to number
    const statusCode = Number(data.cod);

    // Handle API error (city not found, etc.)
    if (statusCode !== 200) {
      return res.status(statusCode).json({
        status: "Error",
        message: data.message || "City not found",
      });
    }

    // Successful response
    res.json({
      status: "Success",
      city: cityName,
      temperature: data.main.temp,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
});

// Export the file
export default app;
