import React, { useState } from "react";
import { BookOpen, FlaskConical, Monitor, Dumbbell, Library, Music, Microscope, Globe } from "lucide-react";
import { cn } from "../lib/utils";

const subjects = [
  { name: "Mathematics", description: "Advanced calculus, statistics, and applied mathematics" },
  { name: "Physics", description: "Quantum mechanics, astrophysics, and experimental labs" },
  { name: "Chemistry", description: "Organic, inorganic, and analytical chemistry" },
  { name: "Biology", description: "Molecular biology, genetics, and ecology" },
  { name: "Computer Science", description: "AI, Machine Learning, Python, Java, and Web Dev" },
  { name: "English", description: "Literature, creative writing, and communication" },
  { name: "Hindi", description: "Sahitya, vyakaran, and creative expression" },
  { name: "Social Science", description: "History, Geography, Political Science, Economics" },
];

const facilities = [
  { icon: FlaskConical, name: "Science Labs", description: "Physics, Chemistry & Bio labs with latest equipment", color: "text-primary" },
  { icon: Monitor, name: "Computer Lab", description: "200+ high-end systems with AI/ML software", color: "text-neon-purple" },
  { icon: Library, name: "Digital Library", description: "50,000+ books and e-resources for research", color: "text-neon-cyan" },
  { icon: Dumbbell, name: "Sports Complex", description: "Olympic-size pool, gym, cricket, football grounds", color: "text-neon-pink" },
  { icon: Music, name: "Auditorium", description: "1000-seat auditorium with Dolby sound system", color: "text-primary" },
  { icon: Microscope, name: "Research Center", description: "Dedicated R&D wing for student innovation projects", color: "text-neon-purple" },
  { icon: Globe, name: "Language Lab", description: "Multi-language learning with AI-powered tools", color: "text-neon-cyan" },
  { icon: BookOpen, name: "Smart Classrooms", description: "Interactive boards, projectors, and IoT integration", color: "text-neon-pink" },
];

const Academics: React.FC = () => {
  const [hoveredFacility, setHoveredFacility] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            Academics & <span className="gradient-text">Facilities</span>
          </h1>
          <p className="section-subtitle mx-auto">
            World-class curriculum and state-of-the-art facilities designed for the innovators of tomorrow.
          </p>
        </div>
      </section>

      {/* Curriculum */}
      <section className="page-section">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Our <span className="gradient-text">Curriculum</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject, i) => (
              <div key={i} className="glass-card p-5 rounded-xl hover-neon-card border group">
                <h3 className="font-heading text-sm font-semibold mb-2 group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-muted-foreground">{subject.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Our <span className="gradient-text">Facilities</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, i) => (
              <div
                key={i}
                className={cn(
                  "glass-card p-6 rounded-xl border transition-all duration-500 cursor-pointer",
                  hoveredFacility === i ? "neon-glow scale-[1.03]" : "hover-neon-card"
                )}
                onMouseEnter={() => setHoveredFacility(i)}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <facility.icon className={cn("h-6 w-6", facility.color)} />
                </div>
                <h3 className="font-heading text-sm font-semibold mb-2">{facility.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
