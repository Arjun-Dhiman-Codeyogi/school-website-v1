import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, GraduationCap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Academics", path: "/academics" },
  { name: "Faculty", path: "/faculty" },
  { name: "Admissions", path: "/admissions" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-card border-b shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <GraduationCap className="h-8 w-8 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-cyan)/0.6)]" />
          </div>
          <span className="font-heading text-xl font-bold tracking-wider">
            <span className="gradient-text">NOVA</span>
            <span className="text-foreground"> Academy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative",
                location.pathname === link.path
                  ? "text-primary neon-text"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Theme toggle + mobile menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-card hover-neon-card"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-neon-cyan" />
            ) : (
              <Moon className="h-5 w-5 text-neon-purple" />
            )}
          </button>

          <button
            className="lg:hidden p-2 rounded-lg glass-card"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[60px] transition-all duration-500 ease-out",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="glass-card mx-4 mt-2 rounded-xl p-4 border">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300",
                location.pathname === link.path
                  ? "text-primary bg-primary/10 neon-text"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
