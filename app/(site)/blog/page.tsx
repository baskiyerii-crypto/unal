import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getFeaturedPost, CATEGORY_MAP } from '@/lib/payload/getPosts';
import { BlogCard } from '@/components/ui/BlogCard';

export const metadata: Metadata = {
  title: 'Blog & Yapı Rehberi — Kenet Çatı, İzolasyon ve İnşaat | MenakYapı',
  description: 'Kenet çatı m² fiyatları, villa inşaat ruhsat süreçleri, çatı yalıtımı ve mimari taahhüt hakkında uzman mühendislik rehberi ve sektörel makaleler.',
  openGraph: {
    title: 'MenakYapı Blog & İnşaat Rehberi',
    description: 'Çatı kaplama, villa yapımı ve teknik detaylar hakkında kapsamlı uzman rehberi.',
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidate at most every hour (ISR)

interface BlogPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

export default async function BlogListingPage({ searchParams }: BlogPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentCategory = resolvedParams.category || 'all';

  const [allPosts, featuredPost] = await Promise.all([
    getAllPosts(currentCategory),
    getFeaturedPost(),
  ]);

  const categories = [
    { slug: 'all', label: 'Tüm Yazılar' },
    ...Object.entries(CATEGORY_MAP).map(([slug, label]) => ({ slug, label })),
  ];

  // If viewing 'all', exclude the featured post from the main grid so it's not duplicated
  const gridPosts = currentCategory === 'all'
    ? allPosts.filter((p) => p.id !== featuredPost.id)
    : allPosts;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 pt-8 sm:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#24292E] font-bold text-xs tracking-wider uppercase mb-4 border border-[#D4AF37]/30">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            MENAKYAPI TEKNİK REHBER
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#24292E] font-['Outfit'] tracking-tight mb-4 leading-tight">
            İnşaat, Çatı & Mimari <span className="text-[#D4AF37]">Uzmanlık Rehberi</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base font-['Inter'] leading-relaxed">
            Kenet çatı m² fiyatlarından villa yapım aşamalarına, yasal ruhsat süreçlerinden çatı yalıtım püf noktalarına kadar 20 yıllık şantiye tecrübemizle kaleme alınan rehberler.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug === 'all' ? '/blog' : `/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#24292E] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Featured Post Banner (Only when on 'all' tab) */}
        {currentCategory === 'all' && featuredPost && (
          <BlogCard article={featuredPost} featured={true} />
        )}

        {/* Main Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#24292E] font-['Outfit'] mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
            <span>
              {currentCategory === 'all'
                ? 'Son Eklenen Makaleler'
                : `${CATEGORY_MAP[currentCategory] || 'Makaleler'}`}
            </span>
            <span className="text-xs font-medium text-gray-500 font-['Inter']">
              Toplam {gridPosts.length} içerik
            </span>
          </h2>

          {gridPosts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <p className="text-gray-500 text-sm font-['Inter']">
                Bu kategoride henüz yayınlanmış makale bulunmamaktadır.
              </p>
              <Link href="/blog" className="inline-block mt-4 text-xs font-bold text-[#D4AF37] underline">
                Tüm makalelere geri dön
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridPosts.map((post) => (
                <BlogCard key={post.id} article={post} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="mt-16 bg-linear-to-br from-[#24292E] to-slate-900 rounded-2xl p-8 sm:p-12 text-white text-center shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-slate-950 uppercase tracking-wider mb-4 inline-block">
              ÜCRETSİZ KEŞİF & DANIŞMANLIK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] mb-4 leading-tight">
              Projeniz İçin Teknik Destek veya Metraj Analizi mi Lazım?
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-['Inter'] mb-8 leading-relaxed">
              Sorularınız veya şantiye uygulamalarınız için uzman mühendis kadromuzla doğrudan iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:05317924006"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm hover:bg-[#B89628] transition-colors shadow-lg"
              >
                0531 792 40 06 Hemen Ara
              </a>
              <a
                href="https://wa.me/905317924006?text=Merhaba,%20blog%20sayfan%C4%B1zdan%20ula%C5%9F%C4%B1yorum.%20Projem%20i%C3%A7in%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
              >
                WhatsApp İle Yazın
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
