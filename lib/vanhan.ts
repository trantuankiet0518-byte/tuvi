import { SolarDay } from "tyme4ts";

export type DiaChi =
  | "Ty"
  | "Suu"
  | "Dan"
  | "Mao"
  | "Thin"
  | "Ti"
  | "Ngo"
  | "Mui"
  | "Than"
  | "Dau"
  | "Tuat"
  | "Hoi";

export type GioiTinh = "nam" | "nu";
export type NguHanh = "Kim" | "Thuy" | "Moc" | "Hoa" | "Tho";

export type DanhGiaHanh =
  | "han_sinh_menh"
  | "menh_sinh_han"
  | "han_khac_menh"
  | "menh_khac_han"
  | "binh_hoa";

export const DIA_CHI_BY_CUNG_INDEX: Record<number, DiaChi> = {
  1: "Ty",
  2: "Suu",
  3: "Dan",
  4: "Mao",
  5: "Thin",
  6: "Ti",
  7: "Ngo",
  8: "Mui",
  9: "Than",
  10: "Dau",
  11: "Tuat",
  12: "Hoi",
};

export const DIA_CHI_LABELS: Record<DiaChi, string> = {
  Ty: "Tý",
  Suu: "Sửu",
  Dan: "Dần",
  Mao: "Mão",
  Thin: "Thìn",
  Ti: "Tỵ",
  Ngo: "Ngọ",
  Mui: "Mùi",
  Than: "Thân",
  Dau: "Dậu",
  Tuat: "Tuất",
  Hoi: "Hợi",
};

export const TIEU_HAN_START: Record<DiaChi, number> = {
  Dan: 5,
  Ngo: 5,
  Tuat: 5,
  Than: 3,
  Ty: 3,
  Thin: 3,
  Ti: 9,
  Dau: 9,
  Suu: 9,
  Hoi: 7,
  Mao: 7,
  Mui: 7,
};

const TUONG_SINH: Record<NguHanh, NguHanh> = {
  Kim: "Thuy",
  Thuy: "Moc",
  Moc: "Hoa",
  Hoa: "Tho",
  Tho: "Kim",
};

const TUONG_KHAC: Record<NguHanh, NguHanh> = {
  Kim: "Moc",
  Moc: "Tho",
  Tho: "Thuy",
  Thuy: "Hoa",
  Hoa: "Kim",
};

export function normalizeCungIndex(index: number): number {
  return ((index - 1) % 12 + 12) % 12 + 1;
}

export function parseDateInput(input: string | Date): { year: number; month: number; day: number } {
  if (input instanceof Date) {
    return {
      year: input.getFullYear(),
      month: input.getMonth() + 1,
      day: input.getDate(),
    };
  }

  const value = input.trim();

  function toDateParts(year: number, month: number, day: number) {
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return null;
    }

    return { year, month, day };
  }

  const isoLikeMatch = /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(value);
  if (isoLikeMatch) {
    const parsed = toDateParts(
      Number(isoLikeMatch[1]),
      Number(isoLikeMatch[2]),
      Number(isoLikeMatch[3])
    );
    if (parsed) {
      return parsed;
    }
  }

  const dmyMatch = /(\d{1,2})[-/](\d{1,2})[-/](\d{4})/.exec(value);
  if (dmyMatch) {
    const parsed = toDateParts(
      Number(dmyMatch[3]),
      Number(dmyMatch[2]),
      Number(dmyMatch[1])
    );
    if (parsed) {
      return parsed;
    }
  }

  const cjkMatch = /(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/.exec(value);
  if (cjkMatch) {
    const parsed = toDateParts(
      Number(cjkMatch[1]),
      Number(cjkMatch[2]),
      Number(cjkMatch[3])
    );
    if (parsed) {
      return parsed;
    }
  }

  const extractedNumbers = value.match(/\d+/g);
  if (extractedNumbers && extractedNumbers.length >= 3) {
    const [a, b, c] = extractedNumbers.slice(0, 3).map(Number);

    if (String(a).length === 4) {
      const parsed = toDateParts(a, b, c);
      if (parsed) {
        return parsed;
      }
    }

    if (String(c).length === 4) {
      const parsed = toDateParts(c, b, a);
      if (parsed) {
        return parsed;
      }
    }
  }

  const nativeDate = new Date(value);
  if (!Number.isNaN(nativeDate.getTime())) {
    return {
      year: nativeDate.getFullYear(),
      month: nativeDate.getMonth() + 1,
      day: nativeDate.getDate(),
    };
  }

  throw new Error(`Khong doc duoc ngay: "${input}". Ho tro YYYY-MM-DD, YYYY/MM/DD, DD/MM/YYYY va ISO datetime.`);
}

function getLunarYearFromSolarDate(input: string | Date): number {
  const { year, month, day } = parseDateInput(input);
  return SolarDay.fromYmd(year, month, day).getLunarDay().getLunarMonth().getLunarYear().getYear();
}

export function getCungDiaChi(index: number): DiaChi {
  return DIA_CHI_BY_CUNG_INDEX[normalizeCungIndex(index)];
}

export function getCungLabel(index: number): string {
  return DIA_CHI_LABELS[getCungDiaChi(index)];
}

export function getTieuHanCung(chiNamSinh: DiaChi, gioiTinh: GioiTinh, tuoiAmLich: number): number {
  if (!Number.isInteger(tuoiAmLich) || tuoiAmLich < 1) {
    throw new Error("Tuoi am lich phai la so nguyen duong.");
  }

  const startCung = TIEU_HAN_START[chiNamSinh];
  const offset = tuoiAmLich - 1;

  return gioiTinh === "nam"
    ? normalizeCungIndex(startCung + offset)
    : normalizeCungIndex(startCung - offset);
}

export function getNguyetHanCung(tieuHanCung: number, gioiTinh: GioiTinh, thangAmLich: number): number {
  if (!Number.isInteger(thangAmLich) || thangAmLich < 1 || thangAmLich > 12) {
    throw new Error("Thang am lich phai nam trong khoang 1-12.");
  }

  const offset = thangAmLich - 1;

  return gioiTinh === "nam"
    ? normalizeCungIndex(tieuHanCung + offset)
    : normalizeCungIndex(tieuHanCung - offset);
}

export function danhGiaHanh(menhHanh: NguHanh, hanhHan: NguHanh): DanhGiaHanh {
  if (TUONG_SINH[hanhHan] === menhHanh) {
    return "han_sinh_menh";
  }

  if (TUONG_SINH[menhHanh] === hanhHan) {
    return "menh_sinh_han";
  }

  if (TUONG_KHAC[hanhHan] === menhHanh) {
    return "han_khac_menh";
  }

  if (TUONG_KHAC[menhHanh] === hanhHan) {
    return "menh_khac_han";
  }

  return "binh_hoa";
}

export function getTuoiAmLich(birthDate: string | Date, referenceDate: string | Date): number {
  const lunarBirthYear = getLunarYearFromSolarDate(birthDate);
  const lunarReferenceYear = getLunarYearFromSolarDate(referenceDate);

  return lunarReferenceYear - lunarBirthYear + 1;
}
