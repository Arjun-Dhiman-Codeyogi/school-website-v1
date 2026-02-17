import { useState } from 'react';
import ParticleBackground from '../components/three/ParticleBackground';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { useToast } from '../hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { useScrollFadeIn } from '../hooks/useGsapAnimations';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';

const faqs = [
  { q: 'What are the admission requirements?', a: 'Admission requires previous academic records, birth certificate, and an entrance assessment. Visit our Admissions page for full details.' },
  { q: 'What are the school timings?', a: 'School hours are 8:00 AM to 2:30 PM for primary and 7:30 AM to 3:00 PM for secondary and senior secondary.' },
  { q: 'Is transport facility available?', a: 'Yes, GPS-enabled buses cover all major routes within a 15km radius. Transport fees are separate from tuition.' },
  { q: 'What extracurricular activities are offered?', a: 'We offer sports, dance, art, debate, and various clubs and societies.' },
  { q: 'How can I track my child\'s academic progress?', a: 'Parents receive regular progress reports and can attend parent-teacher meetings held every quarter.' },
];

const contactInfo = [
  { icon: MapPin, title: 'Address', lines: ['Public Inter College', 'Sadholi Kadeem, Saharanpur', 'Uttar Pradesh - 247121, India'], staff: 'Reception Desk' },
  { icon: Phone, title: 'Phone', lines: ['Main Office: +91 9411081074', 'Admissions: +91 98765 43211'], staff: 'Mr. Rajnesh Gupta (Office)' },
  { icon: Mail, title: 'Email', lines: ['1045.sre@gmail.com', 'admissions@publicintercollege.edu'], staff: 'Mrs. Babu Kumar (Admin)' },
  { icon: Clock, title: 'Office Hours', lines: ['Monday - Friday: 8:00 AM - 3:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'], staff: null },
];

const Contact = () => {
  const [newsletter, setNewsletter] = useState(false);
  const { toast } = useToast();
  const heroRef = useScrollFadeIn({ y: 30 });

  const form = useForm({
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const onSubmit = () => {
    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. We will get back to you soon.',
    });
    sonnerToast.success('Form submitted successfully!');
    form.reset();
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[10vh] flex items-center overflow-hidden">
        <ParticleBackground color="#10b981" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with us.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="page-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">Send us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="admission">Admission Enquiry</SelectItem>
                              <SelectItem value="academic">Academic Query</SelectItem>
                              <SelectItem value="fee">Fee Related</SelectItem>
                              <SelectItem value="transport">Transport</SelectItem>
                              <SelectItem value="general">General Enquiry</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write your message here..." rows={5} {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch id="newsletter" checked={newsletter} onCheckedChange={setNewsletter} />
                    <Label htmlFor="newsletter" className="text-sm">Subscribe to newsletter</Label>
                  </div>
                  <Button type="submit" size="lg">Send Message</Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <Card key={info.title}>
                    <CardContent className="flex gap-4 py-4">
                      <info.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm">{info.title}</h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-muted-foreground text-sm">{line}</p>
                        ))}
                        {info.staff && (
                          <HoverCard>
                            <HoverCardTrigger className="text-xs text-primary cursor-pointer underline mt-1 inline-block">
                              Contact Person
                            </HoverCardTrigger> 
                            <HoverCardContent className="w-48">
                              <p className="text-sm font-medium">{info.staff}</p>
                              <p className="text-xs text-muted-foreground">Available during office hours</p>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map with Directions Dropdown */}
              <Card className="mt-6">
                <CardContent className="py-4">
                  <div className="rounded-lg overflow-hidden h-48">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d77.5486!3d29.8833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb1234567890%3A0xabcdef!2sSadholi+Kadeem%2C+Saharanpur%2C+Uttar+Pradesh+247121!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Public Inter College, Sadholi Kadeem"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full mt-3">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => window.open('https://www.google.com/maps/search/Public+Inter+College+Sadholi+Kadeem+Saharanpur+Uttar+Pradesh+247121', '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in Google Maps
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open('https://maps.apple.com/?q=Public+Inter+College+Sadholi+Kadeem+Saharanpur+Uttar+Pradesh+247121', '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in Apple Maps
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigator.clipboard.writeText('Public Inter College, Sadholi Kadeem, Saharanpur, Uttar Pradesh - 247121, India'); sonnerToast.success('Address copied!'); }}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Copy Address
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.a}</p>
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
