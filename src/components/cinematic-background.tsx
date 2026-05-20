import React from 'react';

interface Particle {
  id: number;
  left: number; // percentage
  top: number; // percentage
  driftX: number; // px
  driftY: number; // px
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
}

const PARTICLES: Particle[] = [
  { id: 1, left: 10, top: 20, driftX: 60, driftY: -80, size: 1.5, duration: 25, delay: 0 },
  { id: 2, left: 80, top: 15, driftX: -50, driftY: -90, size: 2, duration: 30, delay: 2 },
  { id: 3, left: 35, top: 40, driftX: 70, driftY: -100, size: 1.2, duration: 28, delay: 5 },
  { id: 4, left: 60, top: 60, driftX: -60, driftY: -70, size: 2.2, duration: 32, delay: 1 },
  { id: 5, left: 15, top: 80, driftX: 40, driftY: -110, size: 1, duration: 24, delay: 8 },
  { id: 6, left: 85, top: 75, driftX: -45, driftY: -65, size: 1.8, duration: 26, delay: 4 },
  { id: 7, left: 50, top: 25, driftX: 30, driftY: -85, size: 1.6, duration: 29, delay: 7 },
  { id: 8, left: 25, top: 50, driftX: -35, driftY: -95, size: 1.4, duration: 27, delay: 3 },
  { id: 9, left: 70, top: 45, driftX: 55, driftY: -75, size: 2.1, duration: 31, delay: 6 },
  { id: 10, left: 40, top: 85, driftX: -25, driftY: -105, size: 1.3, duration: 23, delay: 9 },
  { id: 11, left: 90, top: 30, driftX: -40, driftY: -80, size: 1.7, duration: 28, delay: 10 },
  { id: 12, left: 5, top: 65, driftX: 50, driftY: -90, size: 1.5, duration: 26, delay: 11 },
  { id: 13, left: 55, top: 10, driftX: 35, driftY: -70, size: 1.9, duration: 33, delay: 12 },
  { id: 14, left: 75, top: 90, driftX: -30, driftY: -85, size: 1.2, duration: 25, delay: 13 },
  { id: 15, left: 30, top: 15, driftX: -45, driftY: -60, size: 2.3, duration: 29, delay: 14 }
];

export function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20 bg-[#050505] select-none">
      {/* 1. Ambient Glow Layer */}
      <div className="absolute inset-0 mix-blend-screen opacity-70">
        {/* Glow Blob 1: Warm amber/coffee brown */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] rounded-full blur-[140px] animate-drift-slow-1"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,26,0.14) 0%, rgba(139,92,26,0.03) 50%, transparent 80%)'
          }}
        />
        {/* Glow Blob 2: Dark red/crimson */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vh] rounded-full blur-[160px] animate-drift-slow-2"
          style={{
            background: 'radial-gradient(circle, rgba(185,28,28,0.08) 0%, rgba(185,28,28,0.02) 60%, transparent 85%)'
          }}
        />
      </div>

      {/* 2. Light Breathing Overlay */}
      <div 
        className="absolute inset-0 mix-blend-screen animate-breathe"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(168,85,24,0.04) 0%, transparent 70%)'
        }}
      />

      {/* 3. Floating Dust/Grain Particles */}
      <div className="absolute inset-0">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#E5BA73]/30 animate-particle-drift"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              '--duration': `${p.duration}s`,
              animationDelay: `${p.delay}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 4. Cinematic Vignette (darkened edges) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 35%, rgba(5,5,5,0.7) 75%, rgba(5,5,5,0.95) 100%)'
        }}
      />
    </div>
  );
}
