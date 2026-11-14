import type { MetadataRoute } from 'next';
import { getTrendingMovies, getTrendingTv } from '@/lib/tmdb';
import { getTopAnime } from '@/lib/anime';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie.golini.cloud';

// Revalidasi sitemap secara periodik (setiap 24 jam)
export const revalidate = 86400;

function parseDateSafely(dateStr?: string | null): Date {
  if (!dateStr) return new Date();
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Halaman Utama (Home) dengan prioritas tinggi - Selalu di-generate tanpa bergantung pada API eksternal
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Dynamic Routes (Film, Serial TV, & Anime)
  let movieRoutes: MetadataRoute.Sitemap = [];
  let tvRoutes: MetadataRoute.Sitemap = [];
  let animeRoutes: MetadataRoute.Sitemap = [];

  try {
    // Gunakan Promise.allSettled agar kegagalan 1 API (misal timeout Jikan) tidak membatalkan yang lain
    const results = await Promise.allSettled([
      getTrendingMovies(),
      getTrendingTv(),
      getTopAnime(),
    ]);

    const trendingMovies =
      results[0].status === 'fulfilled' && Array.isArray(results[0].value)
        ? results[0].value
        : [];
    const trendingTv =
      results[1].status === 'fulfilled' && Array.isArray(results[1].value)
        ? results[1].value
        : [];
    const topAnime =
      results[2].status === 'fulfilled' && Array.isArray(results[2].value)
        ? results[2].value
        : [];

    // Rute dinamis film: /watch/movie/[id]
    movieRoutes = trendingMovies
      .filter((movie) => movie && movie.id)
      .map((movie) => ({
        url: `${BASE_URL}/watch/movie/${movie.id}`,
        lastModified: parseDateSafely(movie.release_date),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    // Rute dinamis serial TV: /watch/tv/[id]/[season]/[episode]
    tvRoutes = trendingTv
      .filter((tv) => tv && tv.id)
      .map((tv) => ({
        url: `${BASE_URL}/watch/tv/${tv.id}/1/1`,
        lastModified: parseDateSafely(tv.first_air_date),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    // Rute dinamis anime: /watch/anime/[mal_id]/[episode]
    animeRoutes = topAnime
      .filter((anime) => anime && anime.id)
      .map((anime) => ({
        url: `${BASE_URL}/watch/anime/${anime.id}/1`,
        lastModified: parseDateSafely(anime.release_date),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Error saat membangun dynamic sitemap (fallback ke staticRoutes):', error);
  }

  // Jika API eksternal mengalami gangguan/timeout, sitemap tetap berhasil mengembalikan rute Home
  return [...staticRoutes, ...movieRoutes, ...tvRoutes, ...animeRoutes];
}
