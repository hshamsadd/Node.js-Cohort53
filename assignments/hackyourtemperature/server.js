import app from "./app.js";
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*Testing using POSTMAN
POST http://localhost:8000/weather
 Content-Type: application/json
 {"cityName":"Amsterdam"}
 */
