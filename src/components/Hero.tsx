
import React from "react";
import { cn } from "@/lib/utils";
import TypewriterEffect from "./TypewriterEffect";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/challenges");
    } else {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 rainbow-bg animate-rainbow-background">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4 inline-block animate-fade-in">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              The Ultimate Tech Learning Platform
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in">
            Elevate Your Tech Skills with{" "}
            <span className="text-primary">SkillNest</span>
          </h1>
          
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto animate-slide-in delay-75 text-balance">
            <TypewriterEffect 
              texts={[
                "Master coding with AI assistance",
                "Stay updated with tech trends",
                "Solve challenges, earn rewards",
                "Track your progress, showcase skills",
                "Learn from industry experts",
                "Build your professional network",
                "Enhance your technical portfolio"
              ]} 
              typingSpeed={60}
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in delay-150">
            <button
              onClick={handleGetStarted}
              className={cn(
                "px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg",
                "hover:translate-y-[-2px]"
              )}
            >
              {isLoggedIn ? "Go to Challenges" : "Get Started"}
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleViewDemo}
              className={cn(
                "px-6 py-3 rounded-full font-medium",
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                "transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              )}
            >
              View Demo
            </button>
          </div>
          
          <div id="demo" className="max-w-4xl mx-auto relative animate-fade-in delay-300">
            <div className="aspect-video rounded-xl overflow-hidden glass-card shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl group">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80" 
                    alt="Demo Preview" 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">Interactive Platform Demo</h3>
                    <p className="text-center max-w-md">
                      Experience the power of SkillNest's AI-driven learning tools, interactive challenges, and personalized progress tracking.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-primary/90 rounded-full text-sm font-medium hover:bg-primary transition-colors">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Platform badges below the image */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {["React", "TypeScript", "AI Powered", "Responsive"].map((tech) => (
                <div key={tech} className="px-4 py-2 rounded-full bg-background/50 backdrop-blur text-sm shadow-sm hover:shadow-md transition-all duration-300 hover:bg-background/70 hover:translate-y-[-2px]">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </section>
  );
};

export default Hero;
