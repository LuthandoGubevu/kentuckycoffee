"use client";

import { useEffect, useState, use } from 'react';
import { GrainOverlay } from '@/components/grain-overlay';
import { CinematicBackground } from '@/components/cinematic-background';
import { phrases, compliments, type Phrase, type Compliment } from '@/app/lib/phrases';
import { ShareButtons } from '@/components/share-buttons';

type Mode = 'coffee' | 'compliment' | null;

export default function Home(props: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  use(props.params);
  use(props.searchParams);

  const [mode, setMode] = useState<Mode>(null);
  const [phrase, setPhrase] = useState<Phrase | null>(null);
  const [compliment, setCompliment] = useState<Compliment | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleModeSelect = (selectedMode: 'coffee' | 'compliment') => {
    setMode(selectedMode);
    setPhrase(null);
    setCompliment(null);
    setIsRevealing(true);
    setTimeout(() => {
      if (selectedMode === 'coffee') {
        const random = phrases[Math.floor(Math.random() * phrases.length)];
        setPhrase(random);
      } else {
        const random = compliments[Math.floor(Math.random() * compliments.length)];
        setCompliment(random);
      }
      setIsRevealing(false);
    }, 1800);
  };

  return (
    <main className="fixed inset-0 bg-transparent text-[#F4F4F4] flex flex-col items-center justify-center p-6 sm:p-8 selection:bg-accent/40 overflow-hidden touch-none">
      <CinematicBackground />
      <GrainOverlay />

      {/* Branding Header */}
      <div className="absolute top-12 left-8 flex flex-col gap-1 opacity-60 z-10">
        <span className="text-[10px] uppercase tracking-[0.6em] font-bold leading-none">Kentucky Coffee</span>
      </div>

      {/* Top Right Decorative Element */}
      <div className="absolute top-12 right-8 opacity-40 z-10">
        <div className="w-5 h-5 border border-foreground/10 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-accent animate-pulse" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center relative">
        {mode === null ? (
          <div className="flex flex-col items-center gap-10 animate-in fade-in duration-700">
            <div className="space-y-3 text-center">
              <span className="block text-[10px] uppercase tracking-[0.5em] text-foreground/40 font-bold">
                Choose Your Message
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleModeSelect('coffee')}
                className="text-[10px] uppercase tracking-[0.5em] font-bold border border-accent text-accent px-8 py-4 hover:bg-accent/10 active:bg-accent active:text-[#0A0A0A] transition-colors duration-150"
              >
                Coffee Message
              </button>
              <button
                onClick={() => handleModeSelect('compliment')}
                className="text-[10px] uppercase tracking-[0.5em] font-bold border border-accent text-accent px-8 py-4 hover:bg-accent/10 active:bg-accent active:text-[#0A0A0A] transition-colors duration-150"
              >
                Compliment
              </button>
            </div>
          </div>
        ) : isRevealing ? (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
             <div className="w-[1px] h-20 bg-accent/40 animate-reveal origin-top" />
             <div className="space-y-3 text-center">
                <span className="block text-[10px] uppercase tracking-[0.5em] text-accent font-bold animate-pulse">
                  Reading Spirits
                </span>
                <span className="block text-[7px] uppercase tracking-[0.5em] text-foreground/20">
                  Motswako Ritual in Progress
                </span>
             </div>
          </div>
        ) : phrase ? (
          <div className="w-full flex flex-col items-center space-y-16 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-10 text-center px-4 w-full">
               <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.2] font-body max-w-2xl mx-auto whitespace-pre-line lowercase">
                 {phrase.setswana}
               </h2>

               <div className="space-y-6">
                 <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-accent pl-[0.5em] opacity-90 font-bold max-w-md mx-auto leading-relaxed">
                   {phrase.english}
                 </p>
                 <div className="h-[1px] w-8 bg-accent/20 mx-auto" />
                 <ShareButtons text={phrase.english} setswana={phrase.setswana} />
               </div>
            </div>
          </div>
        ) : compliment ? (
          <div className="w-full flex flex-col items-center space-y-16 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-10 text-center px-4 w-full">
               <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.2] font-body max-w-2xl mx-auto lowercase">
                 {compliment.text}
               </h2>
               <div className="h-[1px] w-8 bg-accent/20 mx-auto" />
               <ShareButtons text={compliment.text} />
            </div>
          </div>
        ) : null}
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute bottom-0 right-12 w-[1px] h-32 bg-gradient-to-t from-accent/10 to-transparent opacity-30" />
      <div className="absolute top-0 left-12 w-[1px] h-16 bg-gradient-to-b from-foreground/5 to-transparent opacity-20" />
    </main>
  );
}
