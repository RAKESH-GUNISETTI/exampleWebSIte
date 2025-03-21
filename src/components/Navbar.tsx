
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { 
  Menu, X, User, Code, MessageCircle, Trophy, BarChart3, 
  HelpCircle, ArrowLeft, LogOut, Settings, CreditCard,
  CheckCircle, BookOpen, Award, Star
} from "lucide-react";
import AuthModal from "./AuthModal";
import ContactDialog from "./ContactDialog";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onContactClick?: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onLoginClick,
  onSignupClick,
  onContactClick,
  className
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">("login");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const { isLoggedIn, logout, userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: "Code Analyzer", path: "/code-analyzer", icon: <Code className="h-4 w-4 mr-2" /> },
    { name: "AI Assistant", path: "/chatbot", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
    { name: "Challenges", path: "/challenges", icon: <Trophy className="h-4 w-4 mr-2" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openAuthModal = (type: "login" | "signup") => {
    if (onLoginClick && type === "login") {
      onLoginClick();
    } else if (onSignupClick && type === "signup") {
      onSignupClick();
    } else {
      setAuthModalType(type);
      setIsAuthModalOpen(true);
    }
    closeMenu();
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactDialogOpen(true);
    }
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const goToProfile = () => {
    navigate("/profile");
    closeMenu();
  };

  const canGoBack = location.pathname !== "/";

  const goBack = () => {
    navigate(-1);
  };

  const getProfileInitials = () => {
    if (!userData) return "U";
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
  };

  return (
    <>
      <header
        className={cn(
          "transition-all duration-300 py-4 px-6",
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent",
          className
        )}
      >
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              {canGoBack && (
                <button
                  onClick={goBack}
                  className="mr-3 p-2 rounded-full hover:bg-accent/80 transition-all duration-200"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <Link
                to="/"
                className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                <span className="text-primary">Skill</span>
                <span>Nest</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all duration-200",
                    "hover:bg-accent/80",
                    location.pathname === item.path
                      ? "text-primary font-medium"
                      : "text-foreground/80"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleContactClick}
                className="px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-accent/80 text-foreground/80 flex items-center"
              >
                <HelpCircle className="h-4 w-4 mr-2" /> Contact
              </button>
            </div>

            {/* Auth and Theme Toggle */}
            <div className="flex items-center space-x-2">
              {!isLoggedIn ? (
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="px-4 py-2 text-sm rounded-full transition-all hover:bg-accent"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-full transition-all hover:bg-primary/90 shadow-sm hover:shadow-md"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-accent/80 transition-colors">
                        <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                          <AvatarImage src="" alt={userData?.firstName} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getProfileInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium hidden lg:inline-block">
                          {userData?.firstName}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col gap-y-1">
                          <p className="font-bold text-base">{userData?.firstName} {userData?.lastName}</p>
                          <p className="text-xs text-muted-foreground">{userData?.email}</p>
                          <span className="text-xs text-primary">{userData?.profession}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {/* Progress Stats */}
                      <div className="px-2 py-2">
                        <div className="flex justify-between mb-1 items-center">
                          <span className="text-xs flex items-center gap-1">
                            <CreditCard className="h-3 w-3 text-primary" /> Coins Earned
                          </span>
                          <span className="text-xs font-medium">{userData?.coins || 0}</span>
                        </div>
                        
                        <div className="space-y-3 mt-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="flex items-center gap-1">
                                <Code className="h-3 w-3 text-blue-500" /> Coding
                              </span>
                              <span>{userData?.progress?.coding || 0}%</span>
                            </div>
                            <Progress value={userData?.progress?.coding || 0} className="h-1.5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3 text-yellow-500" /> Algorithms
                              </span>
                              <span>{userData?.progress?.algorithms || 0}%</span>
                            </div>
                            <Progress value={userData?.progress?.algorithms || 0} className="h-1.5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="flex items-center gap-1">
                                <Settings className="h-3 w-3 text-green-500" /> Frameworks
                              </span>
                              <span>{userData?.progress?.frameworks || 0}%</span>
                            </div>
                            <Progress value={userData?.progress?.frameworks || 0} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={goToProfile} className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/challenges")} className="cursor-pointer">
                        <Trophy className="h-4 w-4 mr-2" />
                        <span>My Challenges</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-full hover:bg-accent/80 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 right-0 w-full max-w-xs bg-card p-6 shadow-lg transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-accent/80 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isLoggedIn && (
              <div className="mb-6 mt-2">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" alt={userData?.firstName} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getProfileInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{userData?.firstName} {userData?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{userData?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-primary" /> Coins Earned
                    </span>
                    <span className="font-medium">{userData?.coins || 0}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Coding Skills</span>
                      <span>{userData?.progress?.coding || 0}%</span>
                    </div>
                    <Progress value={userData?.progress?.coding || 0} className="h-1.5" />
                  </div>
                </div>
              </div>
            )}

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMenu}
                  className={cn(
                    "px-4 py-3 rounded-lg flex items-center transition-all duration-200",
                    "hover:bg-accent/80",
                    location.pathname === item.path
                      ? "bg-accent text-primary font-medium"
                      : "text-foreground/80"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleContactClick}
                className="px-4 py-3 rounded-lg flex items-center transition-all duration-200 hover:bg-accent/80 text-foreground/80"
              >
                <HelpCircle className="h-4 w-4 mr-2" /> Contact
              </button>
            </nav>

            <div className="mt-auto pt-6 border-t border-border">
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="w-full py-2.5 text-center rounded-lg border border-input hover:bg-accent/80 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="w-full py-2.5 text-center font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-center rounded-lg border border-input hover:bg-accent/80 transition-colors text-red-500 flex items-center justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        type={authModalType}
        setType={setAuthModalType}
      />

      {/* Contact Dialog */}
      <ContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
    </>
  );
};

export default Navbar;
