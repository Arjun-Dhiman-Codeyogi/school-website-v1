import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import FloatingGlobe from '../components/three/FloatingGlobe';
import { useScrollFadeIn, useStaggerChildren } from '../hooks/useGsapAnimations';
import { Target, Eye, Heart, BookOpen, Handshake, Globe2, Trophy } from 'lucide-react';

const historyTimeline = [
  { year: '1947', event: 'Public Inter College was founded with just 50 students and 5 teachers.' },
  { year: '1955', event: 'Expanded to include senior secondary classes (11th & 12th).' },
  { year: '2008', event: 'Inaugurated the new science labs and computer center.' },
  { year: '2015', event: 'Celebrated 68 years with 1500+ students and 28+ faculty.' },
  { year: '2020', event: 'Successfully transitioned to hybrid learning during the pandemic.' },
  { year: '2024', event: 'Expanded campus with new classrooms and a new sports complex.' },
];

const achievements = [
  { label: 'Board Pass Rate', value: 92 },
  { label: 'Students in Higher Ed', value: 82 },
  { label: 'Parent Satisfaction', value: 88 },
  { label: 'Faculty Retention', value: 87 },
];

const enrollmentData = [
  { year: '2020', students: 1800 },
  { year: '2021', students: 1950 },
  { year: '2022', students: 2100 },
  { year: '2023', students: 2250 },
  { year: '2024', students: 2300 },
  { year: '2025', students: 2400 },
];

const enrollmentConfig = {
  students: { label: 'Students', color: 'var(--chart-1)' },
};

const About = () => {
  const heroRef = useScrollFadeIn({ y: 30 });
  const valuesRef = useStaggerChildren({ stagger: 0.12 });

  return (
    <div>
      {/* Hero with FloatingGlobe */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <FloatingGlobe />
        <div className="absolute inset-0 z-[1] bg-background/80" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            About <span className="gradient-text">Public Inter College</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Established in 1995, we have been shaping young minds with a commitment to academic excellence and character building.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values Tabs */}
      <section className="page-section">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="mission" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="values">Values</TabsTrigger>
            </TabsList>
            <TabsContent value="mission">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-primary" />
                    <CardTitle>Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide a holistic educational experience that empowers students to become
                    lifelong learners, critical thinkers, and responsible global citizens. We strive
                    to create an inclusive environment where every student can discover and develop
                    their unique talents.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vision">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-primary" />
                    <CardTitle>Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a leading educational institution recognized for nurturing well-rounded
                    individuals who contribute positively to society. We envision a school where
                    innovation meets tradition, creating an environment that inspires excellence
                    in every endeavor.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="values">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-primary" />
                    <CardTitle>Our Values</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div ref={valuesRef} className="grid grid-cols-2 gap-4">
                    {[
                      { icon: BookOpen, title: 'Knowledge', desc: 'Fostering a love for learning and intellectual curiosity.' },
                      { icon: Handshake, title: 'Integrity', desc: 'Building character through honesty and ethical behavior.' },
                      { icon: Globe2, title: 'Inclusivity', desc: 'Celebrating diversity and respecting every individual.' },
                      { icon: Trophy, title: 'Excellence', desc: 'Striving for the highest standards in everything we do.' },
                    ].map((v) => (
                      <div key={v.title} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <v.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{v.title}</p>
                          <p className="text-xs text-muted-foreground">{v.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* History Timeline Accordion */}
      <section className="page-section">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle text-center mb-8">Three decades of nurturing excellence.</p>
          <Accordion type="single" collapsible className="w-full">
            {historyTimeline.map((item, i) => (
              <AccordionItem key={item.year} value={`item-${i}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge variant="default">{item.year}</Badge>
                    <span className="text-sm font-medium">{item.event.split('.')[0]}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground pl-16">{item.event}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Achievement Metrics */}
      <section className="page-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">
            Achievement <span className="gradient-text">Metrics</span>
          </h2>
          <p className="section-subtitle text-center mb-8">Numbers that reflect our commitment to excellence.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((a) => (
              <Card key={a.label}>
                <CardContent className="pt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{a.label}</span>
                    <span className="text-sm font-bold text-primary">{a.value}%</span>
                  </div>
                  <Progress value={a.value} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Growth Chart */}
      <section className="page-section bg-muted/40">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-center">
            Enrollment <span className="gradient-text">Growth</span>
          </h2>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Student Enrollment (2020-2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={enrollmentConfig} className="h-[250px] w-full">
                <BarChart data={enrollmentData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="students" fill="var(--color-students)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="page-section">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-primary/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="section-title text-center mb-8">From the Principal's Desk</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0 border-2 border-primary/30 rounded-lg p-2">
                  <img
                    src="/principle.jpg"
                    alt="Mr. Damodar Choudhary"
                    className="w-[152px] h-[220px] object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    "At Public Inter College, we believe that every child is unique and has the potential to
                    achieve greatness. Our dedicated team of educators works tirelessly to provide a
                    nurturing environment that encourages curiosity, creativity, and confidence."
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    "We are committed to preparing our students not just for examinations, but for life.
                    Through our comprehensive approach to education, we aim to develop well-rounded
                    individuals who are ready to face the challenges of the modern world."
                  </p>
                  <Separator className="my-4" />
                  <p className="font-semibold">Mr. Damodar Choudhary</p>
                  <p className="text-sm text-muted-foreground">Principal, Public Inter College</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
