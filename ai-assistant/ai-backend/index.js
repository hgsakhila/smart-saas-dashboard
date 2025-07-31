// index.js

// 1. Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

// 2. Load your .env file (for API key)
dotenv.config();

// 3. Create an instance of Express
const app = express();

// 4. Middlewares
app.use(cors());            // Allow requests from frontend
app.use(express.json());    // Allow JSON in requests

// 5. Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // API key from .env
});

// 6. Define a test route
app.get("/", (req, res) => {
  res.send("AI Assistant Backend is running.");
});

// 7. Create /ask route for AI assistant
// 7. Create /ask route for AI assistant
app.post("/ask", async (req, res) => {
  const userQuestion = req.body.question;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for an employee dashboard." },
        { role: "user", content: userQuestion }
      ],
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("Error from OpenAI:", err); // Print full error
    res.status(500).json({ error: "Something went wrong" });
  }
});


// 8. Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
