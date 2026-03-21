import { useState, useEffect, useCallback } from 'react';
import ParticleBackground from '../components/three/ParticleBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Slider } from '../components/ui/slider';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { ScrollArea } from '../components/ui/scroll-area';
import { Skeleton } from '../components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useScrollFadeIn, useStaggerChildren } from '../hooks/useGsapAnimations';
import { LayoutGrid, List, Camera, ZoomIn, ImageIcon } from 'lucide-react';

const galleryCategories = {
  campus: {
    label: 'School & Infrastructure',
    images: [
      { id: 1, src: 'mainBuilding.jpg', label: 'Main Building', color: 'from-blue-500/20 to-cyan-500/20', desc: 'The iconic main building with colonial architecture and modern amenities.' },
      { id: 2, src: 'prayer.jpeg', label: 'prayer Time', color: 'from-amber-500/20 to-orange-500/20', desc: 'Prayer time.' },
      { id: 3, src: 'sciencelab.jpg', label: 'Science Lab', color: 'from-green-500/20 to-emerald-500/20', desc: 'State-of-the-art physics, chemistry, and biology laboratories.' },
      { id: 4, src: 'computerlab.jpg', label: 'Computer Lab', color: 'from-purple-500/20 to-violet-500/20', desc: '60+ computers with high-speed internet for digital learning.' },
      { id: 5, src: 'sportGround.jpg', label: 'Sports Ground', color: 'from-red-500/20 to-pink-500/20', desc: 'Multi-sport facility with cricket, football, basketball, and athletics tracks.' },
      { id: 6, src: 'audio.jpg', label: 'Auditorium', color: 'from-indigo-500/20 to-blue-500/20', desc: '800-seat auditorium with professional lighting and sound systems.' },
      { id: 7, src: 'office.jpg', label: 'School Office', color: 'from-cyan-500/20 to-teal-500/20', desc: 'Main Office of Public Inter College' },
      { id: 8, src: 'walk.webp', label: 'Walk Area', color: 'from-yellow-500/20 to-amber-500/20', desc: 'Daily walk area for students and staff.' },
    ],
  },
  events: {
    label: 'Events & Celebrations',
    images: [
      { id: 9, src: 'tree.jpeg', label: 'Tree Planting', color: "Our Math's senior teacher is planting tree." },
      { id: 10, src: 'sport.jpeg', label: 'Sports Meet', color: 'from-orange-500/20 to-red-500/20', desc: 'Before starting the inter-house sports competition with over 300 participants.' },
      { id: 11, src: 'physic.jpg', label: 'Science Fair', color: 'from-teal-500/20 to-green-500/20', desc: 'Students showcasing innovative projects and experiments.' },
      { id: 12, src: 'cultrul.jpeg', label: 'Cultural Fest', color: 'from-violet-500/20 to-purple-500/20', desc: 'A celebration of art, music, dance, and drama performances.' },
      { id: 13, src: 'idep.jpeg', label: 'Republic Day', color: 'from-orange-500/20 to-amber-500/20', desc: 'Flag hoisting ceremony with Principle and guests attending.' },
      { id: 14, src: 'Rangoli.jpeg', label: 'Graduation Day', color: 'from-blue-500/20 to-indigo-500/20', desc: 'Celebrating the Rangoli day.' },
    ],
  },
  classroom: {
    label: 'Classroom Activities',
    images: [
      { id: 15, src: 'artclass.jpeg', label: 'Art Class', color: 'from-rose-500/20 to-pink-500/20', desc: 'Creative expression through painting, sketching, and mixed media.' },
      { id: 16, src: 'grouppro.jpg', label: 'Group Project', color: 'from-emerald-500/20 to-green-500/20', desc: 'Collaborative learning through team-based projects.' },
      { id: 17, src: 'smartclass.jpeg', label: 'Smart Classroom', color: 'from-blue-500/20 to-cyan-500/20', desc: 'Interactive smart boards enhancing digital learning.' },
      { id: 18, src: 'debate.jpg', label: 'Debate Session', color: 'from-red-500/20 to-orange-500/20', desc: 'Sharpening communication and critical thinking skills.' },
    ],
  },
};

const allImages = Object.values(galleryCategories).flatMap((cat) => cat.images);

const Gallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [imageSize, setImageSize] = useState([3]);
  // const [loading, setLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('campus');
  const [carouselApi, setCarouselApi] = useState(null);

  const heroRef = useScrollFadeIn({ y: 30 });
  const gridRef = useStaggerChildren({ stagger: 0.06 });

  const gridCols = {
    1: 'grid-cols-1 sm:grid-cols-2',
    2: 'grid-cols-2 sm:grid-cols-3',
    3: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    4: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5',
    5: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
  };

  const openLightbox = (imgId) => {
    const idx = allImages.findIndex((img) => img.id === imgId);
    const target = idx >= 0 ? idx : 0;
    setLightboxIndex(target);
    setLightboxOpen(true);
  };

  // Scroll carousel to correct slide when opened or API becomes available
  useEffect(() => {
    if (carouselApi && lightboxOpen) {
      carouselApi.scrollTo(lightboxIndex, true);
    }
  }, [carouselApi, lightboxOpen, lightboxIndex]);

  // Sync lightboxIndex when user navigates carousel
  const onCarouselSelect = useCallback(() => {
    if (!carouselApi) return;
    setLightboxIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on('select', onCarouselSelect);
    return () => carouselApi.off('select', onCarouselSelect);
  }, [carouselApi, onCarouselSelect]);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <ParticleBackground color="#ec4899" />
        <div className="absolute inset-0 z-[1] bg-background/80" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-14">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8">
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A glimpse into life at Public Inter College through pictures.
            <br />
            Our photo gallery showcase memorable  moments of learning, celebrations, and students activities and school's building.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <Badge variant="secondary" className="text-sm">
              <Camera className="h-3 w-3 mr-1" /> {allImages.length}+ Photos
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {Object.keys(galleryCategories).length} Categories
            </Badge>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="page-section pb-0 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v)}>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            {viewMode === 'grid' && (
              <div className="flex items-center gap-3 w-full sm:w-64">
                <ZoomIn className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Slider
                  value={imageSize}
                  onValueChange={setImageSize}
                  min={1}
                  max={5}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-6 text-right">{imageSize[0]}x</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="page-section ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
              <TabsTrigger value="campus">College</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="classroom">Classroom</TabsTrigger>
            </TabsList>

            {Object.entries(galleryCategories).map(([key, cat]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <h2 className="section-title">{cat.label}</h2>
                <ScrollArea className="w-full">
                  {viewMode === 'grid' ? (
                    <div ref={gridRef} className={`grid ${gridCols[imageSize[0]] || gridCols[3]} gap-4`}>
                      {cat.images.map((img) => (
                        <Card
                          key={img.id}
                          className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer overflow-hidden group"
                          onClick={() => openLightbox(img.id)}
                        >
                          <CardContent className="p-0">
                            <AspectRatio ratio={16 / 10}>
                              {img.src ? (
                                <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${img.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                                  <div className="text-center">
                                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                                    <span className="text-sm font-medium text-foreground/70">{img.label}</span>
                                  </div>
                                </div>
                              )}
                            </AspectRatio>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div ref={gridRef} className="space-y-3">
                      {cat.images.map((img) => (
                        <Card
                          key={img.id}
                          className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                          onClick={() => openLightbox(img.id)}
                        >
                          <CardContent className="py-4 flex items-center gap-4">
                            {img.src ? (
                              <img src={img.src} alt={img.label} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                            ) : (
                              <div className={`w-20 h-14 rounded-lg bg-gradient-to-br ${img.color} flex items-center justify-center flex-shrink-0`}>
                                <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{img.label}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-1">{img.desc}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ZoomIn className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Lightbox Dialog with Carousel */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl overflow-visible">
          <DialogHeader>
            <DialogTitle>{allImages[lightboxIndex]?.label}</DialogTitle>
            <DialogDescription>{allImages[lightboxIndex]?.desc}</DialogDescription>
          </DialogHeader>
          <Carousel setApi={setCarouselApi} opts={{ loop: true }}>
            <CarouselContent>
              {allImages.map((img) => (
                <CarouselItem key={img.id}>
                  <AspectRatio ratio={16 / 10}>
                    {img.src ? (
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${img.color} rounded-lg flex items-center justify-center`}>
                        <div className="text-center">
                          <ImageIcon className="h-16 w-16 mx-auto mb-3 text-muted-foreground/40" />
                          <p className="font-semibold text-lg">{img.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">{img.desc}</p>
                        </div>
                      </div>
                    )}
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 sm:-left-12" />
            <CarouselNext className="-right-4 sm:-right-12" />
          </Carousel>
        </DialogContent>
      </Dialog>

      {/* Social CTA */}
      <section className="page-section bg-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Follow Us for <span className="gradient-text">More</span></h2>
          <p className="section-subtitle mb-6">
            Stay updated with photos from school activities on our social media channels.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline">Facebook</Button>
            <Button variant="outline">Instagram</Button>
            <Button variant="outline">YouTube</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
