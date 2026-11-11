'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Info, Star, Calendar, ChevronRight, ChevronLeft, Volume2, Sparkles } from 'lucide-react';
import { MediaItem } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

interface HeroBannerProps {
  items: MediaItem[];
}

export default function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  const current = items[currentIndex] || items[0];
  const watchUrl =
    current.media_type === 'movie'
      ? `/watch/movie/${current.id}`
      : current.media_type === 'tv'
      ? `/watch/tv/${current.id}/1/1`
      : `/watch/anime/${current.id}/1`;

  const releaseYear =
    current.release_date?.substring(0, 4) ||
    current.first_air_date?.substring(0, 4) ||
    '2024';

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] min-h-[500px] max-h-[920px] overflow-hidden select-none bg-slate-950">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(current.backdrop_path, 'original')}
          alt={current.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-1000 scale-105"
          unoptimized
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24 z-10">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Trending #{currentIndex + 1}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {current.vote_average.toFixed(1)} Rating
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {releaseYear}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-sky-950/80 text-sky-300 border border-sky-600/40 font-mono tracking-wider text-[11px]">
              {current.quality || '4K UHD'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
            {current.title}
          </h1>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-4 max-w-xl drop-shadow">
            {current.overview || 'Tonton film ini di Lini Movie dengan kualitas streaming terbaik tanpa gangguan.'}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href={watchUrl}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Tonton Sekarang</span>
            </Link>

            <Link
              href={watchUrl}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-slate-700/80 hover:border-sky-500/40 transition-all duration-200"
            >
              <Info className="w-5 h-5 text-sky-400" />
              <span>Detail Info</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {items.length > 1 && (
        <div className="absolute right-6 bottom-20 z-20 hidden md:flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
            aria-label="Previous item"
            className="w-10 h-10 rounded-full bg-slate-900/70 hover:bg-sky-500 text-slate-300 hover:text-slate-950 border border-slate-700/60 hover:border-sky-400 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
            aria-label="Next item"
            className="w-10 h-10 rounded-full bg-slate-900/70 hover:bg-sky-500 text-slate-300 hover:text-slate-950 border border-slate-700/60 hover:border-sky-400 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Carousel dots */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {items.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-sky-400 shadow-md shadow-sky-400/50'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Pindah ke slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
