'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '@/types';
import MediaCard from './MediaCard';

interface MediaRowProps {
  id?: string;
  title: string;
  items: MediaItem[];
  icon?: React.ReactNode;
  subtitle?: string;
}

export default function MediaRow({ id, title, items, icon, subtitle }: MediaRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section id={id} className="relative py-6 sm:py-8 group/row">
      {/* Row Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-sky-400">{icon}</span>}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover/row:text-sky-300 transition-colors">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Row Carousel Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            aria-label="Gulir ke kiri"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/90 text-white hover:text-sky-400 hover:bg-slate-900 border border-sky-500/30 flex items-center justify-center shadow-xl shadow-slate-950/80 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            aria-label="Gulir ke kanan"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/90 text-white hover:text-sky-400 hover:bg-slate-900 border border-sky-500/30 flex items-center justify-center shadow-xl shadow-slate-950/80 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {items.map((item) => (
            <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
