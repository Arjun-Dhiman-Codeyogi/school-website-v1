import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t bg-card/50 backdrop-blur-sm">
      {/* Gradient line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="font-heading text-lg font-bold tracking-wider">
                <span className="gradient-text">NOVA</span> Academy
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Shaping the future through innovation, technology, and excellence in education since 1995.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg glass-card hover-neon-card text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-primary">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["About", "Academics", "Admissions", "Events", "Gallery", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-primary">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>123 Innovation Street, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@novaacademy.edu</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-primary">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Stay updated with our latest news and events.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg text-sm bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors"
              />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Nova Academy. All rights reserved. Built with ❤️ for the future.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg glass-card hover-neon-card text-muted-foreground hover:text-primary"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
