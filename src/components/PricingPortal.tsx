'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PricingPage from '@/app/pricing/page';

interface PricingPortalProps {
  isOpen: boolean;
}

export default function PricingPortal({ isOpen }: PricingPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">

        <PricingPage />
      </div>
    </div>,
    document.body
  );
}