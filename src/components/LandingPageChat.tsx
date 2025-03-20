
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, SendIcon } from "lucide-react";
import { chatWithGemini, isTechnicalQuestion, ChatMessage } from "@/lib/gemini";
import { useAuth } from "@/context/AuthContext";

const LandingPageChat: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hi there! I'm your technical assistant. Ask me any coding or tech-related question.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setIsLoading(true);

    try {
      // Check if the question is technical
      const technical = await isTechnicalQuestion(userInput);
      
      if (!technical) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "I'm sorry, I can only answer technical questions related to programming, computer science, or technology. Please ask a technical question.",
          },
        ]);
        setIsLoading(false);
        return;
      }

      // Process the user's message
      const botResponse = await chatWithGemini([...messages, { role: "user", content: userInput }]);
      
      // Add bot response to chat
      setMessages((prev) => [...prev, { role: "model", content: botResponse }]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to get a response. Please try again.");
      
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">Technical AI Assistant</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask me anything about coding, tech, or computer science
          </p>
        </div>
        
        <div className="h-[300px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-secondary">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
          <Textarea
            placeholder="Ask a technical question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="resize-none min-h-[60px] glass-input flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="h-auto transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendIcon className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LandingPageChat;
