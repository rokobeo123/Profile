"use client";
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export function TimelineWidget() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<any[]>('/timeline').then((res) => {
      if (res && res.length > 0) {
        setEvents(res);
      } else {
        setEvents([
          { id: '1', date: '2026', title: 'Launched Personal OS', description: 'Built a new digital brain and personal space on the web.' },
          { id: '2', date: '2025', title: 'Joined New Startup', description: 'Started working as a Lead Software Engineer.' }
        ]);
      }
    }).catch(() => {
      setEvents([
        { id: '1', date: '2026', title: 'Launched Personal OS', description: 'Built a new digital brain and personal space on the web.' },
        { id: '2', date: '2025', title: 'Joined New Startup', description: 'Started working as a Lead Software Engineer.' }
      ]);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex space-x-4">
          <div className="w-2 h-16 bg-[var(--color-border-default)] rounded-full" />
          <div className="h-16 flex-1 bg-[var(--color-border-default)] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-border-default)] before:to-transparent">
      {events.map((event) => (
        <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-[var(--color-background-primary)] bg-[var(--color-accent-primary)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-[var(--color-background-secondary)] p-4 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-default)] transition-colors shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-[var(--color-text-primary)]">{event.title}</h4>
              <time className="text-xs font-medium text-[var(--color-accent-primary)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded-full">{event.date}</time>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
