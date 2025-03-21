
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import ChatBot from "./pages/ChatBot";
import CodeAnalyzer from "./pages/CodeAnalyzer";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// This component ensures that each page scrolls to the top when navigated to
const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ScrollToTop><Index /></ScrollToTop>} />
              <Route path="/chatbot" element={<ScrollToTop><ChatBot /></ScrollToTop>} />
              <Route path="/code-analyzer" element={<ScrollToTop><CodeAnalyzer /></ScrollToTop>} />
              <Route path="/challenges" element={<ScrollToTop><Challenges /></ScrollToTop>} />
              <Route path="/profile" element={<ScrollToTop><Profile /></ScrollToTop>} />
              <Route path="*" element={<ScrollToTop><NotFound /></ScrollToTop>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
