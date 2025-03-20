import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, ArrowLeft, Braces, Code, Database, Brain } from "lucide-react";
import { isTechnicalQuestion, chatWithGemini, ChatMessage } from "@/lib/gemini";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ChatSection = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Check if the message is a technical question
      const isTechnical = await isTechnicalQuestion(userMessage);
      
      if (!isTechnical) {
        setMessages((prev) => [
          ...prev,
          { 
            role: "model", 
            content: "I'm designed to help with technical questions related to programming, computer science, and technology. Please ask a technical question, and I'll be happy to assist you!" 
          }
        ]);
        toast.warning("Please ask a technical question");
      } else {
        // Process the technical question
        const allMessages = [...messages, { role: "user", content: userMessage }] as ChatMessage[];
        const response = await chatWithGemini(allMessages);
        
        setMessages((prev) => [...prev, { role: "model", content: response }]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          content: "Sorry, I encountered an error processing your request. Please try again later." 
        }
      ]);
      toast.error("Failed to process your message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            AI Technical Assistant
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Get Instant Technical Help</h2>
          <p className="text-foreground/70 text-balance">
            Ask any technical question and get accurate answers powered by AI.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card rounded-xl shadow-lg overflow-hidden">
          <div className="h-[300px] overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4">
                <Bot className="h-16 w-16 text-primary/30" />
                <p>Ask me any technical question about programming, algorithms, or technology!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-[80%] rounded-lg p-4",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "mr-auto bg-secondary"
                  )}
                >
                  {message.content}
                </div>
              ))
            )}
            {isLoading && (
              <div className="mr-auto bg-secondary max-w-[80%] rounded-lg p-4 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <span className="text-sm">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a technical question..."
                className="resize-none min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                className="flex-shrink-0" 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { 
              icon: <Code className="h-5 w-5" />, 
              title: "Code Help", 
              description: "Get coding assistance and debugging tips" 
            },
            { 
              icon: <Braces className="h-5 w-5" />, 
              title: "Algorithm Guidance", 
              description: "Learn how to optimize your algorithms" 
            },
            { 
              icon: <Database className="h-5 w-5" />, 
              title: "Tech Explanations", 
              description: "Understand complex technical concepts" 
            },
            { 
              icon: <Brain className="h-5 w-5" />, 
              title: "Learning Resources", 
              description: "Get recommended materials for learning" 
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
