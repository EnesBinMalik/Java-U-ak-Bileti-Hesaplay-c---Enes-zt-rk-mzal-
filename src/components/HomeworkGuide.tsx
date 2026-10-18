import React from 'react';
import { BookOpen, CheckCircle, Calculator, FileCheck, Award, AlertCircle } from 'lucide-react';

export const HomeworkGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Java Uçak Bileti Fiyatı Hesaplama Ödev Kılavuzu</h2>
            <p className="text-xs text-slate-400">
              Patika.dev / Üniversite Java 101 ödev şartları, indirim oranları ve matematiksel doğrulama adımları
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Rules & Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rules Card */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Ödev Şartları ve Kuralları</span>
          </h3>

          <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">1.</span>
              <span><strong>Mesafe Ücreti:</strong> Mesafe başına ücret sabit olarak <strong>0,10 TL / km</strong> olarak alınır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">2.</span>
              <span><strong>Girdi Geçerliliği:</strong> Mesafe ve yaş pozitif sayı (0&apos;dan büyük), yolculuk tipi ise sadece <strong>1 (Tek Yön)</strong> veya <strong>2 (Gidiş-Dönüş)</strong> olmalıdır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">3.</span>
              <span><strong>Hata Mesajı:</strong> Geçersiz bir veri girildiğinde ekrana kesin olarak <code className="text-rose-400 font-mono bg-rose-950/40 px-1 py-0.5 rounded">&quot;Hatalı Veri Girdiniz !&quot;</code> uyarısı yazdırılmalıdır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">4.</span>
              <span><strong>Çocuk İndirimi:</strong> Kişi 12 yaşından küçükse (<code className="text-sky-300 font-mono">&lt; 12</code>) bilet fiyatı üzerinden <strong>%50 indirim</strong> uygulanır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">5.</span>
              <span><strong>Genç İndirimi:</strong> Kişi 12 - 24 yaşları arasında ise (<code className="text-sky-300 font-mono">12 &le; yaş &le; 24</code>) bilet fiyatı üzerinden <strong>%10 indirim</strong> uygulanır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">6.</span>
              <span><strong>Kıdemli İndirimi:</strong> Kişi 65 yaşından büyük ise (<code className="text-sky-300 font-mono">&gt; 65</code>) bilet fiyatı üzerinden <strong>%30 indirim</strong> uygulanır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-sky-400 font-bold">7.</span>
              <span><strong>Yolculuk Tipi İndirimi:</strong> Kişi yolculuk tipini &quot;Gidiş Dönüş&quot; (2) seçmiş ise indirimli fiyat üzerinden <strong>%20 indirim</strong> uygulanır ve 2 bilet olduğu için sonuç <strong>2 ile çarpılır</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Mathematical Proof Card */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>Resmi Ödev İpucu &amp; Örnek Sağlama</span>
          </h3>

          <div className="space-y-2 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed text-slate-300">
            <div className="text-slate-500">// Senaryo 1 Matematiksel Kanıtı (1500 km, 20 Yaş, Gidiş-Dönüş):</div>
            <div>
              <span className="text-sky-400">Normal Tutar</span> = Mesafe * 0.10 = 1500 * 0.10 = <span className="text-white font-bold">150 TL</span>
            </div>
            <div>
              <span className="text-sky-400">Yaş İndirimi</span> = Normal Tutar * 0.10 = 150 * 0.10 = <span className="text-amber-400 font-bold">15 TL</span>
            </div>
            <div>
              <span className="text-sky-400">İndirimli Tutar</span> = Normal Tutar – Yaş İndirimi = 150 – 15 = <span className="text-white font-bold">135 TL</span>
            </div>
            <div>
              <span className="text-sky-400">Gidiş Dönüş Bilet İndirimi</span> = 135 * 0.20 = <span className="text-amber-400 font-bold">27 TL</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-emerald-400 font-bold text-sm">
              Toplam Tutar = (135 - 27) * 2 = 216 TL
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-sky-300 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              <span>Gidiş-Dönüş Çarpanı Neden 2x?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ödev formülünde belirtildiği üzere, gidiş-dönüş biletinde yolcu iki yönlü (gidiş ve dönüş) seyahat ettiği için %20 indirimli birim bilet tutarı 2 ile çarpılmaktadır.
            </p>
          </div>
        </div>
      </div>

      {/* Senaryo Test Karşılaştırma Tablosu */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-sky-400" />
          <span>Resmi Test Senaryoları Matrisi</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Senaryo</th>
                <th className="py-2.5 px-3">Mesafe (KM)</th>
                <th className="py-2.5 px-3">Yaş</th>
                <th className="py-2.5 px-3">Yolculuk Tipi</th>
                <th className="py-2.5 px-3">Beklenen Konsol Çıktısı</th>
                <th className="py-2.5 px-3">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Senaryo 1</td>
                <td className="py-3 px-3">1500 km</td>
                <td className="py-3 px-3">20 (Genç)</td>
                <td className="py-3 px-3">2 (Gidiş-Dönüş)</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Toplam Tutar = 216 TL</td>
                <td className="py-3 px-3 text-emerald-400">✓ %100 Başarılı</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Senaryo 2</td>
                <td className="py-3 px-3 text-rose-400">-500 km (Geçersiz)</td>
                <td className="py-3 px-3">1</td>
                <td className="py-3 px-3 text-rose-400">77 (Geçersiz)</td>
                <td className="py-3 px-3 text-rose-400 font-bold">Hatalı Veri Girdiniz !</td>
                <td className="py-3 px-3 text-emerald-400">✓ %100 Başarılı</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Senaryo 3</td>
                <td className="py-3 px-3">200 km</td>
                <td className="py-3 px-3">35 (Yetişkin)</td>
                <td className="py-3 px-3">1 (Tek Yön)</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Toplam Tutar = 20.0 TL</td>
                <td className="py-3 px-3 text-emerald-400">✓ %100 Başarılı</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Handcrafted Signature Stamp */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-sky-500/10 p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Enes Öztürk İmzalı Özel El Emeği Ödev Çözümü</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Java temiz kod prensipleri, Scanner girdi kontrolleri ve tüm matematiksel indirgeme adımları eksiksiz hazırlanmıştır.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-mono text-xs text-amber-400 font-semibold tracking-wider">
            ENES ÖZTÜRK © 2026
          </div>
          <div className="text-[11px] text-slate-400">
            Java 101 Bilet Simülatörü
          </div>
        </div>
      </div>
    </div>
  );
};
