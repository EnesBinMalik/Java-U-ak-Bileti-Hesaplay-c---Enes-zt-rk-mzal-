import React from 'react';
import { 
  Calculator, 
  MapPin, 
  User, 
  ArrowRightLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  TrendingDown,
  Layers
} from 'lucide-react';
import { CalculationResult, RoutePreset } from '../types';
import { ROUTE_PRESETS, SCENARIO_PRESETS } from '../utils/calculator';
import { BoardingPass } from './BoardingPass';

interface CalculatorSectionProps {
  mesafe: number;
  setMesafe: (val: number) => void;
  yas: number;
  setYas: (val: number) => void;
  yolculukTipi: number;
  setYolculukTipi: (val: number) => void;
  passengerName: string;
  setPassengerName: (name: string) => void;
  fromCity: string;
  setFromCity: (city: string) => void;
  toCity: string;
  setToCity: (city: string) => void;
  result: CalculationResult;
  onSelectScenario: (scenId: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  mesafe,
  setMesafe,
  yas,
  setYas,
  yolculukTipi,
  setYolculukTipi,
  passengerName,
  setPassengerName,
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  result,
  onSelectScenario,
}) => {
  const handleSelectRoute = (route: RoutePreset) => {
    setFromCity(route.from);
    setToCity(route.to);
    setMesafe(route.km);
  };

  return (
    <div className="space-y-8">
      {/* Homework Scenarios Bar */}
      <div className="bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Ödev Senaryo Testleri (1 Tıklamayla Dene)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Ödev metninde yer alan test senaryolarını tek tıkla yükleyin ve sonuçları inceleyin:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SCENARIO_PRESETS.slice(0, 3).map((scen) => (
            <button
              key={scen.id}
              onClick={() => onSelectScenario(scen.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                scen.isErrorScenario
                  ? 'bg-rose-950/20 hover:bg-rose-950/40 border-rose-900/50 hover:border-rose-600'
                  : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-700/60 hover:border-sky-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{scen.name}</span>
                <span className={`text-[11px] font-mono ${scen.isErrorScenario ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {scen.expectedOutput}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                {scen.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Math & Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              <span>Uçuş Parametreleri</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Mesafe başına ücret: <span className="font-mono text-sky-400 font-semibold">0,10 TL / km</span>
            </p>
          </div>

          {/* Preset Routes Carousel */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Popüler Rota Seçimi (Opsiyonel)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROUTE_PRESETS.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleSelectRoute(route)}
                  className={`p-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    mesafe === route.km && fromCity === route.from && toCity === route.to
                      ? 'bg-sky-950/70 border-sky-500 text-sky-300 font-semibold'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="truncate font-medium">{route.from} ➔ {route.to}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{route.km} km</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mesafe (KM) Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <label htmlFor="mesafe-input" className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Mesafe (KM)</span>
              </label>
              <span className={`font-mono text-xs ${result.validationDetails.isMesafeValid ? 'text-sky-400' : 'text-rose-400 font-bold'}`}>
                {result.validationDetails.isMesafeValid ? `${mesafe} km` : 'Geçersiz Mesafe'}
              </span>
            </div>

            <input
              id="mesafe-input"
              type="number"
              value={isNaN(mesafe) ? '' : mesafe}
              onChange={(e) => setMesafe(parseFloat(e.target.value) || 0)}
              className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl font-mono text-white text-sm focus:outline-none transition-colors ${
                result.validationDetails.isMesafeValid ? 'border-slate-700 focus:border-sky-500' : 'border-rose-500 bg-rose-950/20'
              }`}
              placeholder="Örn: 1500"
            />

            <div className="flex items-center gap-2 pt-1">
              {[200, 500, 1000, 1500, 2000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setMesafe(val)}
                  className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                    mesafe === val
                      ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {val}k
                </button>
              ))}
            </div>
          </div>

          {/* Yaş Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <label htmlFor="yas-input" className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-sky-400" />
                <span>Yolcu Yaşı</span>
              </label>
              <span className={`font-mono text-xs ${result.validationDetails.isYasValid ? 'text-sky-400' : 'text-rose-400 font-bold'}`}>
                {result.validationDetails.isYasValid ? `${yas} Yaşında` : 'Geçersiz Yaş'}
              </span>
            </div>

            <input
              id="yas-input"
              type="number"
              value={isNaN(yas) ? '' : yas}
              onChange={(e) => setYas(parseInt(e.target.value, 10) || 0)}
              className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl font-mono text-white text-sm focus:outline-none transition-colors ${
                result.validationDetails.isYasValid ? 'border-slate-700 focus:border-sky-500' : 'border-rose-500 bg-rose-950/20'
              }`}
              placeholder="Örn: 20"
            />

            {/* Quick Age Group Categories */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setYas(8)}
                className={`p-1.5 text-center rounded border transition-colors cursor-pointer ${
                  yas < 12 && yas > 0
                    ? 'bg-sky-600/30 border-sky-400 text-sky-300 font-bold'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-semibold">&lt; 12 Yaş</div>
                <div className="text-[9px] text-emerald-400 font-mono">%50 İndirim</div>
              </button>

              <button
                type="button"
                onClick={() => setYas(20)}
                className={`p-1.5 text-center rounded border transition-colors cursor-pointer ${
                  yas >= 12 && yas <= 24
                    ? 'bg-sky-600/30 border-sky-400 text-sky-300 font-bold'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-semibold">12 - 24 Yaş</div>
                <div className="text-[9px] text-sky-400 font-mono">%10 İndirim</div>
              </button>

              <button
                type="button"
                onClick={() => setYas(35)}
                className={`p-1.5 text-center rounded border transition-colors cursor-pointer ${
                  yas > 24 && yas <= 65
                    ? 'bg-sky-600/30 border-sky-400 text-sky-300 font-bold'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-semibold">25 - 65 Yaş</div>
                <div className="text-[9px] text-slate-400 font-mono">Standart</div>
              </button>

              <button
                type="button"
                onClick={() => setYas(70)}
                className={`p-1.5 text-center rounded border transition-colors cursor-pointer ${
                  yas > 65
                    ? 'bg-sky-600/30 border-sky-400 text-sky-300 font-bold'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-semibold">&gt; 65 Yaş</div>
                <div className="text-[9px] text-amber-400 font-mono">%30 İndirim</div>
              </button>
            </div>
          </div>

          {/* Yolculuk Tipi (1: Tek Yön, 2: Gidiş-Dönüş) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <label className="flex items-center gap-1.5">
                <ArrowRightLeft className="w-4 h-4 text-sky-400" />
                <span>Yolculuk Tipi</span>
              </label>
              <span className={`font-mono text-xs ${result.validationDetails.isTipValid ? 'text-sky-400' : 'text-rose-400 font-bold'}`}>
                {yolculukTipi === 1 ? '1 => Tek Yön' : yolculukTipi === 2 ? '2 => Gidiş-Dönüş' : `Geçersiz (${yolculukTipi})`}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setYolculukTipi(1)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  yolculukTipi === 1
                    ? 'bg-sky-950/80 border-sky-400 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-left">
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="text-xs font-bold text-white">1: Tek Yön</div>
                    <div className="text-[11px] text-slate-400">1 Bilet Hesabı</div>
                  </div>
                </div>
                {yolculukTipi === 1 && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setYolculukTipi(2)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  yolculukTipi === 2
                    ? 'bg-sky-950/80 border-sky-400 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-left">
                  <ArrowRightLeft className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="text-xs font-bold text-white">2: Gidiş - Dönüş</div>
                    <div className="text-[11px] text-sky-300 font-medium">%20 İndirimli × 2</div>
                  </div>
                </div>
                {yolculukTipi === 2 && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
              </button>
            </div>

            {/* Test custom invalid value */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>Hatalı tip testi için:</span>
              <button
                type="button"
                onClick={() => setYolculukTipi(77)}
                className={`hover:text-rose-400 underline cursor-pointer ${yolculukTipi === 77 ? 'text-rose-400 font-bold' : ''}`}
              >
                Tip = 77 (Senaryo 2 gibi hatalı giriş yap)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Mathematical Calculation Breakdown & Summary (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Error Banner when Invalid */}
          {!result.isValid ? (
            <div className="bg-rose-950/30 border-2 border-rose-600/80 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-rose-400 font-mono tracking-tight">
                    Hatalı Veri Girdiniz !
                  </h3>
                  <p className="text-xs text-rose-300/80">
                    Java programı girdileri doğrulayamadı. Girdilerinizi kontrol ediniz.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-900/40 text-xs space-y-2">
                <div className="font-semibold text-slate-200">Hata Nedenleri ve Şartlar:</div>
                <div className="space-y-1.5 font-mono">
                  <div className={`flex items-center justify-between ${result.validationDetails.isMesafeValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span>1. Mesafe &gt; 0 olmalıdır:</span>
                    <span>{mesafe} km {result.validationDetails.isMesafeValid ? '✓ Geçerli' : '✗ GEÇERSİZ'}</span>
                  </div>
                  <div className={`flex items-center justify-between ${result.validationDetails.isYasValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span>2. Yaş &gt; 0 olmalıdır:</span>
                    <span>{yas} yaş {result.validationDetails.isYasValid ? '✓ Geçerli' : '✗ GEÇERSİZ'}</span>
                  </div>
                  <div className={`flex items-center justify-between ${result.validationDetails.isTipValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span>3. Yolculuk Tipi 1 veya 2 olmalıdır:</span>
                    <span>Değer: {yolculukTipi} {result.validationDetails.isTipValid ? '✓ Geçerli' : '✗ GEÇERSİZ'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mathematical Step Breakdown */
            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-sky-400" />
                    <span>Adım Adım Hesaplama Tablosu</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ödev formülüne göre kademeli hesaplanan indirimler ve tutarlar:
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">TOPLAM TUTAR</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    {result.toplamTutar.toFixed(2)} TL
                  </span>
                </div>
              </div>

              {/* Steps list */}
              <div className="space-y-3">
                {result.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      idx === result.steps.length - 1
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{step.title}</span>
                      <span className="text-sm font-bold font-mono tabular-nums text-sky-300">
                        {step.result}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Formül:</span>
                        <span className="font-mono text-slate-400">{step.formula}</span>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-slate-500 block text-[10px]">İşlem:</span>
                        <span className="font-mono text-slate-300">{step.calculation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary stat cards */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Normal Tutar</span>
                  <span className="text-base font-bold text-white font-mono tabular-nums mt-0.5 block">
                    {result.normalTutar.toFixed(2)} TL
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block flex items-center justify-center gap-1">
                    <TrendingDown className="w-3 h-3 text-sky-400" />
                    <span>Toplam Tasarruf</span>
                  </span>
                  <span className="text-base font-bold text-sky-400 font-mono tabular-nums mt-0.5 block">
                    {result.yolculukTipi === 2
                      ? `${(result.normalTutar * 2 - result.toplamTutar).toFixed(2)} TL`
                      : `${(result.normalTutar - result.toplamTutar).toFixed(2)} TL`}
                  </span>
                </div>

                <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-center">
                  <span className="text-[11px] text-emerald-400 block font-semibold">Ödenecek Toplam</span>
                  <span className="text-base font-bold text-emerald-300 font-mono tabular-nums mt-0.5 block">
                    {result.toplamTutar.toFixed(2)} TL
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Live Boarding Pass Preview */}
          <BoardingPass
            result={result}
            passengerName={passengerName}
            setPassengerName={setPassengerName}
            fromCity={fromCity}
            toCity={toCity}
          />
        </div>
      </div>
    </div>
  );
};
