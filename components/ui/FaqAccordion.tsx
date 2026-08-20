'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqAccordion({ items, title = 'Sıkça Sorulan Sorular' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="my-10 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-[#24292E] font-['Outfit'] mb-6 flex items-center gap-2">
        <span className="text-[#D4AF37]">?</span> {title}
      </h3>

      <div className="space-y-3 font-['Inter']">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-[#24292E] hover:text-[#D4AF37] flex items-center justify-between gap-4 font-['Outfit'] transition-colors"
              >
                <span>{item.question}</span>
                <span className="text-lg font-bold text-gray-400">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 bg-slate-50">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
