'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';

export interface StickyAdProps {
  /**
   * A-Ads Ad Unit ID (default: '2462042')
   */
  adUnitId?: string | number;
  /**
   * Sticky position: 'bottom' (default/recommended) or 'top'
   */
  position?: 'bottom' | 'top';
  /**
   * Additional custom CSS classes for the outer sticky container
   */
  className?: string;
  /**
   * Apakah menampilkan tombol close (default: false - iklan permanen tanpa tombol close)
   */
  closable?: boolean;
}

// React 19 / Next.js idiomatic client-side mount detection without cascading renders
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * StickyAd - Komponen banner iklan A-Ads yang menempel (sticky) di layar.
 * Sekarang diposisikan di bagian bawah layar secara permanen (tanpa tombol close).
 * Dikonversi dari cuplikan A-Ads HTML/JS ke React TypeScript yang aman dari hydration mismatch
 * dengan memanfaatkan useEffect dan useRef untuk dynamic mounting iframe di sisi klien.
 */
export default function StickyAd({
  adUnitId = '2462042',
  position = 'bottom',
  className = '',
  closable = false,
}: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // useSyncExternalStore memastikan komponen aman dirender di sisi client tanpa hydration error
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  // Muat iframe A-Ads secara dinamis melalui DOM ref setelah komponen terpasang di client
  useEffect(() => {
    if (!isMounted || !isVisible || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = ''; // Bersihkan container dari render sebelumnya

    // Buat elemen iframe A-Ads secara programatis
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-aa', String(adUnitId));
    iframe.src = `https://acceptable.a-ads.com/${adUnitId}/?size=Adaptive`;
    iframe.title = `A-Ads Sticky Banner Unit ${adUnitId}`;
    iframe.style.border = '0';
    iframe.style.padding = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '60px';
    iframe.style.maxHeight = '90px';
    iframe.style.overflow = 'hidden';
    iframe.style.display = 'block';
    iframe.style.margin = 'auto';

    container.appendChild(iframe);

    return () => {
      container.innerHTML = '';
    };
  }, [isMounted, isVisible, adUnitId]);

  // Jangan render apapun di server-side (SSR) atau jika iklan sudah ditutup
  if (!isMounted || !isVisible) {
    return null;
  }

  const isTop = position === 'top';

  return (
    <aside
      aria-label="Iklan Sponsor Menempel"
      className={`fixed left-0 right-0 z-[99999] transition-all duration-300 ${
        isTop
          ? 'top-0 border-b shadow-lg py-1'
          : 'bottom-0 border-t shadow-2xl py-1'
      } bg-slate-950/95 backdrop-blur-md border-slate-800 text-center ${className}`}
    >
      <div className="relative max-w-5xl mx-auto flex items-center justify-center px-4 sm:px-6 min-h-[60px] sm:min-h-[75px] md:min-h-[90px]">
        {/* Tombol Close hanya tampil jika closable bernilai true (default: false) */}
        {closable && (
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Tutup iklan"
            title="Tutup iklan"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-md bg-slate-200/80 hover:bg-white text-slate-900 p-1.5 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer z-[100000] focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 490 490"
              aria-hidden="true"
            >
              <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 " />
            </svg>
          </button>
        )}

        {/* Kontainer untuk iframe A-Ads (dimuat secara bersih oleh useEffect & useRef) */}
        <div
          ref={containerRef}
          id="aads-frame-container"
          className="w-full max-w-[728px] lg:max-w-[970px] min-h-[60px] sm:min-h-[75px] md:min-h-[90px] flex items-center justify-center overflow-hidden"
        />
      </div>
    </aside>
  );
}
