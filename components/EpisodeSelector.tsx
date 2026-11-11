'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Tv, Sparkles, ChevronDown, CheckCircle } from 'lucide-react';
import { TvEpisode, TvSeasonSummary } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

interface TvEpisodeSelectorProps {
  type: 'tv';
  tvId: string | number;
  currentSeason: number;
  currentEpisode: number;
  seasons: TvSeasonSummary[];
  episodes: TvEpisode[];
  onSelectSeason?: (seasonNumber: number) => void;
}

interface AnimeEpisodeSelectorProps {
  type: 'anime';
  malId: string | number;
  currentEpisode: number;
  totalEpisodes: number | null;
}

type EpisodeSelectorProps = TvEpisodeSelectorProps | AnimeEpisodeSelectorProps;

export default function EpisodeSelector(props: EpisodeSelectorProps) {
  // If Anime
  if (props.type === 'anime') {
    const { malId, currentEpisode, totalEpisodes } = props;
    const epCount = totalEpisodes && totalEpisodes > 0 ? totalEpisodes : 24;
    const [page, setPage] = useState(Math.floor((currentEpisode - 1) / 50));
    const pageSize = 50;
    const totalPages = Math.ceil(epCount / pageSize);

    const startIndex = page * pageSize + 1;
    const endIndex = Math.min((page + 1) * pageSize, epCount);
    const episodesRange = Array.from(
      { length: endIndex - startIndex + 1 },
      (_, i) => startIndex + i
    );

    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Daftar Episode Anime</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              Total {epCount} Episode
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {Array.from({ length: totalPages }, (_, idx) => {
                const s = idx * pageSize + 1;
                const e = Math.min((idx + 1) * pageSize, epCount);
                return (
                  <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      page === idx
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s}-{e}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Episode Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-72 overflow-y-auto pr-1">
          {episodesRange.map((epNum) => {
            const isActive = epNum === currentEpisode;
            return (
              <Link
                key={epNum}
                href={`/watch/anime/${malId}/${epNum}`}
                className={`py-2 px-2 rounded-xl text-center font-semibold text-xs transition-all duration-200 border flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/30 scale-105'
                    : 'bg-slate-950/60 text-slate-300 border-slate-800/80 hover:bg-slate-800 hover:text-sky-400 hover:border-sky-500/40'
                }`}
              >
                <span>EP</span>
                <span className="text-sm font-bold">{epNum}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // If TV Show
  const { tvId, currentSeason, currentEpisode, seasons, episodes } = props;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      {/* Header and Season Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Tv className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-white">Daftar Episode Serial</h3>
        </div>

        {/* Season Selector Tabs/Dropdown */}
        {seasons && seasons.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Musim:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {seasons
                .filter((s) => s.season_number > 0)
                .map((s) => {
                  const isCurrent = s.season_number === currentSeason;
                  return (
                    <Link
                      key={s.id || s.season_number}
                      href={`/watch/tv/${tvId}/${s.season_number}/1`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      Season {s.season_number}
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Episodes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
        {episodes.map((ep) => {
          const isActive =
            ep.season_number === currentSeason && ep.episode_number === currentEpisode;
          return (
            <Link
              key={ep.id || `${ep.season_number}-${ep.episode_number}`}
              href={`/watch/tv/${tvId}/${ep.season_number}/${ep.episode_number}`}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 group ${
                isActive
                  ? 'bg-sky-950/40 border-sky-500 shadow-md shadow-sky-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/80 hover:border-sky-500/30'
              }`}
            >
              {/* Episode Thumbnail */}
              <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60">
                <Image
                  src={getImageUrl(ep.still_path, 'w300')}
                  alt={ep.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                    isActive ? 'bg-sky-500/20' : 'bg-slate-950/40 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-sky-500 text-slate-950' : 'bg-white/90 text-slate-950'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 text-[10px] font-bold px-1 rounded bg-slate-950/80 text-slate-200">
                  EP {ep.episode_number}
                </span>
              </div>

              {/* Episode Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-semibold truncate ${
                      isActive ? 'text-sky-400' : 'text-slate-100 group-hover:text-sky-300'
                    }`}
                  >
                    {ep.episode_number}. {ep.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {ep.overview || 'Saksikan kelanjutan cerita menarik di episode ini.'}
                </p>
                {ep.air_date && (
                  <span className="text-[11px] text-slate-500 mt-1.5 block">
                    {ep.air_date}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
