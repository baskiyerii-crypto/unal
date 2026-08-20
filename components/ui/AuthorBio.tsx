import Image from 'next/image';

interface AuthorBioProps {
  authorName?: string;
}

export function AuthorBio({ authorName = 'MenakYapı Mühendislik Ekibi' }: AuthorBioProps) {
  return (
    <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 my-10 shadow-sm font-['Inter']">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-slate-900 border-2 border-[#D4AF37] shrink-0">
        <Image
          src="/images/kenet-cati-hero.png"
          alt={authorName}
          fill
          className="object-cover"
        />
      </div>

      <div className="text-center sm:text-left flex-1">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <h4 className="text-lg font-bold text-[#24292E] font-['Outfit']">{authorName}</h4>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            ✓ Doğrulanmış Uzman
          </span>
        </div>

        <p className="text-xs font-semibold text-[#D4AF37] mb-2 uppercase tracking-wide">
          İnşaat Mühendisliği & Çatı Kaplama Uzmanı
        </p>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          MenakYapı bünyesindeki inşaat mühendisleri ve şantiye mimarlarımız, 20 yılı aşkın süredir çatı kaplama, kenet sistemleri, ahşap karkas ve müstakil villa projelerinde teknik danışmanlık ve saha uygulaması sunmaktadır.
        </p>
      </div>
    </div>
  );
}
