
import React, { useState } from "react";
import TechNewsCard from "./TechNewsCard";
import { Section } from "@/components/ui/section";
import { Newspaper, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define news categories
const CATEGORIES = ["All", "AI", "Blockchain", "Programming", "Computing", "Cybersecurity", "Gadgets"];

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const EnhancedTechNewsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Extended list of tech news items
  const techNews: NewsItem[] = [
    {
      title: "Artificial Intelligence Revolutionizes Code Generation",
      summary: "New AI tools can now write complex applications with minimal human guidance, promising to transform how developers work.",
      date: "May 15, 2023",
      author: "Tech Insights",
      category: "AI",
      imageUrl: "https://images.unsplash.com/photo-1677442135123-1f577f316907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "The Rise of Web3 and Decentralized Applications",
      summary: "Blockchain technology continues to evolve, enabling new types of applications that operate without centralized control.",
      date: "May 12, 2023",
      author: "Blockchain Today",
      category: "Blockchain",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Quantum Computing Reaches New Milestone",
      summary: "Researchers achieve quantum supremacy for practical problems, bringing quantum computing one step closer to mainstream use.",
      date: "May 10, 2023",
      author: "Quantum Review",
      category: "Computing",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Major Security Vulnerability Discovered in Popular Framework",
      summary: "Security researchers have identified a critical vulnerability affecting millions of websites built with a widely-used JavaScript framework.",
      date: "May 8, 2023",
      author: "Cyber Defense Weekly",
      category: "Cybersecurity",
      imageUrl: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "TypeScript 5.5 Introduces Game-Changing Features",
      summary: "The latest version of TypeScript brings significant improvements including better type inference and new utility types.",
      date: "May 5, 2023",
      author: "Dev.to",
      category: "Programming",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "New Foldable Smartphone Redefines Mobile Computing",
      summary: "The latest foldable smartphone offers laptop-like capabilities with improved durability and innovative software features.",
      date: "May 3, 2023",
      author: "Gadget Review",
      category: "Gadgets",
      imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

  // Filter news based on search query and active category
  const filteredNews = techNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Section id="tech-news" className="py-16 bg-accent/30">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center">
          <Newspaper className="h-4 w-4 mr-1.5" />
          Latest in Tech
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Stay Updated with Tech Trends</h2>
        <p className="text-foreground/70">
          Discover the latest news, updates, and breakthroughs in the world of technology and programming.
        </p>
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Display filtered news */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150 + 300}ms`, animationFillMode: 'forwards' }}
            >
              <TechNewsCard
                title={news.title}
                summary={news.summary}
                date={news.date}
                author={news.author}
                category={news.category}
                imageUrl={news.imageUrl}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No news found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
            className="mt-4"
          >
            Clear filters
          </Button>
        </div>
      )}
    </Section>
  );
};

export default EnhancedTechNewsSection;
