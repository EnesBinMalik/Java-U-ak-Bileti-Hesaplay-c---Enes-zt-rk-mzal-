import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Check, Sparkles } from 'lucide-react';
import { calculateFlightTicket } from '../utils/calculator';

interface TerminalLog {
  id: string;
  type: 'cmd' | 'prompt' | 'input' | 'output' | 'error' | 'info';
  text: string;
}

export const JavaTerminal: React.FC = () => {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: '1', type: 'info', text: '// Java 101 Uçak Bileti Konsol Simülatörü - Enes Öztürk' },
    { id: '2', type: 'cmd', text: '$ javac UcakBiletiHesaplama.java' },
    { id: '3', type: 'cmd', text: '$ java UcakBiletiHesaplama' },
    { id: '4', type: 'prompt', text: 'Mesafeyi km türünden giriniz : 1500' },
    { id: '5', type: 'prompt', text: 'Yaşınızı giriniz : 20' },
    { id: '6', type: 'prompt', text: 'Yolculuk tipini giriniz (1 => Tek Yön , 2 => Gidiş Dönüş ): 2' },
    { id: '7', type: 'output', text: 'Toplam Tutar = 216.0 TL' },
  ]);

  const [inputKm, setInputKm] = useState<string>('1500');
  const [inputAge, setInputAge] = useState<string>('20');
  const [inputType, setInputType] = useState<string>('2');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = (kmVal?: string, ageVal?: string, typeVal?: string) => {
    const kmStr = kmVal ?? inputKm;
    const ageStr = ageVal ?? inputAge;
    const typeStr = typeVal ?? inputType;

    const km = parseFloat(kmStr);
    const age = parseInt(ageStr, 10);
    const type = parseInt(typeStr, 10);

    setIsRunning(true);

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: Date.now() + '-cmd', type: 'cmd', text: '$ java UcakBiletiHesaplama' },
      { id: Date.now() + '-p1', type: 'prompt', text: `Mesafeyi km türünden giriniz : ${kmStr}` },
      { id: Date.now() + '-p2', type: 'prompt', text: `Yaşınızı giriniz : ${ageStr}` },
      { id: Date.now() + '-p3', type: 'prompt', text: `Yolculuk tipini giriniz (1 => Tek Yön , 2 => Gidiş Dönüş ): ${typeStr}` },
    ];

    const result = calculateFlightTicket(km, age, type);

    if (result.isValid) {
      newLogs.push({
        id: Date.now() + '-out',
        type: 'output',
        text: `Toplam Tutar = ${result.toplamTutar.toFixed(1)} TL`,
      });
    } else {
      newLogs.push({
        id: Date.now() + '-err',
        type: 'error',
        text: result.errorMessage || 'Hatalı Veri Girdiniz !',
      });
    }

    setLogs(newLogs);
    setIsRunning(false);
  };

  const handleClear = () => {
    setLogs([
      { id: '1', type: 'info', text: '// Terminal temizlendi. Yeni bir komut çalıştırabilirsiniz.' },
    ]);
  };

  const loadScenario = (km: string, age: string, type: string) => {
    setInputKm(km);
    setInputAge(age);
    setInputType(type);
    handleRun(km, age, type);
  };

  return (
    <div className="space-y-6">
      {/* Quick Scenario Run Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
        <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Ödev Test Senaryolarını Çalıştır:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadScenario('1500', '20', '2')}
            className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/60 transition-colors cursor-pointer"
          >
            Senaryo 1 (1500km, 20y, Tip 2 ➔ 216 TL)
          </button>

          <button
            onClick={() => loadScenario('-500', '1', '77')}
            className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 transition-colors cursor-pointer"
          >
            Senaryo 2 (-500km, 1y, Tip 77 ➔ Hatalı Veri)
          </button>

          <button
            onClick={() => loadScenario('200', '35', '1')}
            className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition-colors cursor-pointer"
          >
            Senaryo 3 (200km, 35y, Tip 1 ➔ 20.0 TL)
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="rounded-2xl border border-slate-800 bg-[#0c1017] shadow-2xl overflow-hidden">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">bash ~ UcakBiletiHesaplama.java (OpenJDK 21)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Konsolu Temizle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-6 font-mono text-xs sm:text-sm min-h-[340px] max-h-[500px] overflow-y-auto space-y-2 selection:bg-slate-700">
          {logs.map((log) => {
            if (log.type === 'info') {
              return <div key={log.id} className="text-slate-500 italic">{log.text}</div>;
            }
            if (log.type === 'cmd') {
              return (
                <div key={log.id} className="text-sky-400 font-semibold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'prompt') {
              return <div key={log.id} className="text-slate-300 pl-5">{log.text}</div>;
            }
            if (log.type === 'output') {
              return (
                <div key={log.id} className="text-emerald-400 font-bold pl-5 py-1 text-sm sm:text-base flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={log.id} className="text-rose-400 font-bold pl-5 py-1 text-sm sm:text-base">
                  {log.text}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Interactive CLI Input Bar */}
        <div className="p-4 bg-[#11161d] border-t border-slate-800 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Mesafeyi giriniz:</span>
            <input
              type="number"
              value={inputKm}
              onChange={(e) => setInputKm(e.target.value)}
              className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-xs focus:outline-none focus:border-sky-500"
              placeholder="KM"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Yaş:</span>
            <input
              type="number"
              value={inputAge}
              onChange={(e) => setInputAge(e.target.value)}
              className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-xs focus:outline-none focus:border-sky-500"
              placeholder="Yaş"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Tip (1/2):</span>
            <input
              type="number"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-xs focus:outline-none focus:border-sky-500"
              placeholder="1 veya 2"
            />
          </div>

          <button
            onClick={() => handleRun()}
            disabled={isRunning}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Java Programını Çalıştır</span>
          </button>
        </div>
      </div>
    </div>
  );
};
