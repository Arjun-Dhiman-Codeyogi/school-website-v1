import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Trophy, Calendar, Star, Zap, Target, Sparkles, GraduationCap, FlaskConical, Dumbbell, Library, Bus, Monitor, AlertCircle, Play } from 'lucide-react';
import ParticleBackground from '../components/three/ParticleBackground';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useScrollFadeIn, useStaggerChildren } from '../hooks/useGsapAnimations';
import { useTheme } from '../contexts/ThemeContext';
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
    <div ref={ref} className="font-heading text-3xl md:text-4xl font-bold gradient-text">
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParticleBackground
            count={840}
            colors={theme === 'light' ? ['#3b82f6', '#2563eb', '#1d4ed8'] : ['#3b82f6', '#ffffff', '#60a5fa', '#93c5fd']}
          />
        </div>
        {/* Floating geometric orbs */}
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-gradient-to-br from-accent/15 to-primary/10 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/40 via-background/20 to-background" />

        <div ref={heroTitleRef} className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center pt-36 md:pt-42">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-accent tracking-widest uppercase">
            <Sparkles className="h-3 w-3 mr-1" />
            Admissions Open 2026-27
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Welcome to{' '}
            <span className="gradient-text neon-text">Public Inter College</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 md:mb-20">
            Nurturing Young Minds, Building Tomorrow's Leaders. Where every child discovers their potential through quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/admissions">
                Apply Now <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="glass-card hover-neon-card">
              <Link to="/about">Explore More</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center">
            <div className="w-1 h-3 rounded-full bg-primary mt-2 animate-float" />
          </div>
        </div>
      </section>

      {/* Announcement Alert */}
      <section className="page-section pb-0 relative md:mt-6 -mt-16 z-10">
        <div className="container mx-auto max-w-3xl">
          <Alert className="neon-glow">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Admissions 2026-27 Now Open!</AlertTitle>
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
              <Card key={i} className="glass-card hover-neon-card text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-muted-foreground mt-1 font-accent tracking-wider uppercase">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-section bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Public Inter College?</span>
          </h2>
          <p className="section-subtitle mb-12">
            We provide a comprehensive educational experience that prepares students for success in all aspects of life.
          </p>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="hover-neon-card text-left group cursor-default">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <Badge variant="outline" className="mt-3">Learn More</Badge>
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
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster=""
                    preload="metadata"
                  >
                    <source src="./assets/WhatsApp Video 2026-02-16 at 20.52.05.mp4" type="video/mp4" />
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
              <p className="text-sm text-muted-foreground mb-4">
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
              <Button className="mt-6" variant="outline" size="sm" asChild>
                <Link to="/gallery">View Gallery <ArrowRight className="h-3 w-3 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Performance Chart */}
      <section className="page-section">
        <div className="container mx-auto">
          <h2 className="section-title text-center">
            Academic <span className="gradient-text">Performance</span>
          </h2>
          <p className="section-subtitle text-center mb-8">Our consistent track record of excellence speaks for itself.</p>
          <Card ref={chartRef} className="max-w-2xl mx-auto">
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
      <section className="page-section bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="section-title">
            What Parents <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle mb-12">Hear from the families who trust us with their children's future.</p>
          <Carousel opts={{ align: 'start', loop: true }} className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground italic mb-4 text-sm">"{t.quote}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">{t.initials}</AvatarFallback>
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-section">
        <div ref={ctaRef} className="container mx-auto">
          <Card className="neon-glow p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardContent className="relative z-10 p-0">
              <h2 className="section-title mb-4">
                Ready to <span className="gradient-text">Join Us?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Take the first step towards a future-ready education. Admissions for 2026-27 are now open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/admissions">
                    Start Your Journey <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
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
