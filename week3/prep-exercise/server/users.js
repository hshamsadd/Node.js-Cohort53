import dotenv from "dotenv";
dotenv.config();
import newDatabase from "./database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = false;
const database = newDatabase({ isPersistent });

// Create middlewares required for routes defined in app.js
export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      message: "Username and password are required to register",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = database.create({
      username: username,
      password: hashedPassword,
    });
    return res.json({
      success: true,
      username: username,
      password: hashedPassword,
      id: user.id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Get all users from the database
    const users = database.getAllUsers();

    // Find user by username
    const foundUser = users.find((user) => user.username === username);

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Compare the password with hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getProfile = async (req, res) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or invalid." });
    }
    const token = authHeader.split(" ")[1];
    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get the user ID from decoded payload
    const userID = decoded.id;
    // Retrieve the user from your database or in-memory store
    const user = database.getById(userID);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    // Return profile info
    res.status(200).json({ username: user.username });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const logout = async (req, res) => {
  // This endpoint does not verify or revoke the JWT.
  // The client is responsible for deleting its stored token after receiving this response.
  res.status(204).send(); // Success, no content
};

// You can also create helper functions in this file to help you implement logic
// inside middlewares
