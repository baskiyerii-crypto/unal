import Link from 'next/link';
import Image from 'next/image';
import type { BlogArticle } from '@/lib/payload/getPosts';

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export function BlogCard({ article, featured = false }: BlogCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 mb-12">
        <div className="lg:col-span-7 relative min-h-80 lg:min-h-105 overflow-hidden bg-slate-900">
          <Image
            src={article.coverImageUrl}
            alt={article.coverImageAlt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#D4AF37] text-slate-950 shadow-md">
              ★ MANŞET REHBER
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 font-semibold text-[#24292E]">
                {article.categoryLabel}
              </span>
              <span>•</span>
              <time dateTime={article.publishedAt}>{formattedDate}</time>
              <span>•</span>
              <span>{article.readingTime} dk okuma</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#24292E] group-hover:text-[#D4AF37] transition-colors duration-200 mb-4 font-['Outfit'] leading-tight">
              <Link href={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mb-6 font-['Inter'] leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              Yazar: <strong className="text-slate-800">{article.author}</strong>
            </span>

            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-2 font-semibold text-sm text-[#24292E] group-hover:text-[#D4AF37] transition-colors"
            >
              Yazıyı Oku
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 transition-all duration-300">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={article.coverImageUrl}
          alt={article.coverImageAlt || article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#24292E] shadow-sm backdrop-blur-sm">
            {article.categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span>{article.readingTime} dk okuma</span>
          </div>

          <h3 className="text-lg font-bold text-[#24292E] group-hover:text-[#D4AF37] transition-colors duration-200 mb-2 font-['Outfit'] line-clamp-2">
            <Link href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-4 font-['Inter'] leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400">
            {article.author}
          </span>

          <Link
            href={`/blog/${article.slug}`}
            className="text-xs font-bold text-[#24292E] group-hover:text-[#D4AF37] inline-flex items-center gap-1 transition-colors"
          >
            Devamı
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
