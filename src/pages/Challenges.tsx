
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { 
  Trophy, CheckCircle, Code, Database, Cpu, ChevronRight, Clock, 
  BarChart, PieChart, Calendar, Star, TrendingUp, Award, Gift
} from "lucide-react";
import { toast } from "sonner";

// Mock data for challenges
const mockChallenges = [
  {
    id: 1,
    title: "Reverse a String",
    category: "Algorithms",
    difficulty: "Easy",
    points: 10,
    completedBy: 78,
    description: "Write a function that reverses a string without using built-in reverse functions.",
    deadline: "2023-12-25",
    type: "daily",
  },
  {
    id: 2,
    title: "Implement a Stack",
    category: "Data Structures",
    difficulty: "Medium",
    points: 20,
    completedBy: 45,
    description: "Create a stack data structure with push, pop, peek, and isEmpty operations.",
    deadline: "2023-12-26",
    type: "challenge",
  },
  {
    id: 3,
    title: "Two Sum Problem",
    category: "Algorithms",
    difficulty: "Easy",
    points: 15,
    completedBy: 92,
    description: "Find two numbers in an array that add up to a specific target.",
    deadline: "2023-12-27",
    type: "quiz",
  },
  {
    id: 4,
    title: "Build a REST API",
    category: "Web Development",
    difficulty: "Hard",
    points: 35,
    completedBy: 23,
    description: "Create a RESTful API with CRUD operations for a simple resource.",
    deadline: "2024-01-05",
    type: "challenge",
  },
  {
    id: 5,
    title: "Merge Sort Algorithm",
    category: "Algorithms",
    difficulty: "Medium",
    points: 25,
    completedBy: 37,
    description: "Implement the merge sort algorithm from scratch.",
    deadline: "2023-12-28",
    type: "daily",
  },
];

// Mock quiz questions
const mockQuizQuestions = [
  {
    id: 1,
    question: "Which data structure operates on a LIFO principle?",
    options: ["Queue", "Stack", "Linked List", "Array"],
    correctAnswer: "Stack",
  },
  {
    id: 2,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    correctAnswer: "O(log n)",
  },
  {
    id: 3,
    question: "Which of these is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Number"],
    correctAnswer: "Float",
  },
];

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  completedBy: number;
  description: string;
  deadline: string;
  type: "daily" | "quiz" | "challenge";
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "challenges" | "quizzes">("daily");
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  });
  const [userPoints, setUserPoints] = useState<number>(0);

  // Fetch user data from localStorage if available
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserPoints(user.coins || 0);
    }
  }, []);

  // Filter challenges based on active tab
  const filteredChallenges = challenges.filter((challenge) => {
    if (activeTab === "daily") return challenge.type === "daily";
    if (activeTab === "challenges") return challenge.type === "challenge";
    return challenge.type === "quiz";
  });

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    if (challenge.type === "quiz") {
      setQuizActive(false);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setQuizResults({ correct: 0, total: 0 });
    }
  };

  const handleStartQuiz = () => {
    if (selectedChallenge?.type === "quiz") {
      setQuizActive(true);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Check if answer is correct
      const isCorrect = selectedAnswer === mockQuizQuestions[currentQuizIndex].correctAnswer;
      
      // Update results
      setQuizResults((prev) => ({
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        total: prev.total + 1,
      }));
      
      // Show toast for answer feedback
      if (isCorrect) {
        toast.success("Correct answer!");
      } else {
        toast.error(`Incorrect. The correct answer is: ${mockQuizQuestions[currentQuizIndex].correctAnswer}`);
      }
      
      // Move to next question or end quiz
      if (currentQuizIndex < mockQuizQuestions.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed
        setQuizActive(false);
        
        // Award points based on performance
        const earnedPoints = Math.round((quizResults.correct / mockQuizQuestions.length) * selectedChallenge!.points);
        
        // Update user points
        setUserPoints((prev) => prev + earnedPoints);
        
        // Save to localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          user.coins = (user.coins || 0) + earnedPoints;
          localStorage.setItem("user", JSON.stringify(user));
        }
        
        toast.success(`Quiz completed! You earned ${earnedPoints} points.`);
        
        // Mark challenge as completed
        setChallenges((prev) =>
          prev.map((c) => (c.id === selectedChallenge?.id ? { ...c, completed: true } : c))
        );
      }
    } else {
      toast.warning("Please select an answer");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500 bg-green-500/10";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "hard":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-blue-500 bg-blue-500/10";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "algorithms":
        return <Code className="h-4 w-4" />;
      case "data structures":
        return <Database className="h-4 w-4" />;
      case "web development":
        return <Cpu className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Technical Challenges</h1>
              <p className="text-foreground/70">
                Complete challenges, quizzes, and daily tasks to earn points and improve your skills
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 glass-card p-3 rounded-full flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{userPoints} Points</span>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BarChart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Completed Challenges</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Success Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Current Streak</p>
                <p className="text-2xl font-bold">5 days</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left panel (challenge list) */}
            <div className="lg:w-1/3">
              <div className="glass-card rounded-xl overflow-hidden">
                {/* Tab navigation */}
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setActiveTab("daily")}
                    className={cn(
                      "flex-1 py-3 font-medium text-sm transition-colors",
                      activeTab === "daily" ? "border-b-2 border-primary text-primary" : ""
                    )}
                  >
                    Daily Tasks
                  </button>
                  <button
                    onClick={() => setActiveTab("challenges")}
                    className={cn(
                      "flex-1 py-3 font-medium text-sm transition-colors",
                      activeTab === "challenges" ? "border-b-2 border-primary text-primary" : ""
                    )}
                  >
                    Challenges
                  </button>
                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className={cn(
                      "flex-1 py-3 font-medium text-sm transition-colors",
                      activeTab === "quizzes" ? "border-b-2 border-primary text-primary" : ""
                    )}
                  >
                    Quizzes
                  </button>
                </div>
                
                {/* Challenge list */}
                <div className="max-h-[800px] overflow-y-auto">
                  {filteredChallenges.length === 0 ? (
                    <div className="p-6 text-center text-foreground/60">
                      No {activeTab} available at the moment
                    </div>
                  ) : (
                    filteredChallenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        onClick={() => handleSelectChallenge(challenge)}
                        className={cn(
                          "p-4 border-b border-border last:border-0 cursor-pointer transition-colors",
                          "hover:bg-accent/50",
                          selectedChallenge?.id === challenge.id ? "bg-accent/50" : ""
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              getDifficultyColor(challenge.difficulty)
                            )}
                          >
                            {challenge.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-xs text-foreground/70 mb-2 gap-4">
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(challenge.category)}
                            {challenge.category}
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {challenge.points} pts
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-foreground/70">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {challenge.completedBy} completed
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due {new Date(challenge.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Right panel (challenge details) */}
            <div className="lg:w-2/3">
              {selectedChallenge ? (
                <div className="glass-card rounded-xl overflow-hidden h-full">
                  <div className="bg-accent/50 p-4 border-b border-border">
                    <h2 className="font-medium">{selectedChallenge.title}</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span
                        className={cn(
                          "text-xs px-3 py-1 rounded-full",
                          getDifficultyColor(selectedChallenge.difficulty)
                        )}
                      >
                        {selectedChallenge.difficulty}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {selectedChallenge.category}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-accent flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {selectedChallenge.points} points
                      </span>
                    </div>
                    
                    <h3 className="font-medium mb-3">Description</h3>
                    <p className="text-foreground/70 mb-6">{selectedChallenge.description}</p>
                    
                    {selectedChallenge.type === "quiz" ? (
                      quizActive ? (
                        <div className="glass-card rounded-xl p-6 animate-fade-in">
                          <div className="mb-4">
                            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                              Question {currentQuizIndex + 1} of {mockQuizQuestions.length}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium mb-6">
                            {mockQuizQuestions[currentQuizIndex].question}
                          </h3>
                          
                          <div className="space-y-4 mb-8">
                            {mockQuizQuestions[currentQuizIndex].options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleAnswerSelect(option)}
                                className={cn(
                                  "w-full text-left p-4 rounded-lg border transition-all",
                                  selectedAnswer === option
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          
                          <button
                            onClick={handleNextQuestion}
                            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            {currentQuizIndex < mockQuizQuestions.length - 1
                              ? "Next Question"
                              : "Complete Quiz"}
                          </button>
                        </div>
                      ) : quizResults.total > 0 ? (
                        <div className="glass-card rounded-xl p-6 text-center">
                          <div className="h-24 w-24 mx-auto mb-4">
                            <PieChart className="h-full w-full text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                          <p className="text-foreground/70 mb-4">
                            You got {quizResults.correct} out of {mockQuizQuestions.length} questions correct.
                          </p>
                          <div className="flex justify-center gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary">
                                {Math.round((quizResults.correct / mockQuizQuestions.length) * 100)}%
                              </div>
                              <div className="text-sm text-foreground/70">Score</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary">
                                {Math.round((quizResults.correct / mockQuizQuestions.length) * selectedChallenge.points)}
                              </div>
                              <div className="text-sm text-foreground/70">Points Earned</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSelectChallenge(selectedChallenge)}
                            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Gift className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">Complete this quiz to earn points</p>
                              <p className="text-sm text-foreground/70">
                                {mockQuizQuestions.length} questions • Time limit: 10 minutes
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={handleStartQuiz}
                            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Start Quiz
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="glass-card rounded-xl p-6">
                        <h3 className="font-medium mb-3">Challenge Requirements</h3>
                        <ul className="list-disc list-inside text-foreground/70 space-y-2 mb-6">
                          <li>Complete the task described in the description</li>
                          <li>Submit your solution before the deadline</li>
                          <li>Pass all test cases to earn full points</li>
                        </ul>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex-1"
                          >
                            Start Challenge
                          </button>
                          <button
                            className="px-6 py-2 rounded-full border border-input hover:bg-accent/80 transition-colors flex-1"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 rounded-xl border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Deadline Information</h3>
                      </div>
                      <p className="text-sm text-foreground/70">
                        Complete by: {new Date(selectedChallenge.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-xl p-8 h-full flex flex-col items-center justify-center text-center">
                  <Trophy className="h-16 w-16 text-primary/50 mb-4" />
                  <h2 className="text-xl font-medium mb-2">Select a Challenge</h2>
                  <p className="text-foreground/70 max-w-md">
                    Choose a challenge from the list to view details, start quizzes, or begin coding tasks.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Awards and Achievements */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Achievements</h2>
              <button className="text-sm text-primary hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "First Quiz", icon: <Award className="h-6 w-6" />, unlocked: true },
                  { name: "Algorithm Expert", icon: <Code className="h-6 w-6" />, unlocked: false },
                  { name: "5-Day Streak", icon: <Calendar className="h-6 w-6" />, unlocked: true },
                  { name: "Code Master", icon: <Trophy className="h-6 w-6" />, unlocked: false },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-lg p-4 text-center",
                      achievement.unlocked
                        ? "glass-card"
                        : "border border-dashed border-border opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "h-12 w-12 rounded-full mx-auto mb-3 flex items-center justify-center",
                        achievement.unlocked ? "bg-primary/10 text-primary" : "bg-accent/50 text-foreground/50"
                      )}
                    >
                      {achievement.icon}
                    </div>
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-foreground/60">
                      {achievement.unlocked ? "Unlocked" : "Locked"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Challenges;
