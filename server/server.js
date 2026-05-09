import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Gemini Key Exists:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const portfolioData = `
Name: Kartik Ganesh Jare

Role:
Backend & Systems Software Developer
Java & Win32 Specialist

Skills:
C, C++, Java, Python, JavaScript, React, Spring Boot, HTML, CSS, C#, Linux System Programming, Win32 API, SQL, MongoDB

Projects:
1. Concurrent FTP Server in C
2. Chat Messenger with Log Facility in Java
3. Marvellous Study Tracker App in Java Swing
4. Edu Track Classroom Student Management Portal using Spring Boot
5. Customised Virtual File System CVFS in C++ and Python
6. Generalised Data Structures Library in C++
7. Secure File Transfer Simulation using Win32 API
8. Machine Learning Practice Projects in Python
9. File Packer and Unpacker in C
10. System V IPC Communication Tool in C

GitHub:
KartikJare

Portfolio:
https://kartikjare.github.io/Kartik-portfolio/
`;

function getLocalAnswer(message) {
  const msg = message.toLowerCase();

  if (
    msg.includes("who is kartik") ||
    msg.includes("about") ||
    msg.includes("name")
  ) {
    return "Kartik Ganesh Jare is a Backend & Systems Software Developer focused on C, C++, Java, Python, Win32 API, Linux system programming, React, and Spring Boot.";
  }

  if (
    msg.includes("skill") ||
    msg.includes("technology") ||
    msg.includes("tech stack")
  ) {
    return "Kartik's main skills are C, C++, Java, Python, JavaScript, React, Spring Boot, Linux System Programming, Win32 API, SQL, MongoDB, HTML, CSS, and C#.";
  }

  if (msg.includes("project")) {
    return "Kartik has built projects like Concurrent FTP Server, Chat Messenger, Study Tracker App, Edu Track Classroom Portal, CVFS, Generalised Data Structures Library, Secure File Transfer Simulation, Machine Learning projects, File Packer-Unpacker, and System V IPC Tool.";
  }

  if (msg.includes("java")) {
    return "Kartik has Java projects like Chat Messenger with Log Facility, Study Tracker App using Java Swing, and Edu Track Classroom Student Management Portal using Spring Boot.";
  }

  if (
    msg.includes("python") ||
    msg.includes("machine learning") ||
    msg.includes("ml")
  ) {
    return "Kartik works with Python for automation and machine learning using Pandas, NumPy, Matplotlib, Scikit-learn, Logistic Regression, KNN, Decision Tree, and MLP.";
  }

  if (
    msg.includes("contact") ||
    msg.includes("github") ||
    msg.includes("email")
  ) {
    return "You can contact Kartik through the contact section of this portfolio. His GitHub username is KartikJare.";
  }

  if (
    msg.includes("company") ||
    msg.includes("recruiter") ||
    msg.includes("hiring") ||
    msg.includes("hr")
  ) {
    return "Hello, thanks for visiting Kartik's portfolio. Kartik is skilled in C, C++, Java, Python, React, Spring Boot, Win32 API, and Linux system programming. You can explore his projects and contact him through this portfolio.";
  }

  return null;
}

app.get("/", (req, res) => {
  res.send("Kartik Portfolio Chatbot API is running...");
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
      });
    }

    const localReply = getLocalAnswer(message);

    if (localReply) {
      return res.json({
        reply: localReply,
        source: "local",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: "Hi, thanks for visiting Kartik's portfolio. I can help you know about Kartik's skills, projects, and contact details.",
        source: "fallback-no-key",
      });
    }

    const prompt = `
    You are Kartik Ganesh Jare's portfolio assistant.

    Rules:
    - Answer only about Kartik, his skills, projects, portfolio, and contact.
    - If a recruiter or company person introduces themselves, greet them professionally.
    - Keep answer short and professional.
    - Do not create fake information.

    Portfolio Data:
    ${portfolioData}

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
        "Thanks for visiting Kartik's portfolio. You can ask me about his skills, projects, or contact details.",
      source: "gemini",
    });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    console.error("Full Error:", error);

    return res.json({
      reply: "Hi, thanks for visiting Kartik's portfolio. I can help you know about Kartik's skills, projects, and contact details.",
      source: "fallback-error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Chatbot server running on port ${PORT}`);
});