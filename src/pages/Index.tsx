
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import { ArrowRight, Github, Twitter } from "lucide-react";

const Index = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-20 px-4 bg-secondary/50">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal opacity-0">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Start Your Tech Journey</h2>
              <p className="text-foreground/70">
                Follow these simple steps to get started with SkillNest and begin enhancing your technical skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create an Account",
                  description: "Sign up for a free account to access all features and track your progress.",
                },
                {
                  step: "02",
                  title: "Explore Features",
                  description: "Browse tech news, try the AI assistant, and check out code analyzer tools.",
                },
                {
                  step: "03",
                  title: "Tackle Challenges",
                  description: "Start solving daily challenges to earn coins and build your technical profile.",
                },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`glass-card p-8 rounded-xl reveal opacity-0 [animation-delay:${index * 200}ms]`}
                >
                  <div className="text-4xl font-bold text-primary/30 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center reveal opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Tech Skills?</h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-xl mx-auto">
                Join SkillNest today and start your journey toward technical excellence with our comprehensive platform.
              </p>
              <button
                className="px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 left-0 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"></div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-xl font-bold mb-4">
                <span className="text-primary">Skill</span>
                <span>Nest</span>
              </div>
              <p className="text-foreground/70 max-w-md mb-6">
                An all-in-one platform for technical skill development, learning, and career growth.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">AI Assistant</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Code Analyzer</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Tech News</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Challenges</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} SkillNest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
