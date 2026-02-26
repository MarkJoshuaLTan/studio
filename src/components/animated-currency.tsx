"use client";

import { useState, useEffect, useRef } from 'react';
import { formatCurrency } from '@/lib/utils';

interface AnimatedCurrencyProps {
  value: number;
  duration?: number;
}

export function AnimatedCurrency({ value, duration = 1000 }: AnimatedCurrencyProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    // We always count up from 0 when a new calculation happens
    // to match the "count up from 0" requirement precisely.
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out for a professional feel
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = easedProgress * (end - start) + start;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{formatCurrency(displayValue)}</span>;
}
