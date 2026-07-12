"use client";
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export function ProjectsWidget() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<any[]>('/projects').then((res) => {
      if (res && res.length > 0) {
        setProjects(res);
      } else {
        setProjects([
          { id: '1', title: 'Personal OS', description: 'A highly modular, api-driven personal website and digital brain.', link: '#' },
          { id: '2', title: 'Design System', description: 'A comprehensive set of UI components and design tokens.', link: '#' }
        ]);
      }
    }).catch(() => {
      setProjects([
        { id: '1', title: 'Personal OS', description: 'A highly modular, api-driven personal website and digital brain.', link: '#' },
        { id: '2', title: 'Design System', description: 'A comprehensive set of UI components and design tokens.', link: '#' }
      ]);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-20 bg-[var(--color-border-default)] rounded-xl w-full" />
        <div className="h-20 bg-[var(--color-border-default)] rounded-xl w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <a 
          key={project.id} 
          href={project.link} 
          className="block bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] p-5 rounded-xl hover:border-[var(--color-accent-primary)] hover:shadow-sm transition-all group"
        >
          <h4 className="text-md font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">{project.title}</h4>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{project.description}</p>
        </a>
      ))}
    </div>
  );
}
