
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Send, Bot, User, AlertTriangle, Loader2 } from "lucide-react";
import { chatWithGemini, isTechnicalQuestion, ChatMessage } from "@/lib/gemini";
import { toast } from "sonner";

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hello! I'm your AI technical assistant. How can I help you with your programming or technical questions today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    setInputValue("");
    
    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Check if question is technical
      const technical = await isTechnicalQuestion(userMessage);
      
      if (!technical) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "I'm designed to help with technical and programming questions only. Please ask me something related to coding, software development, or technology.",
          },
        ]);
        toast.warning("Please ask technical questions only", {
          description: "This AI assistant is specialized in technical topics",
        });
        setIsLoading(false);
        return;
      }
      
      // Get response from Gemini
      const response = await chatWithGemini([...messages, { role: "user", content: userMessage }]);
      
      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "model", content: response }]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to get a response", {
        description: error instanceof Error ? error.message : "Please try again later",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "I'm having trouble processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">AI Technical Assistant</h1>
          <p className="text-foreground/70">
            Get real-time help with your coding and technical questions
          </p>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden mb-8 shadow-md">
          <div className="bg-accent/50 p-4 border-b border-border flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary" />
            <h2 className="font-medium">Technical Chatbot</h2>
          </div>
          
          {/* Chat messages container */}
          <div className="p-4 h-[calc(100vh-300px)] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "mb-4 max-w-[80%] animate-fade-in",
                  message.role === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "flex gap-3 p-4 rounded-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent"
                  )}
                >
                  <div className="flex-shrink-0 mt-1">
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="flex gap-3 p-4 rounded-lg bg-accent">
                  <Bot className="h-5 w-5 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a technical question..."
              className="flex-1 glass-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={cn(
                "p-2 rounded-lg bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </button>
          </form>
        </div>
        
        <div className="glass-card rounded-xl p-4 text-sm text-foreground/70 mb-8">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Technical Questions Only</h3>
              <p>
                This AI assistant is designed to help with technical topics such as programming, 
                algorithms, software development, and other technology-related subjects.
                Non-technical questions will be politely declined.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBot;
