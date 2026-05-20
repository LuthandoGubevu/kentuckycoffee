"use client";

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';

/**
 * The Reveal functionality has been moved to the landing page (/).
 * Redirecting users to the main ritual experience.
 */
export default function RevealRedirect(props: { params: Promise<any> }) {
  // Unwrap params to satisfy Next.js 15 requirement for dynamic API tracking
  use(props.params);
  
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <span className="text-[10px] uppercase tracking-[1em] text-accent animate-pulse">Redirecting to Ritual...</span>
    </div>
  );
}
