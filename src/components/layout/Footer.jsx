import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card.jsx';
import { Separator } from '../ui/separator.jsx';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import { GraduationCap, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-card text-card-foreground mt-auto transition-colors duration-300 border-t border-border">
      {/* Newsletter */}
      <div className="bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-semibold">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter for latest updates.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-64"
                required
              />
              <Button type="submit" size="default" className="rounded-full">
                <Send className="h-4 w-4 mr-1" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-base font-bold font-heading block leading-tight">Public Inter College</span>
                  <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Academy</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nurturing minds, building futures. Providing quality education since 1947.
              </p>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {['About', 'Academics', 'Admissions', 'Faculty'].map((link) => (
                  <li key={link}>
                    <NavLink
                      to={`/${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <h3 className="font-heading font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                {['Events', 'Gallery', 'Contact'].map((link) => (
                  <li key={link}>
                    <NavLink
                      to={`/${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>Sadholi kadeem, Saharanpur, Uttar Pradesh, Pin:247121</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>+91 9411081074</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>1045.sre@gmail.com</span>
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover:scale-110">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)' }}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover:scale-110">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors hover:scale-110">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)' }}>
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className=" mb-3 mt-3" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Public Inter College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
