
import React, { useState, useEffect } from "react";
import { X, Github, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  type?: "login" | "signup";
  setType?: (type: "login" | "signup") => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  type = "login",
  setType,
  open,
  onOpenChange,
  defaultTab,
}) => {
  const isModalOpen = open !== undefined ? open : isOpen;
  const handleClose = onOpenChange ? () => onOpenChange(false) : onClose;
  const activeType = defaultTab || type;
  const changeType = setType || (() => {});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profession: "student",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);

  const { login, signup, loginWithGoogle, loginWithGithub } = useAuth();

  useEffect(() => {
    const handleOpenAuthModal = (e: CustomEvent) => {
      if (defaultTab || setType) {
        const newType = e.detail.type || "login";
        setType?.(newType);
      }
      if (!isModalOpen) {
        onOpenChange?.(true);
        onClose?.();
      }
    };

    window.addEventListener("open-auth-modal" as any, handleOpenAuthModal as EventListener);

    return () => {
      window.removeEventListener("open-auth-modal" as any, handleOpenAuthModal as EventListener);
    };
  }, [isModalOpen, handleClose, defaultTab, setType, onOpenChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }
    
    if (password.length < 6) {
      setPasswordStrength("weak");
      return;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    
    if (strength < 2) {
      setPasswordStrength("weak");
    } else if (strength < 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (activeType === "signup") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let success;

      if (activeType === "signup") {
        success = await signup(formData);
      } else {
        success = await login(formData.email, formData.password);
      }

      if (success) {
        handleClose?.();
      }
    } catch (error) {
      toast.error("Authentication error", { 
        description: "Please check your credentials and try again" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithGithub();
      }
      // Modal will be closed by auth state change
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`${provider} login failed`, {
        description: "Please try again or use another method"
      });
    }
  };

  const getPasswordStrengthClass = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div
        className={cn(
          "bg-card rounded-xl shadow-xl w-full max-w-md mx-auto overflow-hidden animate-slide-in",
          "border border-border"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-semibold">
            {activeType === "login" ? "Log In" : "Sign Up"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-accent/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <Github className="h-4 w-4 group-hover:text-primary transition-colors" />
              <span>GitHub</span>
            </button>
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
              <span>Google</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeType === "signup" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={cn(
                        "w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        errors.firstName ? "border-destructive" : "border-input"
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={cn(
                        "w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        errors.lastName ? "border-destructive" : "border-input"
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="profession" className="text-sm font-medium">
                    Profession
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "border-input"
                    )}
                  >
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.email ? "border-destructive" : "border-input"
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                {activeType === "login" && (
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.password ? "border-destructive" : "border-input"
                )}
              />
              {activeType === "signup" && formData.password && (
                <div className="w-full mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPasswordStrengthClass()} transition-all duration-300`} 
                    style={{ width: passwordStrength === "weak" ? "33%" : passwordStrength === "medium" ? "66%" : "100%" }}
                  ></div>
                </div>
              )}
              {errors.password && (
                <p className="text-xs text-destructive flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
                </p>
              )}
              {activeType === "signup" && passwordStrength && !errors.password && (
                <p className={`text-xs flex items-center ${
                  passwordStrength === "weak" ? "text-red-500" : 
                  passwordStrength === "medium" ? "text-yellow-500" : 
                  "text-green-500"
                }`}>
                  {passwordStrength === "weak" && <AlertCircle className="h-3 w-3 mr-1" />}
                  {passwordStrength === "medium" && <AlertCircle className="h-3 w-3 mr-1" />}
                  {passwordStrength === "strong" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {passwordStrength === "weak" ? "Weak password" : 
                   passwordStrength === "medium" ? "Medium strength" : 
                   "Strong password"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-lg transition-colors hover:bg-primary/90 disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                activeType === "login" ? "Log In" : "Create Account"
              )}
            </button>

            <div className="text-center text-sm">
              {activeType === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => changeType("signup")}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => changeType("login")}
                    className="text-primary hover:underline"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
