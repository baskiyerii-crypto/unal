import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası — MenakYapı Çatı Sistemleri',
  description: 'MenakYapı Gizlilik Politikası. Kişisel verilerin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.',
};

export default function GizlilikPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-custom p-8 sm:p-12 border border-gray-200">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 pb-8 border-b border-gray-200">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest bg-[#24292E] px-3.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Yasal Bilgilendirme</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#24292E] tracking-tight">
              Gizlilik Politikası
            </h1>
            <p className="text-sm text-gray-500">
              Son güncelleme: 01 Ağustos 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
            <h2 className="text-lg font-bold text-[#24292E]">1. Giriş</h2>
            <p>
              <strong>MenakYapı Çatı Sistemleri</strong> (&quot;biz&quot;, &quot;bizim&quot; veya &quot;Şirket&quot;) olarak, 
              web sitemizi ziyaret eden kullanıcılarımızın gizliliğine saygı duyuyoruz. Bu Gizlilik Politikası, 
              kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">2. Toplanan Bilgiler</h2>
            <h3 className="text-base font-semibold text-[#24292E]">2.1 Doğrudan Sağladığınız Bilgiler</h3>
            <p>
              &quot;Teklif Al&quot; formunu doldurduğunuzda aşağıdaki bilgiler toplanır:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ad ve soyad</li>
              <li>Telefon numarası</li>
              <li>Şehir/bölge bilgisi</li>
              <li>İstenen hizmet türü</li>
              <li>Çatı detayları ve notlar</li>
            </ul>

            <h3 className="text-base font-semibold text-[#24292E]">2.2 Otomatik Olarak Toplanan Bilgiler</h3>
            <p>
              Web sitemizi ziyaret ettiğinizde, Google Analytics ve Google Tag Manager aracılığıyla aşağıdaki 
              bilgiler otomatik olarak toplanabilir:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP adresi (anonimleştirilmiş)</li>
              <li>Tarayıcı türü ve sürümü</li>
              <li>Ziyaret edilen sayfalar ve etkileşim süresi</li>
              <li>Yönlendiren URL</li>
              <li>Cihaz bilgileri (mobil/masaüstü)</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">3. Bilgilerin Kullanım Amaçları</h2>
            <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanıyoruz:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Çatı hizmetleri için fiyat teklifi hazırlama</li>
              <li>Keşif randevusu oluşturma ve iletişim kurma</li>
              <li>Web sitemizin performansını analiz etme ve iyileştirme</li>
              <li>Google Ads reklam kampanyalarının etkinliğini ölçme</li>
              <li>Yasal yükümlülükleri yerine getirme</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">4. Çerezler (Cookies)</h2>
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek ve analiz amaçlı çerezler kullanmaktadır. 
              Kullandığımız çerez türleri:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gerekli</li>
              <li><strong>Analitik çerezler:</strong> Google Analytics ziyaret istatistikleri</li>
              <li><strong>Reklam çerezleri:</strong> Google Ads dönüşüm izleme</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">5. Üçüncü Taraf Hizmetler</h2>
            <p>Aşağıdaki üçüncü taraf hizmetleri kullanmaktayız:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Analytics:</strong> Web sitesi trafik analizi</li>
              <li><strong>Google Tag Manager:</strong> Etiket yönetimi</li>
              <li><strong>Google Ads:</strong> Reklam dönüşüm izleme</li>
              <li><strong>WhatsApp:</strong> Müşteri iletişimi</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">6. Bilgi Güvenliği</h2>
            <p>
              Kişisel verilerinizi korumak için SSL şifreleme, güvenli sunucu altyapısı ve erişim kontrolü 
              gibi teknik ve idari güvenlik önlemleri uygulamaktayız. Ancak internet üzerinden hiçbir veri 
              iletiminin %100 güvenli olmadığını hatırlatmak isteriz.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">7. Veri Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, toplanma amacının gerektirdiği süre boyunca ve yasal yükümlülüklerimiz 
              doğrultusunda saklanır. Teklif talebi bilgileri, proje tamamlandıktan sonra en fazla 3 yıl 
              süreyle arşivlenir.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">8. Haklarınız</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız için 
              <Link href="/kvkk" className="text-[#D4AF37] hover:underline font-semibold"> KVKK Aydınlatma Metni</Link> sayfamızı 
              inceleyebilirsiniz.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">9. Politika Değişiklikleri</h2>
            <p>
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında, 
              bu sayfada bildirilecektir. Politikanın en güncel halini her zaman bu sayfada bulabilirsiniz.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">10. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>E-posta:</strong> menakyapi@gmail.com</li>
              <li><strong>Telefon:</strong> 0531 792 40 06</li>
              <li><strong>Adres:</strong> Şehitler Caddesi Selahattin Ecevit Sokak 36/3, Mamak / Ankara</li>
            </ul>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/" 
              className="btn-primary text-xs inline-flex items-center gap-2"
            >
              ← Anasayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
