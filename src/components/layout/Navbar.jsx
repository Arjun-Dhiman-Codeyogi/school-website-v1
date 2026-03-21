import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/useTheme';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Toggle } from '../ui/toggle';
import { Button } from '../ui/button';
import { Menu, Moon, Sun, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '../../lib/utils';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Programs' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/events', label: 'Campus Life' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  // Close sheet on route change
  useEffect(() => {
    const timer = setTimeout(() => setSheetOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-md border-b border-border'
          : 'bg-background/80 backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm md:text-base font-bold tracking-wide font-heading uppercase">Public Inter College</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase hidden sm:block">Academy</span>
            </div>
          </Link>

          {/* Desktop Nav - centered links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative px-3 py-2 text-sm font-medium rounded-md transition-colors after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-primary after:transition-all after:duration-300',
                    isActive
                      ? 'text-primary after:w-3/4'
                      : 'text-foreground/80 hover:text-primary after:w-0 hover:after:w-3/4'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side - Theme toggle + Admissions CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Toggle
              className="cursor-pointer hover:bg-muted"
              pressed={theme === 'dark'}
              onPressedChange={toggleTheme}
              size="sm"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Toggle>
            <Button asChild size="sm" className="rounded-full px-5 font-semibold">
              <Link to="/admissions">Admissions</Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-1">
            <Toggle
              className="cursor-pointer hover:bg-muted"
              pressed={theme === 'dark'}
              onPressedChange={toggleTheme}
              size="sm"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Toggle>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2 cursor-pointer rounded-md hover:bg-muted transition-colors" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Public Inter College
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                          isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Separator className="my-3" />
                  <Button asChild className="rounded-full font-semibold">
                    <Link to="/admissions" onClick={() => setSheetOpen(false)}>Admissions</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
