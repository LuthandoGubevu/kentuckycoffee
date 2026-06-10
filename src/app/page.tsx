"use client";

import { useEffect, useState, use } from 'react';
import { GrainOverlay } from '@/components/grain-overlay';
import { CinematicBackground } from '@/components/cinematic-background';
import { compliments, type Compliment } from '@/app/lib/phrases';
import { ShareButtons } from '@/components/share-buttons';

export default function Home(props: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  use(props.params);
  use(props.searchParams);

  const [compliment, setCompliment] = useState<Compliment | null>(null);
  const [isRevealing, setIsRevealing] = useState(true);

  const getCompliment = () => {
    setIsRevealing(true);
    setTimeout(() => {
      const random = compliments[Math.floor(Math.random() * compliments.length)];
      setCompliment(random);
      setIsRevealing(false);
    }, 1800);
  };

  useEffect(() => {
    getCompliment();
  }, []);

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
        {isRevealing ? (
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
        ) : compliment ? (
          <div className="w-full flex flex-col items-center space-y-16 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-10 text-center px-4 w-full">
               <img src="/phrase-image.png" alt="" className="mx-auto max-w-[96px] opacity-70 pointer-events-none" />
               <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.2] font-body max-w-2xl mx-auto lowercase">
                 {compliment.text}
               </h2>
               <div className="h-[1px] w-8 bg-accent/20 mx-auto" />
               <ShareButtons text={compliment.text} />
               <img src="/reveal.gif" alt="" className="mx-auto mt-2 max-w-[200px] opacity-90 pointer-events-none" />
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
