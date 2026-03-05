import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const upcomingEvents = [
  { title: "Annual Science Fair 2026", date: "2026-03-15", time: "9:00 AM", location: "Main Auditorium", description: "Showcase your innovations and scientific projects." },
  { title: "Inter-School Sports Championship", date: "2026-03-22", time: "8:00 AM", location: "Sports Complex", description: "Compete in athletics, cricket, football, and more." },
  { title: "AI & Robotics Workshop", date: "2026-04-05", time: "10:00 AM", location: "Innovation Hub", description: "Hands-on workshop on building AI-powered robots." },
  { title: "Cultural Fest - Nova Utsav", date: "2026-04-20", time: "5:00 PM", location: "Open Air Theatre", description: "Music, dance, drama, and art showcase." },
  { title: "Parent-Teacher Meeting", date: "2026-05-10", time: "11:00 AM", location: "Conference Hall", description: "Discuss your child's academic progress." },
  { title: "Graduation Ceremony 2026", date: "2026-06-15", time: "4:00 PM", location: "Main Auditorium", description: "Celebrating our graduating class of 2026." },
];

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / (1000 * 60)) % 60),
        });
      }
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2">
      {Object.entries(timeLeft).map(([key, val]) => (
        <div key={key} className="text-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="font-heading text-lg font-bold text-primary">{val}</span>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase font-accent tracking-wider">{key}</span>
        </div>
      ))}
    </div>
  );
};

const Events: React.FC = () => {
  return (
    <div>
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            Events & <span className="gradient-text">Calendar</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Stay updated with all the exciting events happening at Nova Academy.
          </p>
        </div>
      </section>

      <section className="page-section pt-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="glass-card rounded-xl border hover-neon-card overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-base font-semibold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-primary" />
                          {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-primary" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <CountdownTimer targetDate={event.date} />
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

export default Events;
