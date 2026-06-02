'use client';

import { useState } from 'react';
import { Share2, ImageDown } from 'lucide-react';
import { generateShareCard } from '@/components/share-card-generator';

interface ShareButtonsProps {
  text: string;
  setswana?: string;
}

export function ShareButtons({ text, setswana }: ShareButtonsProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const buildCard = async () => {
    const messageText = setswana ?? text;
    const englishText = setswana ? text : undefined;
    const blob = await generateShareCard(messageText, englishText);
    return new File([blob], 'kentucky-coffee.png', { type: 'image/png' });
  };

  const triggerDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kentucky-coffee.png';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
  };

  const handleShare = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const file = await buildCard();
      if (
        typeof navigator.share === 'function' &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({ files: [file], text: '#GRWM' });
      } else {
        triggerDownload(file);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('[share-card] share failed:', err);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const file = await buildCard();
      triggerDownload(file);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('[share-card] download failed:', err);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const btnClass = "flex items-center gap-2 text-accent opacity-80 hover:opacity-100 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-6">
      <button onClick={handleShare} disabled={isGenerating} aria-label="Share" className={btnClass}>
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Share</span>
        <Share2 size={18} />
      </button>

      <button onClick={handleDownload} disabled={isGenerating} aria-label="Save image to device" className={btnClass}>
        <ImageDown size={18} />
      </button>
    </div>
  );
}
