
import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background border-t border-border py-12 mt-20">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              <span className="text-primary">Skill</span>
              <span>Nest</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Enhance your technical skills with interactive challenges, AI assistance, and a supportive learning community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/chatbot" className="text-foreground/70 hover:text-primary transition-colors">AI Assistant</Link>
              </li>
              <li>
                <Link to="/code-analyzer" className="text-foreground/70 hover:text-primary transition-colors">Code Analyzer</Link>
              </li>
              <li>
                <Link to="/challenges" className="text-foreground/70 hover:text-primary transition-colors">Challenges</Link>
              </li>
              <li>
                <Link to="/profile" className="text-foreground/70 hover:text-primary transition-colors">Profile</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Community</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillNest Collective. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors mt-4 md:mt-0 group"
          >
            Back to top
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
