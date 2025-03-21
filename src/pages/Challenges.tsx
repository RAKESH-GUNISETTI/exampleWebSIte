
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/components";
import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Filter, Trophy, Star, BookOpen, Code, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const Challenges = () => {
  const { isLoggedIn, userData } = useAuth();
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard" | "expert">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  // Sample challenges data - in a real app, this would come from an API
  const challenges = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics with this interactive quiz",
      difficulty: "easy",
      type: "quiz",
      timeEstimate: "15 min",
      rewards: 30,
      progress: isLoggedIn ? 75 : 0,
      category: "programming",
    },
    {
      id: 2,
      title: "Algorithms Challenge",
      description: "Solve complex algorithmic problems with JavaScript",
      difficulty: "hard",
      type: "puzzle",
      timeEstimate: "45 min",
      rewards: 80,
      progress: isLoggedIn ? 20 : 0,
      category: "algorithms",
    },
    {
      id: 3,
      title: "React Component Building",
      description: "Build a reusable React component from scratch",
      difficulty: "medium",
      type: "assignment",
      timeEstimate: "1 hour",
      rewards: 60,
      progress: isLoggedIn ? 0 : 0,
      category: "frameworks",
    },
    {
      id: 4,
      title: "Full-Stack Certification",
      description: "Comprehensive test of your full-stack development skills",
      difficulty: "expert",
      type: "exam",
      timeEstimate: "2 hours",
      rewards: 150,
      progress: isLoggedIn ? 0 : 0,
      category: "programming",
    },
    {
      id: 5,
      title: "CSS Grid Mastery",
      description: "Master CSS Grid layout through practical exercises",
      difficulty: "medium",
      type: "assignment",
      timeEstimate: "30 min",
      rewards: 45,
      progress: isLoggedIn ? 100 : 0,
      category: "programming",
    },
    {
      id: 6,
      title: "Database Design",
      description: "Design a robust database schema for a social media platform",
      difficulty: "hard",
      type: "assignment",
      timeEstimate: "1.5 hours",
      rewards: 90,
      progress: isLoggedIn ? 30 : 0,
      category: "programming",
    },
  ];

  const filteredChallenges = challenges.filter(challenge => {
    // Filter based on progress
    if (filter === "in-progress" && (challenge.progress === 0 || challenge.progress === 100)) return false;
    if (filter === "completed" && challenge.progress !== 100) return false;
    
    // Filter based on difficulty
    if (difficulty !== "all" && challenge.difficulty !== difficulty) return false;
    
    return true;
  });

  const handleChallengeClick = (id: number) => {
    if (!isLoggedIn) {
      setAuthType("login");
      setIsAuthModalOpen(true);
      return;
    }
    
    // In a real app, you would navigate to the challenge detail page
    console.log(`Starting challenge ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-primary" />
            Technical Challenges
          </h1>
          
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg font-medium">{userData?.coins || 0} coins</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          )}
        </div>
        
        {isFilterOpen && (
          <div className="mb-6 p-4 bg-card rounded-lg border border-border animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === "in-progress" ? "default" : "outline"}
                    onClick={() => setFilter("in-progress")}
                  >
                    In Progress
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === "completed" ? "default" : "outline"}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={difficulty === "all" ? "default" : "outline"}
                    onClick={() => setDifficulty("all")}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={difficulty === "easy" ? "default" : "outline"}
                    onClick={() => setDifficulty("easy")}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Easy
                  </Button>
                  <Button 
                    size="sm" 
                    variant={difficulty === "medium" ? "default" : "outline"}
                    onClick={() => setDifficulty("medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Medium
                  </Button>
                  <Button 
                    size="sm" 
                    variant={difficulty === "hard" ? "default" : "outline"}
                    onClick={() => setDifficulty("hard")}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Hard
                  </Button>
                  <Button 
                    size="sm" 
                    variant={difficulty === "expert" ? "default" : "outline"}
                    onClick={() => setDifficulty("expert")}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Expert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isLoggedIn && (
          <div className="mb-8 glass-card p-6 rounded-xl animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm flex items-center">
                    <Code className="h-4 w-4 mr-1 text-blue-500" /> 
                    Programming
                  </span>
                  <span className="text-sm">{userData?.progress?.coding || 0}%</span>
                </div>
                <Progress value={userData?.progress?.coding || 0} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-yellow-500" /> 
                    Algorithms
                  </span>
                  <span className="text-sm">{userData?.progress?.algorithms || 0}%</span>
                </div>
                <Progress value={userData?.progress?.algorithms || 0} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm flex items-center">
                    <Star className="h-4 w-4 mr-1 text-green-500" /> 
                    Frameworks
                  </span>
                  <span className="text-sm">{userData?.progress?.frameworks || 0}%</span>
                </div>
                <Progress value={userData?.progress?.frameworks || 0} className="h-2" />
              </div>
            </div>
          </div>
        )}
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Challenges</TabsTrigger>
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    difficulty={challenge.difficulty as any}
                    type={challenge.type as any}
                    timeEstimate={challenge.timeEstimate}
                    rewards={challenge.rewards}
                    progress={challenge.progress}
                    onClick={() => handleChallengeClick(challenge.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
                <p className="text-muted-foreground max-w-md">
                  No challenges match your current filters. Try adjusting your filter criteria or check back later for new challenges.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="programming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges
                .filter(challenge => challenge.category === "programming")
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    difficulty={challenge.difficulty as any}
                    type={challenge.type as any}
                    timeEstimate={challenge.timeEstimate}
                    rewards={challenge.rewards}
                    progress={challenge.progress}
                    onClick={() => handleChallengeClick(challenge.id)}
                  />
                ))}
            </div>
          </TabsContent>
          
          {/* Similar TabsContent for algorithms and frameworks */}
          <TabsContent value="algorithms" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges
                .filter(challenge => challenge.category === "algorithms")
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    difficulty={challenge.difficulty as any}
                    type={challenge.type as any}
                    timeEstimate={challenge.timeEstimate}
                    rewards={challenge.rewards}
                    progress={challenge.progress}
                    onClick={() => handleChallengeClick(challenge.id)}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="frameworks" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges
                .filter(challenge => challenge.category === "frameworks")
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    difficulty={challenge.difficulty as any}
                    type={challenge.type as any}
                    timeEstimate={challenge.timeEstimate}
                    rewards={challenge.rewards}
                    progress={challenge.progress}
                    onClick={() => handleChallengeClick(challenge.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        type={authType}
        setType={setAuthType}
      />
    </div>
  );
};

export default Challenges;
