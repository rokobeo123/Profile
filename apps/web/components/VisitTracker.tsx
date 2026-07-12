"use client";

import { useEffect, useRef } from 'react';

export function VisitTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      
      // Get today's date in YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      const lastVisit = localStorage.getItem('last_visit_date');
      
      // Only track if they haven't visited today (unique daily visitor)
      if (lastVisit !== today) {
        localStorage.setItem('last_visit_date', today);
        fetch('/api/visits', { method: 'POST' }).catch(() => {});
      }
    }
  }, []);

  return null;
}
