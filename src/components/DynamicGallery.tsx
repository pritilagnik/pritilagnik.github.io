import React, { useState, useEffect } from 'react';
import {
  Play,
  Maximize2,
  X,
  Sparkles,
  Video as VideoIcon,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { GalleryItem } from '../types';
import { fetchDynamicGalleryItems } from '../services/registrationService';

interface DynamicGalleryProps {
  title?: string;
  subtitle?: string;
}

export const DynamicGallery: React.FC<DynamicGalleryProps> = ({
  title = "Dynamic Media & Visual Gallery",
  subtitle = "Experience the spiritual grandeur, community seva, and cultural confluences of past and present celebrations at West Dangarkuthi, Dotma."
}) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    fetchDynamicGalleryItems().then(data => {
      setItems(data);
      if (data.length > 0) setSelectedItem(data[0]);
    });
  }, []);

  const categories = ['All', 'Rituals', 'Past Gatherings', 'Prasadam', 'Cultural', 'Venue'];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const handleSelectMedia = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsPlayingVideo(item.type === 'video');
  };

  const currentIndex = selectedItem ? filteredItems.findIndex(i => i.id === selectedItem.id) : 0;

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
    setIsPlayingVideo(filteredItems[nextIdx].type === 'video');
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
    setIsPlayingVideo(filteredItems[prevIdx].type === 'video');
  };

  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-stone-50 dark:bg-stone-900/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Media Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            {title}
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {selectedItem && (
          <>
            {/* Feature Player Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border border-stone-300 dark:border-stone-800 mb-8">
              <div className="relative aspect-video max-h-[580px] w-full flex items-center justify-center">
                {selectedItem.type === 'video' && isPlayingVideo ? (
                  isYouTube(selectedItem.url) ? (
                    <iframe
                      src={(() => {
                        const embed = getEmbedUrl(selectedItem.url);
                        return embed.includes('?') ? `${embed}&autoplay=1` : `${embed}?autoplay=1`;
                      })()}
                      title={selectedItem.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                      poster={selectedItem.thumbnail}
                      key={selectedItem.id}
                    >
                      <source src={selectedItem.url} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  )
                ) : (
                  <div className="relative w-full h-full group">
                    <img
                      src={selectedItem.type === 'video' ? selectedItem.thumbnail : selectedItem.url}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                          {selectedItem.category} · {selectedItem.year || "2026"}
                        </span>

                        <button
                          onClick={() => setLightboxOpen(true)}
                          className="p-2 rounded-lg bg-black/60 hover:bg-black text-white backdrop-blur-sm transition-colors"
                          title="Open full-screen view"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Center Play Button if Video */}
                      {selectedItem.type === 'video' && (
                        <div className="self-center">
                          <button
                            onClick={() => setIsPlayingVideo(true)}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 ring-4 ring-white/40"
                            aria-label="Play video"
                          >
                            <Play className="w-8 h-8 fill-stone-950 ml-1" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Captions */}
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-cinzel font-bold text-white leading-tight">
                          {selectedItem.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-stone-200 max-w-3xl line-clamp-2">
                          {selectedItem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Previous & Next overlay buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Thumbnail Selector Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Media Highlights (Click thumbnail to view or play)
                </h4>
                <span className="text-xs text-stone-400">
                  Showing {filteredItems.length} items
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {filteredItems.map((item) => {
                  const isSelected = item.id === selectedItem.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectMedia(item)}
                      className={`group relative rounded-xl overflow-hidden aspect-[4/3] text-left transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-md scale-102'
                          : 'border-transparent hover:border-amber-300 dark:hover:border-stone-700 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Icon Badge */}
                      <div className="absolute top-2 right-2 p-1 rounded-md bg-black/60 text-white text-[10px]">
                        {item.type === 'video' ? (
                          <VideoIcon className="w-3 h-3 text-amber-400" />
                        ) : (
                          <ImageIcon className="w-3 h-3 text-stone-200" />
                        )}
                      </div>

                      {/* Thumbnail Title */}
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <p className="text-[11px] font-medium text-white line-clamp-1 leading-snug">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors z-10"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            {selectedItem.type === 'video' ? (
              isYouTube(selectedItem.url) ? (
                <iframe
                  src={getEmbedUrl(selectedItem.url)}
                  title={selectedItem.title}
                  className="w-full aspect-video rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="max-h-[75vh] w-full object-contain rounded-lg"
                >
                  <source src={selectedItem.url} type="video/mp4" />
                </video>
              )
            ) : (
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
            )}
            <div className="mt-4 text-center text-white">
              <h4 className="text-lg font-serif-cinzel font-semibold text-amber-300">
                {selectedItem.title}
              </h4>
              <p className="text-xs text-stone-300 max-w-2xl mx-auto mt-1">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
