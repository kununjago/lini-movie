import { MediaItem, MovieDetails, TvDetails, TvSeasonDetails, SearchResultItem } from '@/types';
import { MOCK_TRENDING_MOVIES, MOCK_TRENDING_TV, MOCK_MOVIE_DETAILS, MOCK_TV_DETAILS, MOCK_TV_SEASON } from './mock-data';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const isApiKeyConfigured = (): boolean => {
  return (
    !!TMDB_API_KEY &&
    TMDB_API_KEY.trim() !== '' &&
    TMDB_API_KEY !== 'masukkan_api_key_tmdb_kamu'
  );
};

export const getImageUrl = (
  path: string | null | undefined,
  size: 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'
): string => {
  if (!path) {
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export async function getTrendingMovies(): Promise<MediaItem[]> {
  if (!isApiKeyConfigured()) {
    return MOCK_TRENDING_MOVIES;
  }

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=id-ID`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      // Try english language if indonesian fails
      const fallbackRes = await fetch(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`,
        { next: { revalidate: 3600 } }
      );
      if (!fallbackRes.ok) return MOCK_TRENDING_MOVIES;
      const data = await fallbackRes.json();
      return mapTmdbResults(data.results, 'movie');
    }

    const data = await res.json();
    return mapTmdbResults(data.results, 'movie');
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return MOCK_TRENDING_MOVIES;
  }
}

export async function getTrendingTv(): Promise<MediaItem[]> {
  if (!isApiKeyConfigured()) {
    return MOCK_TRENDING_TV;
  }

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&language=id-ID`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const fallbackRes = await fetch(
        `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&language=en-US`,
        { next: { revalidate: 3600 } }
      );
      if (!fallbackRes.ok) return MOCK_TRENDING_TV;
      const data = await fallbackRes.json();
      return mapTmdbResults(data.results, 'tv');
    }

    const data = await res.json();
    return mapTmdbResults(data.results, 'tv');
  } catch (error) {
    console.error('Error fetching trending tv:', error);
    return MOCK_TRENDING_TV;
  }
}

export async function getMovieDetails(id: string | number): Promise<MovieDetails | null> {
  const numericId = Number(id);

  if (!isApiKeyConfigured()) {
    if (MOCK_MOVIE_DETAILS[numericId]) {
      return MOCK_MOVIE_DETAILS[numericId];
    }
    const found = MOCK_TRENDING_MOVIES.find((m) => m.id === numericId);
    if (found) {
      return {
        id: Number(found.id),
        title: found.title,
        overview: found.overview,
        poster_path: found.poster_path,
        backdrop_path: found.backdrop_path,
        vote_average: found.vote_average,
        release_date: found.release_date || '2024-01-01',
        runtime: 120,
        tagline: 'Sensasi menonton bioskop terbaik.',
        status: 'Released',
        genres: found.genres || [{ id: 28, name: 'Action' }],
        videos: {
          results: [{
            id: 'mock-trailer',
            key: 'dQw4w9WgXcQ',
            name: 'Official Trailer',
            site: 'YouTube',
            type: 'Trailer'
          }]
        },
        images: {
          backdrops: found.backdrop_path ? [{ file_path: found.backdrop_path }] : [],
          posters: found.poster_path ? [{ file_path: found.poster_path }] : []
        }
      };
    }
    return MOCK_MOVIE_DETAILS[693134] || null;
  }

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images,credits,similar&language=id-ID`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const fallbackRes = await fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images,credits,similar&language=en-US`,
        { next: { revalidate: 3600 } }
      );
      if (!fallbackRes.ok) return MOCK_MOVIE_DETAILS[numericId] || null;
      return await fallbackRes.json();
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    return MOCK_MOVIE_DETAILS[numericId] || null;
  }
}

export async function getTvDetails(id: string | number): Promise<TvDetails | null> {
  const numericId = Number(id);

  if (!isApiKeyConfigured()) {
    if (MOCK_TV_DETAILS[numericId]) {
      return MOCK_TV_DETAILS[numericId];
    }
    const found = MOCK_TRENDING_TV.find((t) => t.id === numericId);
    if (found) {
      return {
        id: Number(found.id),
        name: found.title,
        overview: found.overview,
        poster_path: found.poster_path,
        backdrop_path: found.backdrop_path,
        vote_average: found.vote_average,
        first_air_date: found.first_air_date || '2023-01-01',
        episode_run_time: [45],
        number_of_seasons: 2,
        number_of_episodes: 16,
        seasons: [
          {
            id: 1,
            name: 'Season 1',
            overview: 'Season 1 of ' + found.title,
            season_number: 1,
            episode_count: 8,
            poster_path: found.poster_path
          },
          {
            id: 2,
            name: 'Season 2',
            overview: 'Season 2 of ' + found.title,
            season_number: 2,
            episode_count: 8,
            poster_path: found.poster_path
          }
        ],
        genres: found.genres || [{ id: 18, name: 'Drama' }],
        tagline: 'Serial pilihan terbaik untukmu.',
        status: 'Returning Series',
        videos: {
          results: [{
            id: 'mock-tv-trailer',
            key: 'fXmAurh012s',
            name: 'Official Trailer',
            site: 'YouTube',
            type: 'Trailer'
          }]
        },
        images: {
          backdrops: found.backdrop_path ? [{ file_path: found.backdrop_path }] : [],
          posters: found.poster_path ? [{ file_path: found.poster_path }] : []
        }
      };
    }
    return MOCK_TV_DETAILS[94605] || null;
  }

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images,credits,similar&language=id-ID`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const fallbackRes = await fetch(
        `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images,credits,similar&language=en-US`,
        { next: { revalidate: 3600 } }
      );
      if (!fallbackRes.ok) return MOCK_TV_DETAILS[numericId] || null;
      return await fallbackRes.json();
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching tv ${id}:`, error);
    return MOCK_TV_DETAILS[numericId] || null;
  }
}

export async function getTvSeasonDetails(
  id: string | number,
  seasonNumber: number
): Promise<TvSeasonDetails | null> {
  const cacheKey = `${id}-${seasonNumber}`;

  if (!isApiKeyConfigured()) {
    if (MOCK_TV_SEASON[cacheKey]) {
      return MOCK_TV_SEASON[cacheKey];
    }
    // Generate fallback episodes if season exists
    return {
      id: Number(id),
      name: `Season ${seasonNumber}`,
      overview: `Episode daftar Season ${seasonNumber}`,
      season_number: seasonNumber,
      poster_path: null,
      episodes: Array.from({ length: 10 }, (_, i) => ({
        id: Number(id) * 100 + i + 1,
        name: `Episode ${i + 1}`,
        overview: `Petualangan seru di Season ${seasonNumber} Episode ${i + 1}.`,
        episode_number: i + 1,
        season_number: seasonNumber,
        air_date: '2024-01-01',
        still_path: null,
        vote_average: 8.5
      }))
    };
  }

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=id-ID`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const fallbackRes = await fetch(
        `${TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=en-US`,
        { next: { revalidate: 3600 } }
      );
      if (!fallbackRes.ok) return MOCK_TV_SEASON[cacheKey] || null;
      return await fallbackRes.json();
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching season ${seasonNumber} for tv ${id}:`, error);
    return MOCK_TV_SEASON[cacheKey] || null;
  }
}

export async function searchTmdb(query: string): Promise<SearchResultItem[]> {
  if (!query || query.trim() === '') return [];

  if (!isApiKeyConfigured()) {
    const q = query.toLowerCase();
    const movieMatches = MOCK_TRENDING_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(q)
    ).map((m) => ({
      id: Number(m.id),
      title: m.title,
      overview: m.overview,
      poster_path: m.poster_path,
      backdrop_path: m.backdrop_path,
      vote_average: m.vote_average,
      release_date: m.release_date,
      media_type: 'movie' as const
    }));

    const tvMatches = MOCK_TRENDING_TV.filter((t) =>
      t.title.toLowerCase().includes(q)
    ).map((t) => ({
      id: Number(t.id),
      title: t.title,
      overview: t.overview,
      poster_path: t.poster_path,
      backdrop_path: t.backdrop_path,
      vote_average: t.vote_average,
      release_date: t.first_air_date,
      media_type: 'tv' as const
    }));

    return [...movieMatches, ...tvMatches];
  }

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US`,
      { cache: 'no-store' }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return (data.results || [])
      .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
      .map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        overview: item.overview || '',
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: item.vote_average || 0,
        release_date: item.release_date || item.first_air_date,
        media_type: item.media_type
      }));
  } catch (error) {
    console.error('Error searching TMDB:', error);
    return [];
  }
}

function mapTmdbResults(results: any[], defaultType: 'movie' | 'tv'): MediaItem[] {
  if (!Array.isArray(results)) return [];
  return results.map((item) => ({
    id: item.id,
    title: item.title || item.name,
    overview: item.overview || '',
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    vote_average: Number((item.vote_average || 0).toFixed(1)),
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    media_type: defaultType,
    quality: item.vote_average > 7.5 ? '4K UHD' : 'HD'
  }));
}
