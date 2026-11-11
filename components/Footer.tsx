import React from 'react';
import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-md shadow-sky-500/20">
              <Film className="w-4 h-4 text-slate-950 fill-slate-950" />
            </div>
            <span className="font-extrabold text-base tracking-wider text-white">
              LINI<span className="text-sky-400 ml-1">MOVIE</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Beranda
            </Link>
            <Link href="/#film" className="hover:text-sky-400 transition-colors">
              Film Trending
            </Link>
            <Link href="/#tv" className="hover:text-sky-400 transition-colors">
              Serial TV
            </Link>
            <Link href="/#anime" className="hover:text-sky-400 transition-colors">
              Anime
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-center text-slate-500 text-center">
          <p>© {new Date().getFullYear()} Lini Movie. Hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}
