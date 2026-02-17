import React, { useState, useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import { Progress } from "../ui/progress";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (logoRef.current && titleRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                  setVisible(false);
                  onComplete?.();
                },
              });
            } else {
              setVisible(false);
              onComplete?.();
            }
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div ref={logoRef} className="relative mb-8">
        <GraduationCap className="h-16 w-16 text-primary animate-pulse-neon" />
        <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse-neon" />
      </div>
      <h1
        ref={titleRef}
        className="font-heading text-2xl text-center font-bold tracking-[0.3em] mb-6 gradient-text"
      >
        PUBLIC INTER COLLEGE
      </h1>
      <div className="w-48">
        <Progress value={progress} className="h-1" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground font-accent tracking-widest uppercase">
        Loading the future...
      </p>
    </div>
  );
};

export default Preloader;
