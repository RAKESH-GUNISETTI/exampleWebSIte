
import React from "react";
import { cn } from "@/lib/utils";
import TypewriterEffect from "./TypewriterEffect";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const handleGetStarted = () => {
    // Scroll down to the features section
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
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
                "Track your progress, showcase skills"
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
                "transition-all duration-300 transform hover:scale-105"
              )}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <a
              href="#demo"
              className={cn(
                "px-6 py-3 rounded-full font-medium",
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                "transition-all duration-300"
              )}
            >
              View Demo
            </a>
          </div>
          
          <div className="max-w-4xl mx-auto relative animate-fade-in delay-300">
            <div className="aspect-video rounded-xl overflow-hidden glass-card shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-lg font-medium text-foreground/70">
                  Interactive Demo Preview
                </div>
              </div>
            </div>
            
            {/* Platform badges below the image */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {["React", "TypeScript", "AI Powered", "Responsive"].map((tech) => (
                <div key={tech} className="px-4 py-2 rounded-full bg-background/50 backdrop-blur text-sm">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
