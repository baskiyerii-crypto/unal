'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml?: string;
}

export function TableOfContents({ contentHtml }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract H2 and H3 headings from article container in DOM
    const articleContainer = document.querySelector('article#blog-article-content');
    if (!articleContainer) return;

    const elements = articleContainer.querySelectorAll('h2, h3');
    const items: TocItem[] = [];

    elements.forEach((el, index) => {
      const id = el.id || `heading-${index}`;
      el.id = id;
      items.push({
        id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -40% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [contentHtml]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-xl p-5 border border-gray-200 shadow-sm">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 font-['Outfit'] flex items-center gap-2">
        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        İçindekiler
      </h3>
      <nav className="space-y-1.5 text-xs font-['Inter']">
        {headings.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`block transition-colors py-1 ${
              item.level === 3 ? 'pl-3 text-gray-500' : 'font-medium text-gray-700'
            } ${
              activeId === item.id
                ? 'text-[#D4AF37] font-semibold border-l-2 border-[#D4AF37] pl-2'
                : 'hover:text-[#24292E]'
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
