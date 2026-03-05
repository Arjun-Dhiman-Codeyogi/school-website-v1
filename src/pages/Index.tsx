import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, Trophy, Calendar, Star, Zap, Target, Sparkles } from "lucide-react";
import HeroScene from "../components/three/HeroScene";

const stats = [
  { icon: Users, label: "Students", value: 2500, suffix: "+" },
  { icon: BookOpen, label: "Teachers", value: 150, suffix: "+" },
  { icon: Trophy, label: "Awards", value: 85, suffix: "+" },
  { icon: Calendar, label: "Years", value: 30, suffix: "" },
];

const features = [
  {
    icon: Star,
    title: "World-Class Faculty",
    description: "Expert educators with decades of experience shaping young minds for tomorrow.",
  },
  {
    icon: Zap,
    title: "Smart Classrooms",
    description: "AI-powered learning environments with cutting-edge technology integration.",
  },
  {
    icon: Target,
    title: "100% Placement",
    description: "Unmatched track record of university placements and career guidance.",
  },
  {
    icon: Sparkles,
    title: "Innovation Labs",
    description: "State-of-the-art robotics, AI, and science labs for hands-on learning.",
  },
];

const news = [
  { title: "Nova Academy Wins National Science Olympiad 2026", date: "Feb 10, 2026", category: "Achievement" },
  { title: "New AI & Robotics Lab Inaugurated", date: "Feb 5, 2026", category: "Campus" },
  { title: "Annual Sports Day - Register Now!", date: "Feb 1, 2026", category: "Event" },
];

const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading text-3xl md:text-4xl font-bold gradient-text">
      {count}{suffix}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-background/20 to-background" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-accent tracking-widest uppercase text-primary mb-6">
            <Sparkles className="h-3 w-3" />
            Admissions Open 2026-27
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Welcome to{" "}
            <span className="gradient-text neon-text">Nova Academy</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 font-body">
            Where innovation meets education. Preparing tomorrow's leaders with futuristic learning, world-class facilities, and limitless opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)] transition-all duration-300"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass-card hover-neon-card font-heading text-sm font-semibold tracking-wider uppercase border"
            >
              Explore More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center">
            <div className="w-1 h-3 rounded-full bg-primary mt-2 animate-float" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="page-section relative -mt-20 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-xl text-center hover-neon-card border"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-1 font-accent tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="page-section">
        <div className="container mx-auto text-center">
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Nova Academy?</span>
          </h2>
          <p className="section-subtitle mb-12">
            Discover what makes us the top choice for future-ready education.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-xl text-left hover-neon-card group border cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="section-title">
            Latest <span className="gradient-text">News</span>
          </h2>
          <p className="section-subtitle mb-12">Stay updated with what's happening at Nova Academy.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-xl text-left hover-neon-card group border"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-accent tracking-wider uppercase bg-primary/10 text-primary mb-3">
                  {item.category}
                </span>
                <h3 className="font-heading text-sm font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="container mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center neon-glow border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <h2 className="section-title mb-4">
                Ready to <span className="gradient-text">Join Us?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Take the first step towards a future-ready education. Admissions for 2026-27 are now open.
              </p>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)] transition-all duration-300"
              >
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
