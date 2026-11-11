import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import { MediaItem } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

interface MediaCardProps {
  item: MediaItem;
}

export default function MediaCard({ item }: MediaCardProps) {
  const watchUrl =
    item.media_type === 'movie'
      ? `/watch/movie/${item.id}`
      : item.media_type === 'tv'
      ? `/watch/tv/${item.id}/1/1`
      : `/watch/anime/${item.id}/1`;

  const releaseYear =
    item.release_date?.substring(0, 4) ||
    item.first_air_date?.substring(0, 4) ||
    '';

  return (
    <Link
      href={watchUrl}
      className="group relative flex-none w-[160px] sm:w-[190px] md:w-[220px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-sky-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden">
        <Image
          src={getImageUrl(item.poster_path, 'w500')}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 160px, (max-width: 768px) 190px, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-sky-400 border border-sky-500/30 font-mono">
            {item.quality || 'HD'}
          </span>
          {item.vote_average > 0 && (
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-amber-400 flex items-center gap-0.5 border border-amber-500/30">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>

        {/* Hover Overlay with Play Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg shadow-sky-500/50 scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info footer */}
      <div className="p-3 bg-gradient-to-b from-slate-900 to-slate-950">
        <h3 className="text-sm font-semibold text-slate-100 truncate group-hover:text-sky-400 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
          <span>{releaseYear || (item.media_type === 'anime' ? 'Anime' : 'Series')}</span>
          <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
            {item.media_type === 'movie' ? 'Movie' : item.media_type === 'tv' ? 'TV' : 'Anime'}
          </span>
        </div>
      </div>
    </Link>
  );
}
