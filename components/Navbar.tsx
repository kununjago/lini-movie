'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Film, Tv, Play, X, Star, Sparkles, Menu } from 'lucide-react';
import { SearchResultItem } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Search fetch failed', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectMedia = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');
    if (item.media_type === 'movie') {
      router.push(`/watch/movie/${item.id}`);
    } else if (item.media_type === 'tv') {
      router.push(`/watch/tv/${item.id}/1/1`);
    } else {
      router.push(`/watch/anime/${item.id}/1`);
    }
  };

  const getItemUrl = (item: SearchResultItem) => {
    if (item.media_type === 'movie') return `/watch/movie/${item.id}`;
    if (item.media_type === 'tv') return `/watch/tv/${item.id}/1/1`;
    return `/watch/anime/${item.id}/1`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-sky-950/20 border-b border-sky-500/20 py-3'
          : 'bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-400/50 transition-all duration-300">
            <Film className="w-5 h-5 text-slate-950 fill-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
              LINI<span className="text-sky-400 ml-1">MOVIE</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-slate-200 hover:text-sky-400 transition-colors flex items-center gap-1.5"
          >
            Beranda
          </Link>
          <Link
            href="/#film"
            className="text-slate-400 hover:text-sky-400 transition-colors"
          >
            Film
          </Link>
          <Link
            href="/#tv"
            className="text-slate-400 hover:text-sky-400 transition-colors"
          >
            Serial TV
          </Link>
          <Link
            href="/#anime"
            className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Anime
          </Link>
        </nav>

        {/* Search Bar Real-Time */}
        <div ref={searchRef} className="relative flex-1 max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-sky-400/80 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => {
                if (results.length > 0) setIsOpen(true);
              }}
              placeholder="Cari film, serial tv, atau anime..."
              className="w-full pl-10 pr-10 py-2 bg-slate-900/90 text-sm text-slate-100 placeholder:text-slate-500 rounded-full border border-slate-800 focus:border-sky-500/60 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setIsOpen(false);
                }}
                className="absolute right-3 p-0.5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Real-time search dropdown results */}
          {isOpen && (query.trim() || isLoading) && (
            <div className="absolute top-full mt-2 left-0 right-0 max-h-[70vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-sky-500/30 rounded-2xl shadow-2xl shadow-slate-950/80 z-50 divide-y divide-slate-800/80">
              {isLoading ? (
                <div className="p-6 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                  Mencari tayangan...
                </div>
              ) : results.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-400">
                  Tidak ditemukan konten untuk &quot;<span className="text-sky-400">{query}</span>&quot;
                </div>
              ) : (
                <div className="py-2">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-sky-400/80 uppercase tracking-wider">
                    Hasil Pencarian ({results.length})
                  </div>
                  {results.map((item) => (
                    <Link
                      key={`${item.media_type}-${item.id}`}
                      href={getItemUrl(item)}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="relative w-11 h-16 rounded-md overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60 group-hover:border-sky-500/40">
                        <Image
                          src={getImageUrl(item.poster_path, 'w300')}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-100 group-hover:text-sky-400 truncate">
                            {item.title}
                          </h4>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                              item.media_type === 'movie'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : item.media_type === 'tv'
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                            }`}
                          >
                            {item.media_type === 'movie'
                              ? 'Film'
                              : item.media_type === 'tv'
                              ? 'Serial'
                              : 'Anime'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          {item.release_date && (
                            <span>{item.release_date.substring(0, 4)}</span>
                          )}
                          {item.vote_average > 0 && (
                            <span className="flex items-center gap-1 text-amber-400 font-medium">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {item.vote_average.toFixed(1)}
                            </span>
                          )}
                        </div>
                        {item.overview && (
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {item.overview}
                          </p>
                        )}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors shrink-0">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-sky-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-sky-500/20 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-sky-400 py-1.5 font-medium"
          >
            Beranda
          </Link>
          <Link
            href="/#film"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-sky-400 py-1.5 font-medium"
          >
            Film Trending
          </Link>
          <Link
            href="/#tv"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-sky-400 py-1.5 font-medium"
          >
            Serial TV
          </Link>
          <Link
            href="/#anime"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-sky-400 py-1.5 font-medium flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            Anime
          </Link>
        </div>
      )}
    </header>
  );
}
