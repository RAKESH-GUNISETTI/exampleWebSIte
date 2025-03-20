
import React from "react";
import { cn } from "@/lib/utils";
import { Code, MessageCircle, Newspaper, Trophy, BarChart3 } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = "0" }) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300 group hover:shadow-lg",
        "animate-fade-in",
        `opacity-0 [animation-delay:${delay}ms] [animation-fill-mode:forwards]`
      )}
    >
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Newspaper className="h-6 w-6" />,
      title: "Tech News & Updates",
      description: "Stay updated with the latest technology trends, news, and industry insights all in one place.",
      delay: "100",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "AI Assistant Chatbot",
      description: "Get personalized coding help, debugging support, and technical guidance from our AI assistant.",
      delay: "200",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Analyzer & Generator",
      description: "Generate, debug, enhance, and convert code between different programming languages with AI.",
      delay: "300",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Challenges & Rewards",
      description: "Solve daily technical puzzles, quizzes, and coding challenges to earn coins and build your skills.",
      delay: "400",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey, track achievements, and showcase your expertise on your profile.",
      delay: "500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Everything You Need to Excel</h2>
          <p className="text-foreground/70 text-balance">
            SkillNest combines learning resources, AI tools, and community features to help you master technical skills and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
