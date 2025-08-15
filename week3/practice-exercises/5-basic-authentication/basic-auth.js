/**
 * 2. Authentication
 *
 * Using fetch, make an authenticated request to https://httpbin.org/basic-auth/admin/hvgX8KlVEa
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
const testAuthentication = async () => {
  // Store username and password in separate variables
  const username = "admin";
  const password = "hvgX8KlVEa";

  // Encode credentials to base64 using Node.js Buffer
  const credentials = `${username}:${password}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  console.log("Encoded base64 credentials:", encodedCredentials);
  // Should output: YWRtaW46aHZnWDhLbFZFYQ==

  try {
    const response = await fetch(
      "https://httpbin.org/basic-auth/admin/hvgX8KlVEa",
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);
  } catch (error) {
    console.error("Request failed:", error.message);
  }
};

testAuthentication().catch(console.error);
