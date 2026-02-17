import { useState } from 'react';
import ParticleBackground from '../components/three/ParticleBackground';
import { Calendar } from '../components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerTrigger } from '../components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../components/ui/content-menu';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useScrollFadeIn } from '../hooks/useGsapAnimations';
import { ChevronDown, CalendarDays, MapPin, Clock } from 'lucide-react';

const upcomingEvents = [
  { date: 'Feb 18, 2026', title: 'Annual Science Exhibition', desc: 'Students showcase innovative science projects and experiments.', category: 'Academic', venue: 'Main Auditorium', time: '9:00 AM - 3:00 PM' },
  { date: 'feb 25, 2026', title: 'Parent-Teacher Meeting', desc: 'Discuss student progress and academic performance with teachers.', category: 'Meeting', venue: 'Respective Classrooms', time: '10:00 AM - 2:00 PM' },
  { date: 'Feb 28, 2026', title: 'Inter-School Sports Meet', desc: 'Annual sports competition with schools from across the district.', category: 'Sports', venue: 'Sports Ground', time: '8:00 AM - 11:00 PM' },
  { date: 'Mar 02, 2026', title: 'Cultural Festival - Rang Utsav', desc: 'A celebration of art, music, dance, and drama performances.', category: 'Cultural', venue: 'Open Air Theatre', time: '9:00 AM - 12:00 PM' },
  { date: 'Apr 01, 2026', title: 'Career Counselling Workshop', desc: 'Guidance for Class 10 and 12 students on career options.', category: 'Workshop', venue: 'Conference Hall', time: '10:00 AM - 1:00 PM' },
  { date: 'May 20, 2026', title: 'Annual Day Celebration', desc: 'Grand celebration featuring performances, awards, and chief guest address.', category: 'Celebration', venue: 'Main Auditorium', time: '10:00 AM - 2:00 PM' },
];

const pastHighlights = [
  { title: 'Republic Day Celebration 2026', desc: 'Flag hoisting and cultural performances.', date: 'Jan 26, 2026' },
  { title: 'Math Olympiad Winners', desc: '3 students qualified for the District Math Olympiad.', date: 'Jan 06, 2026' },
  { title: 'Winter Sports Championship', desc: 'Our Volleyball team won the district championship.', date: 'Dec 20, 2025' },
  { title: "Children's Day Special", desc: 'Teachers performed skits and games for the students.', date: 'Nov 14, 2025' },
];

const eventDates = [
  new Date(2026, 2, 15), new Date(2026, 2, 25), new Date(2026, 3, 5),
  new Date(2026, 3, 14), new Date(2026, 4, 1), new Date(2026, 4, 20),
];

const Events = () => {
  const [calDate, setCalDate] = useState(new Date(2026, 2, 15));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [regName, setRegName] = useState('');
  const [regClass, setRegClass] = useState('');
  const heroRef = useScrollFadeIn({ y: 30 });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <ParticleBackground color="#f59e0b" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Events & <span className="gradient-text">Activities</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with school events, celebrations, and important dates.
            <br />
            Regular events and activities provide students opportunities to showcase their talents and build leadership and teamwork skills.
          </p>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="page-section">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar with ContextMenu */}
            <div>
              <h2 className="section-title">Event <span className="gradient-text">Calendar</span></h2>
              <ContextMenu>
                <ContextMenuTrigger>
                  <Card>
                    <CardContent className="pt-6 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={calDate}
                        onSelect={(d) => d && setCalDate(d)}
                        modifiers={{ event: eventDates }}
                        modifiersClassNames={{ event: 'bg-primary/20 text-primary font-bold' }}
                      />
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>View all events for this month</ContextMenuItem>
                  <ContextMenuItem>Download calendar as PDF</ContextMenuItem>
                  <ContextMenuItem>Set reminder</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>

              {/* Date Popover */}
              {eventDates.some(d => d.toDateString() === calDate?.toDateString()) && (
                <Card className="mt-4">
                  <CardContent className="py-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          View event on {calDate?.toLocaleDateString()}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        {upcomingEvents.filter(e => {
                          const d = new Date(e.date);
                          return d.toDateString() === calDate?.toDateString();
                        }).map((e, i) => (
                          <div key={i}>
                            <p className="font-medium text-sm">{e.title}</p>
                            <p className="text-xs text-muted-foreground">{e.desc}</p>
                          </div>
                        ))}
                        {upcomingEvents.filter(e => new Date(e.date).toDateString() === calDate?.toDateString()).length === 0 && (
                          <p className="text-sm text-muted-foreground">An event is scheduled for this date.</p>
                        )}
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="section-title">Quick <span className="gradient-text">Overview</span></h2>
              <div className="space-y-4">
                <Card className="hover-neon-card">
                  <CardContent className="py-4 flex items-center justify-between">
                    <span className="font-medium">Upcoming Events</span>
                    <Badge>{upcomingEvents.length}</Badge>
                  </CardContent>
                </Card>
                <Card className="hover-neon-card">
                  <CardContent className="py-4 flex items-center justify-between">
                    <span className="font-medium">Past Highlights</span>
                    <Badge variant="secondary">{pastHighlights.length}</Badge>
                  </CardContent>
                </Card>
                <Card className="hover-neon-card">
                  <CardContent className="py-4 flex items-center justify-between">
                    <span className="font-medium">Next Event</span>
                    <Badge variant="outline">{upcomingEvents[0]?.date}</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="page-section bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Highlights</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, i) => (
                  <Card key={i} className="hover-neon-card">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge>{event.category}</Badge>
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                      <CardTitle className="text-base mt-2">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-primary">
                            More details <ChevronDown className="h-3 w-3 ml-1" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <p className="text-sm text-muted-foreground mb-2">{event.desc}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {event.venue}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" /> {event.time}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event)}>
                          View Details
                        </Button>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button size="sm">Register</Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Register for {event.title}</DrawerTitle>
                              <DrawerDescription>{event.date} at {event.venue}</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 space-y-4">
                              <Input placeholder="Your name" value={regName} onChange={(e) => setRegName(e.target.value)} />
                              <Select value={regClass} onValueChange={setRegClass}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent>
                                  {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(c => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <DrawerFooter>
                              <Button>Submit Registration</Button>
                              <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-8">
              <Carousel opts={{ align: 'start' }} className="max-w-4xl mx-auto">
                <CarouselContent>
                  {pastHighlights.map((event, i) => (
                    <CarouselItem key={i} className="md:basis-1/2">
                      <Card>
                        <CardContent className="pt-6">
                          <Badge variant="secondary" className="mb-2">{event.date}</Badge>
                          <h3 className="font-semibold mb-1">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.desc}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>{selectedEvent.category} - {selectedEvent.date}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <p className="text-muted-foreground">{selectedEvent.desc}</p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" /> {selectedEvent.venue}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" /> {selectedEvent.time}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Academic Calendar Download */}
      <section className="page-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Academic Calendar <span className="gradient-text">2026-27</span></h2>
          <p className="section-subtitle mb-6">Download the complete academic calendar with all important dates.</p>
          <Button size="lg">Download Calendar (PDF)</Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
