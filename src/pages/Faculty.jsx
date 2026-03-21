import { useState, useMemo } from 'react';
import FloatingAvatars from '../components/three/FloatingAvatars';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../components/ui/menubar';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../components/ui/command';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Skeleton } from '../components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '../components/ui/sidebar';
import { useSidebar } from '../components/ui/useSidebar';
import { Button } from '../components/ui/button';
import { useScrollFadeIn, useStaggerChildren } from '../hooks/useGsapAnimations';
import { LayoutGrid, List, Filter, X } from 'lucide-react';

const allFaculty = [
  { name: 'Mr. Damodar Choudhary', role: 'Principal', dept: 'Administration', exp: '15 years', initials: 'DC', bio: 'PhD in Education Management. 15+ years in educational leadership.' },
  { name: 'Mr. Rajendra Kumar', role: 'Vice Principal', dept: 'History', exp: '13 years', initials: 'RK', bio: 'Gradute/Postgradate in History with teaching qualifications' },
  { name: 'Mr. Edrish Ahmad', role: 'Physics Teacher', dept: 'Physics', exp: '9 years', initials: 'EA', bio: 'M.Sc Physics, PhD candidate. Published researcher in quantum mechanics.' },
  { name: 'Mr. Dhoom Singh', role: 'Senior Teacher', dept: ' Performing Arts', exp: '15 years', initials: 'DS', bio: 'Graduate/Postgradate in Arts with teaching qualifications' },
  { name: 'Mrs. Raj Bala', role: 'Senior Teacher', dept: 'Hindi', exp: '11 years', initials: 'RB', bio: 'MA Hindi, Postgraduate in Hindi Literature with professional experience.' },
  { name: 'Mr. Sakti Singh', role: 'Head of Sports', dept: 'Physical Education', exp: '12 years', initials: 'SS', bio: 'U.P.Ed, National level basketball player, NIS certified coach.' },
  { name: 'Mr. Vishakha Rani', role: 'Teacher', dept: 'Biology', exp: '6 years', initials: 'VR', bio: 'M.Sc Biology, environmental science researcher.' },
  { name: 'Mr. Manoj Dhiman', role: 'IT Head', dept: 'Computer Science', exp: '7 years', initials: 'MD', bio: 'MCA, Led digital transformation initiatives.' },
  { name: 'Mrs. Babita Devi', role: 'Senior Teacher', dept: 'Hindi', exp: '10 years', initials: 'BD', bio: 'MA Hindi, Sahitya Ratna. Award-winning Hindi literature author.' },
  { name: 'Mr. Kanhiya Lal', role: 'Coordinator', dept: 'English', exp: '11 years', initials: 'KL', bio: 'MA English, specialized in English literature.' },
  { name: 'Mr. Mukesh Sharma', role: 'Senior Teacher', dept: 'Mathematics', exp: '13 years', initials: 'MS', bio: 'M.Sc Mathematics, Math Olympiad team mentor.' },
  { name: 'Mrs. Sarika Pundir', role: 'Music Teacher', dept: 'Performing Arts', exp: '8 years', initials: 'SP', bio: 'Diploma in Indian Classical Music, multi-instrumentalist.' },
];

const departments = ['All', 'Administration', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Physical Education', 'Biology', 'Computer Science', 'Hindi', 'Social Studies', 'Performing Arts'];

const SidebarCloseButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleSidebar}>
      <X className="h-4 w-4" />
    </Button>
  );
};

const ITEMS_PER_PAGE = 6;

const Faculty = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMember, setSelectedMember] = useState(null);
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const heroRef = useScrollFadeIn({ y: 30 });
  const gridRef = useStaggerChildren({ stagger: 0.08 });

  const filtered = useMemo(() => {
    return allFaculty.filter((m) => {
      const matchDept = deptFilter === 'All' || m.dept === deptFilter;
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.dept.toLowerCase().includes(search.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [deptFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar side="left" variant="floating" collapsible="offcanvas" className="top-[82px] h-[calc(100vh-82px)]">
        <SidebarContent className="overflow-y-auto">
          <SidebarGroup>
            <div className="flex items-center justify-between pr-1">
              <SidebarGroupLabel>
                <Filter className="h-4 w-4 mr-1" />
                Departments
              </SidebarGroupLabel>
              <SidebarCloseButton />
            </div>
            <SidebarMenu>
              {departments.map((dept) => (
                <SidebarMenuItem key={dept}>
                  <SidebarMenuButton
                    isActive={deptFilter === dept}
                    onClick={() => { setDeptFilter(dept); setPage(1); }}
                  >
                    {dept}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div>
          {/* Hero */}
          <section className="relative min-h-[40vh] flex items-center overflow-hidden">
            <FloatingAvatars />
            <div className="absolute inset-0 z-[1] bg-background/80" />
            <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
                Our <span className="gradient-text">Faculty</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dedicated educators committed to shaping the future of every student. Our faculty members are devoted educators who focus on nurturing curiosity, critical thinking, and a love for learning in every student. With diverse expertise and a passion for teaching, they create an engaging and supportive environment that inspires students to reach their full potential.
              </p>
            </div>
          </section>

          {/* Controls */}
          <section className="page-section pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>Department</MenubarTrigger>
                      <MenubarContent>
                        {departments.slice(0, 6).map((dept) => (
                          <MenubarItem key={dept} onClick={() => { setDeptFilter(dept); setPage(1); }}>
                            {dept}
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>

                <Command className="w-full md:w-64 border rounded-lg">
                  <CommandInput placeholder="Search faculty..." value={search} onValueChange={setSearch} />
                  {search && (
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {filtered.slice(0, 5).map((m) => (
                          <CommandItem key={m.name} onSelect={() => { setSelectedMember(m); setSearch(''); }}>
                            {m.name} - {m.dept}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>

                <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v)}>
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </section>

          {/* Faculty Grid/List */}
          <section className="page-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TooltipProvider>
                {loading ? (
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-1/2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div ref={gridRef} className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {paged.map((member) => (
                      <Tooltip key={member.name}>
                        <TooltipTrigger asChild>
                          <Card
                            className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                          >
                            <CardContent className={viewMode === 'grid' ? 'pt-6 text-center' : 'py-4 flex items-center gap-4'}>
                              <Avatar className={viewMode === 'grid' ? 'h-16 w-16 mx-auto mb-3' : 'h-12 w-12'}>
                                <AvatarFallback className="bg-primary/10 text-primary">{member.initials}</AvatarFallback>
                              </Avatar>
                              <div className={viewMode === 'grid' ? '' : 'flex-1'}>
                                <h3 className="font-semibold text-sm">{member.name}</h3>
                                <p className="text-primary text-xs font-medium">{member.role}</p>
                                <Badge variant="outline" className="mt-1 text-xs">{member.dept}</Badge>
                                <p className="text-muted-foreground text-xs mt-1">Exp: {member.exp}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent>Click for detailed profile</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                )}
              </TooltipProvider>

              {/* Pagination */}
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </section>

          {/* Faculty Detail Dialog */}
          <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
            {selectedMember && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedMember.name}</DialogTitle>
                  <DialogDescription>{selectedMember.role} - {selectedMember.dept}</DialogDescription>
                </DialogHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">{selectedMember.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{selectedMember.bio}</p>
                    <Badge>{selectedMember.exp} Experience</Badge>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>

          {/* Faculty Stats */}
          <section className="page-section bg-muted/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { num: '32+', label: 'Total Faculty' },
                  { num: '85%', label: 'Post Graduate' },
                  { num: '10%', label: 'PhD Holders' },
                  { num: '12+', label: 'Avg Years Exp' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading text-3xl font-bold gradient-text">{stat.num}</div>
                    <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Faculty;
