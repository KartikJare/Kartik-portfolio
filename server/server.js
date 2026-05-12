import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "./portfolioData.js";
import { detectIntentAndRunTool } from "./agentTools.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Gemini Key Exists:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Kartik Portfolio AI Agent API is running...");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    geminiKeyExists: !!process.env.GEMINI_API_KEY,
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Please enter a valid message.",
        source: "validation",
      });
    }
    const toolReply = detectIntentAndRunTool(message);

    if (toolReply) {
      return res.json({
        reply: toolReply,
        source: "agent-tool",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply:
          "Hi, I am Kartik's AI portfolio agent. I can help you explore Kartik's skills, projects, GitHub, LinkedIn, and contact details.",
        source: "fallback-no-key",
      });
    }

    const prompt = `
    You are Kartik Ganesh Jare's AI portfolio agent.

    Rules:
    - Answer only about Kartik, his skills, projects, GitHub, LinkedIn, portfolio, and contact.
    - If a recruiter introduces themselves, greet them professionally.
    - If the user asks unrelated questions, politely redirect to Kartik's portfolio.
    - Keep answers short, professional, and helpful.
    - Do not create fake information.

    Portfolio Data:
    ${JSON.stringify(portfolioData, null, 2)}

    User Question:
    ${message}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return res.json({
      reply:
        response.text ||
        "Thanks for visiting Kartik's portfolio. You can ask me about his skills, projects, GitHub, LinkedIn, or contact details.",
      source: "gemini",
    });
  } catch (error) {
    console.error("Agent Error:", error.message);

    return res.json({
      reply:
        "Hi, thanks for visiting Kartik's portfolio. I can help you know about Kartik's skills, projects, GitHub, LinkedIn, and contact details.",
      source: "fallback-error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AI Agent server running on port ${PORT}`);
});