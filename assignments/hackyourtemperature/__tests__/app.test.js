import app from "../app.js"; // Import the Express app without starting server
import supertest from "supertest"; // Import supertest for HTTP request simulation

const request = supertest(app); // Create a "request" object to make HTTP calls to ap

//Quick test

describe("POST /", () => {
  // Test 1: Making sure the test is working
  it("Quick test", () => {
    expect(1).toBe(1);
  });
});

//Test suit for /weather

describe("POST /weather endpoint", () => {
  // Test 2: Happy path — valid city name
  it("should return status 200 and temperature data when given a valid cityName", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" });

    expect(response.status).toBe(200); // Expect HTTP 200 OK
    expect(response.body.status).toBe("Success"); // Check API status field
    expect(response.body.city).toBe("Amsterdam"); // City matches input
    expect(typeof response.body.temperature).toBe("number"); // Temperature is a number
  });

  // Test 3: Missing cityName in request body
  it("should return status 400 and error message when cityName is missing", async () => {
    const response = await request.post("/weather").send({}); // no cityName provided

    expect(response.status).toBe(400); // Expect Bad Request
    expect(response.body.status).toBe("Error"); // Error status field
    expect(response.body.message).toBe("City name is required"); // Correct error message
  });

  // Test 4: Gibberish or invalid cityName
  it("should return status 404 and error message when cityName is invalid", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "xyz123notacity" }); // Invalid city name

    expect(response.status).toBe(404); // Not Found HTTP status
    expect(response.body.status).toBe("Error"); // Error status field
    expect(response.body.message.toLowerCase()).toContain("not found"); // Message contains 'not found'
  });
});
