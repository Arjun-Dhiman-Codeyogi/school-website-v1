import React from "react";
import { BookOpen, Eye, Heart, Award, Users, Clock } from "lucide-react";

const timelineEvents = [
  { year: "1995", title: "Founded", description: "Nova Academy was established with a vision for futuristic education." },
  { year: "2002", title: "First STEM Lab", description: "Launched cutting-edge science and technology labs." },
  { year: "2010", title: "National Recognition", description: "Ranked among top 10 schools for academic excellence." },
  { year: "2018", title: "AI Integration", description: "Became first school in the region to introduce AI-powered learning." },
  { year: "2023", title: "Global Partnerships", description: "Partnered with 20+ international universities." },
  { year: "2026", title: "Innovation Hub", description: "Opened the state-of-the-art Innovation & Robotics Hub." },
];

const values = [
  { icon: BookOpen, title: "Mission", description: "To nurture innovative thinkers and responsible global citizens through cutting-edge education and holistic development." },
  { icon: Eye, title: "Vision", description: "To be the world's most forward-thinking educational institution, shaping leaders for a technology-driven future." },
  { icon: Heart, title: "Values", description: "Innovation, integrity, inclusivity, excellence, and a relentless pursuit of knowledge define our core principles." },
];

const achievements = [
  { icon: Award, value: "50+", label: "National Awards" },
  { icon: Users, value: "25,000+", label: "Alumni Network" },
  { icon: Clock, value: "30+", label: "Years of Excellence" },
];

const About: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            About <span className="gradient-text">Nova Academy</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Three decades of shaping the future through innovative education, technology, and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="page-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-xl hover-neon-card text-center border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 border max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <span className="font-heading text-3xl font-bold text-primary-foreground">DR</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1">Dr. Rajesh Kumar</h3>
                <p className="text-primary text-sm font-accent tracking-wider uppercase mb-4">Principal, Nova Academy</p>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  "At Nova Academy, we don't just teach subjects — we ignite curiosity, foster innovation, and build character. Our students are not just prepared for the future; they are the future. Every child who walks through our doors carries the potential to change the world, and it's our privilege to help them realize it."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-section">
        <div className="container mx-auto text-center">
          <h2 className="section-title mb-12">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />
            {timelineEvents.map((event, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary neon-glow z-10 mt-1.5" />
                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                  <span className="font-heading text-sm font-bold text-primary">{event.year}</span>
                  <h4 className="font-heading text-base font-semibold mt-1">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="section-title mb-12">
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {achievements.map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-xl hover-neon-card text-center border">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold gradient-text mb-1">{item.value}</div>
                <p className="text-sm text-muted-foreground font-accent tracking-wider uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
