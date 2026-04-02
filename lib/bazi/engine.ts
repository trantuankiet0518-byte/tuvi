import "server-only";

import { toDate, toZonedTime } from "date-fns-tz";
import {
  ChildLimit,
  DefaultEightCharProvider,
  LunarHour,
  LunarSect2EightCharProvider,
  type Gender as TymeGender,
  type LunarHour as TymeLunarHour,
  SolarTime,
} from "tyme4ts";

import type { FortuneRequest, TuViDecadeCycle, TuViEngineResult, TuViPalace, TuViStar } from "./types";

const provider1 = new DefaultEightCharProvider();
const provider2 = new LunarSect2EightCharProvider();

const BRANCH_VI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const BRANCH_EN = ["Ty", "Suu", "Dan", "Mao", "Thin", "Ti", "Ngo", "Mui", "Than", "Dau", "Tuat", "Hoi"];
const STEMS_VI = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const PALACE_ELEMENTS = ["Thủy", "Thổ", "Mộc", "Mộc", "Thổ", "Hỏa", "Hỏa", "Thổ", "Kim", "Kim", "Thổ", "Thủy"];

const PALACE_NAMES = [
  "Menh",
  "Phu Mau",
  "Phuc Duc",
  "Dien Trach",
  "Quan Loc",
  "No Boc",
  "Thien Di",
  "Tat Ach",
  "Tai Bach",
  "Tu Tuc",
  "Phu The",
  "Huynh De",
] as const;

const MAJOR_STAR_ORDER = [
  "Tu Vi",
  "Liem Trinh",
  "Thien Dong",
  "Vu Khuc",
  "Thai Duong",
  "Thien Co",
  "Thien Phu",
  "Thai Am",
  "Tham Lang",
  "Cu Mon",
  "Thien Tuong",
  "Thien Luong",
  "That Sat",
  "Pha Quan",
] as const;

const MAJOR_ELEMENTS: Record<string, string> = {
  "Tu Vi": "Thổ",
  "Liem Trinh": "Hỏa",
  "Thien Dong": "Thủy",
  "Vu Khuc": "Kim",
  "Thai Duong": "Hỏa",
  "Thien Co": "Mộc",
  "Thien Phu": "Thổ",
  "Thai Am": "Thủy",
  "Tham Lang": "Mộc",
  "Cu Mon": "Thủy",
  "Thien Tuong": "Thủy",
  "Thien Luong": "Thổ",
  "That Sat": "Kim",
  "Pha Quan": "Thủy",
};

const MINOR_ELEMENTS: Record<string, string> = {
  "Loc Ton": "Thổ",
  "Bac Sy": "Thủy",
  "Luc Si": "Hỏa",
  "Thanh Long": "Thủy",
  "Tieu Hao": "Hỏa",
  "Tuong Quan": "Mộc",
  "Tau Thu": "Kim",
  "Phi Liem": "Hỏa",
  "Hy Than": "Hỏa",
  "Benh Phu": "Thổ",
  "Dai Hao": "Hỏa",
  "Phuc Binh": "Hỏa",
  "Quan Phu 2": "Hỏa",
  "Thai Tue": "Hỏa",
  "Thieu Duong": "Hỏa",
  "Tang Mon": "Mộc",
  "Thieu Am": "Thủy",
  "Quan Phu 3": "Hỏa",
  "Tu Phu": "Kim",
  "Nguyet Duc": "Hỏa",
  "Tue Pha": "Hỏa",
  "Long Duc": "Thủy",
  "Bach Ho": "Kim",
  "Phuc Duc": "Thổ",
  "Thien Duc": "Hỏa",
  "Dieu Khach": "Hỏa",
  "Truc Phu": "Kim",
  "Trang Sinh": "Thủy",
  "Moc Duc": "Thủy",
  "Quan Doi": "Kim",
  "Lam Quan": "Kim",
  "De Vuong": "Kim",
  "Suy": "Thủy",
  "Benh": "Hỏa",
  "Tu": "Hỏa",
  "Mo": "Thổ",
  "Tuyet": "Thổ",
  "Thai": "Thổ",
  "Duong": "Mộc",
  "Da La": "Kim",
  "Kinh Duong": "Kim",
  "Dia Khong": "Hỏa",
  "Dia Kiep": "Hỏa",
  "Hoa Tinh": "Hỏa",
  "Linh Tinh": "Hỏa",
  "Long Tri": "Thủy",
  "Phuong Cac": "Thổ",
  "Giai Than": "Mộc",
  "Ta Phu": "Thổ",
  "Huu Bat": "Thổ",
  "Van Khuc": "Thủy",
  "Van Xuong": "Kim",
  "Tam Thai": "Mộc",
  "Bat Toa": "Thủy",
  "An Quang": "Mộc",
  "Thien Quy": "Thổ",
  "Thien Khoi": "Hỏa",
  "Thien Viet": "Hỏa",
  "Thien Hu": "Thủy",
  "Thien Khoc": "Thủy",
  "Thien Tai": "Thổ",
  "Thien Tho": "Thổ",
  "Hong Loan": "Thủy",
  "Thien Hy": "Thủy",
  "Thien Quan": "Hỏa",
  "Thien Phuc": "Hỏa",
  "Thien Hinh": "Hỏa",
  "Thien Rieu": "Thủy",
  "Thien Y": "Thủy",
  "Thien Ma": "Hỏa",
  "Hoa Cai": "Kim",
  "Kiep Sat": "Hỏa",
  "Hoa Loc": "Mộc",
  "Hoa Quyen": "Hỏa",
  "Hoa Khoa": "Thủy",
  "Hoa Ky": "Thủy",
};

const STAR_QUALITY: Record<string, { mieu: number[]; vuong: number[]; dac: number[]; ham?: number[] }> = {
  "Tu Vi": { mieu: [4, 10], vuong: [2, 8], dac: [0, 1, 6, 7] },
  "Liem Trinh": { mieu: [2, 8], vuong: [0, 6], dac: [3, 9], ham: [5, 11] },
  "Thien Dong": { mieu: [0, 6], vuong: [3, 9], dac: [2, 8], ham: [1, 4, 7, 10] },
  "Vu Khuc": { mieu: [3, 9], vuong: [1, 7], dac: [4, 10], ham: [5, 11] },
  "Thai Duong": { mieu: [2, 6], vuong: [3, 9], dac: [1, 7], ham: [10, 11, 0] },
  "Thien Co": { mieu: [1, 5, 7, 11], vuong: [2, 8], dac: [0, 6], ham: [3, 9] },
  "Thien Phu": { mieu: [4, 10], vuong: [2, 8], dac: [0, 6] },
  "Thai Am": { mieu: [0, 6], vuong: [9, 10], dac: [1, 7], ham: [3, 4, 5] },
  "Tham Lang": { mieu: [2, 8], vuong: [0, 6], dac: [4, 10], ham: [1, 7] },
  "Cu Mon": { mieu: [3, 9], vuong: [0, 6], dac: [1, 7], ham: [4, 10] },
  "Thien Tuong": { mieu: [1, 7], vuong: [2, 8], dac: [0, 6], ham: [3, 9] },
  "Thien Luong": { mieu: [2, 8], vuong: [0, 6], dac: [3, 9], ham: [5, 11] },
  "That Sat": { mieu: [1, 7], vuong: [2, 8], dac: [4, 10], ham: [3, 9] },
  "Pha Quan": { mieu: [0, 6], vuong: [3, 9], dac: [2, 8], ham: [1, 7] },
};

function mod12(n: number): number {
  return ((n % 12) + 12) % 12;
}

function toOneBasedBranchIndex(zeroBased: number): number {
  return zeroBased + 1;
}

function fromOneBasedBranchIndex(oneBased: number): number {
  return mod12(oneBased - 1);
}

function dichCung(position: number, steps: number): number {
  const raw = ((position - 1 + steps) % 12 + 12) % 12;
  return raw + 1;
}

function buildLunarHour(input: FortuneRequest): TymeLunarHour {
  const [year, month, day] = input.birthDate.split("-").map(Number);
  const [hour, minute] = input.birthTime.split(":").map(Number);

  if ([year, month, day, hour, minute].some(Number.isNaN)) {
    throw new Error("Ngày giờ sinh không hợp lệ.");
  }

  if (input.calendarType === "am") {
    return LunarHour.fromYmdHms(year, month, day, hour, minute, 0);
  }

  const iso = `${input.birthDate}T${input.birthTime}:00${input.timezone}`;
  const utc = toDate(iso);
  const zoned = toZonedTime(utc, input.timezone);
  const solar = SolarTime.fromYmdHms(
    zoned.getFullYear(),
    zoned.getMonth() + 1,
    zoned.getDate(),
    zoned.getHours(),
    zoned.getMinutes(),
    0
  );

  return solar.getLunarHour();
}

function getMenhIdx(lunarMonth: number, hourBranchIdx: number): number {
  return mod12(2 + (lunarMonth - 1) - hourBranchIdx);
}

function getThanIdx(lunarMonth: number, hourBranchIdx: number): number {
  return mod12(2 + (lunarMonth - 1) + hourBranchIdx);
}

const NAP_AM_CORRECT: string[] = [
  "Kim", "Kim", "Hoa", "Hoa", "Moc", "Moc", "Tho", "Tho", "Kim", "Kim",
  "Hoa", "Hoa", "Thuy", "Thuy", "Tho", "Tho", "Kim", "Kim", "Moc", "Moc",
  "Thuy", "Thuy", "Tho", "Tho", "Hoa", "Hoa", "Moc", "Moc", "Thuy", "Thuy",
  "Kim", "Kim", "Hoa", "Hoa", "Moc", "Moc", "Tho", "Tho", "Kim", "Kim",
  "Hoa", "Hoa", "Thuy", "Thuy", "Tho", "Tho", "Kim", "Kim", "Moc", "Moc",
  "Thuy", "Thuy", "Tho", "Tho", "Hoa", "Hoa", "Moc", "Moc", "Thuy", "Thuy",
];

function getCuc(stemIdx: number, branchIdx: number): { name: string; number: number } {
  const pos60 = (stemIdx * 12 + branchIdx) % 60;
  const element = NAP_AM_CORRECT[pos60] ?? "Hoa";

  switch (element) {
    case "Thuy":
      return { name: "Thủy nhị cục", number: 2 };
    case "Moc":
      return { name: "Mộc tam cục", number: 3 };
    case "Kim":
      return { name: "Kim tứ cục", number: 4 };
    case "Tho":
      return { name: "Thổ ngũ cục", number: 5 };
    default:
      return { name: "Hỏa lục cục", number: 6 };
  }
}

function getTuViPosition(cucNumber: number, lunarDay: number): number {
  let cungDan = 3;
  let cuc = cucNumber;

  if (![2, 3, 4, 5, 6].includes(cucNumber)) {
    throw new Error("Số cục phải nằm trong khoảng 2-6.");
  }

  while (cuc < lunarDay) {
    cuc += cucNumber;
    cungDan += 1;
  }

  let saiLech = cuc - lunarDay;
  if (saiLech % 2 === 1) {
    saiLech = -saiLech;
  }

  return dichCung(cungDan, saiLech);
}

function getMajorStarPositions(tuViPosition: number): Record<string, number> {
  const thienPhuPosition = dichCung(3, 3 - tuViPosition);

  return {
    "Tu Vi": tuViPosition,
    "Liem Trinh": dichCung(tuViPosition, 4),
    "Thien Dong": dichCung(tuViPosition, 7),
    "Vu Khuc": dichCung(tuViPosition, 8),
    "Thai Duong": dichCung(tuViPosition, 9),
    "Thien Co": dichCung(tuViPosition, 11),
    "Thien Phu": thienPhuPosition,
    "Thai Am": dichCung(thienPhuPosition, 1),
    "Tham Lang": dichCung(thienPhuPosition, 2),
    "Cu Mon": dichCung(thienPhuPosition, 3),
    "Thien Tuong": dichCung(thienPhuPosition, 4),
    "Thien Luong": dichCung(thienPhuPosition, 5),
    "That Sat": dichCung(thienPhuPosition, 6),
    "Pha Quan": dichCung(thienPhuPosition, 10),
  };
}

function getQuality(starName: string, branchIdx: number): TuViStar["quality"] {
  const q = STAR_QUALITY[starName];
  if (!q) return "binh_hoa";
  if (q.mieu.includes(branchIdx)) return "mieu_dia";
  if (q.vuong.includes(branchIdx)) return "vuong_dia";
  if (q.dac.includes(branchIdx)) return "dac_dia";
  if (q.ham?.includes(branchIdx)) return "ham_dia";
  return "binh_hoa";
}

function getAmDuongNamNu(yearStemIdx: number, gender: FortuneRequest["gender"]): 1 | -1 {
  const amDuongNamSinh: 1 | -1 = yearStemIdx % 2 === 0 ? 1 : -1;
  const gioiTinh: 1 | -1 = gender === "nam" ? 1 : -1;
  return (gioiTinh * amDuongNamSinh) as 1 | -1;
}

function getLocTonPosition(yearStemIdx: number): number {
  const table = [3, 4, 6, 7, 6, 7, 9, 10, 12, 1];
  return table[yearStemIdx] ?? 3;
}

function getTrangSinhPosition(cucNumber: number): number {
  if (cucNumber === 6) return 3;
  if (cucNumber === 4) return 6;
  if (cucNumber === 2 || cucNumber === 5) return 9;
  if (cucNumber === 3) return 12;
  throw new Error("Không tìm được cung an sao Tràng sinh.");
}

function getHoaLinhPositions(
  yearBranchPosition: number,
  hourBranchPosition: number,
  amDuongNamNu: 1 | -1
) {
  let khoiCungHoaTinh: number;
  let khoiCungLinhTinh: number;

  if ([3, 7, 11].includes(yearBranchPosition)) {
    khoiCungHoaTinh = 2;
    khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(yearBranchPosition)) {
    khoiCungHoaTinh = 3;
    khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(yearBranchPosition)) {
    khoiCungHoaTinh = 11;
    khoiCungLinhTinh = 4;
  } else if ([12, 4, 8].includes(yearBranchPosition)) {
    khoiCungHoaTinh = 10;
    khoiCungLinhTinh = 11;
  } else {
    throw new Error("Không thể khởi cung tìm Hỏa-Linh.");
  }

  if (amDuongNamNu === -1) {
    return {
      "Hoa Tinh": dichCung(khoiCungHoaTinh + 1, -hourBranchPosition),
      "Linh Tinh": dichCung(khoiCungLinhTinh - 1, hourBranchPosition),
    };
  }

  return {
    "Hoa Tinh": dichCung(khoiCungHoaTinh - 1, hourBranchPosition),
    "Linh Tinh": dichCung(khoiCungLinhTinh + 1, -hourBranchPosition),
  };
}

function getThienKhoiPosition(yearStemPosition: number): number {
  const table = [0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  return table[yearStemPosition];
}

function getThienMaPosition(yearBranchPosition: number): number {
  const demNghich = yearBranchPosition % 4;
  if (demNghich === 1) return 3;
  if (demNghich === 2) return 12;
  if (demNghich === 3) return 9;
  return 6;
}

function getMinorStarPositions(
  yearStemIdx: number,
  yearBranchIdx: number,
  lunarMonth: number,
  lunarDay: number,
  hourBranchIdx: number,
  gender: FortuneRequest["gender"],
  cucNumber: number,
  menhPosition: number,
  thanPosition: number,
  majorStarPositions: Record<string, number>
): Record<string, number> {
  const yearStemPosition = yearStemIdx + 1;
  const yearBranchPosition = yearBranchIdx + 1;
  const hourBranchPosition = hourBranchIdx + 1;
  const amDuongNamNu = getAmDuongNamNu(yearStemIdx, gender);

  const locTon = getLocTonPosition(yearStemIdx);
  const trangSinh = getTrangSinhPosition(cucNumber);
  const vanKhuc = dichCung(5, hourBranchPosition - 1);
  const vanXuong = dichCung(2, 2 - vanKhuc);
  const taPhu = dichCung(5, lunarMonth - 1);
  const huuBat = dichCung(2, 2 - taPhu);
  const thienKhoi = getThienKhoiPosition(yearStemPosition);
  const thienMa = getThienMaPosition(yearBranchPosition);

  const hoaByCan: Record<number, Record<"Hoa Loc" | "Hoa Quyen" | "Hoa Khoa" | "Hoa Ky", string>> = {
    1: { "Hoa Loc": "Liem Trinh", "Hoa Quyen": "Pha Quan", "Hoa Khoa": "Vu Khuc", "Hoa Ky": "Thai Duong" },
    2: { "Hoa Loc": "Thien Co", "Hoa Quyen": "Thien Luong", "Hoa Khoa": "Tu Vi", "Hoa Ky": "Thai Am" },
    3: { "Hoa Loc": "Thien Dong", "Hoa Quyen": "Thien Co", "Hoa Khoa": "Van Xuong", "Hoa Ky": "Liem Trinh" },
    4: { "Hoa Loc": "Thai Am", "Hoa Quyen": "Thien Dong", "Hoa Khoa": "Thien Co", "Hoa Ky": "Cu Mon" },
    5: { "Hoa Loc": "Tham Lang", "Hoa Quyen": "Thai Am", "Hoa Khoa": "Huu Bat", "Hoa Ky": "Thien Co" },
    6: { "Hoa Loc": "Vu Khuc", "Hoa Quyen": "Tham Lang", "Hoa Khoa": "Thien Luong", "Hoa Ky": "Van Khuc" },
    7: { "Hoa Loc": "Thai Duong", "Hoa Quyen": "Vu Khuc", "Hoa Khoa": "Thien Dong", "Hoa Ky": "Thai Am" },
    8: { "Hoa Loc": "Cu Mon", "Hoa Quyen": "Thai Duong", "Hoa Khoa": "Van Khuc", "Hoa Ky": "Van Xuong" },
    9: { "Hoa Loc": "Thien Luong", "Hoa Quyen": "Tu Vi", "Hoa Khoa": "Thien Phu", "Hoa Ky": "Vu Khuc" },
    10: { "Hoa Loc": "Pha Quan", "Hoa Quyen": "Cu Mon", "Hoa Khoa": "Thai Am", "Hoa Ky": "Tham Lang" },
  };

  const hoaConfig = hoaByCan[yearStemPosition];
  const hoaLinh = getHoaLinhPositions(yearBranchPosition, hourBranchPosition, amDuongNamNu);

  return {
    "Loc Ton": locTon,
    "Bac Sy": locTon,
    "Luc Si": dichCung(locTon, 1 * amDuongNamNu),
    "Thanh Long": dichCung(locTon, 2 * amDuongNamNu),
    "Tieu Hao": dichCung(locTon, 3 * amDuongNamNu),
    "Tuong Quan": dichCung(locTon, 4 * amDuongNamNu),
    "Tau Thu": dichCung(locTon, 5 * amDuongNamNu),
    "Phi Liem": dichCung(locTon, 6 * amDuongNamNu),
    "Hy Than": dichCung(locTon, 7 * amDuongNamNu),
    "Benh Phu": dichCung(locTon, 8 * amDuongNamNu),
    "Dai Hao": dichCung(locTon, 9 * amDuongNamNu),
    "Phuc Binh": dichCung(locTon, 10 * amDuongNamNu),
    "Quan Phu 2": dichCung(locTon, 11 * amDuongNamNu),
    "Thai Tue": yearBranchPosition,
    "Thieu Duong": dichCung(yearBranchPosition, 1),
    "Tang Mon": dichCung(yearBranchPosition, 2),
    "Thieu Am": dichCung(yearBranchPosition, 3),
    "Quan Phu 3": dichCung(yearBranchPosition, 4),
    "Tu Phu": dichCung(yearBranchPosition, 5),
    "Nguyet Duc": dichCung(yearBranchPosition, 5),
    "Tue Pha": dichCung(yearBranchPosition, 6),
    "Long Duc": dichCung(yearBranchPosition, 7),
    "Bach Ho": dichCung(yearBranchPosition, 8),
    "Phuc Duc": dichCung(yearBranchPosition, 9),
    "Thien Duc": dichCung(yearBranchPosition, 9),
    "Dieu Khach": dichCung(yearBranchPosition, 10),
    "Truc Phu": dichCung(yearBranchPosition, 11),
    "Trang Sinh": trangSinh,
    "Moc Duc": dichCung(trangSinh, 1 * amDuongNamNu),
    "Quan Doi": dichCung(trangSinh, 2 * amDuongNamNu),
    "Lam Quan": dichCung(trangSinh, 3 * amDuongNamNu),
    "De Vuong": dichCung(trangSinh, 4 * amDuongNamNu),
    "Suy": dichCung(trangSinh, 5 * amDuongNamNu),
    "Benh": dichCung(trangSinh, 6 * amDuongNamNu),
    "Tu": dichCung(trangSinh, 7 * amDuongNamNu),
    "Mo": dichCung(trangSinh, 8 * amDuongNamNu),
    "Tuyet": dichCung(trangSinh, 9 * amDuongNamNu),
    "Thai": dichCung(trangSinh, -1 * amDuongNamNu),
    "Duong": dichCung(trangSinh, -2 * amDuongNamNu),
    "Da La": dichCung(locTon, -1),
    "Kinh Duong": dichCung(locTon, 1),
    "Dia Kiep": dichCung(11, hourBranchPosition),
    "Dia Khong": dichCung(12, 12 - dichCung(11, hourBranchPosition)),
    ...hoaLinh,
    "Long Tri": dichCung(5, yearBranchPosition - 1),
    "Phuong Cac": dichCung(2, 2 - dichCung(5, yearBranchPosition - 1)),
    "Giai Than": dichCung(2, 2 - dichCung(5, yearBranchPosition - 1)),
    "Ta Phu": taPhu,
    "Huu Bat": huuBat,
    "Van Khuc": vanKhuc,
    "Van Xuong": vanXuong,
    "Tam Thai": dichCung(5, lunarMonth + lunarDay - 2),
    "Bat Toa": dichCung(2, 2 - dichCung(5, lunarMonth + lunarDay - 2)),
    "An Quang": dichCung(vanXuong, lunarDay - 2),
    "Thien Quy": dichCung(2, 2 - dichCung(vanXuong, lunarDay - 2)),
    "Thien Khoi": thienKhoi,
    "Thien Viet": dichCung(5, 5 - thienKhoi),
    "Thien Hu": dichCung(7, yearBranchPosition - 1),
    "Thien Khoc": dichCung(7, -yearBranchPosition + 1),
    "Thien Tai": dichCung(menhPosition, yearBranchPosition - 1),
    "Thien Tho": dichCung(thanPosition, yearBranchPosition - 1),
    "Hong Loan": dichCung(4, -yearBranchPosition + 1),
    "Thien Hy": dichCung(dichCung(4, -yearBranchPosition + 1), 6),
    "Thien Quan": [0, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7][yearStemPosition],
    "Thien Phuc": [0, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6][yearStemPosition],
    "Thien Hinh": dichCung(10, lunarMonth - 1),
    "Thien Rieu": dichCung(dichCung(10, lunarMonth - 1), 4),
    "Thien Y": dichCung(dichCung(10, lunarMonth - 1), 4),
    "Thien Ma": thienMa,
    "Hoa Cai": dichCung(thienMa, 2),
    "Kiep Sat": dichCung(thienMa, 3),
    "Hoa Loc": majorStarPositions[hoaConfig["Hoa Loc"]] ?? 1,
    "Hoa Quyen": majorStarPositions[hoaConfig["Hoa Quyen"]] ?? 1,
    "Hoa Khoa": hoaConfig["Hoa Khoa"] === "Van Xuong" ? vanXuong : hoaConfig["Hoa Khoa"] === "Van Khuc" ? vanKhuc : hoaConfig["Hoa Khoa"] === "Huu Bat" ? huuBat : majorStarPositions[hoaConfig["Hoa Khoa"]] ?? 1,
    "Hoa Ky": hoaConfig["Hoa Ky"] === "Van Xuong" ? vanXuong : hoaConfig["Hoa Ky"] === "Van Khuc" ? vanKhuc : majorStarPositions[hoaConfig["Hoa Ky"]] ?? 1,
  };
}

function palaceNote(name: string, stars: string[]): string {
  const joined = stars.length > 0 ? stars.join(", ") : "vô chính diệu";
  const map: Record<string, string> = {
    Menh: `Cung Mệnh chủ về cốt cách. Chính tinh: ${joined}.`,
    "Quan Loc": `Cung Quan lộc phản ánh công việc và sự nghiệp. Chính tinh: ${joined}.`,
    "Tai Bach": `Cung Tài Bạch phản ánh dòng tiền và khả năng tích lũy. Chính tinh: ${joined}.`,
    "Phu The": `Cung Phu thê cho biết duyên phận và cách gắn kết. Chính tinh: ${joined}.`,
    "Thien Di": `Cung Thiên di thể hiện vận hội khi ra ngoài. Chính tinh: ${joined}.`,
  };
  return map[name] ?? `Cung ${name}: ${joined}.`;
}

function buildPalaces(
  menhIdx: number,
  thanIdx: number,
  yearStemIdx: number,
  yearBranchIdx: number,
  lunarMonth: number,
  lunarDay: number,
  hourBranchIdx: number,
  gender: FortuneRequest["gender"],
  cucNumber: number
): TuViPalace[] {
  const menhPosition = toOneBasedBranchIndex(menhIdx);
  const thanPosition = toOneBasedBranchIndex(thanIdx);
  const tuViPosition = getTuViPosition(cucNumber, lunarDay);
  const majorStarPositions = getMajorStarPositions(tuViPosition);
  const minorStarPositions = getMinorStarPositions(
    yearStemIdx,
    yearBranchIdx,
    lunarMonth,
    lunarDay,
    hourBranchIdx,
    gender,
    cucNumber,
    menhPosition,
    thanPosition,
    majorStarPositions
  );

  const palaces: TuViPalace[] = Array.from({ length: 12 }, (_, offset) => {
    const branchIdx = mod12(menhIdx + offset);
    return {
      name: PALACE_NAMES[offset],
      branch: BRANCH_EN[branchIdx],
      element: PALACE_ELEMENTS[branchIdx],
      isLifePalace: offset === 0,
      isBodyPalace: branchIdx === thanIdx,
      majorStars: [],
      minorStars: [],
      note: "",
    };
  });

  for (const starName of MAJOR_STAR_ORDER) {
    const position = majorStarPositions[starName];
    const branchIdx = fromOneBasedBranchIndex(position);
    const palace = palaces.find((item) => BRANCH_EN.indexOf(item.branch) === branchIdx);
    if (!palace) continue;

    palace.majorStars.push({
      name: starName,
      type: "chinh_tinh",
      quality: getQuality(starName, branchIdx),
      element: MAJOR_ELEMENTS[starName] ?? "Thổ",
    });
  }

  for (const [starName, position] of Object.entries(minorStarPositions)) {
    const branchIdx = fromOneBasedBranchIndex(position);
    const palace = palaces.find((item) => BRANCH_EN.indexOf(item.branch) === branchIdx);
    if (!palace) continue;

    palace.minorStars.push({
      name: starName,
      type: "phu_tinh",
      quality: "binh_hoa",
      element: MINOR_ELEMENTS[starName] ?? "Thổ",
    });
  }

  return palaces.map((palace) => ({
    ...palace,
    note: palaceNote(palace.name, palace.majorStars.map((star) => star.name)),
  }));
}

function buildDecadeCycles(
  lunarHour: TymeLunarHour,
  palaces: TuViPalace[],
  cucNumber: number,
  gender: TymeGender
): TuViDecadeCycle[] {
  const solar = lunarHour.getSolarTime();
  const childLimit = ChildLimit.fromSolarTime(solar, gender);
  const startAge = Math.max(1, childLimit.getYearCount() + 1);

  return palaces.map((palace, index) => {
    const cycleStart = startAge + index * 10;
    const stars = palace.majorStars.slice(0, 2).map((star) => star.name).join(" + ") || "bố cục";
    const branchLabel = BRANCH_VI[BRANCH_EN.indexOf(palace.branch)] ?? palace.branch;

    return {
      palace: palace.name,
      branch: palace.branch,
      startAge: cycleStart,
      endAge: cycleStart + 9,
      focus: `Đại hạn tại ${palace.name} (${branchLabel}), nổi bật với ${stars}. Cục số: ${cucNumber}.`,
    };
  });
}

function buildAnalysis(palaces: TuViPalace[]) {
  const getPalace = (name: string) => palaces.find((palace) => palace.name === name);
  const starList = (palace: TuViPalace | undefined) => palace?.majorStars.map((star) => star.name).join(", ") || "vô chính diệu";

  return {
    coreTraits: [
      `Mệnh tại ${getPalace("Menh")?.branch}: ${starList(getPalace("Menh"))}.`,
      `Thân cư ${palaces.find((palace) => palace.isBodyPalace)?.name ?? "Menh"}.`,
      "Nên đối chiếu thêm Phúc đức và Thiên di để đọc chiều sâu phúc phần.",
    ],
    career: [
      `Quan lộc: ${starList(getPalace("Quan Loc"))}.`,
      `Tài bạch: ${starList(getPalace("Tai Bach"))}.`,
    ],
    relationship: [
      `Phu thê: ${starList(getPalace("Phu The"))}.`,
      `Thiên di: ${starList(getPalace("Thien Di"))}.`,
    ],
  };
}

function buildSummary(result: TuViEngineResult): string[] {
  const findPalace = (name: string) => result.palaces.find((palace) => palace.name === name);
  const starList = (palace: TuViPalace | undefined) => palace?.majorStars.map((star) => star.name).join(", ") || "vô chính diệu";

  return [
    `${result.profile.fullName || "Bạn"} có Mệnh tại ${result.overview.menhBranch}, Thân tại ${result.overview.thanBranch}, thuộc ${result.overview.cuc}.`,
    `Cung Mệnh: ${starList(findPalace("Menh"))}.`,
    `Quan lộc: ${starList(findPalace("Quan Loc"))}. Tài bạch: ${starList(findPalace("Tai Bach"))}.`,
    `Phu thê: ${starList(findPalace("Phu The"))}.`,
  ];
}

export function calculateTuVi(input: FortuneRequest): TuViEngineResult {
  LunarHour.provider = input.eightCharProviderSect === 1 ? provider1 : provider2;

  const lunarHour = buildLunarHour(input);
  const eightChar = lunarHour.getEightChar();

  const yearStemIdx = eightChar.getYear().getHeavenStem().getIndex();
  const yearBranchIdx = eightChar.getYear().getEarthBranch().getIndex();
  const dayStemIdx = eightChar.getDay().getHeavenStem().getIndex();
  const dayBranchIdx = eightChar.getDay().getEarthBranch().getIndex();
  const hourBranchIdx = lunarHour.getSixtyCycle().getEarthBranch().getIndex();
  const lunarMonth = lunarHour.getMonth();
  const lunarDay = lunarHour.getDay();

  const menhIdx = getMenhIdx(lunarMonth, hourBranchIdx);
  const thanIdx = getThanIdx(lunarMonth, hourBranchIdx);
  const cuc = getCuc(yearStemIdx, yearBranchIdx);
  const gender: TymeGender = input.gender === "nu" ? 0 : 1;

  const palaces = buildPalaces(
    menhIdx,
    thanIdx,
    yearStemIdx,
    yearBranchIdx,
    lunarMonth,
    lunarDay,
    hourBranchIdx,
    input.gender,
    cuc.number
  );

  const canChiYear = `${STEMS_VI[yearStemIdx] ?? yearStemIdx} ${BRANCH_VI[yearBranchIdx] ?? yearBranchIdx}`;
  const canChiDay = `${STEMS_VI[dayStemIdx] ?? dayStemIdx} ${BRANCH_VI[dayBranchIdx] ?? dayBranchIdx}`;

  const result: TuViEngineResult = {
    profile: {
      fullName: input.fullName.trim(),
      genderLabel: input.gender === "nu" ? "Nữ" : "Nam",
      solarDateTime: String(lunarHour.getSolarTime()),
      lunarDateTime: String(lunarHour),
      timezone: input.timezone,
    },
    overview: {
      chartType: "Tử vi đẩu số",
      zodiac: String(eightChar.getYear().getEarthBranch().getZodiac()),
      amDuong: eightChar.getYear().getHeavenStem().getYinYang() === 1 ? "Dương" : "Âm",
      cuc: cuc.name,
      cucNumber: cuc.number,
      menhPalace: "Menh",
      thanPalace: palaces.find((palace) => palace.isBodyPalace)?.name ?? "Menh",
      menhBranch: BRANCH_EN[menhIdx],
      thanBranch: BRANCH_EN[thanIdx],
      canChiYear,
      canChiDay,
      menhChu: BRANCH_EN[menhIdx],
      thanChu: BRANCH_EN[thanIdx],
    },
    palaces,
    keyStars: palaces
      .filter((palace) => palace.name === "Menh" || palace.name === "Quan Loc" || palace.name === "Tai Bach" || palace.isBodyPalace)
      .flatMap((palace) => palace.majorStars.slice(0, 2).map((star) => star.name)),
    decadeCycles: buildDecadeCycles(lunarHour, palaces, cuc.number, gender),
    summary: [],
    analysis: buildAnalysis(palaces),
  };

  result.summary = buildSummary(result);
  return result;
}

export const calculateBazi = calculateTuVi;
