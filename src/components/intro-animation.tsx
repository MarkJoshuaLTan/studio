"use client";

import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer1 = setTimeout(() => setIconVisible(true), 100);
    const timer2 = setTimeout(() => setTextVisible(true), 600);
    const timer3 = setTimeout(() => setIsLeaving(true), 2200);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-800 ease-in-out
        ${isLeaving ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <Building2
          className={`h-16 w-16 text-primary transition-all duration-700 ease-out
            ${iconVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
        />
        <h1
          className={`text-3xl font-bold tracking-tight text-center transition-all duration-700 ease-out md:text-4xl
            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          TaxWise Parañaque
        </h1>
      </div>
    </div>
  );
}
