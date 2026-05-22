// ── Import Packages ──
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");

// ── Setup ──
const app = express();
const PORT = 3000;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Groq Setup ──
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ── Legal System Prompt ──
const SYSTEM_PROMPT = `You are Nyay Mitra (न्याय मित्र), an expert AI legal assistant specializing in Indian law. You help common Indian citizens understand their legal rights, relevant laws, and possible courses of action.

Your expertise covers:
- Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS)
- Code of Criminal Procedure (CrPC) / Bharatiya Nagarik Suraksha Sanhita (BNSS)
- Consumer Protection Act
- RTI (Right to Information) Act
- Labour Laws (Factories Act, Payment of Wages Act)
- Family Laws (Hindu Marriage Act, Domestic Violence Act)
- Property Laws (Transfer of Property Act, RERA)
- Cyber Laws (IT Act)
- Constitutional Rights (Fundamental Rights)
- POCSO Act, SC/ST Prevention of Atrocities Act

Guidelines:
1. Always cite specific Indian laws and section numbers
2. Explain in simple Hinglish (Hindi + English mix)
3. Suggest practical next steps: file FIR, approach consumer forum, file RTI etc.
4. Mention relevant government helplines wherever needed:
   - 112 (Emergency)
   - 1930 (Cybercrime)
   - 14404 (Consumer)
   - 181 (Women helpline)
5. Structure every response like this:
   📋 Problem Summary
   ⚖️ Relevant Laws
   ✅ Aapke Rights
   👣 Steps to Take
   📞 Helplines (if needed)
6. Be empathetic — users may be in distress
7. Always end with: "⚠️ Yeh samanya kanooni jaankari hai. Court proceedings ke liye kripya ek qualified advocate se milein."`;

// ── Chat History ──
let chatHistory = [];

// ── Chat Route ──
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Add user message to history
    chatHistory.push({
      role: "user",
      content: message,
    });

    // Call Groq API
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

    // Add reply to history
    chatHistory.push({
      role: "assistant",
      content: reply,
    });

    // Keep history manageable
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }

    res.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error.message);
    res.status(500).json({ error: "AI se connect nahi ho pa raha. Please try again." });
  }
});

// ── Reset Chat ──
app.post("/reset", (req, res) => {
  chatHistory = [];
  res.json({ message: "Chat reset successfully" });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`✅ Nyay Mitra Backend running on http://localhost:${PORT}`);
});