import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { Toggle } from '../ui/toggle';
import { Menu, Moon, Sun, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '../../lib/utils';

const navGroups = [
  {
    label: 'About',
    items: [
      { to: '/about', label: 'About Us', desc: 'Our mission, vision and history' },
      { to: '/faculty', label: 'Faculty', desc: 'Meet our expert educators' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { to: '/academics', label: 'Programs', desc: 'Curriculum and academic offerings' },
      { to: '/admissions', label: 'Admissions', desc: 'Apply for 2026-27 session' },
    ],
  },
  {
    label: 'Campus Life',
    items: [
      { to: '/events', label: 'Events', desc: 'School events and activities' },
      { to: '/gallery', label: 'Gallery', desc: 'Photo gallery and memories' },
    ],
  },
];

const allNavItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/events', label: 'Events' },
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
    const timer = setTimeout(() => {
      setSheetOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <TooltipProvider>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-lg border-b border-border'
            : 'bg-background/50 backdrop-blur-md'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-17 md:h-[82px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 bubble-hover rounded-lg px-2 py-1 -mx-2 transition-colors hover:bg-accent/50">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className=" text-sm md:text-lg font-extrabold tracking-wide font-heading">Public Inter College </span>
            </Link>

            {/* Desktop Nav - visible above 768px */}
            <div className="hidden md:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        cn(navigationMenuTriggerStyle(), 'bubble-hover', isActive && 'bg-accent/50 text-accent-foreground')
                      }
                    >
                      Home
                    </NavLink>
                  </NavigationMenuItem>

                  {navGroups.map((group) => (
                    <NavigationMenuItem key={group.label}>
                      <NavigationMenuTrigger className="text-sm">
                        {group.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[180px] gap-1 p-2">
                          {group.items.map((item) => (
                            <li key={item.to}>
                              <NavigationMenuLink asChild>
                                <NavLink
                                  to={item.to}
                                  className={({ isActive }) =>
                                    cn(
                                      'block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bubble-hover',
                                      isActive && 'bg-accent/50'
                                    )
                                  }
                                >
                                  {item.label}
                                </NavLink>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}

                  <NavigationMenuItem>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        cn(navigationMenuTriggerStyle(), 'bubble-hover', isActive && 'bg-accent/50 text-accent-foreground')
                      }
                    >
                      Contact
                    </NavLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Theme Toggle */}
              <Toggle
                pressed={theme === 'dark'}
                onPressedChange={toggleTheme}
                size="sm"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Toggle>
            </div>

            {/* Mobile hamburger - visible at 768px and below */}
            <div className="md:hidden flex items-center gap-2 ">
              <Toggle
                pressed={theme === 'dark'}
                onPressedChange={toggleTheme}
                size="sm"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Toggle>

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Open menu">
                    <Menu className="h-5 w-5 sm:mr-3" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-60">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col">
                    <NavLink
                      to="/"
                      onClick={() => setSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'px-3 py-2.5 rounded-md text-sm font-medium transition-colors bubble-hover',
                          isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
                        )
                      }
                    >
                      Home
                    </NavLink>

                    <Separator className="my-2" />
                    <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">About</p>
                    {allNavItems.filter(i => ['/about', '/faculty'].includes(i.to)).map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSheetOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'px-3 py-2.5 rounded-md text-sm font-medium transition-colors bubble-hover',
                            isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}

                    <Separator className="my-2" />
                    <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Academics</p>
                    {allNavItems.filter(i => ['/academics', '/admissions'].includes(i.to)).map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSheetOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'px-3 py-2.5 rounded-md text-sm font-medium transition-colors bubble-hover',
                            isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}

                    <Separator className="my-2" />
                    <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Campus Life</p>
                    {allNavItems.filter(i => ['/events', '/gallery'].includes(i.to)).map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSheetOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'px-3 py-2.5 rounded-md text-sm font-medium transition-colors bubble-hover',
                            isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}

                    <Separator className="my-2" />
                    <NavLink
                      to="/contact"
                      onClick={() => setSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'px-3 py-2.5 rounded-md text-sm font-medium transition-colors bubble-hover',
                          isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
                        )
                      }
                    >
                      Contact
                    </NavLink>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;
