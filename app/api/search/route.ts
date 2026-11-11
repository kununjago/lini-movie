import { NextRequest, NextResponse } from 'next/server';
import { searchTmdb } from '@/lib/tmdb';
import { searchAnime } from '@/lib/anime';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim() === '') {
    return NextResponse.json({ results: [] });
  }

  try {
    const [tmdbResults, animeResults] = await Promise.allSettled([
      searchTmdb(query),
      searchAnime(query)
    ]);

    const moviesAndTv = tmdbResults.status === 'fulfilled' ? tmdbResults.value : [];
    const anime = animeResults.status === 'fulfilled' ? animeResults.value : [];

    const combined = [
      ...moviesAndTv,
      ...anime.map((a) => ({
        id: a.id,
        title: a.title,
        overview: a.overview,
        poster_path: a.poster_path,
        backdrop_path: a.backdrop_path,
        vote_average: a.vote_average,
        release_date: a.release_date,
        media_type: 'anime' as const
      }))
    ];

    return NextResponse.json({ results: combined.slice(0, 15) });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
