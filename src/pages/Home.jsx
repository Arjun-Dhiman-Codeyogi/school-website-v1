import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Trophy, Calendar, Sparkles, GraduationCap, FlaskConical, Dumbbell, Library, Bus, Monitor, AlertCircle, Play } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useScrollFadeIn, useStaggerChildren } from '../hooks/useGsapAnimations';
import { useTheme } from '../contexts/useTheme';
import gsap from 'gsap';

const stats = [
  { icon: Users, label: 'Students', value: 1100, suffix: '+' },
  { icon: BookOpen, label: 'Faculty', value: 32, suffix: '+' },
  { icon: Trophy, label: 'Awards', value: 65, suffix: '+' },
  { icon: Calendar, label: 'Years', value: 80, suffix: '' },
];

const features = [
  { icon: GraduationCap, title: 'Academic Excellence', description: 'Our school focuses on providing quality education to help students succeed in their studies.' },
  { icon: FlaskConical, title: 'School Laboratories', description: 'Our school has simple laboratory facilities to help students understand practical concepts.' },
  { icon: Dumbbell, title: 'Sports & Activities', description: "Our school conducts limited sports nad activity programs to encourage student's development" },
  { icon: Library, title: 'School Library', description: 'Our school has a library with a good collection of books for students to read and learn.' },
  { icon: Bus, title: 'Own Transport', description: 'Our school has limited transport facilities. Most students come to school by bicycle, bike, or on their own.' },
  { icon: Monitor, title: 'Our Classrooms', description: 'Our school may not have smart classrooms, but it provides good education with supportive teachers.' },
];

const testimonials = [
  { quote: "Public Inter College has transformed my child's approach to learning. The teachers truly care about each student's growth.", name: 'Priya Sharma', role: 'Parent of Class 8 student', initials: 'PS' },
  { quote: 'The balance between academics and extracurricular activities is perfect. My son has excelled in both studies and sports.', name: 'Rajesh Kumar', role: 'Parent of Class 10 student', initials: 'RK' },
  { quote: "The school's focus on values and character building alongside academics makes it stand out from others.", name: 'Anita Patel', role: 'Parent of Class 6 student', initials: 'AP' },
  { quote: 'Excellent faculty and modern infrastructure. My daughter loves going to school every day.', name: 'Suresh Nair', role: 'Parent of Class 11 student', initials: 'SN' },
  { quote: 'The personalized attention each student receives is remarkable. Truly one of the best schools in the city.', name: 'Kavita Joshi', role: 'Parent of Class 12 student', initials: 'KJ' },
];

const chartData = [
  { year: '2022', passRate: 87, distinction: 27 },
  { year: '2023', passRate: 82, distinction: 30 },
  { year: '2024', passRate: 91, distinction: 28 },
  { year: '2025', passRate: 94, distinction: 34 },
];

const chartConfig = {
  passRate: { label: 'Pass Rate %', color: 'var(--chart-1)' },
  distinction: { label: 'Distinctions', color: 'var(--chart-2)' },
};

const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
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
    <div ref={ref} className="font-heading text-3xl md:text-4xl font-bold text-primary">
      {count}{suffix}
    </div>
  );
};

const Home = () => {
  const { theme } = useTheme();
  const heroTitleRef = useRef(null);
  const featuresRef = useStaggerChildren({ stagger: 0.1 });
  const statsRef = useStaggerChildren({ stagger: 0.1 });
  const chartRef = useScrollFadeIn();
  const ctaRef = useScrollFadeIn({ y: 30 });

  useEffect(() => {
    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div>
      {/* Hero Section - Greenwood Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[70%] h-full z-0 hidden md:block">
          <img
            src="mainBuilding.jpg"
            alt="Public Inter College Building"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-r from-background via-background/60 to-transparent' : 'bg-gradient-to-r from-background via-background/84 to-background/20'}`} />
        </div>
        {/* Mobile: full background image */}
        <div className="absolute inset-0 z-0 md:hidden">
          <img
            src="mainBuilding.jpg"
            alt="Public Inter College Building"
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-background/75' : 'bg-background/80'}`} />
        </div>
        {/* Decorative orange circle */}
        <div className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-primary/8 blur-3xl hidden md:block" />
        <div className="absolute bottom-20 right-[30%] w-48 h-48 rounded-full bg-primary/5 blur-2xl hidden md:block" />

        <div ref={heroTitleRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-[126px] pb-12 md:pt-18 md:pb-0">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-8">
              <Sparkles className="h-3 w-3" />
              ESTABLISHED 1947 &bull; EXCELLENCE IN EDUCATION
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-5">
              Empowering Minds,{' '}
              <span className="gradient-text">Shaping Futures.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Welcome to Public Inter College, where we nurture curiosity, foster integrity, and prepare the next generation of global leaders through holistic learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="rounded-full px-8 font-semibold text-base">
                <Link to="/academics">
                  Explore Programs <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full px-8 font-semibold text-base border-2">
                <Link to="/admissions">Admissions 2026-27</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Alert */}
      <section className="page-section pb-0 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <Alert className="border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Admissions 2026-27 Now Open!</AlertTitle>
            <AlertDescription>
              Limited seats available. Apply before March 31, 2026 to avail early-bird discount.{' '}
              <Link to="/admissions" className="text-primary font-medium underline">Apply Now</Link>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Stats Section */}
      <section className="page-section">
        <div className="container mx-auto">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-muted-foreground mt-1 font-medium tracking-wider uppercase">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-section bg-muted/40">
        <div className="container mx-auto text-center">
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Public Inter College?</span>
          </h2>
          <p className="section-subtitle mb-12">
            We provide a comprehensive educational experience that prepares students for success in all aspects of life.
          </p>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="text-left group cursor-default hover:shadow-lg transition-all hover:-translate-y-1 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Video Section */}
      <section className="page-section">
        <div className="container mx-auto">
          <h2 className="section-title text-center">
            Experience Our <span className="gradient-text">Campus</span>
          </h2>
          <p className="section-subtitle text-center mb-10">Take a virtual tour of our vibrant school life.</p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-[70%]">
              <Card className="overflow-hidden shadow-lg border-border/50">
                <div className="relative aspect-video bg-muted">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster=""
                    preload="metadata"
                  >
                    <source src="WhatsApp Video 2026-02-16 at 20.52.05.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-paused:opacity-100">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-full md:w-[30%]">
              <h3 className="font-heading text-xl font-semibold mb-4">
                A Glimpse Into Our World
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Watch how our students learn, grow, and thrive in an environment built for excellence. From modern classrooms to vibrant playgrounds, see what makes Public Inter College special.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                  Interactive learning sessions
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary flex-shrink-0" />
                  Award-winning programs
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary flex-shrink-0" />
                  Community-driven culture
                </li>
              </ul>
              <Button className="mt-6 rounded-full" variant="outline" size="sm" asChild>
                <Link to="/gallery">View Gallery <ArrowRight className="h-3 w-3 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Performance Chart */}
      <section className="page-section bg-muted/40">
        <div className="container mx-auto">
          <h2 className="section-title text-center">
            Academic <span className="gradient-text">Performance</span>
          </h2>
          <p className="section-subtitle text-center mb-8">Our consistent track record of excellence speaks for itself.</p>
          <Card ref={chartRef} className="max-w-2xl mx-auto shadow-lg border-border/50">
            <CardHeader>
              <CardTitle>Board Exam Results (2022-2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={chartData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="passRate" fill="var(--color-passRate)" radius={4} />
                  <Bar dataKey="distinction" fill="var(--color-distinction)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="page-section">
        <div className="container mx-auto text-center">
          <h2 className="section-title">
            What Parents <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle mb-12">Hear from the families who trust us with their children's future.</p>
          <Carousel opts={{ align: 'start', loop: true }} className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground italic mb-4 text-sm leading-relaxed">"{t.quote}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{t.initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-section bg-muted/40">
        <div ref={ctaRef} className="container mx-auto">
          <Card className="p-8 md:p-12 text-center relative overflow-hidden border-primary/20 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
            <CardContent className="relative z-10 p-0">
              <h2 className="section-title mb-4">
                Ready to <span className="gradient-text">Join Us?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Take the first step towards a future-ready education. Admissions for 2026-27 are now open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="rounded-full px-8 font-semibold">
                  <Link to="/admissions">
                    Start Your Journey <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-full px-8 font-semibold border-2">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
