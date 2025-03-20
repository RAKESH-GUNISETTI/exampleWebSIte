
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Calendar,
  Trophy,
  Send,
  Brain,
  ArrowUp,
  ArrowDown,
  Filter,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type ChallengeType = "daily" | "challenge" | "quiz";
type Difficulty = "Easy" | "Medium" | "Hard";

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: Difficulty;
  points: number;
  completedBy: number;
  description: string;
  deadline: string;
  type: ChallengeType;
  questions?: Question[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const Challenges = () => {
  const [filter, setFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Check if user is logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access challenges", {
        description: "You'll be redirected to the home page",
        action: {
          label: "Login",
          onClick: () => {
            const event = new CustomEvent("open-auth-modal", { detail: { type: "login" } });
            window.dispatchEvent(event);
          },
        },
      });
      
      // Redirect to home after a short delay
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  const getIconForType = (type: ChallengeType) => {
    switch (type) {
      case "daily":
        return <Calendar className="h-5 w-5" />;
      case "challenge":
        return <Trophy className="h-5 w-5" />;
      case "quiz":
        return <Brain className="h-5 w-5" />;
      default:
        return <Send className="h-5 w-5" />;
    }
  };

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Create a Responsive Footer",
      category: "CSS",
      difficulty: "Easy",
      points: 20,
      completedBy: 324,
      description:
        "Design a responsive footer that adjusts its layout from horizontal on desktop to vertical on mobile devices.",
      deadline: "24h remaining",
      type: "daily",
    },
    {
      id: 2,
      title: "Optimize Database Query",
      category: "SQL",
      difficulty: "Hard",
      points: 50,
      completedBy: 87,
      description:
        "Optimize a complex SQL query to reduce execution time by at least 50%.",
      deadline: "3 days remaining",
      type: "challenge",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      category: "JavaScript",
      difficulty: "Medium",
      points: 30,
      completedBy: 156,
      description:
        "Test your knowledge of JavaScript fundamentals including closures, prototypes, and async patterns.",
      deadline: "Open",
      type: "quiz",
      questions: [
        {
          id: 1,
          text: "Which of the following is NOT a JavaScript data type?",
          options: ["String", "Number", "Boolean", "Float"],
          correctAnswer: 3
        },
        {
          id: 2,
          text: "What does the '===' operator do in JavaScript?",
          options: [
            "Checks for equality with type conversion", 
            "Checks for equality without type conversion", 
            "Assigns a value", 
            "Checks if a variable exists"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "What is a closure in JavaScript?",
          options: [
            "A way to hide HTML elements", 
            "A function with access to its own scope, the outer function's scope, and global variables", 
            "A method to close browser windows", 
            "A way to terminate JavaScript execution"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "Which method is used to add an element at the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "What is the output of console.log(typeof null)?",
          options: ["null", "undefined", "object", "number"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 4,
      title: "Build a State Management System",
      category: "React",
      difficulty: "Hard",
      points: 60,
      completedBy: 43,
      description:
        "Create a lightweight state management system for React applications without using Redux.",
      deadline: "5 days remaining",
      type: "challenge",
    },
    {
      id: 5,
      title: "Daily Algorithm Challenge",
      category: "Algorithms",
      difficulty: "Medium",
      points: 25,
      completedBy: 211,
      description:
        "Solve today's algorithm challenge: implement an efficient solution for finding the longest palindromic substring.",
      deadline: "24h remaining",
      type: "daily",
    },
    {
      id: 6,
      title: "CSS Grid Layout",
      category: "CSS",
      difficulty: "Easy",
      points: 15,
      completedBy: 278,
      description:
        "Create a responsive grid layout using CSS Grid that adapts to different screen sizes.",
      deadline: "Open",
      type: "quiz",
      questions: [
        {
          id: 1,
          text: "Which CSS property is used to define a grid container?",
          options: ["grid-template", "display: grid", "grid-layout", "container: grid"],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is the correct way to create a grid with 3 equal columns?",
          options: [
            "grid-template-columns: 3;", 
            "grid-template-columns: repeat(3, 1fr);", 
            "grid-columns: 3;", 
            "columns: repeat(3, 1fr);"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "Which property is used to define gaps between grid items?",
          options: ["grid-spacing", "grid-gap", "grid-margin", "item-gap"],
          correctAnswer: 1
        }
      ]
    },
  ];

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesTypeFilter = filter === "all" || challenge.type === filter;
    const matchesDifficultyFilter = difficultyFilter === "all" || challenge.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTypeFilter && matchesDifficultyFilter && matchesSearch;
  });

  const startQuiz = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setIsQuizModalOpen(true);
  };

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!selectedChallenge?.questions) return;
    
    if (currentQuestionIndex < selectedChallenge.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      selectedChallenge.questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const finalScore = Math.round((correctAnswers / selectedChallenge.questions.length) * selectedChallenge.points);
      setScore(finalScore);
      setQuizCompleted(true);
      
      // In a real app, you would save this score to the user's profile
      toast.success(`You earned ${finalScore} points!`);
    }
  };

  const closeQuiz = () => {
    setIsQuizModalOpen(false);
    setSelectedChallenge(null);
  };

  const handleStartChallenge = (challenge: Challenge) => {
    if (challenge.type === "quiz") {
      startQuiz(challenge);
    } else {
      // For non-quiz challenges, show a toast for now
      toast.info(`Starting ${challenge.title}`, {
        description: "This feature is coming soon!"
      });
    }
  };

  if (!isLoggedIn) {
    return <div className="container min-h-screen flex items-center justify-center">
      <p>Redirecting to home page...</p>
    </div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-20">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Technical Challenges</h1>
            <p className="text-muted-foreground">
              Solve problems, earn points, and improve your technical skills
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search challenges..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Tabs
                defaultValue="all"
                className="w-auto"
                onValueChange={(value) => setFilter(value)}
                value={filter}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="challenge">Challenges</TabsTrigger>
                  <TabsTrigger value="quiz">Quizzes</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredChallenges.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden group hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${getDifficultyColor(
                          challenge.difficulty
                        )} capitalize`}
                      >
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {challenge.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-xl group-hover:text-primary transition-colors">{challenge.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-sm">
                      {getIconForType(challenge.type)}
                      <span className="capitalize">{challenge.type}</span> •{" "}
                      {challenge.deadline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t bg-muted/50 p-3">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {challenge.points}
                      </span>{" "}
                      points • Completed by {challenge.completedBy} users
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleStartChallenge(challenge)}
                      className="transition-all duration-300 group-hover:bg-primary"
                    >
                      Start
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Quiz Modal */}
        <Dialog open={isQuizModalOpen} onOpenChange={setIsQuizModalOpen}>
          <DialogContent className="max-w-2xl">
            {selectedChallenge && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedChallenge.title}</DialogTitle>
                  <DialogDescription>
                    {quizCompleted 
                      ? "Quiz completed! See your results below."
                      : `Question ${currentQuestionIndex + 1} of ${selectedChallenge.questions?.length || 0}`
                    }
                  </DialogDescription>
                </DialogHeader>

                {!quizCompleted && selectedChallenge.questions && (
                  <div className="py-4">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">
                        {selectedChallenge.questions[currentQuestionIndex].text}
                      </h3>
                      <div className="space-y-2">
                        {selectedChallenge.questions[currentQuestionIndex].options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedAnswers[currentQuestionIndex] === idx
                                ? "border-primary bg-primary/10"
                                : "border-input hover:border-primary/50"
                            }`}
                            onClick={() => handleOptionSelect(currentQuestionIndex, idx)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      >
                        {currentQuestionIndex === selectedChallenge.questions.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}

                {quizCompleted && (
                  <div className="py-4">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Trophy className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                      <p className="mb-6">You earned {score} out of {selectedChallenge.points} possible points</p>
                      
                      {selectedChallenge.questions && (
                        <div className="border rounded-lg overflow-hidden divide-y">
                          {selectedChallenge.questions.map((question, idx) => (
                            <div key={idx} className="p-3 flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{question.text}</p>
                                <p className="text-sm text-muted-foreground">
                                  Your answer: {question.options[selectedAnswers[idx]]}
                                </p>
                              </div>
                              <div className="pl-3">
                                {selectedAnswers[idx] === question.correctAnswer ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <div className="text-red-500 text-xs font-medium">
                                    Correct: {question.options[question.correctAnswer]}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <DialogFooter className="mt-6">
                      <Button onClick={closeQuiz}>Close</Button>
                    </DialogFooter>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Challenges;
