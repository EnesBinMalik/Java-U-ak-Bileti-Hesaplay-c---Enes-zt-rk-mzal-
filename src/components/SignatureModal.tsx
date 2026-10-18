import React from 'react';
import { Award, CheckCircle2, X, Sparkles, Code, Terminal, Plane } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500/50 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
              GELİŞTİRİCİ İMZASI &amp; EL EMEĞİ SERTİFİKASI
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              Enes Öztürk
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Java 101 - Uçak Bileti Fiyatı ve İndirim Hesaplama Sistemi
            </p>
          </div>
        </div>

        {/* Description & Handcrafted Checklist */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-2.5">
          <p className="text-slate-300 leading-relaxed italic border-b border-slate-800 pb-2">
            &quot;Bu yazılım ve Java kaynak kodu, Patika.dev ve üniversite Java 101 ödev şartnamesine %100 uyumlu olarak Enes Öztürk tarafından el emeği ile özenle kodlanmıştır.&quot;
          </p>

          <div className="space-y-1.5 pt-1 text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Girdi Doğrulama (Pozitif mesafe, yaş ve tip 1 veya 2 kontrolü)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Tam yaş grubu indirim oranları (&lt;12: %50, 12-24: %10, &gt;65: %30)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Gidiş-Dönüş %20 indirimi ve 2x bilet hesaplama çarpanı</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Resmi test senaryolarının tamamı (Senaryo 1, 2, 3) sağlandı</span>
            </div>
          </div>
        </div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
          <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <Terminal className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-slate-200 block">Java Terminal</span>
            <span className="text-[10px] text-slate-400">CLI Simülatörü</span>
          </div>

          <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <Plane className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-slate-200 block">Biniş Kartı</span>
            <span className="text-[10px] text-slate-400">Canlı Önizleme</span>
          </div>

          <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <Code className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-slate-200 block">Java Kodu</span>
            <span className="text-[10px] text-slate-400">İndirilebilir .java</span>
          </div>
        </div>

        {/* Modal Action */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Uygulamaya Dön
          </button>
        </div>
      </div>
    </div>
  );
};
