import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Star, Calendar, Clock, Sparkles, Tag, ChevronLeft, ShieldAlert } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import EpisodeSelector from '@/components/EpisodeSelector';
import TrailerSection from '@/components/TrailerSection';
import PhotoGallery from '@/components/PhotoGallery';
import MediaRow from '@/components/MediaRow';
import { getAnimeDetails, getTopAnime } from '@/lib/anime';

interface AnimePageProps {
  params: Promise<{
    mal_id: string;
    episode: string;
  }>;
}

export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const { mal_id, episode } = await params;
  const anime = await getAnimeDetails(mal_id);
  if (!anime) {
    return { title: 'Anime Tidak Ditemukan' };
  }
  const displayTitle = anime.title_english || anime.title;
  return {
    title: `Nonton ${displayTitle} Episode ${episode} Sub Indo - Lini Movie`,
    description: anime.synopsis || `Streaming ${displayTitle} Episode ${episode} gratis di Lini Movie.`
  };
}

export default async function AnimeWatchPage({ params }: AnimePageProps) {
  const { mal_id, episode } = await params;
  const episodeNum = parseInt(episode, 10) || 1;

  const [anime, topAnime] = await Promise.all([
    getAnimeDetails(mal_id),
    getTopAnime()
  ]);

  if (!anime) {
    notFound();
  }

  const posterImg =
    anime.images?.webp?.large_image_url ||
    anime.images?.jpg?.large_image_url ||
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800';

  const otherAnime = topAnime.filter((a) => String(a.id) !== String(mal_id));

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-20">
      {/* Ambience Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden">
        <Image
          src={posterImg}
          alt={anime.title}
          fill
          className="object-cover blur-3xl scale-125"
          unoptimized
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-sky-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Beranda
          </Link>
          <span>/</span>
          <span className="text-slate-500">Anime</span>
          <span>/</span>
          <span className="text-sky-400 font-medium truncate max-w-xs sm:max-w-md">
            {anime.title_english || anime.title} (Ep {episodeNum})
          </span>
        </div>

        {/* 1. Main Video Player Section */}
        <section className="space-y-4">
          <VideoPlayer
            type="anime"
            id={anime.mal_id}
            episode={episodeNum}
            title={`${anime.title_english || anime.title} - Episode ${episodeNum}`}
            initialAudio="sub"
          />
        </section>

        {/* 2. Anime Episode Selector */}
        <section>
          <EpisodeSelector
            type="anime"
            malId={anime.mal_id}
            currentEpisode={episodeNum}
            totalEpisodes={anime.episodes}
          />
        </section>

        {/* 3. Anime Information Details */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="relative w-36 sm:w-48 aspect-[2/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow-xl shadow-sky-950/20 hidden sm:block">
              <Image
                src={posterImg}
                alt={anime.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-pink-400">
                    Anime Series
                  </span>
                  {anime.title_japanese && (
                    <span className="text-xs text-slate-400 font-light font-mono">
                      {anime.title_japanese}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  {anime.title_english || anime.title}
                </h1>
                {anime.title_english && anime.title !== anime.title_english && (
                  <p className="text-sm text-slate-400 mt-0.5">Judul Jepang: {anime.title}</p>
                )}
              </div>

              {/* Badges / Metrics */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
                {anime.score > 0 && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {anime.score.toFixed(2)} / 10 (MAL)
                  </span>
                )}
                {anime.year && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    {anime.year}
                  </span>
                )}
                {anime.duration && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    {anime.duration}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-600/40 font-mono text-xs">
                  {anime.episodes ? `${anime.episodes} Ep` : 'Ongoing'}
                </span>
                {anime.rating && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs">
                    <ShieldAlert className="w-3 h-3 text-amber-400" />
                    {anime.rating.split(' ')[0]}
                  </span>
                )}
              </div>

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Tag className="w-4 h-4 text-slate-400 mr-1" />
                  {anime.genres.map((g) => (
                    <span
                      key={g.mal_id}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-800/80 text-sky-300 border border-sky-500/20"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Sinopsis Anime
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {anime.synopsis || 'Sinopsis anime belum tersedia.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Official YouTube Trailer */}
        {anime.trailer?.youtube_id && (
          <TrailerSection
            youtubeId={anime.trailer.youtube_id}
            title={anime.title_english || anime.title}
          />
        )}

        {/* 5. Rekomendasi Anime Lainnya */}
        {otherAnime.length > 0 && (
          <MediaRow
            title="Anime Populer Lainnya"
            subtitle="Jelajahi petualangan anime teratas yang sedang trending"
            items={otherAnime}
            icon={<Sparkles className="w-5 h-5 text-sky-400" />}
          />
        )}
      </div>
    </div>
  );
}
