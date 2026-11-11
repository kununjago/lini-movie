import { AnimeItem, MediaItem } from '@/types';
import { MOCK_ANIME_LIST, MOCK_ANIME_DETAILS } from './mock-data';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

export async function getTopAnime(): Promise<MediaItem[]> {
  try {
    const res = await fetch(`${JIKAN_BASE_URL}/top/anime?limit=15&filter=bypopularity`, {
      next: { revalidate: 86400 } // cache for 1 day
    });

    if (!res.ok) {
      return MOCK_ANIME_LIST;
    }

    const json = await res.json();
    if (!json.data || !Array.isArray(json.data)) {
      return MOCK_ANIME_LIST;
    }

    return json.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title_english || item.title,
      overview: item.synopsis || 'Sinopsis tidak tersedia.',
      poster_path: item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || null,
      backdrop_path: item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || null,
      vote_average: item.score ? Number(item.score.toFixed(1)) : 8.0,
      release_date: item.aired?.from ? item.aired.from.split('T')[0] : String(item.year || ''),
      media_type: 'anime' as const,
      quality: 'HD',
      genres: item.genres?.map((g: any) => ({ id: g.mal_id, name: g.name })) || []
    }));
  } catch (error) {
    console.error('Error fetching top anime from Jikan:', error);
    return MOCK_ANIME_LIST;
  }
}

export async function getAnimeDetails(malId: string | number): Promise<AnimeItem | null> {
  const numericId = Number(malId);

  try {
    const res = await fetch(`${JIKAN_BASE_URL}/anime/${malId}/full`, {
      next: { revalidate: 86400 }
    });

    if (!res.ok) {
      return MOCK_ANIME_DETAILS[numericId] || generateFallbackAnime(numericId);
    }

    const json = await res.json();
    if (!json.data) {
      return MOCK_ANIME_DETAILS[numericId] || generateFallbackAnime(numericId);
    }

    const d = json.data;
    return {
      mal_id: d.mal_id,
      title: d.title,
      title_english: d.title_english,
      title_japanese: d.title_japanese,
      synopsis: d.synopsis || 'Sinopsis belum tersedia.',
      score: d.score || 8.0,
      episodes: d.episodes || 12,
      year: d.year || (d.aired?.from ? new Date(d.aired.from).getFullYear() : null),
      duration: d.duration,
      rating: d.rating,
      genres: d.genres?.map((g: any) => ({ mal_id: g.mal_id, name: g.name })) || [],
      images: {
        webp: {
          image_url: d.images?.webp?.image_url,
          large_image_url: d.images?.webp?.large_image_url || d.images?.jpg?.large_image_url
        },
        jpg: {
          image_url: d.images?.jpg?.image_url,
          large_image_url: d.images?.jpg?.large_image_url
        }
      },
      trailer: {
        youtube_id: d.trailer?.youtube_id,
        url: d.trailer?.url,
        embed_url: d.trailer?.embed_url
      }
    };
  } catch (error) {
    console.error(`Error fetching anime details for malId ${malId}:`, error);
    return MOCK_ANIME_DETAILS[numericId] || generateFallbackAnime(numericId);
  }
}

export async function searchAnime(query: string): Promise<MediaItem[]> {
  if (!query || query.trim() === '') return [];

  try {
    const res = await fetch(`${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=8`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      return MOCK_ANIME_LIST.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    const json = await res.json();
    if (!json.data || !Array.isArray(json.data)) return [];

    return json.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title_english || item.title,
      overview: item.synopsis || '',
      poster_path: item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || null,
      backdrop_path: item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || null,
      vote_average: item.score ? Number(item.score.toFixed(1)) : 8.0,
      release_date: item.aired?.from ? item.aired.from.split('T')[0] : '',
      media_type: 'anime' as const,
      quality: 'HD'
    }));
  } catch (error) {
    console.error('Error searching anime:', error);
    return MOCK_ANIME_LIST.filter((a) =>
      a.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}

function generateFallbackAnime(malId: number): AnimeItem {
  const found = MOCK_ANIME_LIST.find((a) => a.id === malId);
  return {
    mal_id: malId,
    title: found ? found.title : `Anime #${malId}`,
    title_english: found ? found.title : `Anime Series ${malId}`,
    title_japanese: 'アニメ',
    synopsis: found ? found.overview : 'Saksikan kelanjutan serial anime seru ini.',
    score: found ? found.vote_average : 8.5,
    episodes: 24,
    year: 2024,
    duration: '24 min per ep',
    rating: 'PG-13',
    genres: [{ mal_id: 1, name: 'Action' }, { mal_id: 2, name: 'Adventure' }],
    images: {
      webp: {
        image_url: found?.poster_path || 'https://cdn.myanimelist.net/images/anime/1015/138075.webp',
        large_image_url: found?.poster_path || 'https://cdn.myanimelist.net/images/anime/1015/138075l.webp'
      }
    },
    trailer: {
      youtube_id: 'ZEkwCGJ3o6M',
      embed_url: 'https://www.youtube.com/embed/ZEkwCGJ3o6M'
    }
  };
}
