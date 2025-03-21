
import React, { useState } from "react";
import TechNewsCard from "./TechNewsCard";
import { Section } from "./ui/section";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Search, Filter } from "lucide-react";

// Extended news data with more categories
const extendedNewsData = [
  {
    id: 1,
    title: "Google Launches New AI Platform for Developers",
    description: "Google has released a new platform to help developers integrate AI capabilities into their applications more easily. The platform provides pre-trained models and tools for customization.",
    source: "TechCrunch",
    date: "2 hours ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "AI"
  },
  {
    id: 2,
    title: "TypeScript 5.5 Introduces New Features for Better Type Safety",
    description: "The latest version of TypeScript brings significant improvements including better type inference, faster compile times, and new utility types.",
    source: "Dev.to",
    date: "5 hours ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Programming"
  },
  {
    id: 3,
    title: "AWS Announces New Serverless Container Service",
    description: "Amazon Web Services has unveiled a new service that allows developers to run containers without managing servers or clusters, reducing operational overhead.",
    source: "AWS Blog",
    date: "1 day ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Cloud"
  },
  {
    id: 4,
    title: "Study Reveals Top Programming Languages for 2023",
    description: "A comprehensive survey of developers reveals the most in-demand programming languages for this year, with Python, JavaScript, and Rust topping the list.",
    source: "StackOverflow",
    date: "2 days ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Programming"
  },
  {
    id: 5,
    title: "Major Security Vulnerability Discovered in Popular Framework",
    description: "Security researchers have identified a critical vulnerability affecting millions of applications. Developers are urged to update immediately.",
    source: "CyberSecurity Times",
    date: "3 hours ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "Security"
  },
  {
    id: 6,
    title: "New VR Developer Kit Promises Immersive Coding Experience",
    description: "A revolutionary VR headset designed for developers offers an immersive coding environment with gesture controls and 3D visualization tools.",
    source: "Wired",
    date: "1 day ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Gadgets"
  },
  {
    id: 7,
    title: "Blockchain Technology Revolutionizing Supply Chain Management",
    description: "Companies are increasingly adopting blockchain solutions to improve transparency and efficiency in their supply chain operations.",
    source: "Forbes Tech",
    date: "4 hours ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    category: "Blockchain"
  },
  {
    id: 8,
    title: "Machine Learning Model Predicts Software Bugs Before They Happen",
    description: "Researchers have developed an AI system that can analyze code and predict potential bugs with 90% accuracy, potentially saving companies millions in debugging costs.",
    source: "MIT Technology Review",
    date: "2 days ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "AI"
  }
];

const EnhancedTechNewsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = ["all", "AI", "Programming", "Cloud", "Security", "Gadgets", "Blockchain"];
  
  const filteredNews = extendedNewsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Section id="tech-news" className="bg-secondary/30 dark:bg-secondary/10 py-16 animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Latest in Tech
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Stay Updated with Tech News</h2>
          <p className="text-foreground/70 mb-8">
            Keep up with the rapidly evolving technology landscape with our curated tech news feed.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm hidden sm:inline">Filter:</span>
            </div>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap justify-center">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews.map(news => (
              <TechNewsCard 
                key={news.id} 
                news={news} 
                className="h-full transform transition-transform hover:translate-y-[-5px]"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-muted-foreground">No news found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* View All Button */}
        {filteredNews.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" className="group">
              View All Tech News
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default EnhancedTechNewsSection;
