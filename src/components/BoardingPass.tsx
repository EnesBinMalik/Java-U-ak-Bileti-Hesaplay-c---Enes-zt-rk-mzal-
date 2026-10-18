import React, { useRef } from 'react';
import { Plane, AlertTriangle, Printer, Calendar, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import { CalculationResult } from '../types';

interface BoardingPassProps {
  result: CalculationResult;
  passengerName: string;
  setPassengerName: (name: string) => void;
  fromCity: string;
  toCity: string;
}

export const BoardingPass: React.FC<BoardingPassProps> = ({
  result,
  passengerName,
  setPassengerName,
  fromCity,
  toCity,
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-full space-y-4">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Biniş Kartı Önizleme</span>
          <span aria-hidden="true">·</span>
          <span>Uçuş: AJ-101</span>
          <span aria-hidden="true">·</span>
          <span>Koltuk: 14A</span>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Bileti Yazdır</span>
        </button>
      </div>

      {/* Boarding pass container */}
      <div
        ref={ticketRef}
        className="relative bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden print:border-black print:text-black print:bg-white"
      >
        {!result.isValid ? (
          // Invalid state card
          <div className="p-8 sm:p-12 text-center space-y-4 bg-rose-950/20 border-2 border-dashed border-rose-600/40 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-rose-400">Biniş Kartı Düzenlenemedi</h3>
              <p className="text-sm text-slate-300 mt-1 font-mono">
                &quot;{result.errorMessage}&quot;
              </p>
            </div>
            <div className="max-w-md mx-auto text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-left">
              <p className="font-semibold text-slate-200 mb-2">Gerekli Koşullar:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li className={result.validationDetails.isMesafeValid ? 'text-emerald-400' : 'text-rose-400'}>
                  Mesafe pozitif bir sayı olmalıdır ({result.mesafe} km girildi).
                </li>
                <li className={result.validationDetails.isYasValid ? 'text-emerald-400' : 'text-rose-400'}>
                  Yaş pozitif bir sayı olmalıdır ({result.yas} girildi).
                </li>
                <li className={result.validationDetails.isTipValid ? 'text-emerald-400' : 'text-rose-400'}>
                  Yolculuk tipi 1 (Tek Yön) veya 2 (Gidiş-Dönüş) olmalıdır ({result.yolculukTipi} girildi).
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Valid Boarding Pass Layout
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Left 8-col Main Passenger Card */}
            <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              {/* Airline Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                    <Plane className="w-5 h-5 -rotate-45" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">AEROJAVA AIRWAYS</h2>
                    <p className="text-xs text-slate-400">Elektronik Uçak Biniş Kartı</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-sky-400 font-medium">
                    {result.yolculukTipi === 2 ? 'Gidiş - Dönüş Bileti' : 'Tek Yön Bileti'}
                  </span>
                  <div className="text-xs text-slate-500 font-mono">AJ-101 / Y-CLASS</div>
                </div>
              </div>

              {/* Passenger Name & Flight Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>YOLCU ADI</span>
                  </div>
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full text-sm font-semibold text-white bg-slate-800/60 border border-slate-700 rounded px-2 py-1 focus:outline-none focus:border-sky-500"
                    placeholder="Yolcu Adı Soyadı"
                  />
                </div>

                <div>
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>TARİH</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mt-1">{currentDate}</div>
                </div>

                <div>
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>BİNİŞ SAATİ</span>
                  </div>
                  <div className="text-sm font-semibold text-amber-400 mt-1">10:45 (Kapı B4)</div>
                </div>
              </div>

              {/* Route Display */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {fromCity.toUpperCase().slice(0, 3)}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>{fromCity}</span>
                  </div>
                </div>

                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="text-xs text-slate-400 font-mono mb-1">{result.mesafe} KM</div>
                  <div className="w-full flex items-center gap-2">
                    <div className="h-0.5 flex-1 bg-slate-700 relative">
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400" />
                    </div>
                    <Plane className="w-4 h-4 text-sky-400 rotate-90 shrink-0" />
                    <div className="h-0.5 flex-1 bg-slate-700 relative">
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400" />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {result.yolculukTipi === 2 ? 'Karşılıklı 2 Sefer' : 'Direkt Uçuş'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {toCity.toUpperCase().slice(0, 3)}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>{toCity}</span>
                  </div>
                </div>
              </div>

              {/* Discounts & Passenger Age Group Info */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Yaş: {result.yas} ({result.yasIndirimAciklamasi})</span>
                </div>
                {result.yolculukTipi === 2 && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <div className="flex items-center gap-1.5 text-sky-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Gidiş-Dönüş %20 İndirim</span>
                    </div>
                  </>
                )}
              </div>

              {/* Barcode Mock */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px] text-slate-500">
                <div className="font-mono tracking-widest">
                  ||| | | |||| || ||| |||| | ||| ||||| |||| | | ||| ||||
                </div>
                <div className="text-right font-mono">
                  ENE-2026-OZTURK
                </div>
              </div>
            </div>

            {/* Right 4-col Tear-off Stub */}
            <div className="md:col-span-4 p-6 sm:p-8 bg-slate-950/40 flex flex-col justify-between space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <div className="text-xs text-slate-500 uppercase tracking-wider">KUPON / STUB</div>
                <div className="text-base font-bold text-white mt-0.5">{passengerName}</div>
                <div className="text-xs text-slate-400">{fromCity} ➔ {toCity}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">KOLTUK</span>
                  <span className="font-mono font-bold text-white text-base">14A</span>
                </div>
                <div>
                  <span className="text-slate-500 block">KAPI</span>
                  <span className="font-mono font-bold text-white text-base">B4</span>
                </div>
                <div>
                  <span className="text-slate-500 block">TİP</span>
                  <span className="text-slate-300 font-medium">
                    {result.yolculukTipi === 2 ? 'Gidiş-Dönüş' : 'Tek Yön'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">MESAFE</span>
                  <span className="text-slate-300 font-mono">{result.mesafe} km</span>
                </div>
              </div>

              {/* Price Breakdown Highlight */}
              <div className="bg-sky-950/30 border border-sky-800/40 rounded-xl p-3.5 text-center">
                <span className="text-xs text-sky-300 uppercase tracking-wider block">Ödenecek Tutar</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums block mt-1">
                  {result.toplamTutar.toFixed(2)} TL
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {result.yolculukTipi === 2 ? 'Toplam 2 Bilet Dahil' : '1 Bilet'}
                </span>
              </div>

              <div className="text-center pt-2">
                <div className="font-mono text-[9px] text-slate-500 tracking-wider">
                  |||| | || ||||| |||| || |||
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">
                  Geliştirici: Enes Öztürk
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
