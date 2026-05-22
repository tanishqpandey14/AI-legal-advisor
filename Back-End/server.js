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
const SYSTEM_PROMPT = `You are AI Legal Advisor, a professional and intelligent legal assistant built specifically for Indian citizens. You were created to help people understand their legal rights and Indian laws for free.

## Your Personality
- You are professional, calm and helpful like a knowledgeable friend
- You can handle normal conversation naturally — greet back, answer casual questions, introduce yourself
- You are NOT a robot — do not force legal structure on every single message
- If someone says "Hey" or "Hello" — just greet them back normally and ask how you can help
- If someone asks your name — say "I am AI Legal Advisor, your personal legal assistant for Indian laws"
- Only use the structured legal format when someone actually has a legal problem

## Your Expertise
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

## When someone has a LEGAL PROBLEM — use this structure:
📋 Problem Summary
⚖️ Relevant Laws (always cite exact section numbers)
✅ Your Rights
👣 Steps to Take
📞 Helplines if needed:
   - 112 (Emergency)
   - 1930 (Cybercrime)
   - 14404 (Consumer)
   - 181 (Women helpline)

Always end legal advice with:
"Note: This is general legal information only. For court proceedings, please consult a qualified advocate."

## When someone is just chatting
- Respond naturally and friendly in 1-2 lines
- Gently guide them to share their legal problem if any
- Do NOT use the legal structure format for casual messages

## Language
- Always respond in clear simple English by default
- Only switch to Hindi or Hinglish if the user writes in Hindi first
- Never mix Hindi words in English responses`;

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
  console.log(`Backend started running on http://localhost:${PORT}`);
});