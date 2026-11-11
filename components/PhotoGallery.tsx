'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageItem } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

interface PhotoGalleryProps {
  images?: {
    backdrops?: ImageItem[];
    posters?: ImageItem[];
  };
  title: string;
}

export default function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const backdrops = images?.backdrops || [];
  if (backdrops.length === 0) return null;

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-white">Galeri Foto & Backdrop</h3>
        </div>
        <span className="text-xs text-slate-400">{backdrops.length} Foto</span>
      </div>

      {/* Grid of Backdrops */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {backdrops.slice(0, 8).map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImage(getImageUrl(img.file_path, 'original'))}
            className="group relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition-all cursor-pointer focus:outline-none"
          >
            <Image
              src={getImageUrl(img.file_path, 'w500')}
              alt={`${title} backdrop ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-2 rounded-full bg-sky-500/90 text-slate-950 shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-sky-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={`${title} High Res Backdrop`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
}
