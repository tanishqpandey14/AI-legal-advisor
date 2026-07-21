const Groq = require("groq-sdk");
const SYSTEM_PROMPT = require("../lib/systemPrompt");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// NOTE: this in-memory array is per-instance and will reset on cold starts,
// and can be shared across unrelated visitors if a serverless instance is
// reused. Fine for a demo; swap for a per-session store (e.g. a client-sent
// history, or a small DB keyed by session id) before relying on this in
// production with real users.
let chatHistory = [];

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    chatHistory.push({ role: "user", content: message });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatHistory,
      ],
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
    res.status(500).json({ error: "AI service error. Please try again." });
  }
};
