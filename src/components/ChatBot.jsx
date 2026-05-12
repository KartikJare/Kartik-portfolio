import { useState, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hi, I am Kartik's AI portfolio agent. Ask me about skills, projects, GitHub, LinkedIn, or contact details.",
        },
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL =
        import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:5000";

    const suggestions = [
        "Who is Kartik?",
        "Show his skills",
        "Show best Java projects",
        "Recommend projects for backend role",
        "Share GitHub and LinkedIn",
        "How can I contact Kartik?",
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const sendMessageToServer = async (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = {
            role: "user",
            text: messageText,
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                }),
            });

            const data = await response.json();

            const botMessage = {
                role: "bot",
                text: data.reply || "Sorry, I could not understand that.",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "AI Agent server is not connected. Please check backend deployment.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const currentInput = input;
        setInput("");

        await sendMessageToServer(currentInput);
    };

    const handleSuggestionClick = async (question) => {
        await sendMessageToServer(question);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {isOpen && (
                <div
                    className="absolute bottom-20 right-0 w-[330px] sm:w-[370px] h-[500px] bg-[#0a0f1f]/95 backdrop-blur-xl border border-cyan-400/30
                    rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.18)] overflow-hidden flex flex-col"
                >
                    <div className="bg-[#07101f] border-b border-cyan-400/20 text-cyan-300 p-4 flex justify-between items-center">
                        <div>
                            <h2 className="font-bold text-lg tracking-wide text-cyan-300">
                                Kartik AI Agent
                            </h2>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0f172a] border border-cyan-400/40 text-cyan-300 hover:bg-red-500 hover:text-white hover:border-red-400 transition duration-300"
                            aria-label="Close chatbot"
                        >
                            <FaTimes size={16} />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.length === 1 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {suggestions.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                        disabled={loading}
                                        className="text-xs px-3 py-2 rounded-full text-white border border-cyan-300/30 hover:scale-105 transition duration-300 disabled:opacity-50"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #00f0ff33, #00ff8033)",
                                            boxShadow:
                                                "0 0 10px rgba(0,240,255,0.25)",
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                                        message.role === "user"
                                            ? `
                                            bg-cyan-400
                                            text-black
                                            rounded-br-none
                                            shadow-[0_0_15px_rgba(34,211,238,0.4)]
                                            `
                                            : `
                                            bg-[#111827]
                                            text-cyan-100
                                            rounded-bl-none
                                            border border-cyan-400/10
                                            `
                                    }`}
                                >
                                    <div className="whitespace-pre-line break-words">
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#111827] text-cyan-100 px-4 py-2 rounded-2xl text-sm border border-cyan-400/10">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-cyan-400/10 bg-[#07101f]">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 bg-[#111827] text-cyan-100 placeholder-cyan-100/40 px-4 py-2 rounded-xl outline-none border border-cyan-400/10 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                                placeholder="Ask something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] disabled:opacity-50"
                                aria-label="Send message"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg transition duration-300 hover:scale-110"
                    style={{
                        background: "linear-gradient(135deg, #00f0ff, #00ff80)",
                        boxShadow: "0 0 15px #00f0ff, 0 0 25px #00ff80",
                    }}
                    aria-label="Open chatbot"
                >
                    <FaRobot size={22} />
                </button>
            )}
        </div>
    );
}