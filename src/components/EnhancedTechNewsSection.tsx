
import React, { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import TechNewsCard from "@/components/TechNewsCard";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  imageUrl?: string;
  content?: string;
}

// Sample tech news data
const TECH_NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Unveils GPT-5 with Unprecedented Natural Language Capabilities",
    description: "The latest AI model from OpenAI demonstrates remarkable improvements in reasoning, context understanding, and creative problem-solving.",
    source: "TechCrunch",
    date: "2025-03-15",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1677442135728-a1b466b6cf76?q=80&w=1932&auto=format&fit=crop",
    content: "OpenAI has officially launched GPT-5, pushing the boundaries of AI language models to new heights. The model demonstrates significant advancements in multi-step reasoning, contextual understanding, and creative problem-solving. Early tests show GPT-5 performing at expert human levels across various professional domains including medicine, law, and engineering. The model also shows a remarkable reduction in hallucinations and biases compared to previous versions. OpenAI claims this model represents a significant step toward artificial general intelligence while emphasizing their continued commitment to responsible AI development and deployment."
  },
  {
    id: "2",
    title: "GitHub Introduces AI-Powered Code Review Assistant",
    description: "GitHub's new feature uses machine learning to automatically review code commits and suggest improvements for developers.",
    source: "The Verge",
    date: "2025-03-12",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1776&auto=format&fit=crop",
    content: "GitHub has launched a new AI-powered code review assistant that automatically analyzes pull requests and suggests improvements. The tool, built on a specialized version of GitHub Copilot technology, can identify potential bugs, security vulnerabilities, and performance issues before code is merged. Early adopters report significant time savings in the code review process and improved code quality. The feature is now available for all GitHub Enterprise customers and will roll out to other tiers in the coming months."
  },
  {
    id: "3",
    title: "New Quantum Computing Breakthrough Achieves 1000-Qubit Processor",
    description: "Scientists have developed a quantum processor that maintains quantum coherence at record scales, potentially revolutionizing computing.",
    source: "MIT Technology Review",
    date: "2025-03-10",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    content: "Researchers at IBM have announced a breakthrough in quantum computing with a new 1000-qubit processor that maintains quantum coherence for unprecedented periods. This development represents a significant step toward practical quantum computing applications. The processor, named 'Condor,' uses a novel approach to error correction that dramatically improves stability. Experts suggest this breakthrough could accelerate quantum advantage in fields like cryptography, material science, and complex system modeling. IBM plans to make the technology available through their quantum cloud services by the end of the year."
  },
  {
    id: "4",
    title: "Web Assembly 2.0 Specification Finalized After Years of Development",
    description: "The new WebAssembly standard brings garbage collection, enhanced security features, and better JavaScript integration to browsers.",
    source: "Mozilla Hacks",
    date: "2025-03-07",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop",
    content: "After years of development, the WebAssembly Working Group has finalized the WebAssembly 2.0 specification. The new standard introduces native garbage collection, exception handling, and reference types, addressing major limitations of the original specification. These improvements will enable developers to more easily port complex applications to the web with better performance and reduced JavaScript glue code. All major browsers have committed to implementing the new standard by the end of 2025, with Chrome and Firefox already offering partial support in their nightly builds."
  },
  {
    id: "5",
    title: "Rust Language Surpasses JavaScript as Most Popular Language on GitHub",
    description: "For the first time, Rust has overtaken JavaScript in GitHub's annual report on programming language popularity and community growth.",
    source: "GitHub Blog",
    date: "2025-03-04",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
    content: "According to GitHub's annual State of the Octoverse report, Rust has surpassed JavaScript as the most popular programming language on the platform. This marks a significant shift in the developer ecosystem, with Rust seeing a 150% increase in repositories and contributors over the past year. The report attributes Rust's meteoric rise to its memory safety guarantees, modern language features, and expanding ecosystem. Major tech companies including Microsoft, Google, and Amazon have increasingly adopted Rust for performance-critical systems, further driving its mainstream adoption."
  },
  {
    id: "6",
    title: "Apple Announces Revolutionary AR/VR Headset with Neural Interface",
    description: "The next-generation mixed reality device from Apple features direct neural input technology, eliminating the need for physical controllers.",
    source: "Wired",
    date: "2025-03-01",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop",
    content: "Apple has unveiled its highly anticipated second-generation mixed reality headset featuring breakthrough neural interface technology. The device, named Apple Vision Pro 2, uses non-invasive sensors to detect and interpret neural signals from the user's brain, allowing for control without physical controllers or hand gestures. Early demonstrations show users navigating interfaces, typing, and manipulating virtual objects using only their thoughts. The technology represents a paradigm shift in human-computer interaction and sets a new direction for the AR/VR industry. The device is expected to be available in limited quantities starting in Q4 2025 with a retail price of $2,999."
  }
];

const EnhancedTechNewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate loading with a timeout
    setLoading(true);
    setTimeout(() => {
      setNewsItems(TECH_NEWS_DATA);
      setLoading(false);
    }, 1000);

    // Simulate refreshing the news every 5 minutes
    const interval = setInterval(() => {
      // Shuffle the array to simulate new content
      setNewsItems([...TECH_NEWS_DATA].sort(() => Math.random() - 0.5));
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Tech News</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest developments and trends in the tech world
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg p-4 h-[400px] animate-pulse bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <TechNewsCard
                key={item.id}
                title={item.title}
                description={item.description}
                source={item.source}
                date={item.date}
                url={item.url}
                imageUrl={item.imageUrl}
                content={item.content}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default EnhancedTechNewsSection;
