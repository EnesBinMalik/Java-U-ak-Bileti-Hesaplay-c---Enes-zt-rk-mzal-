export type TripType = 1 | 2;

export interface CalculationInput {
  mesafe: number;
  yas: number;
  yolculukTipi: number;
  yolcuAdi?: string;
  nereden?: string;
  nereye?: string;
}

export interface CalculationStep {
  title: string;
  formula: string;
  calculation: string;
  result: string;
  badge?: string;
}

export interface CalculationResult {
  isValid: boolean;
  errorMessage?: string;
  validationDetails: {
    isMesafeValid: boolean;
    isYasValid: boolean;
    isTipValid: boolean;
  };
  mesafe: number;
  yas: number;
  yolculukTipi: number;
  birimFiyat: number;
  normalTutar: number;
  yasIndirimOrani: number;
  yasIndirimAciklamasi: string;
  yasIndirimi: number;
  indirimliTutar: number;
  gidisDonusIndirimOrani: number;
  gidisDonusIndirimi: number;
  toplamTutar: number;
  steps: CalculationStep[];
}

export interface RoutePreset {
  id: string;
  from: string;
  to: string;
  codeFrom: string;
  codeTo: string;
  km: number;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  mesafe: number;
  yas: number;
  yolculukTipi: number;
  expectedOutput: string;
  isErrorScenario?: boolean;
}
