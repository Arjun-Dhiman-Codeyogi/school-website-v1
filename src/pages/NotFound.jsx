import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Floating404 from '../components/three/Floating404';
import { Button } from '../components/ui/button';
import gsap from 'gsap';

const NotFound = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const el = titleRef.current;
    if (!el) return;

    const finalText = '404';
    let iteration = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      el.textContent = finalText
        .split('')
        .map((char, i) => {
          if (iteration / 3 > i) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      iteration++;
      if (iteration > maxIterations) clearInterval(interval);
    }, 60);

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <Floating404 />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="font-heading text-8xl sm:text-9xl font-bold gradient-text mb-4"
        >
          404
        </h1>
        <div ref={subtitleRef} style={{ opacity: 0 }}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved to a new location.
          </p>
        </div>
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <Button size="lg" asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
