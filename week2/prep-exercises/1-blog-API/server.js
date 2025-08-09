import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Helper
function getFilePath(title) {
  return path.join(__dirname, `${title}.txt`);
}

/**
 * 1.1 Create a blog post
 */
app.post("/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send("Title and content are required.");
    }
    await fs.writeFile(getFilePath(title), content);
    res.send("ok");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/**
 * 1.2 Update a blog post
 */
app.put("/posts/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const { content } = req.body;
    if (!content) {
      return res.status(400).send("Content is required.");
    }
    try {
      await fs.access(getFilePath(title)); // Check if file exists
      await fs.writeFile(getFilePath(title), content);
      res.send("ok");
    } catch {
      res.status(404).send("This post does not exist!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/**
 * 1.3 Delete a blog post
 */
app.delete("/blogs/:title", async (req, res) => {
  try {
    const title = req.params.title;
    try {
      await fs.access(getFilePath(title));
      await fs.unlink(getFilePath(title));
      res.send("ok");
    } catch {
      res.status(404).send("This post does not exist!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/**
 * 1.4 Read a single blog post
 */
app.get("/blogs/:title", async (req, res) => {
  try {
    const title = req.params.title;
    try {
      const content = await fs.readFile(getFilePath(title), "utf8");
      res.send(content);
    } catch {
      res.status(404).send("This post does not exist!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/**
 * BONUS: Get all blog post titles
 */
app.get("/blogs", async (req, res) => {
  try {
    const files = await fs.readdir(__dirname);
    const blogTitles = files
      .filter((file) => file.endsWith(".txt"))
      .map((file) => ({ title: path.basename(file, ".txt") }));
    res.json(blogTitles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
