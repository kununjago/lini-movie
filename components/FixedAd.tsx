'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';

export interface FixedAdProps {
  /**
   * A-Ads Ad Unit ID (default: '2462042')
   */
  adUnitId?: string | number;
  /**
   * Additional custom CSS classes for the outer container
   */
  className?: string;
  /**
   * Whether to show a subtle "Iklan Sponsor" label above the banner (default: true)
   */
  showLabel?: boolean;
}

// React 18/19 safe client-side hydration detection
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * FixedAd - Komponen banner iklan A-Ads permanen (tanpa tombol close).
 * Ditempatkan di bawah pemutar video atau di dalam halaman utama.
 * Menggunakan useEffect & useRef untuk memuat iframe secara dinamis di sisi klien
 * guna mencegah terjadinya hydration mismatch di Next.js App Router.
 */
export default function FixedAd({
  adUnitId = '2462042',
  className = '',
  showLabel = true,
}: FixedAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useSyncExternalStore memastikan komponen dirender hanya di client tanpa memicu cascading renders
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  // Injeksi elemen iframe A-Ads secara aman setelah komponen terpasang di client
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = ''; // Bersihkan container dari render sebelumnya

    // Buat iframe A-Ads secara programatis sesuai spesifikasi A-Ads
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-aa', String(adUnitId));
    iframe.src = `https://acceptable.a-ads.com/${adUnitId}/?size=Adaptive`;
    iframe.title = `A-Ads Fixed Ad Unit ${adUnitId}`;
    iframe.style.border = '0';
    iframe.style.padding = '0';
    iframe.style.width = '100%';
    iframe.style.height = 'auto';
    iframe.style.minHeight = '60px';
    iframe.style.maxHeight = '90px';
    iframe.style.overflow = 'hidden';
    iframe.style.display = 'block';
    iframe.style.margin = 'auto';

    container.appendChild(iframe);

    return () => {
      container.innerHTML = '';
    };
  }, [isMounted, adUnitId]);

  // Hindari render di server-side (SSR) untuk menjamin 0 hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={`w-full my-4 py-3 px-2 rounded-2xl bg-slate-900/40 border border-slate-800/60 min-h-[80px] flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        <span className="text-[11px] text-slate-600 font-mono">Memuat Iklan Sponsor...</span>
      </div>
    );
  }

  return (
    <div
      className={`w-full my-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center text-center ${className}`}
      aria-label="Iklan Sponsor Permanen"
    >
      {showLabel && (
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400/60" />
          <span>Iklan Sponsor</span>
        </div>
      )}

      {/* Kontainer sesuai struktur A-Ads id="frame" */}
      <div
        id="frame"
        className="w-full flex items-center justify-center relative min-h-[60px] sm:min-h-[75px] md:min-h-[90px]"
        style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}
      >
        <div
          ref={containerRef}
          className="w-full sm:w-[85%] md:w-[70%] flex items-center justify-center overflow-hidden"
        />
      </div>
    </div>
  );
}
