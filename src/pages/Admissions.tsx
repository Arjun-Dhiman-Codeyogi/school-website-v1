import React, { useState } from "react";
import { ArrowRight, CheckCircle, Calendar, IndianRupee } from "lucide-react";

const steps = [
  { step: 1, title: "Online Registration", description: "Fill the online admission form with all required details." },
  { step: 2, title: "Document Submission", description: "Upload academic records, ID proof, and photographs." },
  { step: 3, title: "Entrance Test", description: "Appear for the Nova Academy Aptitude Test (NAAT)." },
  { step: 4, title: "Interview", description: "Personal interview with the admission panel." },
  { step: 5, title: "Confirmation", description: "Fee payment and admission confirmation." },
];

const fees = [
  { class: "Class VI - VIII", tuition: "₹85,000", development: "₹15,000", total: "₹1,00,000" },
  { class: "Class IX - X", tuition: "₹1,05,000", development: "₹20,000", total: "₹1,25,000" },
  { class: "Class XI - XII (Science)", tuition: "₹1,30,000", development: "₹25,000", total: "₹1,55,000" },
  { class: "Class XI - XII (Commerce)", tuition: "₹1,10,000", development: "₹20,000", total: "₹1,30,000" },
];

const dates = [
  { event: "Online Registration Opens", date: "March 1, 2026" },
  { event: "Registration Deadline", date: "April 15, 2026" },
  { event: "Entrance Test (NAAT)", date: "May 5, 2026" },
  { event: "Results Announcement", date: "May 20, 2026" },
  { event: "Fee Payment Deadline", date: "June 10, 2026" },
  { event: "Session Starts", date: "July 1, 2026" },
];

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", class: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", class: "", message: "" });
  };

  return (
    <div>
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            <span className="gradient-text">Admissions</span> 2026-27
          </h1>
          <p className="section-subtitle mx-auto">
            Begin your journey with Nova Academy. Follow the simple admission process below.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="page-section pt-8">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Admission <span className="gradient-text">Process</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start glass-card p-5 rounded-xl border hover-neon-card">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-heading text-sm font-bold text-primary">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Fee <span className="gradient-text">Structure</span>
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-wider uppercase text-primary">Class</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-wider uppercase text-primary">Tuition Fee</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-wider uppercase text-primary">Development</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-wider uppercase text-primary">Total</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                    <td className="py-3 px-4 font-medium">{f.class}</td>
                    <td className="py-3 px-4 text-muted-foreground">{f.tuition}</td>
                    <td className="py-3 px-4 text-muted-foreground">{f.development}</td>
                    <td className="py-3 px-4 font-semibold gradient-text">{f.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="page-section">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Important <span className="gradient-text">Dates</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {dates.map((d, i) => (
              <div key={i} className="glass-card p-5 rounded-xl border hover-neon-card flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold mb-1">{d.event}</h4>
                  <p className="text-xs text-primary font-accent tracking-wider">{d.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="section-title text-center mb-12">
            Admission <span className="gradient-text">Inquiry</span>
          </h2>
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select Class</option>
                <option>Class VI</option>
                <option>Class VII</option>
                <option>Class VIII</option>
                <option>Class IX</option>
                <option>Class X</option>
                <option>Class XI - Science</option>
                <option>Class XI - Commerce</option>
                <option>Class XII - Science</option>
                <option>Class XII - Commerce</option>
              </select>
            </div>
            <textarea
              placeholder="Your Message (Optional)"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)] transition-all duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
