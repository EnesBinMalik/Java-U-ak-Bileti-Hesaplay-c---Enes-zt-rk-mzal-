import { CalculationResult, CalculationStep, RoutePreset, ScenarioPreset } from '../types';

export const BIRIM_UCRET = 0.10; // 0,10 TL / km

export const ROUTE_PRESETS: RoutePreset[] = [
  { id: 'ist-izmr', from: 'İstanbul', to: 'İzmir', codeFrom: 'IST', codeTo: 'ADB', km: 480 },
  { id: 'ist-ayt', from: 'İstanbul', to: 'Antalya', codeFrom: 'IST', codeTo: 'AYT', km: 700 },
  { id: 'ist-tzx', from: 'İstanbul', to: 'Trabzon', codeFrom: 'IST', codeTo: 'TZX', km: 1060 },
  { id: 'ist-ber', from: 'İstanbul', to: 'Berlin', codeFrom: 'IST', codeTo: 'BER', km: 1740 },
  { id: 'ist-par', from: 'İstanbul', to: 'Paris', codeFrom: 'IST', codeTo: 'CDG', km: 2250 },
  { id: 'ist-jfk', from: 'İstanbul', to: 'New York', codeFrom: 'IST', codeTo: 'JFK', km: 8070 },
];

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'senaryo-1',
    name: 'Senaryo 1 (Ödev Örneği)',
    description: '1500 km, 20 Yaş, Gidiş-Dönüş (2)',
    mesafe: 1500,
    yas: 20,
    yolculukTipi: 2,
    expectedOutput: 'Toplam Tutar = 216.0 TL',
    isErrorScenario: false,
  },
  {
    id: 'senaryo-2',
    name: 'Senaryo 2 (Hatalı Veri Testi)',
    description: '-500 km, 1 Yaş, Geçersiz Tip (77)',
    mesafe: -500,
    yas: 1,
    yolculukTipi: 77,
    expectedOutput: 'Hatalı Veri Girdiniz !',
    isErrorScenario: true,
  },
  {
    id: 'senaryo-3',
    name: 'Senaryo 3 (Yetişkin Tek Yön)',
    description: '200 km, 35 Yaş, Tek Yön (1)',
    mesafe: 200,
    yas: 35,
    yolculukTipi: 1,
    expectedOutput: 'Toplam Tutar = 20.0 TL',
    isErrorScenario: false,
  },
  {
    id: 'senaryo-4',
    name: 'Senaryo 4 (Çocuk İndirimi)',
    description: '1000 km, 8 Yaş (<12), Gidiş-Dönüş (2)',
    mesafe: 1000,
    yas: 8,
    yolculukTipi: 2,
    expectedOutput: 'Toplam Tutar = 80.0 TL',
    isErrorScenario: false,
  },
  {
    id: 'senaryo-5',
    name: 'Senaryo 5 (65+ Yaşlı İndirimi)',
    description: '800 km, 70 Yaş (>65), Tek Yön (1)',
    mesafe: 800,
    yas: 70,
    yolculukTipi: 1,
    expectedOutput: 'Toplam Tutar = 56.0 TL',
    isErrorScenario: false,
  },
];

export function calculateFlightTicket(mesafe: number, yas: number, yolculukTipi: number): CalculationResult {
  const isMesafeValid = !isNaN(mesafe) && mesafe > 0;
  const isYasValid = !isNaN(yas) && yas > 0;
  const isTipValid = yolculukTipi === 1 || yolculukTipi === 2;
  const isValid = isMesafeValid && isYasValid && isTipValid;

  if (!isValid) {
    return {
      isValid: false,
      errorMessage: 'Hatalı Veri Girdiniz !',
      validationDetails: {
        isMesafeValid,
        isYasValid,
        isTipValid,
      },
      mesafe,
      yas,
      yolculukTipi,
      birimFiyat: BIRIM_UCRET,
      normalTutar: 0,
      yasIndirimOrani: 0,
      yasIndirimAciklamasi: 'Geçersiz Veri',
      yasIndirimi: 0,
      indirimliTutar: 0,
      gidisDonusIndirimOrani: 0,
      gidisDonusIndirimi: 0,
      toplamTutar: 0,
      steps: [],
    };
  }

  // 1. Normal Tutar = Mesafe * 0.10
  const normalTutar = mesafe * BIRIM_UCRET;

  // 2. Yaş İndirimi Oranı
  let yasIndirimOrani = 0;
  let yasIndirimAciklamasi = 'Yetişkin (İndirimsiz, 25-65 yaş)';

  if (yas < 12) {
    yasIndirimOrani = 0.50;
    yasIndirimAciklamasi = '12 yaşından küçük (%50 İndirim)';
  } else if (yas >= 12 && yas <= 24) {
    yasIndirimOrani = 0.10;
    yasIndirimAciklamasi = '12-24 yaş arası genç (%10 İndirim)';
  } else if (yas > 65) {
    yasIndirimOrani = 0.30;
    yasIndirimAciklamasi = '65 yaşından büyük kıdemli (%30 İndirim)';
  }

  const yasIndirimi = normalTutar * yasIndirimOrani;
  const indirimliTutar = normalTutar - yasIndirimi;

  // 3. Yolculuk Tipi İndirimi
  let gidisDonusIndirimOrani = 0;
  let gidisDonusIndirimi = 0;
  let toplamTutar = indirimliTutar;

  if (yolculukTipi === 2) {
    gidisDonusIndirimOrani = 0.20;
    gidisDonusIndirimi = indirimliTutar * 0.20;
    toplamTutar = (indirimliTutar - gidisDonusIndirimi) * 2;
  }

  const steps: CalculationStep[] = [
    {
      title: '1. Normal Tutar',
      formula: 'Mesafe (km) × 0.10 TL/km',
      calculation: `${mesafe} km × 0.10 TL`,
      result: `${normalTutar.toFixed(2)} TL`,
      badge: 'Taban Fiyat',
    },
    {
      title: '2. Yaş İndirimi',
      formula: 'Normal Tutar × Yaş İndirim Oranı',
      calculation: `${normalTutar.toFixed(2)} TL × %${(yasIndirimOrani * 100).toFixed(0)} (${yasIndirimAciklamasi})`,
      result: `-${yasIndirimi.toFixed(2)} TL`,
      badge: yasIndirimOrani > 0 ? `%${(yasIndirimOrani * 100).toFixed(0)} İndirim` : 'İndirim Yok',
    },
    {
      title: '3. Yaş İndirimli Tutar',
      formula: 'Normal Tutar - Yaş İndirimi',
      calculation: `${normalTutar.toFixed(2)} TL - ${yasIndirimi.toFixed(2)} TL`,
      result: `${indirimliTutar.toFixed(2)} TL`,
      badge: 'Tek Yön Baz Tutar',
    },
  ];

  if (yolculukTipi === 2) {
    steps.push({
      title: '4. Gidiş-Dönüş İndirimi',
      formula: 'İndirimli Tutar × 0.20',
      calculation: `${indirimliTutar.toFixed(2)} TL × %20`,
      result: `-${gidisDonusIndirimi.toFixed(2)} TL`,
      badge: '%20 İndirim',
    });
    steps.push({
      title: '5. Nihai Toplam Tutar',
      formula: '(İndirimli Tutar - Gidiş Dönüş İndirimi) × 2',
      calculation: `(${indirimliTutar.toFixed(2)} - ${gidisDonusIndirimi.toFixed(2)}) × 2 Bilet`,
      result: `${toplamTutar.toFixed(2)} TL`,
      badge: 'Gidiş + Dönüş (2x)',
    });
  } else {
    steps.push({
      title: '4. Nihai Toplam Tutar',
      formula: 'Tek Yön Toplamı = Yaş İndirimli Tutar',
      calculation: `${indirimliTutar.toFixed(2)} TL × 1 Bilet`,
      result: `${toplamTutar.toFixed(2)} TL`,
      badge: 'Tek Yön (1x)',
    });
  }

  return {
    isValid: true,
    validationDetails: {
      isMesafeValid: true,
      isYasValid: true,
      isTipValid: true,
    },
    mesafe,
    yas,
    yolculukTipi,
    birimFiyat: BIRIM_UCRET,
    normalTutar,
    yasIndirimOrani,
    yasIndirimAciklamasi,
    yasIndirimi,
    indirimliTutar,
    gidisDonusIndirimOrani,
    gidisDonusIndirimi,
    toplamTutar,
    steps,
  };
}
