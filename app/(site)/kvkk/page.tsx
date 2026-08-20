import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni — MenakYapı Çatı Sistemleri',
  description: 'MenakYapı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni.',
};

export default function KvkkPage() {
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
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-sm text-gray-500">
              Son güncelleme: 01 Ağustos 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
            <h2 className="text-lg font-bold text-[#24292E]">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında, kişisel verileriniz; 
              veri sorumlusu olarak <strong>MenakYapı Çatı Sistemleri</strong> 
              (&quot;Şirket&quot;) tarafından aşağıda açıklanan amaçlarla işlenebilecektir.
            </p>
            <p>
              <strong>Adres:</strong> Şehitler Caddesi Selahattin Ecevit Sokak 36/3, Mamak / Ankara<br />
              <strong>Telefon:</strong> 0531 792 40 06<br />
              <strong>E-posta:</strong> menakyapi@gmail.com
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">2. İşlenen Kişisel Veriler</h2>
            <p>
              Web sitemiz üzerinden toplanan kişisel veriler şunlardır:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Kimlik bilgileri:</strong> Ad, soyad</li>
              <li><strong>İletişim bilgileri:</strong> Telefon numarası, e-posta adresi</li>
              <li><strong>Talep bilgileri:</strong> İstenen hizmet türü, şehir/bölge, çatı detayları ve notlar</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fiyat teklifi hazırlanması ve iletilmesi</li>
              <li>Keşif randevusu planlanması</li>
              <li>Müşteri iletişiminin sağlanması</li>
              <li>Hizmet kalitesinin artırılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda ve KVKK&apos;nın 8. ve 9. maddelerinde 
              belirtilen şartlara uygun olarak; iş ortaklarımıza, hizmet aldığımız üçüncü taraflara ve yasal 
              zorunluluk halinde yetkili kamu kurum ve kuruluşlarına aktarılabilecektir.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz, web sitemizdeki &quot;Teklif Al&quot; formu aracılığıyla elektronik ortamda toplanmaktadır. 
              Hukuki sebep: KVKK madde 5/1 kapsamında <strong>açık rıza</strong> ve madde 5/2(c) kapsamında 
              <strong> sözleşmenin kurulması için gerekli olma</strong>.
            </p>

            <h2 className="text-lg font-bold text-[#24292E]">6. Veri Sahibinin Hakları (KVKK Madde 11)</h2>
            <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmiş ise buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş ise düzeltilmesini isteme</li>
              <li>KVKK&apos;nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme, silme veya yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>

            <h2 className="text-lg font-bold text-[#24292E]">7. Başvuru</h2>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak için <strong>menakyapi@gmail.com</strong> adresine 
              veya <strong>Şehitler Caddesi Selahattin Ecevit Sokak 36/3, Mamak / Ankara</strong> adresine 
              yazılı olarak başvurabilirsiniz.
            </p>
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
