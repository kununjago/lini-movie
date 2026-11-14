import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import MediaRow from '@/components/MediaRow';
import FixedAd from '@/components/FixedAd';
import { getTrendingMovies, getTrendingTv } from '@/lib/tmdb';
import { getTopAnime } from '@/lib/anime';
import { Tv, Sparkles, Flame } from 'lucide-react';

export const revalidate = 3600; // ISR 1 hour

export default async function HomePage() {
  const [trendingMovies, trendingTv, topAnime] = await Promise.all([
    getTrendingMovies(),
    getTrendingTv(),
    getTopAnime(),
  ]);

  // Combine top trending movies and tv for Hero banner rotation
  const heroItems = [...trendingMovies.slice(0, 5), ...trendingTv.slice(0, 3)];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 1. Hero Section Banner with Random / Trending Selection */}
      <HeroBanner items={heroItems} />

      {/* 2. Content Rows */}
      <div className="relative -mt-12 sm:-mt-16 z-20 space-y-6 sm:space-y-8 pb-16">
        {/* Film Trending Row */}
        <MediaRow
          id="film"
          title="Film Trending Minggu Ini"
          subtitle="Pilihan blockbuster paling hangat yang wajib kamu tonton"
          items={trendingMovies}
          icon={<Flame className="w-6 h-6 text-sky-400" />}
        />

        {/* Slot Iklan Banner Permanen (A-Ads) di Halaman Utama */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FixedAd adUnitId="2462042" />
        </div>

        {/* TV Shows Row */}
        <MediaRow
          id="tv"
          title="Serial TV Populer"
          subtitle="Drama dan petualangan serial terbaik dengan episode lengkap"
          items={trendingTv}
          icon={<Tv className="w-6 h-6 text-sky-400" />}
        />

        {/* Anime Row */}
        <MediaRow
          id="anime"
          title="Anime Pilihan & Teratas"
          subtitle="Petualangan anime jepang spektakuler dengan pilihan Sub & Dub"
          items={topAnime}
          icon={<Sparkles className="w-6 h-6 text-sky-400" />}
        />
      </div>
    </div>
  );
}
