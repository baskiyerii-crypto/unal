'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface FormBlockProps {
  title?: string;
  description?: string;
}

export default function FormBlock({
  title = '24 Saat İçinde Ücretsiz Keşif & Fiyat Teklifi Alın',
  description = 'Çatınızla ilgili ihtiyacı seçin, formu doldurun. Uzman teknik ekibimiz 30 dakika içinde sizinle iletişime geçip sürpriz maliyetsiz net teklifinizi hazırlasın.',
}: FormBlockProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Ankara',
    service: 'kenet-cati',
    message: '',
    kvkkConsent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const quickServices = [
    { id: 'kenet-cati', label: '🏠 Yeni Kenet Çatı', desc: '%100 Sızdırmazlık' },
    { id: 'cati-tadilat', label: '💧 Su Sızıntısı / Tadilat', desc: 'Acil Onarım' },
    { id: 'oluk-montaji', label: '🌧️ Eksiz Oluk Montajı', desc: 'Su Tahliyesi' },
    { id: 'cati-yapimi', label: '🏢 Fabrika / Komple Çatı', desc: 'Geniş Metraj' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkConsent) {
      setStatus('error');
      setErrorMessage('Lütfen KVKK Aydınlatma Metni kabul şartını onaylayın.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          phone: '',
          city: 'Ankara',
          service: 'kenet-cati',
          message: '',
          kvkkConsent: false,
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(data.error || 'Teklif gönderilirken bir hata oluştu. Lütfen telefonla iletişime geçin.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Ağ hatası oluştu. Lütfen doğrudan 0531 792 40 06 numarasını arayın.');
    }
  };

  return (
    <section id="teklif-al" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-custom p-8 sm:p-12 border-2 border-gray-200 hover:border-[#D4AF37]/50 shadow-xl transition-all">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest bg-[#24292E] px-3.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ücretsiz Keşif & Fiyat Garantisi</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#24292E] tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold">Teklif İsteğiniz Başarıyla Alındı!</h3>
              <p className="text-sm text-emerald-700">
                Talebiniz MenakYapı ekibine iletildi. En geç 30 dakika içerisinde verdiğiniz numara üzerinden sizinle iletişime geçeceğiz.
              </p>
              <button 
                onClick={() => setStatus('idle')} 
                className="btn-primary text-xs mt-4"
              >
                Yeni Form Doldur
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* SPIN Selling Interactive Problem/Service Selector Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#24292E]">
                  1. Çatı İhtiyacınızı Seçin (Hızlı Seçim) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {quickServices.map((qs) => (
                    <button
                      key={qs.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, service: qs.id })}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        formData.service === qs.id
                          ? 'border-[#D4AF37] bg-[#24292E] text-white shadow-md ring-2 ring-[#D4AF37]/30'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-[#D4AF37]/50 hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{qs.label}</span>
                      <span className={`text-[10px] mt-1 font-medium ${formData.service === qs.id ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                        {qs.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24292E]">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={3}
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.fullName}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ\s]/g, '');
                      setFormData({ ...formData, fullName: val });
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24292E]">
                    Telefon Numarası *
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{11}"
                    maxLength={11}
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setFormData({ ...formData, phone: val });
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* City Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24292E]">
                    Şehir / Bölge
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm bg-white transition-all"
                  >
                    <option value="Ankara">Ankara</option>
                    <option value="Antalya">Antalya</option>
                    <option value="Diger">Diğer Türkiye İli</option>
                  </select>
                </div>

                {/* Service Selection Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24292E]">
                    İstenen Hizmet Kapsamı
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm bg-white transition-all"
                  >
                    <option value="kenet-cati">Kenet Çatı Sistemleri (%100 Sızdırmazlık)</option>
                    <option value="cati-yapimi">Çatı Yapımı ve Montajı</option>
                    <option value="cati-tadilat">Çatı Tadilat ve Onarımı</option>
                    <option value="oluk-montaji">Oluk Montajı ve Değişimi</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24292E]">
                  Çatı Detayları & Özel İhtiyaçlarınız
                </label>
                <textarea
                  rows={3}
                  placeholder="Çatının tahmini m² alanı, çatı tipi veya spesifik durumunuzu kısaca belirtebilirsiniz..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Mandatory KVKK Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="kvkkConsent"
                  checked={formData.kvkkConsent}
                  onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                />
                <label htmlFor="kvkkConsent" className="text-xs text-gray-600 leading-normal">
                  <span className="font-semibold text-gray-800">KVKK Aydınlatma Metni</span>&apos;ni okudum. Kişisel verilerimin iletişim amacıyla işlenmesine açık rıza veriyorum. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-accent w-full py-4 text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'loading' ? (
                  <span>Gönderiliyor...</span>
                ) : (
                  <>
                    <span>24 Saat İçinde Ücretsiz Fiyat Teklifimi Al</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
