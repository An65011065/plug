import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                text: "Thanks for your message! I'm here to help you find the perfect legal edibles from our registered vendors.",
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsLoading(false);
        }, 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[85vh] w-[50vw] max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/20 relative">
                <h1 className="text-4xl font-medium text-gray-800 text-center tracking-tight leading-none">
                    Plug
                </h1>
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gray-300/40"></div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${
                            message.sender === "user" ? "user" : "ai"
                        }`}
                    >
                        <div className={`message-bubble ${message.sender}`}>
                            {message.text}
                        </div>
                    </div>
                ))}

                {/* Loading Animation */}
                {isLoading && (
                    <div className="chat-message ai loading">
                        <div className="message-bubble ai">
                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className="p-6 border-t border-white/10 flex justify-center">
                <div className="relative w-3/4 max-w-2xl">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about our premium edibles..."
                        className="w-full resize-none rounded-2xl bg-white/95 border-2 border-gray-300/60 px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-600/40 focus:border-amber-600/50 transition-all duration-300 max-h-32 backdrop-blur-sm shadow-sm"
                        rows={1}
                        style={{ minHeight: "48px" }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputMessage.trim() || isLoading}
                        className="absolute right-3 top-3 bg-amber-700/80 text-white rounded-full p-2 hover:bg-amber-700/90 focus:outline-none focus:ring-2 focus:ring-amber-600/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                        style={{ top: "calc(50% - 16px)" }}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Styles */}
            <style>{`
        .chat-message {
          display: flex;
          margin-bottom: 16px;
          animation: messageSlideIn 0.3s ease-out;
        }

        .chat-message.user {
          justify-content: flex-end;
        }

        .chat-message.ai {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 20px;
          font-size: 16px;
          line-height: 1.4;
          word-wrap: break-word;
          position: relative;
          animation: bubbleScale 0.2s ease-out;
        }

        .message-bubble.user {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          color: #2d1810;
          border-bottom-right-radius: 6px;
          margin-left: auto;
        }

        .message-bubble.ai {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          color: #2d1810;
          border-bottom-left-radius: 6px;
        }

        .loading-dots {
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: center;
          padding: 4px 0;
        }

        .loading-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(45, 24, 16, 0.7);
          animation: loadingDot 1.4s infinite ease-in-out;
        }

        .loading-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes loadingDot {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bubbleScale {
          from {
            transform: scale(0.95);
            opacity: 0.8;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Smooth scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </div>
    );
};

export default Chat;
