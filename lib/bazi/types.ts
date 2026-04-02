export type Gender = "nam" | "nu";
export type CalendarType = "duong" | "am";

export interface FortuneRequest {
  fullName: string;
  gender: Gender;
  calendarType: CalendarType;
  birthDate: string;
  birthTime: string;
  timezone: string;
  eightCharProviderSect?: 1 | 2;
}

export interface TuViStar {
  name: string;
  type: "chinh_tinh" | "phu_tinh";
  quality: "mieu_dia" | "vuong_dia" | "dac_dia" | "binh_hoa" | "ham_dia";
  element: string;
}

export interface TuViPalace {
  name: string;
  branch: string;
  element: string;
  isLifePalace: boolean;
  isBodyPalace: boolean;
  majorStars: TuViStar[];
  minorStars: TuViStar[];
  note: string;
}

export interface TuViDecadeCycle {
  palace: string;
  branch: string;
  startAge: number;
  endAge: number;
  focus: string;
}

export interface TuViEngineResult {
  profile: {
    fullName: string;
    genderLabel: string;
    solarDateTime: string;
    lunarDateTime: string;
    timezone: string;
  };
  overview: {
    chartType: string;
    zodiac: string;
    amDuong: string;
    cuc: string;
    cucNumber: number;
    menhPalace: string;
    thanPalace: string;
    menhBranch: string;
    thanBranch: string;
    canChiYear: string;
    canChiDay: string;
    menhChu: string;
    thanChu: string;
  };
  palaces: TuViPalace[];
  keyStars: string[];
  decadeCycles: TuViDecadeCycle[];
  summary: string[];
  analysis: {
    coreTraits: string[];
    career: string[];
    relationship: string[];
  };
}

export type BaziEngineResult = TuViEngineResult;
