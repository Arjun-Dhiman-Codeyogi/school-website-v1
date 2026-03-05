import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <div className="relative mb-8">
        <GraduationCap className="h-16 w-16 text-primary animate-pulse-neon" />
        <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse-neon" />
      </div>
      <h1 className="font-heading text-2xl font-bold tracking-[0.3em] mb-6 gradient-text">
        NOVA ACADEMY
      </h1>
      <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-purple)))",
          }}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground font-accent tracking-widest uppercase">
        Loading the future...
      </p>
    </div>
  );
};

export default Preloader;
