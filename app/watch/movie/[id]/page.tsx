import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Star, Clock, Calendar, Film, Heart, Share2, Tag, ChevronLeft } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import TrailerSection from '@/components/TrailerSection';
import PhotoGallery from '@/components/PhotoGallery';
import MediaRow from '@/components/MediaRow';
import { getMovieDetails, getTrendingMovies, getImageUrl } from '@/lib/tmdb';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) {
    return { title: 'Film Tidak Ditemukan' };
  }
  return {
    title: `Nonton ${movie.title} Sub Indo - Lini Movie`,
    description: movie.overview || `Streaming ${movie.title} full movie kualitas HD di Lini Movie.`
  };
}

export default async function MovieWatchPage({ params }: MoviePageProps) {
  const { id } = await params;
  const [movie, trendingMovies] = await Promise.all([
    getMovieDetails(id),
    getTrendingMovies()
  ]);

  if (!movie) {
    notFound();
  }

  // Format runtime into hours and minutes
  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;
  const runtimeFormatted = hours > 0 ? `${hours}j ${minutes}m` : `${minutes} menit`;
  const releaseYear = movie.release_date?.substring(0, 4) || '2024';

  const similarMovies = (movie.similar?.results && movie.similar.results.length > 0)
    ? movie.similar.results.map((m) => ({ ...m, media_type: 'movie' as const }))
    : trendingMovies.filter((m) => String(m.id) !== String(id));

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-20">
      {/* Background Ambience Backdrop */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden">
        <Image
          src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
          alt={movie.title}
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
          <span className="text-slate-500">Film</span>
          <span>/</span>
          <span className="text-sky-400 font-medium truncate max-w-xs sm:max-w-md">
            {movie.title}
          </span>
        </div>

        {/* 1. Main Video Player Section */}
        <section className="space-y-4">
          <VideoPlayer
            type="movie"
            id={movie.id}
            title={movie.title}
          />
        </section>

        {/* 2. Movie Metadata & Information Section */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Poster thumbnail */}
            <div className="relative w-36 sm:w-48 aspect-[2/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow-xl shadow-sky-950/20 hidden sm:block">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-sky-400">
                  Film Layar Lebar
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-sm italic text-slate-400 mt-1">&quot;{movie.tagline}&quot;</p>
                )}
              </div>

              {/* Badges / Metrics */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {movie.vote_average.toFixed(1)} / 10
                  </span>
                )}
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  {releaseYear}
                </span>
                {movie.runtime > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    {runtimeFormatted}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-600/40 font-mono text-xs">
                  4K UHD
                </span>
                {movie.status && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
                    {movie.status}
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Tag className="w-4 h-4 text-slate-400 mr-1" />
                  {movie.genres.map((g) => (
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
                  Sinopsis Lengkap
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {movie.overview || 'Sinopsis untuk film ini belum ditambahkan.'}
                </p>
              </div>

              {/* Cast Members */}
              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Pemeran Utama:
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {movie.credits.cast.slice(0, 6).map((c) => (
                      <span
                        key={c.id}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        <strong className="text-white">{c.name}</strong> as {c.character}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. Official YouTube Trailer */}
        <TrailerSection
          videos={movie.videos}
          title={movie.title}
        />

        {/* 4. Backdrop Stills Photo Gallery */}
        <PhotoGallery
          images={movie.images}
          title={movie.title}
        />

        {/* 5. Rekomendasi Film Terkait */}
        {similarMovies.length > 0 && (
          <MediaRow
            title="Film Serupa & Rekomendasi Lainnya"
            subtitle="Tayangan seru pilihan yang mirip dengan film ini"
            items={similarMovies}
            icon={<Film className="w-5 h-5 text-sky-400" />}
          />
        )}
      </div>
    </div>
  );
}
