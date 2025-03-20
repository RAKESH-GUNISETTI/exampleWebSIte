
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import EnhancedTechNewsSection from "@/components/EnhancedTechNewsSection";
import LandingPageChat from "@/components/LandingPageChat";
import TypewriterEffect from "@/components/TypewriterEffect";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ContactDialog from "@/components/ContactDialog";
import Footer from "@/components/Footer";
import { ArrowRight, Sparkles, Brain, Code, Trophy } from "lucide-react";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/challenges");
    } else {
      setAuthType("signup");
      setIsAuthModalOpen(true);
    }
  };

  const handleViewDemo = () => {
    navigate("/chatbot");
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen rainbow-bg">
      <Navbar 
        onLoginClick={() => {
          setAuthType("login");
          setIsAuthModalOpen(true);
        }}
        onSignupClick={() => {
          setAuthType("signup");
          setIsAuthModalOpen(true);
        }}
        onContactClick={handleContactClick}
      />
      
      <main>
        <section className="container py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance animate-fade-in">
            Welcome to SkillNest Collective - <br />
            <TypewriterEffect
              texts={[
                "Your Technical Learning Hub",
                "Learn Coding Efficiently",
                "Master New Technologies",
                "Build Real-World Projects",
                "Join Our Developer Community"
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseTime={1500}
              className="text-primary"
              loop={true}
            />
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 text-balance animate-fade-in delay-75">
            Enhance your technical skills with interactive challenges, AI assistance, and a supportive learning community.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in delay-150">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleViewDemo}
              className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              View Demo
              <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
          
          <div className="py-10 animate-fade-in delay-200">
            <div className="max-w-4xl mx-auto glass-card p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
                <Brain className="mr-2 h-6 w-6 text-primary" />
                AI Learning Assistant
              </h2>
              <LandingPageChat />
            </div>
          </div>
        </section>
        
        <EnhancedTechNewsSection />
        
        <Features />
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        type={authType}
        setType={setAuthType}
      />
      
      <ContactDialog 
        open={isContactOpen} 
        onOpenChange={setIsContactOpen} 
      />
    </div>
  );
};

export default Index;
