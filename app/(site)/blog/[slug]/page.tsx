import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { getPostBySlug, getAllPosts, BlogArticle } from '@/lib/payload/getPosts';
import { TableOfContents } from '@/components/ui/TableOfContents';
import { StickyCta } from '@/components/ui/StickyCta';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { BlogCard } from '@/components/ui/BlogCard';

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı | MenakYapı',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://menakyapi.com';

  return {
    title: `${post.metaTitle || post.title} | MenakYapı`,
    description: post.metaDescription || post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImageUrl,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || true))
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://menakyapi.com';

  // Google JSON-LD Schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImageUrl.startsWith('http') ? post.coverImageUrl : `${siteUrl}${post.coverImageUrl}`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MenakYapı',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Anasayfa',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog & Rehber',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  const faqSchema = post.faqItems && post.faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="bg-[#FAFAFA] min-h-screen pb-20 pt-6 sm:pt-10 font-['Inter']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#24292E] transition-colors">
              Anasayfa
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#24292E] transition-colors">
              Blog & Rehber
            </Link>
            <span>/</span>
            <span className="text-[#24292E] font-semibold truncate max-w-50 sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold mb-4">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950">
                {post.categoryLabel}
              </span>
              <span className="text-gray-400">•</span>
              <time dateTime={post.publishedAt} className="text-gray-500">
                {formattedDate}
              </time>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{post.readingTime} dk okuma süresi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#24292E] font-['Outfit'] leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 font-['Inter'] leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Cover Image Container */}
          <div className="relative w-full h-80 sm:h-120 lg:h-135 rounded-2xl overflow-hidden shadow-lg mb-10 bg-slate-900 border border-gray-200">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Main Grid: Content + Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Main Article Column */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm">
              <div
                id="blog-article-content"
                className="prose prose-slate max-w-none prose-headings:font-['Outfit'] prose-headings:font-bold prose-headings:text-[#24292E] prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:bg-amber-50/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-strong:text-[#24292E]"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contentHtml || `<p>${post.excerpt}</p>`) }}
              />

              {/* Dynamic FAQ Accordion */}
              {post.faqItems && post.faqItems.length > 0 && (
                <FaqAccordion items={post.faqItems} />
              )}

              {/* Author Bio Box */}
              <AuthorBio authorName={post.author} />

              {/* Social Share Bar */}
              <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500">
                <span>Bu rehberi paylaşın:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors flex items-center gap-1.5"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <TableOfContents contentHtml={post.contentHtml} />
              <StickyCta />
            </aside>

          </div>

          {/* Related Articles Bottom Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-[#24292E] font-['Outfit'] mb-8">
                İlginizi Çekebilecek Diğer Rehberler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <BlogCard key={related.id} article={related} />
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </>
  );
}
