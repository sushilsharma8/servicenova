import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/auth"; // Update path to match actual location

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            F&B Connect
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a 
              href="#faq" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white"
                  onClick={() => navigate("/notifications")}
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00]/10"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                  onClick={() => navigate("/auth?mode=signup")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                How it works
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                FAQ
              </a>
              {user ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00]/10"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-white"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-white"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                    onClick={() => navigate("/auth?mode=signup")}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 