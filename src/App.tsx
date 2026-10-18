/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plane, 
  Terminal, 
  Code2, 
  BookOpen, 
  Award, 
  Compass, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Header } from './components/Header';
import { CalculatorSection } from './components/CalculatorSection';
import { JavaTerminal } from './components/JavaTerminal';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { HomeworkGuide } from './components/HomeworkGuide';
import { SignatureModal } from './components/SignatureModal';
import { calculateFlightTicket, SCENARIO_PRESETS } from './utils/calculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'terminal' | 'code' | 'guide'>('calculator');
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  // Form states initialized to match Senaryo 1 (1500 km, 20 yaş, Gidiş-Dönüş 2 => 216 TL)
  const [mesafe, setMesafe] = useState<number>(1500);
  const [yas, setYas] = useState<number>(20);
  const [yolculukTipi, setYolculukTipi] = useState<number>(2);
  const [passengerName, setPassengerName] = useState<string>('Enes Öztürk');
  const [fromCity, setFromCity] = useState<string>('İstanbul');
  const [toCity, setToCity] = useState<string>('İzmir');

  // Compute live calculation result
  const result = calculateFlightTicket(mesafe, yas, yolculukTipi);

  const handleSelectScenario = (scenId: string) => {
    const scen = SCENARIO_PRESETS.find((s) => s.id === scenId);
    if (scen) {
      setMesafe(scen.mesafe);
      setYas(scen.yas);
      setYolculukTipi(scen.yolculukTipi);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSignature={() => setIsSignatureOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Subtle decorative background grid pattern */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            {/* Metadata line with zero-pill discipline */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-medium">
              <span className="flex items-center gap-1">
                <Plane className="w-3.5 h-3.5" />
                <span>Java 101 Pratik Ödevi</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Birim Ücret: 0.10 TL / km</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Enes Öztürk İmzalı</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Uçak Bileti Fiyatı ve İndirim Hesaplama Programı
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Mesafeye, yaş grubuna (&lt;12, 12-24, &gt;65) ve yolculuk tipine (Tek Yön veya %20 indirimli Gidiş-Dönüş) göre dinamik bilet tutarını hesaplayan tam teşekküllü Java uygulaması ve simülatörü.
            </p>

            {/* Quick Tab Switcher Ribbon in Hero */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Görsel Hesaplayıcı &amp; Biniş Kartı</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'terminal'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Java CLI Konsol Simülatörü</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Java Kaynak Kodu (.java)</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'guide'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Ödev Şartnamesi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab View Switching */}
        {activeTab === 'calculator' && (
          <CalculatorSection
            mesafe={mesafe}
            setMesafe={setMesafe}
            yas={yas}
            setYas={setYas}
            yolculukTipi={yolculukTipi}
            setYolculukTipi={setYolculukTipi}
            passengerName={passengerName}
            setPassengerName={setPassengerName}
            fromCity={fromCity}
            setFromCity={setFromCity}
            toCity={toCity}
            setToCity={setToCity}
            result={result}
            onSelectScenario={handleSelectScenario}
          />
        )}

        {activeTab === 'terminal' && <JavaTerminal />}

        {activeTab === 'code' && <JavaCodeViewer />}

        {activeTab === 'guide' && <HomeworkGuide />}
      </main>

      {/* Handcrafted Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 mt-16 py-8 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200">AeroJava</span>
            <span aria-hidden="true">·</span>
            <span>Ödev Çözümü: Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>Java 101 Bilet Fiyatı Hesaplama</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsSignatureOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Geliştirici İmzası &amp; El Emeği Belgesi
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-500">2026 © Tüm Hakları Saklıdır</span>
          </div>
        </div>
      </footer>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
      />
    </div>
  );
}
