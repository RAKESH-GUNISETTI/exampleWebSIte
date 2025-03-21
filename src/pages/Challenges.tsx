import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Section } from "@/components/ui/section";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger,
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Progress, Button, Badge
} from "@/components/ui/components";
import { toast } from "sonner";
import { Award, CheckCircle2, Clock, Flame, Globe, LucideIcon, Monitor, Star, Trophy, X, Brain, Code, Puzzle, BookOpen, Zap } from "lucide-react";

// Challenge types and interfaces
type ChallengeStatus = "locked" | "available" | "in-progress" | "completed";
type ChallengeLevel = "beginner" | "intermediate" | "advanced" | "expert";
type ChallengeCategory = "coding" | "algorithms" | "frameworks" | "quiz";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  level: ChallengeLevel;
  points: number;
  status: ChallengeStatus;
  estimatedTime: string;
  completed?: boolean;
  icon: LucideIcon;
  progress?: number;
}

const difficultyColors = {
  beginner: "bg-green-500",
  intermediate: "bg-blue-500",
  advanced: "bg-orange-500",
  expert: "bg-red-500",
};

const categoryIcons = {
  coding: Code,
  algorithms: Brain,
  frameworks: Monitor,
  quiz: BookOpen,
};

// Mock challenges data
const challengesData: Challenge[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    description: "Learn the fundamentals of JavaScript with this interactive challenge.",
    category: "coding",
    level: "beginner",
    points: 50,
    status: "available",
    estimatedTime: "30 min",
    icon: Code,
  },
  {
    id: "2",
    title: "React Components",
    description: "Build reusable React components and understand component lifecycle.",
    category: "frameworks",
    level: "intermediate",
    points: 100,
    status: "locked",
    estimatedTime: "1 hour",
    icon: Monitor,
  },
  {
    id: "3",
    title: "Sorting Algorithms",
    description: "Implement and analyze common sorting algorithms.",
    category: "algorithms",
    level: "advanced",
    points: 150,
    status: "available",
    estimatedTime: "2 hours",
    icon: Brain,
  },
  {
    id: "4",
    title: "HTML/CSS Quiz",
    description: "Test your knowledge of HTML and CSS with this quiz.",
    category: "quiz",
    level: "beginner",
    points: 50,
    status: "completed",
    estimatedTime: "20 min",
    completed: true,
    icon: BookOpen,
  },
  {
    id: "5",
    title: "CSS Animations",
    description: "Create beautiful animations using CSS transitions and keyframes.",
    category: "coding",
    level: "intermediate",
    points: 75,
    status: "in-progress",
    estimatedTime: "45 min",
    progress: 60,
    icon: Code,
  },
  {
    id: "6",
    title: "Data Structures",
    description: "Implement common data structures like linked lists, stacks, and queues.",
    category: "algorithms",
    level: "advanced",
    points: 200,
    status: "available",
    estimatedTime: "3 hours",
    icon: Brain,
  },
  {
    id: "7",
    title: "Node.js Basics",
    description: "Learn the fundamentals of Node.js and server-side JavaScript.",
    category: "frameworks",
    level: "intermediate",
    points: 100,
    status: "available",
    estimatedTime: "1.5 hours",
    icon: Monitor,
  },
  {
    id: "8",
    title: "JavaScript Quiz",
    description: "Test your JavaScript knowledge with this challenging quiz.",
    category: "quiz",
    level: "intermediate",
    points: 75,
    status: "available",
    estimatedTime: "30 min",
    icon: BookOpen,
  },
];

const Challenges = () => {
  const { isLoggedIn, userData } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [challenges, setChallenges] = useState<Challenge[]>(challengesData);
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    completedChallenges: 0,
    inProgressChallenges: 0,
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access challenges", {
        description: "You need to be logged in to view and take challenges",
      });
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Calculate user stats
  useEffect(() => {
    const stats = challenges.reduce(
      (acc, challenge) => {
        if (challenge.status === "completed") {
          acc.totalPoints += challenge.points;
          acc.completedChallenges += 1;
        } else if (challenge.status === "in-progress") {
          acc.inProgressChallenges += 1;
        }
        return acc;
      },
      { totalPoints: 0, completedChallenges: 0, inProgressChallenges: 0 }
    );
    setUserStats(stats);
  }, [challenges]);

  const filteredChallenges = challenges.filter((challenge) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "in-progress") return challenge.status === "in-progress";
    if (activeCategory === "completed") return challenge.status === "completed";
    return challenge.category === activeCategory;
  });

  const handleStartChallenge = (challenge: Challenge) => {
    if (challenge.status === "locked") {
      toast.error("Challenge Locked", {
        description: "Complete previous challenges to unlock this one",
      });
      return;
    }

    // In a real app, this would navigate to the specific challenge page
    // For now, we'll just update the challenge status
    if (challenge.status === "available") {
      setChallenges((prev) =>
        prev.map((c) =>
          c.id === challenge.id
            ? { ...c, status: "in-progress" as ChallengeStatus, progress: 0 }
            : c
        )
      );
      toast.success("Challenge Started", {
        description: `You've started the ${challenge.title} challenge`,
      });
    } else if (challenge.status === "in-progress") {
      toast.info("Challenge In Progress", {
        description: "Continue where you left off",
      });
    } else if (challenge.status === "completed") {
      toast.info("Challenge Completed", {
        description: "You've already completed this challenge",
      });
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Section className="py-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Technical Challenges</h1>
                <p className="text-muted-foreground mt-2">
                  Enhance your technical skills with our interactive challenges
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>
                    <span className="font-bold">{userStats.totalPoints}</span> points
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>
                    <span className="font-bold">{userStats.completedChallenges}</span> completed
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-8 flex flex-wrap">
                <TabsTrigger value="all">All Challenges</TabsTrigger>
                <TabsTrigger value="coding">Coding</TabsTrigger>
                <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                <TabsTrigger value="quiz">Quizzes</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value={activeCategory} className="space-y-6">
                {filteredChallenges.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
                    <p className="text-muted-foreground mb-6">
                      There are no challenges available in this category yet.
                    </p>
                    <Button onClick={() => setActiveCategory("all")}>
                      View All Challenges
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChallenges.map((challenge) => (
                      <Card 
                        key={challenge.id}
                        className={cn(
                          "overflow-hidden transition-all hover:shadow-lg",
                          challenge.status === "locked" && "opacity-70"
                        )}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <div className={`p-2 rounded-lg ${
                                challenge.category === "coding" ? "bg-blue-500/10" :
                                challenge.category === "algorithms" ? "bg-purple-500/10" :
                                challenge.category === "frameworks" ? "bg-green-500/10" :
                                "bg-orange-500/10"
                              }`}>
                                {React.createElement(categoryIcons[challenge.category], {
                                  className: `h-5 w-5 ${
                                    challenge.category === "coding" ? "text-blue-500" :
                                    challenge.category === "algorithms" ? "text-purple-500" :
                                    challenge.category === "frameworks" ? "text-green-500" :
                                    "text-orange-500"
                                  }`
                                })}
                              </div>
                              <span className="text-xs font-medium uppercase text-muted-foreground">
                                {challenge.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">{challenge.points}</span>
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </div>
                          </div>
                          <CardTitle className="text-lg mt-2">{challenge.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                challenge.level === "beginner" && "border-green-500 text-green-500",
                                challenge.level === "intermediate" && "border-blue-500 text-blue-500",
                                challenge.level === "advanced" && "border-orange-500 text-orange-500",
                                challenge.level === "expert" && "border-red-500 text-red-500"
                              )}
                            >
                              {challenge.level}
                            </Badge>
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {challenge.estimatedTime}
                            </Badge>
                          </div>
                          <CardDescription className="mt-2">
                            {challenge.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {challenge.status === "in-progress" && (
                            <div className="mb-4">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{challenge.progress || 0}%</span>
                              </div>
                              <Progress value={challenge.progress || 0} className="h-1.5" />
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          {challenge.status === "locked" ? (
                            <Button variant="outline" disabled className="w-full">
                              <Lock className="h-4 w-4 mr-2" />
                              Locked
                            </Button>
                          ) : challenge.status === "completed" ? (
                            <Button variant="outline" className="w-full bg-green-500/10 border-green-500 text-green-500 hover:bg-green-500/20">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Completed
                            </Button>
                          ) : (
                            <Button 
                              variant={challenge.status === "in-progress" ? "default" : "outline"} 
                              className="w-full"
                              onClick={() => handleStartChallenge(challenge)}
                            >
                              {challenge.status === "in-progress" ? (
                                <>
                                  <Zap className="h-4 w-4 mr-2" />
                                  Continue
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Challenge
                                </>
                              )}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Challenges;

// Helper components and imports
import { cn } from "@/lib/utils";
import { Lock, Play } from "lucide-react";
