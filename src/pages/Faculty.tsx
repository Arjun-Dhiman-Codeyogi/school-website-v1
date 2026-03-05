import React, { useState } from "react";
import { cn } from "../lib/utils";

const departments = ["All", "Science", "Mathematics", "Languages", "Humanities", "Technology"];

const teachers = [
  { name: "Dr. Ananya Sharma", subject: "Physics", dept: "Science", exp: "15 years", qual: "Ph.D. Physics, IIT Delhi" },
  { name: "Prof. Vikram Singh", subject: "Mathematics", dept: "Mathematics", exp: "20 years", qual: "M.Sc. Mathematics, DU" },
  { name: "Ms. Priya Patel", subject: "English", dept: "Languages", exp: "12 years", qual: "M.A. English Literature" },
  { name: "Dr. Rajiv Mehta", subject: "Chemistry", dept: "Science", exp: "18 years", qual: "Ph.D. Chemistry, IISC" },
  { name: "Mr. Arjun Kapoor", subject: "Computer Science", dept: "Technology", exp: "10 years", qual: "M.Tech CSE, IIT Bombay" },
  { name: "Ms. Sneha Gupta", subject: "Biology", dept: "Science", exp: "14 years", qual: "Ph.D. Microbiology" },
  { name: "Dr. Suman Verma", subject: "History", dept: "Humanities", exp: "16 years", qual: "Ph.D. History, JNU" },
  { name: "Mr. Rohit Jain", subject: "Hindi", dept: "Languages", exp: "11 years", qual: "M.A. Hindi, BHU" },
  { name: "Ms. Kavita Reddy", subject: "AI & Robotics", dept: "Technology", exp: "8 years", qual: "M.Tech AI, IIT Hyderabad" },
  { name: "Prof. Deepak Nair", subject: "Economics", dept: "Humanities", exp: "22 years", qual: "Ph.D. Economics, DSE" },
  { name: "Ms. Ritu Saxena", subject: "Geography", dept: "Humanities", exp: "13 years", qual: "M.Sc. Geography" },
  { name: "Mr. Karan Desai", subject: "Statistics", dept: "Mathematics", exp: "9 years", qual: "M.Sc. Statistics, ISI" },
];

const Faculty: React.FC = () => {
  const [activeDept, setActiveDept] = useState("All");

  const filtered = activeDept === "All" ? teachers : teachers.filter((t) => t.dept === activeDept);

  return (
    <div>
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            Our <span className="gradient-text">Faculty</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Meet the brilliant minds who inspire and guide our students every day.
          </p>
        </div>
      </section>

      <section className="page-section pt-8">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-accent tracking-wider transition-all duration-300",
                  activeDept === dept
                    ? "bg-primary text-primary-foreground neon-glow"
                    : "glass-card border hover-neon-card text-muted-foreground"
                )}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Teacher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((teacher, i) => (
              <div
                key={i}
                className="glass-card rounded-xl border hover-neon-card group overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 mx-auto border border-primary/20">
                    <span className="font-heading text-lg font-bold text-primary">
                      {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-center mb-1">{teacher.name}</h3>
                  <p className="text-primary text-xs text-center font-accent tracking-wider uppercase mb-3">{teacher.subject}</p>
                  <div className="space-y-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p><span className="text-foreground">Experience:</span> {teacher.exp}</p>
                    <p><span className="text-foreground">Qualification:</span> {teacher.qual}</p>
                    <p><span className="text-foreground">Department:</span> {teacher.dept}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
