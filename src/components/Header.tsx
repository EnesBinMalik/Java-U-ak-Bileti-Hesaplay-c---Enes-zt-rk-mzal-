import React from 'react';
import { Award, Plane } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'terminal' | 'code' | 'guide';
  setActiveTab: (tab: 'calculator' | 'terminal' | 'code' | 'guide') => void;
  onOpenSignature: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenSignature }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <a 
          href="#calculator" 
          onClick={(e) => { e.preventDefault(); setActiveTab('calculator'); }}
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/30 transition-colors">
            <Plane className="w-4 h-4" />
          </div>
          <span>AeroJava · Uçak Bileti</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'calculator' 
                ? 'text-sky-400 font-semibold border-b-2 border-sky-400' 
                : 'hover:text-white'
            }`}
          >
            Bilet Hesaplayıcı
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'terminal' 
                ? 'text-sky-400 font-semibold border-b-2 border-sky-400' 
                : 'hover:text-white'
            }`}
          >
            Java Terminali
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'code' 
                ? 'text-sky-400 font-semibold border-b-2 border-sky-400' 
                : 'hover:text-white'
            }`}
          >
            Java Kaynak Kodu
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'guide' 
                ? 'text-sky-400 font-semibold border-b-2 border-sky-400' 
                : 'hover:text-white'
            }`}
          >
            Ödev Şartları & İpuçları
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSignature}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Enes Öztürk Özel El Emeği İmzası"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Enes Öztürk İmzalı</span>
          </button>
        </div>
      </div>
    </header>
  );
};
