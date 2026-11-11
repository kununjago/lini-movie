'use client';

import React, { useState } from 'react';
import { Play, Film, X } from 'lucide-react';
import { VideoItem } from '@/types';

interface TrailerSectionProps {
  videos?: { results: VideoItem[] };
  youtubeId?: string | null;
  title: string;
}

export default function TrailerSection({ videos, youtubeId, title }: TrailerSectionProps) {
  // Find official trailer or teaser from TMDB videos
  const trailerVideo =
    videos?.results?.find(
      (v) =>
        v.site === 'YouTube' &&
        (v.type === 'Trailer' || v.type === 'Teaser' || v.type === 'Clip')
    ) || videos?.results?.find((v) => v.site === 'YouTube');

  const finalYoutubeKey = youtubeId || trailerVideo?.key;

  if (!finalYoutubeKey) {
    return null;
  }

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-white">Trailer Resmi</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
          YouTube HD
        </span>
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${finalYoutubeKey}?rel=0&modestbranding=1`}
          title={`${title} Trailer`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
