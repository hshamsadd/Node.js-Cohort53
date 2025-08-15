/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://d821f1a3-2e17-4762-a836-56c16c84aee9-00-dmaewl3n8usd.riker.replit.dev:5000/api/books/
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
import fetch from "node-fetch";
async function printBooks() {
  // YOUR CODE GOES IN HERE
  try {
    // Fetch api uses GET method by default but I will still specify it.
    const response = await fetch(
      "https://d821f1a3-2e17-4762-a836-56c16c84aee9-00-dmaewl3n8usd.riker.replit.dev:5000/api/books/",
      {
        method: "GET",
        headers: {
          Authorization: "Basic YWRtaW46c2VjcmV0MTIz",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();

    if (!result.success) {
      throw new Error("API returned an error");
    }
    const books = result.data;

    books.forEach((book) => {
      console.log(`📚 ${book.title} by ${book.author}`);
    });
    // to print one result: https://d821f1a3-2e17-4762-a836-56c16c84aee9-00-dmaewl3n8usd.riker.replit.dev:5000/api/books/1
    //console.log(`📚 ${books.title} by ${books.author}`);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

printBooks();
