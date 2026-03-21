import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import FloatingBooks from '../components/three/FloatingBooks';
import { useScrollFadeIn, useStaggerChildren } from '../hooks/useGsapAnimations';
import { ChevronDown, FlaskConical, Monitor, Library, Palette, Music, Languages } from 'lucide-react';

const programs = {
  // primary: {
  //   level: 'Primary (Classes 1-5)',
  //   subjects: [
  //     { group: 'Languages', items: ['English', 'Hindi'] },
  //     { group: 'Core', items: ['Mathematics', 'Environmental Science'] },
  //     { group: 'Creative', items: ['Art & Craft', 'Physical Education'] },
  //   ],
  //   curriculum: [
  //     { subject: 'English', hours: 6, type: 'Core' },
  //     { subject: 'Hindi', hours: 5, type: 'Core' },
  //     { subject: 'Mathematics', hours: 7, type: 'Core' },
  //     { subject: 'EVS', hours: 4, type: 'Core' },
  //     { subject: 'Art & Craft', hours: 3, type: 'Elective' },
  //     { subject: 'Physical Ed.', hours: 3, type: 'Elective' },
  //   ],
  // },
  middle: {
    level: 'Middle School (Classes 6-8)',
    subjects: [
      { group: 'Languages', items: ['English', 'Hindi', 'Sanskrit'] },
      { group: 'Sciences', items: ['Mathematics', 'Science', 'Social Studies'] },
      { group: 'Technology', items: ['Computer Science'] },
    ],
    curriculum: [
      { subject: 'English', hours: 6, type: 'Core' },
      { subject: 'Hindi', hours: 5, type: 'Core' },
      { subject: 'Mathematics', hours: 7, type: 'Core' },
      { subject: 'Science', hours: 6, type: 'Core' },
      { subject: 'Social Studies', hours: 5, type: 'Core' },
      { subject: 'Computer Sc.', hours: 3, type: 'Elective' },
      { subject: 'Sanskrit', hours: 3, type: 'Elective' },
    ],
  },
  secondary: {
    level: 'Secondary (Classes 9-10)',
    subjects: [
      { group: 'Languages', items: ['English', 'Hindi'] },
      { group: 'Sciences', items: ['Physics', 'Chemistry', 'Biology', 'Mathematics'] },
      { group: 'Humanities', items: ['Social Science', 'IT'] },
    ],
    curriculum: [
      { subject: 'English', hours: 6, type: 'Core' },
      { subject: 'Hindi', hours: 5, type: 'Core' },
      { subject: 'Mathematics', hours: 7, type: 'Core' },
      { subject: 'Science', hours: 7, type: 'Core' },
      { subject: 'Social Science', hours: 5, type: 'Core' },
      { subject: 'IT', hours: 3, type: 'Elective' },
    ],
  },
  senior: {
    level: 'Senior Secondary (Classes 11-12)',
    subjects: [
      { group: 'Science Stream', items: ['Physics', 'Chemistry', 'Biology/Maths'] },
      { group: 'Commerce Stream', items: ['Accounts', 'Economics', 'Business Studies'] },
      { group: 'Humanities', items: ['History', 'Political Science', 'Psychology'] },
    ],
    curriculum: [
      { subject: 'English', hours: 5, type: 'Core' },
      { subject: 'Stream Subject 1', hours: 6, type: 'Core' },
      { subject: 'Stream Subject 2', hours: 6, type: 'Core' },
      { subject: 'Stream Subject 3', hours: 6, type: 'Core' },
      { subject: 'Optional', hours: 4, type: 'Elective' },
    ],
  },
};

const facilities = [
  { icon: FlaskConical, title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology labs.', detail: 'Our science labs feature modern equipment, safety stations, and capacity for 40 students per batch. Regular practical sessions complement theoretical learning.' },
  { icon: Monitor, title: 'Computer Lab', desc: '60+ computers with high-speed internet access.', detail: 'State-of-the-art computer lab with latest hardware, programming tools, and dedicated internet connectivity for research and learning.' },
  { icon: Library, title: 'Library', desc: '15,000+ books, journals, and digital resources.', detail: 'Our library features a vast collection spanning all subjects, digital reading stations, quiet study areas, and a dedicated reference section.' },
  { icon: Palette, title: 'Art Studio', desc: 'Dedicated space for painting, sculpture, and crafts.', detail: 'A well-lit studio space with easels, pottery wheels, and a gallery section to showcase student artwork throughout the year.' },
  { icon: Music, title: 'Music Room', desc: 'Instruments and training for vocal and instrumental music.', detail: 'Equipped with keyboards, guitars, tabla, harmonium, and a sound-proof practice room for individual sessions.' },
  { icon: Languages, title: 'Language Lab', desc: 'Audio-visual tools for English communication skills.', detail: 'Interactive language learning software, headsets for each student, and multimedia content for improving pronunciation and fluency.' },
];

const academicDates = [
  new Date(2026, 3, 1),  // Apr 1 - New Session
  new Date(2026, 6, 15), // Jul 15 - Mid-term
  new Date(2026, 9, 2),  // Oct 2 - Diwali Break
  new Date(2026, 11, 20), // Dec 20 - Winter Break
  new Date(2027, 1, 15),  // Feb 15 - Annual Exams
  new Date(2027, 2, 31),  // Mar 31 - Results
];

const Academics = () => {
  const [calDate, setCalDate] = useState(new Date(2026, 3, 1));
  const heroRef = useScrollFadeIn({ y: 30 });
  const facilitiesRef = useStaggerChildren({ stagger: 0.1 });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <FloatingBooks />
        <div className="absolute inset-0 z-[1] bg-background/80" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Academics</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive curriculum designed to bring out the best in every student.
            <br />
            We provide quality education through a structured curriculum that helps students develop understanding and confidence in every subject. 
          </p>
        </div>
      </section>

      {/* Programs Tabs */}
      <section className="page-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center">Our <span className="gradient-text">Programs</span></h2>
          <Tabs defaultValue="primary" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              {/* <TabsTrigger value="primary">Primary</TabsTrigger> */}
              <TabsTrigger value="middle">Middle</TabsTrigger>
              <TabsTrigger value="secondary">Secondary</TabsTrigger>
              <TabsTrigger value="senior">Sr. Secondary</TabsTrigger>
            </TabsList>
            {Object.entries(programs).map(([key, prog]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{prog.level}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Subject Groups Accordion */}
                    <Accordion type="multiple" className="mb-6">
                      {prog.subjects.map((group, gi) => (
                        <AccordionItem key={gi} value={`group-${gi}`}>
                          <AccordionTrigger>{group.group}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-wrap gap-2">
                              {group.items.map((subj) => (
                                <Badge key={subj} variant="secondary">{subj}</Badge>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* Curriculum Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Hours/Week</TableHead>
                          <TableHead>Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prog.curriculum.map((row) => (
                          <TableRow key={row.subject}>
                            <TableCell className="font-medium">{row.subject}</TableCell>
                            <TableCell>{row.hours}</TableCell>
                            <TableCell>
                              <Badge variant={row.type === 'Core' ? 'default' : 'outline'}>
                                {row.type}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Facilities with Dialog */}
      <section className="page-section bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center">Academic <span className="gradient-text">Facilities</span></h2>
          <div ref={facilitiesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {facilities.map((f) => (
              <Dialog key={f.title}>
                <DialogTrigger asChild>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <f.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <f.icon className="h-5 w-5 text-primary" />
                      {f.title}
                    </DialogTitle>
                    <DialogDescription>{f.desc}</DialogDescription>
                  </DialogHeader>
                  <p className="text-muted-foreground text-sm">{f.detail}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology - Collapsible */}
      <section className="page-section">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Teaching <span className="gradient-text">Methodology</span></h2>
          <div className="mt-8 space-y-3">
            {[
              { title: 'Interactive Learning', desc: 'Smart boards and multimedia-based teaching for engaging classroom experiences.' },
              { title: 'Project-Based Learning', desc: 'Real-world projects to develop practical skills and critical thinking.' },
              { title: 'Regular Assessments', desc: 'Continuous evaluation for tracking progress and identifying areas of improvement.' },
              { title: 'Personalized Attention', desc: 'Small class sizes for individual guidance and mentoring.' },
            ].map((method, i) => (
              <Collapsible key={i}>
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{method.title}</CardTitle>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{method.desc}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="page-section bg-muted/40">
        <div className="max-w-md mx-auto text-center">
          <h2 className="section-title">Academic <span className="gradient-text">Calendar</span></h2>
          <p className="section-subtitle mb-6">Key dates for the academic year 2026-27.</p>
          <Card>
            <CardContent className="pt-6 flex justify-center">
              <Calendar
                mode="single"
                selected={calDate}
                onSelect={(d) => d && setCalDate(d)}
                modifiers={{ highlighted: academicDates }}
                modifiersClassNames={{ highlighted: 'bg-primary/20 text-primary font-bold' }}
                className="rounded-md"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Academics;
