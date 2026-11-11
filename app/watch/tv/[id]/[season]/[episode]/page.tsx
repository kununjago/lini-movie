import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Star, Calendar, Tv, Tag, Layers, ChevronLeft } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import EpisodeSelector from '@/components/EpisodeSelector';
import TrailerSection from '@/components/TrailerSection';
import PhotoGallery from '@/components/PhotoGallery';
import MediaRow from '@/components/MediaRow';
import { getTvDetails, getTvSeasonDetails, getTrendingTv, getImageUrl } from '@/lib/tmdb';

interface TvPageProps {
  params: Promise<{
    id: string;
    season: string;
    episode: string;
  }>;
}

export async function generateMetadata({ params }: TvPageProps): Promise<Metadata> {
  const { id, season, episode } = await params;
  const tv = await getTvDetails(id);
  if (!tv) {
    return { title: 'Serial Tidak Ditemukan' };
  }
  return {
    title: `Nonton ${tv.name} Season ${season} Episode ${episode} Sub Indo - Lini Movie`,
    description: tv.overview || `Streaming ${tv.name} S${season} E${episode} di Lini Movie.`
  };
}

export default async function TvWatchPage({ params }: TvPageProps) {
  const { id, season, episode } = await params;
  const seasonNum = parseInt(season, 10) || 1;
  const episodeNum = parseInt(episode, 10) || 1;

  const [tv, seasonData, trendingTv] = await Promise.all([
    getTvDetails(id),
    getTvSeasonDetails(id, seasonNum),
    getTrendingTv()
  ]);

  if (!tv) {
    notFound();
  }

  const currentEpInfo = seasonData?.episodes?.find(
    (e) => e.episode_number === episodeNum
  );

  const releaseYear = tv.first_air_date?.substring(0, 4) || '2024';
  const similarShows = trendingTv.filter((t) => String(t.id) !== String(id));

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-20">
      {/* Background Ambience Backdrop */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden">
        <Image
          src={getImageUrl(tv.backdrop_path || tv.poster_path, 'original')}
          alt={tv.name}
          fill
          className="object-cover blur-3xl scale-125"
          unoptimized
        />
        <div className="absolute inset-0 bg-slate-950/80" />
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
          <span className="text-slate-500">Serial TV</span>
          <span>/</span>
          <span className="text-sky-400 font-medium truncate max-w-xs sm:max-w-md">
            {tv.name} (S{seasonNum}:E{episodeNum})
          </span>
        </div>

        {/* 1. Main Video Player Section */}
        <section className="space-y-4">
          <VideoPlayer
            type="tv"
            id={tv.id}
            season={seasonNum}
            episode={episodeNum}
            title={`${tv.name} - S${seasonNum} E${episodeNum}`}
          />
        </section>

        {/* Current Episode Title & Overview Banner */}
        {currentEpInfo && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Sedang Diputar
              </span>
              <h2 className="text-lg font-bold text-white">
                Season {seasonNum} Episode {episodeNum}: {currentEpInfo.name}
              </h2>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                {currentEpInfo.overview || 'Episode pilihan dari musim ini.'}
              </p>
            </div>
            {currentEpInfo.vote_average > 0 && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {currentEpInfo.vote_average.toFixed(1)} Rating Ep
              </span>
            )}
          </div>
        )}

        {/* 2. Episode Selector Component */}
        <section>
          <EpisodeSelector
            type="tv"
            tvId={tv.id}
            currentSeason={seasonNum}
            currentEpisode={episodeNum}
            seasons={tv.seasons || []}
            episodes={seasonData?.episodes || []}
          />
        </section>

        {/* 3. TV Show Metadata & Information Section */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="relative w-36 sm:w-48 aspect-[2/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow-xl shadow-sky-950/20 hidden sm:block">
              <Image
                src={getImageUrl(tv.poster_path, 'w500')}
                alt={tv.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-sky-400">
                  Serial Televisi
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  {tv.name}
                </h1>
                {tv.tagline && (
                  <p className="text-sm italic text-slate-400 mt-1">&quot;{tv.tagline}&quot;</p>
                )}
              </div>

              {/* Badges / Metrics */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
                {tv.vote_average > 0 && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {tv.vote_average.toFixed(1)} / 10
                  </span>
                )}
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  {releaseYear}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  {tv.number_of_seasons || tv.seasons?.length || 1} Musim ({tv.number_of_episodes || 0} Episode)
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-600/40 font-mono text-xs">
                  Full HD
                </span>
              </div>

              {/* Genres */}
              {tv.genres && tv.genres.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Tag className="w-4 h-4 text-slate-400 mr-1" />
                  {tv.genres.map((g) => (
                    <span
                      key={g.id}
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
                  Sinopsis Serial
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {tv.overview || 'Sinopsis serial belum tersedia.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Official YouTube Trailer */}
        <TrailerSection
          videos={tv.videos}
          title={tv.name}
        />

        {/* 5. Backdrop Stills Photo Gallery */}
        <PhotoGallery
          images={tv.images}
          title={tv.name}
        />

        {/* 6. Rekomendasi Serial Lainnya */}
        {similarShows.length > 0 && (
          <MediaRow
            title="Serial TV Lainnya yang Populer"
            subtitle="Jelajahi serial menarik lainnya untuk mengisi waktu luangmu"
            items={similarShows}
            icon={<Tv className="w-5 h-5 text-sky-400" />}
          />
        )}
      </div>
    </div>
  );
}
