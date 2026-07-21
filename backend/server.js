// ── Import Packages ──
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");
const SYSTEM_PROMPT = require("./systemPrompt");

// ── Setup ──
const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
// FRONTEND_URL should be set in Render's environment variables to your
// deployed Vercel URL (e.g. https://your-app.vercel.app). Falls back to "*"
// for local development so you don't have to configure anything to run it.
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// ── Health Check (useful for Render) ──
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "AI Legal Advisor backend is running" });
});

// ── Groq Setup ──
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ── Chat History ──
let chatHistory = [];

// ── Chat Route ──
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    chatHistory.push({ role: "user", content: message });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatHistory],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = response.choices[0].message.content;

    chatHistory.push({ role: "assistant", content: reply });

    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }

    res.json({ reply });
  } catch (error) {
    console.error("Groq Error:", error.message);
    res.status(500).json({ error: "Not able to Connect with AI." });
  }
});

// ── Reset Chat ──
app.post("/reset", (req, res) => {
  chatHistory = [];
  res.json({ message: "Chat reset successfully" });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

