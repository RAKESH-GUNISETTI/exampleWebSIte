
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User, Code, MessageCircle, Trophy, BarChart3, HelpCircle, ArrowLeft } from "lucide-react";
import AuthModal from "./AuthModal";
import ContactDialog from "./ContactDialog";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">("login");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: "Code Analyzer", path: "/code-analyzer", icon: <Code className="h-4 w-4 mr-2" /> },
    { name: "AI Assistant", path: "/chatbot", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
    { name: "Challenges", path: "/challenges", icon: <Trophy className="h-4 w-4 mr-2" /> },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4 mr-2" /> },
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
    setAuthModalType(type);
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const canGoBack = location.pathname !== "/";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
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
                onClick={() => setIsContactDialogOpen(true)}
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
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm rounded-full transition-all hover:bg-accent"
                  >
                    Log Out
                  </button>
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

            <nav className="flex flex-col space-y-4 mt-8">
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
                onClick={() => {
                  setIsContactDialogOpen(true);
                  closeMenu();
                }}
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
                  className="w-full py-2.5 text-center rounded-lg border border-input hover:bg-accent/80 transition-colors"
                >
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
