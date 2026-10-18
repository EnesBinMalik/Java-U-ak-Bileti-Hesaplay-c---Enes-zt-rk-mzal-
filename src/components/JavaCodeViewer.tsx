import React, { useState } from 'react';
import { Copy, Check, Download, Code2, Award, FileCode } from 'lucide-react';
import { JAVA_SOURCE_CODE, JAVA_MODULAR_CODE } from '../utils/javaCode';

export const JavaCodeViewer: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'standard' | 'modular'>('standard');
  const [copied, setCopied] = useState(false);

  const currentCode = activeCodeTab === 'standard' ? JAVA_SOURCE_CODE : JAVA_MODULAR_CODE;
  const fileName = activeCodeTab === 'standard' ? 'UcakBiletiHesaplama.java' : 'UcakBiletiServisi.java';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      {/* Top control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/80">
            <button
              onClick={() => setActiveCodeTab('standard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeCodeTab === 'standard'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UcakBiletiHesaplama.java (Scanner / Ödev)
            </button>
            <button
              onClick={() => setActiveCodeTab('modular')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeCodeTab === 'modular'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UcakBiletiServisi.java (Temiz Mimari)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl overflow-hidden">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <FileCode className="w-4 h-4 text-sky-400" />
            <span>{fileName}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500 text-[11px]">Java (JDK 8 - 21 Uyumlu)</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-400/90 text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Geliştirici: Enes Öztürk</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-slate-200">
          <pre className="selection:bg-sky-900/60 selection:text-sky-100">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>

      {/* Execution Instructions */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-sky-400" />
          <span>Java ile Nasıl Derlenir ve Çalıştırılır?</span>
        </div>
        <p className="leading-relaxed">
          Bilgisayarınızda terminali veya komut satırını (cmd/powershell/bash) açarak dosyanın bulunduğu dizinde şu komutları sırasıyla çalıştırabilirsiniz:
        </p>
        <div className="bg-black/60 p-3 rounded-lg border border-slate-800/80 font-mono text-slate-300 space-y-1">
          <div><span className="text-slate-500"># 1. Dosyayı derleyin</span></div>
          <div className="text-emerald-400">javac UcakBiletiHesaplama.java</div>
          <div><span className="text-slate-500"># 2. Programı çalıştırın</span></div>
          <div className="text-sky-400">java UcakBiletiHesaplama</div>
        </div>
      </div>
    </div>
  );
};
