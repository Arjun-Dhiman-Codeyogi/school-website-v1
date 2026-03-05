import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "123 Innovation Street, Tech City, TC 12345" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "info@novaacademy.edu" },
  { icon: Clock, label: "Office Hours", value: "Mon-Sat: 8:00 AM - 4:00 PM" },
  { icon: Globe, label: "Website", value: "www.novaacademy.edu" },
];

const faqs = [
  { q: "What is the admission process?", a: "The admission process includes online registration, document submission, entrance test (NAAT), personal interview, and fee payment." },
  { q: "Does Nova Academy offer scholarships?", a: "Yes, we offer merit-based scholarships covering up to 100% of tuition fees for outstanding students." },
  { q: "What extracurricular activities are available?", a: "We offer robotics, music, dance, drama, sports (cricket, football, swimming, athletics), debate club, and more." },
  { q: "Is transport facility available?", a: "Yes, we provide GPS-tracked AC buses covering all major routes in the city." },
  { q: "What is the student-teacher ratio?", a: "We maintain a 15:1 student-teacher ratio to ensure personalized attention." },
  { q: "Are hostel facilities available?", a: "Yes, we have separate hostels for boys and girls with 24/7 security and modern amenities." },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll respond within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="section-subtitle mx-auto">
            We'd love to hear from you. Reach out to us anytime!
          </p>
        </div>
      </section>

      <section className="page-section pt-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-xl border">
              <h3 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" /> Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-wider uppercase hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info + Map */}
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-xl border">
                <h3 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" /> Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-accent tracking-wider uppercase">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass-card rounded-xl border overflow-hidden h-64">
                <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2 animate-float" />
                    <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="section-title text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card rounded-xl border px-6 hover-neon-card">
                <AccordionTrigger className="font-heading text-sm font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Contact;
