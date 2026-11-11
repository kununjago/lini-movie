export type MediaType = 'movie' | 'tv' | 'anime';

export interface MediaItem {
  id: number | string;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: MediaType;
  genres?: { id: number; name: string }[];
  quality?: string;
}

export interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface ImageItem {
  file_path: string;
  width?: number;
  height?: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  status: string;
  genres: { id: number; name: string }[];
  videos?: { results: VideoItem[] };
  images?: { backdrops: ImageItem[]; posters: ImageItem[] };
  credits?: { cast: CastMember[] };
  similar?: { results: MediaItem[] };
}

export interface TvSeasonSummary {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
}

export interface TvDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  episode_run_time?: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: TvSeasonSummary[];
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  videos?: { results: VideoItem[] };
  images?: { backdrops: ImageItem[]; posters: ImageItem[] };
  credits?: { cast: CastMember[] };
  similar?: { results: MediaItem[] };
}

export interface TvEpisode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  still_path: string | null;
  vote_average: number;
}

export interface TvSeasonDetails {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  poster_path: string | null;
  episodes: TvEpisode[];
}

export interface AnimeItem {
  mal_id: number;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  synopsis: string;
  score: number;
  episodes: number | null;
  year?: number | null;
  duration?: string;
  rating?: string;
  genres: { mal_id: number; name: string }[];
  images: {
    webp?: {
      image_url: string;
      large_image_url: string;
    };
    jpg?: {
      image_url: string;
      large_image_url: string;
    };
  };
  trailer?: {
    youtube_id?: string | null;
    url?: string | null;
    embed_url?: string | null;
  };
}

export interface SearchResultItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  media_type: MediaType;
}
