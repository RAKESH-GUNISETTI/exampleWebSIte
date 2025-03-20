
import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, ArrowUp, Facebook, Instagram, Phone, MapPin } from "lucide-react";

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
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/chatbot" className="text-foreground/70 hover:text-primary transition-colors story-link">AI Assistant</Link>
              </li>
              <li>
                <Link to="/code-analyzer" className="text-foreground/70 hover:text-primary transition-colors story-link">Code Analyzer</Link>
              </li>
              <li>
                <Link to="/challenges" className="text-foreground/70 hover:text-primary transition-colors story-link">Challenges</Link>
              </li>
              <li>
                <Link to="/profile" className="text-foreground/70 hover:text-primary transition-colors story-link">Profile</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors story-link">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors story-link">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors story-link">Blog</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors story-link">Community</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@skillnest.com" className="text-foreground/70 hover:text-primary transition-colors">contact@skillnest.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+1234567890" className="text-foreground/70 hover:text-primary transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-foreground/70">123 Tech Street, Silicon Valley, CA 94024, USA</span>
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
