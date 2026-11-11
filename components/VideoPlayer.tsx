'use client';

import React, { useState } from 'react';
import { Play, RotateCw, ExternalLink, ShieldCheck, Film, Volume2, Sparkles } from 'lucide-react';

interface VideoPlayerProps {
  type: 'movie' | 'tv' | 'anime';
  id: string | number;
  season?: number;
  episode?: number;
  title?: string;
  initialAudio?: 'sub' | 'dub';
}

export default function VideoPlayer({
  type,
  id,
  season = 1,
  episode = 1,
  title,
  initialAudio = 'sub'
}: VideoPlayerProps) {
  const [audio, setAudio] = useState<'sub' | 'dub'>(initialAudio);
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // VidLink precise URL generation according to specification
  let embedUrl = '';
  if (type === 'movie') {
    embedUrl = `https://vidlink.pro/movie/${id}`;
  } else if (type === 'tv') {
    embedUrl = `https://vidlink.pro/tv/${id}/${season}/${episode}`;
  } else if (type === 'anime') {
    embedUrl = `https://vidlink.pro/anime/${id}/${episode}/${audio}`;
  }

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="w-full space-y-3">
      {/* Player Header Bar with Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-slate-300">
            Pemutar VidLink HD
          </span>
          {type === 'tv' && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
              S{season} : E{episode}
            </span>
          )}
          {type === 'anime' && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
              Episode {episode}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sub / Dub selector for Anime */}
          {type === 'anime' && (
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setAudio('sub')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  audio === 'sub'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SUB (JP)
              </button>
              <button
                type="button"
                onClick={() => setAudio('dub')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  audio === 'dub'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DUB (EN)
              </button>
            </div>
          )}

          {/* Refresh player button */}
          <button
            type="button"
            onClick={handleReload}
            title="Muat ulang pemutar jika video macet"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 text-xs font-medium transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh Player</span>
          </button>
        </div>
      </div>

      {/* Embedded Iframe Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-sky-500/20 shadow-2xl shadow-sky-950/30 group">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-400">
            <div className="w-12 h-12 border-3 border-sky-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-300">Menghubungkan ke VidLink Server...</p>
            <p className="text-xs text-slate-500 mt-1">Harap tunggu beberapa detik</p>
          </div>
        )}

        <iframe
          key={`${embedUrl}-${reloadKey}`}
          src={embedUrl}
          title={title || 'VidLink Player'}
          className="w-full h-full border-0 relative z-20"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Streaming Tip Alert */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Gunakan Adblock/Brave Browser untuk pengalaman streaming yang lebih nyaman dan tanpa iklan popup.</span>
        </div>
        <span className="hidden md:inline font-mono text-[11px] text-sky-400/80">1080p Full HD</span>
      </div>
    </div>
  );
}
