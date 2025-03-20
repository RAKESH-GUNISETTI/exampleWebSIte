
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Copy, Check, Code, Wand, Hammer, ArrowRight } from "lucide-react";
import { analyzeCode, generateCode } from "@/lib/gemini";
import { toast } from "sonner";

type AnalyzerTab = "generate" | "debug" | "enhance" | "convert";

const CodeAnalyzer = () => {
  const [activeTab, setActiveTab] = useState<AnalyzerTab>("generate");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("JavaScript");
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [hasCopied, setHasCopied] = useState(false);

  const handleTabChange = (tab: AnalyzerTab) => {
    setActiveTab(tab);
    setOutputCode("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOutputCode("");

    try {
      let result = "";

      switch (activeTab) {
        case "generate":
          if (!prompt.trim()) {
            toast.error("Please enter a prompt for code generation");
            return;
          }
          result = await generateCode(prompt, selectedLanguage);
          break;

        case "debug":
        case "enhance":
          if (!inputCode.trim()) {
            toast.error("Please enter code to analyze");
            return;
          }
          result = await analyzeCode(inputCode, activeTab);
          break;

        case "convert":
          if (!inputCode.trim()) {
            toast.error("Please enter code to convert");
            return;
          }
          result = await analyzeCode(inputCode, "convert", targetLanguage);
          break;
      }

      setOutputCode(result);
    } catch (error) {
      console.error("Error processing code:", error);
      toast.error("Failed to process your request", {
        description: error instanceof Error ? error.message : "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    setHasCopied(true);
    toast.success("Code copied to clipboard");
    
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const programmingLanguages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Ruby",
    "PHP",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Code Analyzer & Generator</h1>
          <p className="text-foreground/70">
            Generate, debug, enhance, or convert code with AI assistance
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-8 glass-card rounded-full p-1">
          <button
            onClick={() => handleTabChange("generate")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === "generate" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent/80"
            )}
          >
            <Code className="h-4 w-4" />
            Generate Code
          </button>
          <button
            onClick={() => handleTabChange("debug")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === "debug" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent/80"
            )}
          >
            <Hammer className="h-4 w-4" />
            Debug Code
          </button>
          <button
            onClick={() => handleTabChange("enhance")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === "enhance" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent/80"
            )}
          >
            <Wand className="h-4 w-4" />
            Enhance Code
          </button>
          <button
            onClick={() => handleTabChange("convert")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === "convert" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent/80"
            )}
          >
            <ArrowRight className="h-4 w-4" />
            Convert Code
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Section */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="bg-accent/50 p-4 border-b border-border">
              <h2 className="font-medium">
                {activeTab === "generate" ? "Enter your prompt" : "Your code"}
              </h2>
            </div>
            
            {activeTab === "generate" ? (
              <div className="p-4 space-y-4">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium mb-2">
                    Target Language
                  </label>
                  <select
                    id="language"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="glass-input w-full"
                  >
                    {programmingLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the code you want to generate (e.g., 'Create a function that calculates the Fibonacci sequence')"
                  className="glass-input w-full h-40"
                />
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {activeTab === "convert" && (
                  <div>
                    <label htmlFor="targetLanguage" className="block text-sm font-medium mb-2">
                      Target Language
                    </label>
                    <select
                      id="targetLanguage"
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="glass-input w-full"
                    >
                      {programmingLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <textarea
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder={`Paste your code here to ${activeTab}...`}
                  className="glass-input w-full h-40 font-mono text-sm"
                />
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full" />
                  Processing...
                </>
              ) : (
                <>
                  {activeTab === "generate" ? "Generate Code" : activeTab === "debug" ? "Debug Code" : activeTab === "enhance" ? "Enhance Code" : "Convert Code"}
                </>
              )}
            </button>
          </div>
          
          {/* Output Section */}
          {outputCode && (
            <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
              <div className="bg-accent/50 p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-medium">Result</h2>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg hover:bg-accent/80 transition-colors"
                >
                  {hasCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[500px]">
                  {outputCode}
                </pre>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default CodeAnalyzer;
