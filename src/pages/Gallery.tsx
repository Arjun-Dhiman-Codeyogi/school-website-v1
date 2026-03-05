import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

const categories = ["All", "Campus", "Sports", "Cultural", "Academic"];

const galleryItems = [
  { src: "/image/mainBuilding.jpg", category: "Campus", title: "Main Building" },
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600", category: "Academic", title: "Science Lab" },
  { src: "https://images.unsplash.com/photo-1461896836934-bd45ba7b4c28?w=600", category: "Sports", title: "Sports Day" },
  { src: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600", category: "Cultural", title: "Annual Day" },
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600", category: "Campus", title: "Library" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600", category: "Academic", title: "Classroom" },
  { src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600", category: "Sports", title: "Swimming Pool" },
  { src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=600", category: "Cultural", title: "Music Room" },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600", category: "Academic", title: "Study Area" },
  { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600", category: "Sports", title: "Football Ground" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600", category: "Campus", title: "Corridor" },
  { src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600", category: "Academic", title: "Computer Lab" },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div>
      <section className="page-section pt-24 md:pt-32 text-center">
        <div className="container mx-auto">
          <h1 className="section-title">
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Explore life at Nova Academy through our lens.
          </p>
        </div>
      </section>

      <section className="page-section pt-8">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-accent tracking-wider transition-all duration-300",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground neon-glow"
                    : "glass-card border hover-neon-card text-muted-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <div
                key={i}
                className="break-inside-avoid glass-card rounded-xl border overflow-hidden hover-neon-card cursor-pointer group"
                onClick={() => setLightbox(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="font-heading text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-primary font-accent tracking-wider uppercase">{item.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 p-2 glass-card rounded-lg border" onClick={() => setLightbox(null)}>
            <X className="h-6 w-6" />
          </button>
          <img
            src={filtered[lightbox].src.replace("w=600", "w=1200")}
            alt={filtered[lightbox].title}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
