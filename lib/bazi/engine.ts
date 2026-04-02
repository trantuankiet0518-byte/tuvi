import "server-only";
// @ts-ignore — lunar-javascript không có type declarations
import { Solar } from "lunar-javascript";

import type { FortuneRequest, TuViDecadeCycle, TuViEngineResult, TuViPalace, TuViStar } from "./types";

// ─── Hằng số ──────────────────────────────────────────────────────────────────

// 12 địa chi: Tý=0 … Hợi=11
const BRANCHES_EN = ["Ty","Suu","Dan","Mao","Thin","Ti","Ngo","Mui","Than","Dau","Tuat","Hoi"];
const BRANCHES_VI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const STEMS_VI    = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];

// 12 cung theo thứ tự từ Mệnh (offset 0..11)
const PALACE_NAMES = [
  "Menh","Phu Mau","Phuc Duc","Dien Trach",
  "Quan Loc","No Boc","Thien Di","Tat Ach",
  "Tai Bach","Tu Tuc","Phu The","Huynh De",
] as const;

// ─── Utility ──────────────────────────────────────────────────────────────────

const mod12 = (n: number) => ((n % 12) + 12) % 12;

/** Dịch cung giống lasotuvi (1=Tý … 12=Hợi). */
function dichCungPy(cungBanDau: number, ...deltas: number[]): number {
  let s = cungBanDau;
  for (const d of deltas) s += d;
  const m = ((s % 12) + 12) % 12;
  return m === 0 ? 12 : m;
}

/** Tử Vi & vị trí 1-based (lasotuvi) → index 0-based (Tý=0) cho engine UI. */
function pyChiToTs(py: number): number {
  return py - 1;
}

// ─── Chuyển đổi ngày sinh → Lunar ─────────────────────────────────────────────

function buildLunar(input: FortuneRequest) {
  const [year, month, day] = input.birthDate.split("-").map(Number);
  const [hour, minute]     = input.birthTime.split(":").map(Number);

  if ([year, month, day, hour, minute].some(Number.isNaN))
    throw new Error("Ngày giờ sinh không hợp lệ.");

  if (input.calendarType === "am") {
    // Âm lịch: dùng trực tiếp
    // lunar-javascript không có fromLunarYmdHms trực tiếp, dùng Lunar.fromYmdHms
    // @ts-ignore
    const { Lunar } = require("lunar-javascript");
    return Lunar.fromYmdHms(year, month, day, hour, minute, 0);
  }

  // Dương lịch: chuyển timezone về giờ địa phương
  // timezone dạng "+07:00" hoặc "-08:00"
  const tzSign  = input.timezone.startsWith("-") ? -1 : 1;
  const tzParts = input.timezone.replace(/[+-]/, "").split(":");
  const tzHours = parseInt(tzParts[0]) * tzSign;
  // Solar.fromYmdHms nhận giờ địa phương trực tiếp
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  return solar.getLunar();
}

// ─── Mệnh cung & Thân cung ────────────────────────────────────────────────────
// Mệnh: khởi Dần(2), thuận tháng, nghịch giờ
// Thân: khởi Dần(2), thuận tháng, thuận giờ

function getMenhIdx(lunarMonth: number, hourZhiIdx: number): number {
  return mod12(2 + (lunarMonth - 1) - hourZhiIdx);
}
function getThanIdx(lunarMonth: number, hourZhiIdx: number): number {
  return mod12(2 + (lunarMonth - 1) + hourZhiIdx);
}

// ─── Cục từ Nạp Âm năm sinh ───────────────────────────────────────────────────
// Nạp Âm → Ngũ hành → Số cục

/** Ma trận nạp âm lasotuvi: hàng địa chi 1–12, cột thiên can 1–10 (Giáp=1…Quý=10). */
const NAP_AM_MATRIX: (string | false)[][] = [
  [],
  [false, "K1", false, "T1", false, "H1", false, "O1", false, "M1", false],
  [false, false, "K1", false, "T1", false, "H1", false, "O1", false, "M1"],
  [false, "T2", false, "H2", false, "O2", false, "M2", false, "K2", false],
  [false, false, "T2", false, "H2", false, "O2", false, "M2", false, "K2"],
  [false, "H3", false, "O3", false, "M3", false, "K3", false, "T3", false],
  [false, false, "H3", false, "O3", false, "M3", false, "K3", false, "T3"],
  [false, "K4", false, "T4", false, "H4", false, "O4", false, "M4", false],
  [false, false, "K4", false, "T4", false, "H4", false, "O4", false, "M4"],
  [false, "T5", false, "H5", false, "O5", false, "M5", false, "K5", false],
  [false, false, "T5", false, "H5", false, "O5", false, "M5", false, "K5"],
  [false, "H6", false, "O6", false, "M6", false, "K6", false, "T6", false],
  [false, false, "H6", false, "O6", false, "M6", false, "K6", false, "T6"],
];

function nguHanhLetterToCuc(letter: string): { name: string; number: number } {
  switch (letter) {
    case "T": return { name: "Thuy Nhi Cuc", number: 2 };
    case "M": return { name: "Moc Tam Cuc",  number: 3 };
    case "K": return { name: "Kim Tu Cuc",   number: 4 };
    case "O": return { name: "Tho Ngu Cuc",  number: 5 };
    case "H": return { name: "Hoa Luc Cuc",  number: 6 };
    default:
      throw new Error(`Nạp âm không hợp lệ: ${letter}`);
  }
}

/** Nạp âm cung Mệnh → ngũ hành cục (Bắc Tông, theo lasotuvi AmDuong.timCuc). */
function timCuc(viTriCungMenhPy: number, canNamPy: number): { name: string; number: number } {
  const canThangGieng = (canNamPy * 2 + 1) % 10;
  let canThangMenh = ((viTriCungMenhPy - 3) % 12 + canThangGieng) % 10;
  if (canThangMenh === 0) canThangMenh = 10;
  const row = NAP_AM_MATRIX[viTriCungMenhPy];
  if (!row) throw new Error("timCuc: địa chi không hợp lệ");
  const cell = row[canThangMenh];
  if (typeof cell !== "string" || !/^[KMTHO]/.test(cell))
    throw new Error("timCuc: ô nạp âm trống");
  return nguHanhLetterToCuc(cell[0]!);
}

// ─── An Tử Vi theo Cục và ngày âm lịch (lasotuvi AmDuong.timTuVi) ────────────

function timTuViPy(lunarDay: number, cucSo: number): number {
  if (![2, 3, 4, 5, 6].includes(cucSo)) throw new Error("Số cục phải 2–6");
  let cungDan = 3;
  let cuc = cucSo;
  const cucBanDau = cucSo;
  while (cuc < lunarDay) {
    cuc += cucBanDau;
    cungDan += 1;
  }
  let saiLech = cuc - lunarDay;
  if (saiLech % 2 === 1) saiLech = -saiLech;
  return dichCungPy(cungDan, saiLech);
}

// ─── Vị trí 14 chính tinh (lasotuvi App.lapDiaBan — tọa độ 1-based rồi đổi 0-based)

function getMajorStarPositions(tuViTs0: number): Record<string, number> {
  const tvPy = tuViTs0 + 1;
  const tpPy = dichCungPy(3, 3 - tvPy);
  return {
    "Tu Vi":       tuViTs0,
    "Liem Trinh":  pyChiToTs(dichCungPy(tvPy, 4)),
    "Thien Dong":  pyChiToTs(dichCungPy(tvPy, 7)),
    "Vu Khuc":     pyChiToTs(dichCungPy(tvPy, 8)),
    "Thai Duong":  pyChiToTs(dichCungPy(tvPy, 9)),
    "Thien Co":    pyChiToTs(dichCungPy(tvPy, 11)),
    "Thien Phu":   pyChiToTs(tpPy),
    "Thai Am":     pyChiToTs(dichCungPy(tpPy, 1)),
    "Tham Lang":   pyChiToTs(dichCungPy(tpPy, 2)),
    "Cu Mon":      pyChiToTs(dichCungPy(tpPy, 3)),
    "Thien Tuong": pyChiToTs(dichCungPy(tpPy, 4)),
    "Thien Luong": pyChiToTs(dichCungPy(tpPy, 5)),
    "That Sat":    pyChiToTs(dichCungPy(tpPy, 6)),
    "Pha Quan":    pyChiToTs(dichCungPy(tpPy, 10)),
  };
}

// ─── Chất lượng sao (Miếu/Vượng/Đắc/Hãm) ─────────────────────────────────────

const STAR_QUALITY_TABLE: Record<string, { mieu: number[]; vuong: number[]; dac: number[]; ham: number[] }> = {
  "Tu Vi":       { mieu:[4,10],    vuong:[2,8],    dac:[0,6,1,7],  ham:[3,9,5,11] },
  "Thien Co":    { mieu:[1,5,7,11],vuong:[2,8],    dac:[0,6],      ham:[3,9,4,10] },
  "Thai Duong":  { mieu:[2,6],     vuong:[3,9],    dac:[1,7],      ham:[0,4,5,8,10,11] },
  "Vu Khuc":     { mieu:[3,9],     vuong:[1,7],    dac:[4,10],     ham:[0,6,2,8] },
  "Thien Dong":  { mieu:[0,6],     vuong:[3,9],    dac:[2,8],      ham:[1,5,7,11] },
  "Liem Trinh":  { mieu:[2,8],     vuong:[0,6],    dac:[3,9],      ham:[1,5,7,11] },
  "Thien Phu":   { mieu:[4,10],    vuong:[2,8],    dac:[0,6],      ham:[1,5,7,11] },
  "Thai Am":     { mieu:[0,6],     vuong:[3,9],    dac:[1,7],      ham:[2,4,8,10] },
  "Tham Lang":   { mieu:[2,8],     vuong:[0,6],    dac:[4,10],     ham:[1,5,7,11] },
  "Cu Mon":      { mieu:[3,9],     vuong:[0,6],    dac:[1,7],      ham:[2,4,8,10] },
  "Thien Tuong": { mieu:[1,7],     vuong:[2,8],    dac:[0,6],      ham:[3,5,9,11] },
  "Thien Luong": { mieu:[2,8],     vuong:[0,6],    dac:[3,9],      ham:[1,5,7,11] },
  "That Sat":    { mieu:[1,7],     vuong:[2,8],    dac:[4,10],     ham:[0,6,3,9] },
  "Pha Quan":    { mieu:[0,6],     vuong:[3,9],    dac:[2,8],      ham:[1,5,7,11] },
};

function getQuality(starName: string, branchIdx: number): TuViStar["quality"] {
  const q = STAR_QUALITY_TABLE[starName];
  if (!q) return "binh_hoa";
  if (q.mieu.includes(branchIdx)) return "mieu_dia";
  if (q.vuong.includes(branchIdx)) return "vuong_dia";
  if (q.dac.includes(branchIdx))  return "dac_dia";
  if (q.ham.includes(branchIdx))  return "ham_dia";
  return "binh_hoa";
}

// ─── Tứ Hóa Bắc Tông (Thái Thứ Lang) ─────────────────────────────────────────
// Trả về tên sao được hóa theo Can năm

const TU_HOA: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
  0: { loc:"Liem Trinh", quyen:"Pha Quan",   khoa:"Vu Khuc",     ky:"Thai Duong"  }, // Giáp
  1: { loc:"Thien Co",   quyen:"Thien Luong",khoa:"Tu Vi",       ky:"Thai Am"     }, // Ất
  2: { loc:"Thien Dong", quyen:"Thien Co",   khoa:"Van Xuong",   ky:"Liem Trinh"  }, // Bính
  3: { loc:"Thai Am",    quyen:"Thien Dong", khoa:"Thien Co",    ky:"Cu Mon"      }, // Đinh
  4: { loc:"Tham Lang",  quyen:"Thai Am",    khoa:"Huu Bat",     ky:"Thien Co"    }, // Mậu
  5: { loc:"Vu Khuc",    quyen:"Tham Lang",  khoa:"Thien Luong", ky:"Van Khuc"    }, // Kỷ
  6: { loc:"Thai Duong", quyen:"Vu Khuc",    khoa:"Thien Dong",  ky:"Thai Am"     }, // Canh
  7: { loc:"Cu Mon",     quyen:"Thai Am",    khoa:"Van Xuong",   ky:"Thien Luong" }, // Tân
  8: { loc:"Thien Luong",quyen:"Tu Vi",      khoa:"Thien Phu",   ky:"Vu Khuc"     }, // Nhâm
  9: { loc:"Pha Quan",   quyen:"Cu Mon",     khoa:"Thai Am",     ky:"Tham Lang"   }, // Quý
};

// ─── An phụ tinh (Bắc Tông — bám lasotuvi App.lapDiaBan) ─────────────────────

function timTrangSinhPy(cucSo: number): number {
  if (cucSo === 6) return 3;
  if (cucSo === 4) return 6;
  if (cucSo === 2 || cucSo === 5) return 9;
  if (cucSo === 3) return 12;
  throw new Error("Số cục không hợp lệ cho Tràng sinh");
}

function timCoThanPy(chiNamPy: number): number {
  if ([12, 1, 2].includes(chiNamPy)) return 3;
  if ([3, 4, 5].includes(chiNamPy)) return 6;
  if ([6, 7, 8].includes(chiNamPy)) return 9;
  return 12;
}

function timThienMaPy(chiNamPy: number): number {
  const r = chiNamPy % 4;
  if (r === 1) return 3;
  if (r === 2) return 12;
  if (r === 3) return 9;
  return 6;
}

function timPhaToaiPy(chiNamPy: number): number {
  const r = chiNamPy % 3;
  if (r === 0) return 6;
  if (r === 1) return 10;
  return 2;
}

const THIEN_QUAN_PY = [0, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
const THIEN_PHUC_PY = [0, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];

function getMinorStarPositions(
  yearStemIdx: number,
  yearZhiIdx: number,
  lunarMonth: number,
  lunarDay: number,
  hourZhiIdx: number,
  isMale: boolean,
  cucNumber: number,
  menhIdx: number,
  thanIdx: number,
): Record<string, number> {
  const chiNamPy = yearZhiIdx + 1;
  const canNamPy = yearStemIdx + 1;
  const gioSinhPy = hourZhiIdx + 1;
  const gioiTinhPy = isMale ? 1 : -1;
  const amDuongCanNam = yearStemIdx % 2 === 0 ? 1 : -1;
  const amDuongNamNu = gioiTinhPy * amDuongCanNam;

  const out: Record<string, number> = {};

  const LOC_TON = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  const locTonTs = LOC_TON[yearStemIdx] ?? 2;
  const locTonPy = locTonTs + 1;

  out["Loc Ton"] = locTonTs;
  out["Bac Sy"] = locTonTs;
  out["Kinh Duong"] = pyChiToTs(dichCungPy(locTonPy, 1));
  out["Da La"] = pyChiToTs(dichCungPy(locTonPy, -1));

  const locVongTen = [
    "Luc Si", "Thanh Long", "Tieu Hao", "Tuong Quan", "Tau Thu", "Phi Liem",
    "Hy Than", "Benh Phu", "Dai Hao", "Phuc Binh", "Quan Phu 2",
  ] as const;
  for (let k = 1; k <= 11; k++) {
    out[locVongTen[k - 1]] = pyChiToTs(dichCungPy(locTonPy, k * amDuongNamNu));
  }

  const THAI_TUE_RING: [string, number][] = [
    ["Thai Tue", 0],
    ["Thieu Duong", 1],
    ["Thien Khong", 1],
    ["Tang Mon", 2],
    ["Thieu Am", 3],
    ["Quan Phu 3", 4],
    ["Tu Phu", 5],
    ["Nguyet Duc", 5],
    ["Tue Pha", 6],
    ["Long Duc", 7],
    ["Bach Ho", 8],
    ["Phuc Duc Sao", 9],
    ["Thien Duc", 9],
    ["Dieu Khach", 10],
    ["Truc Phu", 11],
  ];
  for (const [name, step] of THAI_TUE_RING) {
    out[name] = pyChiToTs(dichCungPy(chiNamPy, step));
  }

  const ts0 = timTrangSinhPy(cucNumber);
  const dir = amDuongNamNu;
  const trSteps: [string, number][] = [
    ["Trang Sinh", 0],
    ["Moc Duc", 1 * dir],
    ["Quan Doi", 2 * dir],
    ["Lam Quan", 3 * dir],
    ["De Vuong", 4 * dir],
    ["Suy", 5 * dir],
    ["Benh", 6 * dir],
    ["Tu", 7 * dir],
    ["Mo", 8 * dir],
    ["Tuyet", 9 * dir],
    ["Thai", -1 * dir],
    ["Duong Tinh", -2 * dir],
  ];
  for (const [name, d] of trSteps) {
    out[name] = pyChiToTs(dichCungPy(ts0, d));
  }

  const vanKhucPy = dichCungPy(5, gioSinhPy - 1);
  const vanXuongPy = dichCungPy(2, 2 - vanKhucPy);
  out["Van Khuc"] = pyChiToTs(vanKhucPy);
  out["Van Xuong"] = pyChiToTs(vanXuongPy);

  const taPhuPy = dichCungPy(5, lunarMonth - 1);
  const huuBatPy = dichCungPy(2, 2 - taPhuPy);
  out["Ta Phu"] = pyChiToTs(taPhuPy);
  out["Huu Bat"] = pyChiToTs(huuBatPy);

  const diaKiepPy = dichCungPy(11, gioSinhPy);
  const diaKhongPy = dichCungPy(12, 12 - diaKiepPy);
  out["Dia Kiep"] = pyChiToTs(diaKiepPy);
  out["Dia Khong"] = pyChiToTs(diaKhongPy);

  const hongLoanPy = dichCungPy(4, -chiNamPy + 1);
  out["Hong Loan"] = pyChiToTs(hongLoanPy);
  out["Thien Hy"] = pyChiToTs(dichCungPy(hongLoanPy, 6));

  out["Thien Hu"] = pyChiToTs(dichCungPy(7, chiNamPy - 1));
  out["Thien Khoc"] = pyChiToTs(dichCungPy(7, -chiNamPy + 1));

  const menhPy = menhIdx + 1;
  const thanPy = thanIdx + 1;
  out["Thien Tai"] = pyChiToTs(dichCungPy(menhPy, chiNamPy - 1));
  out["Thien Tho"] = pyChiToTs(dichCungPy(thanPy, chiNamPy - 1));

  const longTriPy = dichCungPy(5, chiNamPy - 1);
  const phuongCacPy = dichCungPy(2, 2 - longTriPy);
  out["Long Tri"] = pyChiToTs(longTriPy);
  out["Phuong Cac"] = pyChiToTs(phuongCacPy);
  out["Giai Than"] = pyChiToTs(phuongCacPy);

  const tamThaiPy = dichCungPy(5, lunarMonth + lunarDay - 2);
  out["Tam Thai"] = pyChiToTs(tamThaiPy);
  out["Bat Toa"] = pyChiToTs(dichCungPy(2, 2 - tamThaiPy));

  const anQuangPy = dichCungPy(vanXuongPy, lunarDay - 2);
  out["An Quang"] = pyChiToTs(anQuangPy);
  out["Thien Quy"] = pyChiToTs(dichCungPy(2, 2 - anQuangPy));

  out["Thien Quan"] = pyChiToTs(THIEN_QUAN_PY[canNamPy] ?? 8);
  out["Thien Phuc"] = pyChiToTs(THIEN_PHUC_PY[canNamPy] ?? 10);

  const thienHinhPy = dichCungPy(10, lunarMonth - 1);
  const thienRieuPy = dichCungPy(thienHinhPy, 4);
  out["Thien Hinh"] = pyChiToTs(thienHinhPy);
  out["Thien Rieu"] = pyChiToTs(thienRieuPy);
  out["Thien Y"] = pyChiToTs(thienRieuPy);

  const coThanPy = timCoThanPy(chiNamPy);
  out["Co Than"] = pyChiToTs(coThanPy);
  out["Qua Tu"] = pyChiToTs(dichCungPy(coThanPy, -4));

  const thienMaPy = timThienMaPy(chiNamPy);
  out["Thien Ma"] = pyChiToTs(thienMaPy);
  out["Hoa Cai"] = pyChiToTs(dichCungPy(thienMaPy, 2));
  const kiepPy = dichCungPy(thienMaPy, 3);
  out["Kiep Sat"] = pyChiToTs(kiepPy);
  out["Dao Hoa"] = pyChiToTs(dichCungPy(kiepPy, 4));

  out["Pha Toai"] = pyChiToTs(timPhaToaiPy(chiNamPy));
  out["Thien La"] = pyChiToTs(5);
  out["Dia Vong"] = pyChiToTs(11);

  const KHOI_PY = [0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  const khoiPy = KHOI_PY[canNamPy] ?? 2;
  out["Thien Khoi"] = pyChiToTs(khoiPy);
  out["Thien Viet"] = pyChiToTs(dichCungPy(5, 5 - khoiPy));

  let kHoi: number;
  let kLinh: number;
  if ([3, 7, 11].includes(chiNamPy)) { kHoi = 2; kLinh = 4; }
  else if ([1, 5, 9].includes(chiNamPy)) { kHoi = 3; kLinh = 11; }
  else if ([6, 10, 2].includes(chiNamPy)) { kHoi = 11; kLinh = 4; }
  else if ([12, 4, 8].includes(chiNamPy)) { kHoi = 10; kLinh = 11; }
  else throw new Error("Chi năm không hợp lệ cho Hỏa Linh");
  let hoaPy: number;
  let linhPy: number;
  if (gioiTinhPy * amDuongCanNam === -1) {
    hoaPy = dichCungPy(kHoi + 1, -gioSinhPy);
    linhPy = dichCungPy(kLinh - 1, gioSinhPy);
  } else {
    hoaPy = dichCungPy(kHoi - 1, gioSinhPy);
    linhPy = dichCungPy(kLinh + 1, -gioSinhPy);
  }
  out["Hoa Tinh"] = pyChiToTs(hoaPy);
  out["Linh Tinh"] = pyChiToTs(linhPy);

  return out;
}

// ─── Build 12 cung ────────────────────────────────────────────────────────────

const MAJOR_ELEMENTS: Record<string, string> = {
  "Tu Vi":"Tho","Thien Co":"Moc","Thai Duong":"Hoa","Vu Khuc":"Kim",
  "Thien Dong":"Thuy","Liem Trinh":"Hoa","Thien Phu":"Tho","Thai Am":"Thuy",
  "Tham Lang":"Moc","Cu Mon":"Thuy","Thien Tuong":"Thuy","Thien Luong":"Tho",
  "That Sat":"Kim","Pha Quan":"Thuy",
};
const MINOR_ELEMENTS: Record<string, string> = {
  "Loc Ton":"Tho","Bac Sy":"Moc","Kinh Duong":"Kim","Da La":"Kim",
  "Luc Si":"Kim","Thanh Long":"Moc","Tieu Hao":"Hoa","Tuong Quan":"Hoa",
  "Tau Thu":"Hoa","Phi Liem":"Kim","Hy Than":"Hoa","Benh Phu":"Thuy",
  "Dai Hao":"Hoa","Phuc Binh":"Thuy","Quan Phu 2":"Kim",
  "Thai Tue":"Tho","Thieu Duong":"Hoa","Thien Khong":"Hoa","Tang Mon":"Thuy",
  "Thieu Am":"Thuy","Quan Phu 3":"Kim","Tu Phu":"Thuy","Nguyet Duc":"Kim",
  "Tue Pha":"Kim","Long Duc":"Moc","Bach Ho":"Kim","Phuc Duc Sao":"Moc",
  "Thien Duc":"Hoa","Dieu Khach":"Thuy","Truc Phu":"Kim",
  "Trang Sinh":"Moc","Moc Duc":"Moc","Quan Doi":"Kim","Lam Quan":"Kim",
  "De Vuong":"Tho","Suy":"Thuy","Benh":"Thuy","Tu":"Thuy","Mo":"Tho",
  "Tuyet":"Thuy","Thai":"Moc","Duong Tinh":"Moc",
  "Thien Khoi":"Hoa","Thien Viet":"Hoa",
  "Van Xuong":"Kim","Van Khuc":"Thuy",
  "Ta Phu":"Tho","Huu Bat":"Thuy","Thien Ma":"Hoa",
  "Hoa Loc":"Moc","Hoa Quyen":"Hoa","Hoa Khoa":"Thuy","Hoa Ky":"Thuy",
  "Dia Khong":"Hoa","Dia Kiep":"Hoa","Hoa Tinh":"Hoa","Linh Tinh":"Hoa",
  "Dao Hoa":"Moc","Hong Loan":"Thuy","Thien Hy":"Hoa",
  "Long Tri":"Hoa","Phuong Cac":"Moc","Giai Than":"Moc",
  "Tam Thai":"Kim","Bat Toa":"Kim","An Quang":"Kim","Thien Quy":"Moc",
  "Thien Tai":"Kim","Thien Tho":"Tho","Thien Hu":"Thuy","Thien Khoc":"Thuy",
  "Thien Quan":"Hoa","Thien Phuc":"Moc","Thien Hinh":"Hoa","Thien Rieu":"Thuy",
  "Thien Y":"Moc","Co Than":"Kim","Qua Tu":"Kim","Hoa Cai":"Moc","Kiep Sat":"Kim",
  "Pha Toai":"Kim","Thien La":"Hoa","Dia Vong":"Thuy",
};

// Nạp Âm cung Mệnh (dùng Can cung Mệnh và Chi cung Mệnh)
// Cung Mệnh có Can = Can năm + offset theo tháng (phức tạp)
// Đơn giản: dùng Nạp Âm năm sinh để xác định Cục (đã làm ở trên)
// Nạp Âm cung Mệnh dùng để hiển thị thêm thông tin

function palaceNote(name: string, stars: string[]): string {
  const s = stars.length > 0 ? stars.join(", ") : "vô chính diệu";
  const notes: Record<string, string> = {
    "Menh":       `Cung Mệnh chủ về cốt cách và khí chất. Chính tinh: ${s}.`,
    "Quan Loc":   `Cung Quan Lộc quyết định sự nghiệp và vị thế. Chính tinh: ${s}.`,
    "Tai Bach":   `Cung Tài Bạch phản ánh tài lộc và dòng tiền. Chính tinh: ${s}.`,
    "Phu The":    `Cung Phu Thê cho biết duyên phận tình cảm. Chính tinh: ${s}.`,
    "Thien Di":   `Cung Thiên Di thể hiện vận hội ngoài xa. Chính tinh: ${s}.`,
    "Tu Tuc":     `Cung Tử Tức liên quan con cái và sáng tạo. Chính tinh: ${s}.`,
    "No Boc":     `Cung Nô Bộc phản ánh quan hệ cấp dưới và đối tác. Chính tinh: ${s}.`,
    "Dien Trach": `Cung Điền Trạch cho biết bất động sản và gia đình. Chính tinh: ${s}.`,
    "Phuc Duc":   `Cung Phúc Đức thể hiện phúc phần và tâm linh. Chính tinh: ${s}.`,
    "Phu Mau":    `Cung Phụ Mẫu phản ánh quan hệ cha mẹ. Chính tinh: ${s}.`,
    "Huynh De":   `Cung Huynh Đệ cho biết anh em và bạn bè. Chính tinh: ${s}.`,
    "Tat Ach":    `Cung Tật Ách liên quan sức khỏe và tai nạn. Chính tinh: ${s}.`,
  };
  return notes[name] ?? `Cung ${name}: ${s}.`;
}

function buildPalaces(
  menhIdx: number, thanIdx: number, tuViIdx: number,
  yearStemIdx: number, yearZhiIdx: number,
  lunarMonth: number, lunarDay: number,
  hourZhiIdx: number,
  isMale: boolean,
  cucNumber: number,
): TuViPalace[] {
  const majorPos  = getMajorStarPositions(tuViIdx);
  const minorPos  = getMinorStarPositions(
    yearStemIdx, yearZhiIdx, lunarMonth, lunarDay, hourZhiIdx, isMale, cucNumber, menhIdx, thanIdx,
  );
  const tuHoa     = TU_HOA[yearStemIdx] ?? TU_HOA[0];

  // Tạo 12 cung
  const palaces: TuViPalace[] = Array.from({ length: 12 }, (_, offset) => {
    const bIdx = mod12(menhIdx + offset);
    return {
      name: PALACE_NAMES[offset],
      branch: BRANCHES_EN[bIdx],
      element: "Tho", // sẽ cập nhật
      isLifePalace: offset === 0,
      isBodyPalace: bIdx === thanIdx,
      majorStars: [],
      minorStars: [],
      note: "",
    };
  });

  // Điền chính tinh
  for (const [starName, starBranchIdx] of Object.entries(majorPos)) {
    const palace = palaces.find(p => BRANCHES_EN.indexOf(p.branch) === starBranchIdx);
    if (palace) {
      palace.majorStars.push({
        name: starName, type: "chinh_tinh",
        quality: getQuality(starName, starBranchIdx),
        element: MAJOR_ELEMENTS[starName] ?? "Tho",
      });
    }
  }

  // Điền phụ tinh
  for (const [starName, starBranchIdx] of Object.entries(minorPos)) {
    const palace = palaces.find(p => BRANCHES_EN.indexOf(p.branch) === starBranchIdx);
    if (palace) {
      palace.minorStars.push({
        name: starName, type: "phu_tinh",
        quality: "binh_hoa",
        element: MINOR_ELEMENTS[starName] ?? "Tho",
      });
    }
  }

  // Tứ Hóa: tìm cung chứa sao được hóa và thêm sao hóa vào đó
  const hoaMap: Record<string, string> = {
    [tuHoa.loc]:   "Hoa Loc",
    [tuHoa.quyen]: "Hoa Quyen",
    [tuHoa.khoa]:  "Hoa Khoa",
    [tuHoa.ky]:    "Hoa Ky",
  };
  for (const palace of palaces) {
    for (const major of palace.majorStars) {
      const hoaName = hoaMap[major.name];
      if (hoaName && !palace.minorStars.find(s => s.name === hoaName)) {
        palace.minorStars.unshift({
          name: hoaName, type: "phu_tinh",
          quality: "binh_hoa",
          element: MINOR_ELEMENTS[hoaName] ?? "Tho",
        });
      }
    }
  }

  return palaces.map(p => ({
    ...p,
    note: palaceNote(p.name, p.majorStars.map(s => s.name)),
  }));
}

// ─── Đại hạn (lasotuvi DiaBan.nhapDaiHan: tuổi khởi = cục + khoảng cách×10)
// Dương Nam / Âm Nữ: thuận; Âm Nam / Dương Nữ: nghịch — theo Âm/Dương **chi** năm

function buildDecadeCycles(
  palaces: TuViPalace[],
  cucNumber: number,
  isMale: boolean,
  isYangChi: boolean,
): TuViDecadeCycle[] {
  const isForward = (isMale && isYangChi) || (!isMale && !isYangChi);

  return palaces.map((palace, i) => {
    const idx = isForward ? i : (12 - i) % 12;
    const p   = palaces[idx];
    const s   = cucNumber + i * 10;
    const stars = p.majorStars.slice(0, 2).map(x => x.name).join(" + ") || "bộ cục";
    return {
      palace: p.name,
      branch: p.branch,
      startAge: s,
      endAge: s + 9,
      focus: `Đại hạn ${p.name} (${BRANCHES_VI[BRANCHES_EN.indexOf(p.branch)] ?? p.branch}): ${stars}. Cục ${cucNumber}.`,
    };
  });
}

// ─── Phân tích & Tóm tắt ──────────────────────────────────────────────────────

function buildAnalysis(palaces: TuViPalace[]) {
  const g = (n: string) => palaces.find(p => p.name === n);
  const s = (p: TuViPalace | undefined) =>
    p?.majorStars.map(x => x.name).join(", ") || "vô chính diệu";
  const bv = (b: string) => BRANCHES_VI[BRANCHES_EN.indexOf(b)] ?? b;

  return {
    coreTraits: [
      `Mệnh tại ${bv(g("Menh")?.branch ?? "")}: ${s(g("Menh"))}.`,
      `Thân cư ${g(palaces.find(p => p.isBodyPalace)?.name ?? "Menh")?.name ?? "Mệnh"}.`,
      `Phúc Đức và Thiên Di cần đối chiếu để biết phúc phần và quý nhân.`,
    ],
    career: [
      `Quan Lộc (${bv(g("Quan Loc")?.branch ?? "")}): ${s(g("Quan Loc"))}.`,
      `Tài Bạch (${bv(g("Tai Bach")?.branch ?? "")}): ${s(g("Tai Bach"))}.`,
      `Nô Bộc và Thiên Di cho biết chất lượng đối tác.`,
    ],
    relationship: [
      `Phu Thê (${bv(g("Phu The")?.branch ?? "")}): ${s(g("Phu The"))}.`,
      `Thiên Di (${bv(g("Thien Di")?.branch ?? "")}): ${s(g("Thien Di"))}.`,
    ],
  };
}

function buildSummary(r: TuViEngineResult): string[] {
  const g  = (n: string) => r.palaces.find(p => p.name === n);
  const s  = (p: TuViPalace | undefined) => p?.majorStars.map(x => x.name).join(", ") || "vô chính diệu";
  const bv = (b: string) => BRANCHES_VI[BRANCHES_EN.indexOf(b)] ?? b;
  return [
    `${r.profile.fullName || "Bạn"}: Mệnh ${bv(r.overview.menhBranch)}, Thân ${bv(r.overview.thanBranch)}, ${r.overview.cuc}.`,
    `Cung Mệnh: ${s(g("Menh"))}.`,
    `Quan Lộc: ${s(g("Quan Loc"))}. Tài Bạch: ${s(g("Tai Bach"))}.`,
    `Phu Thê: ${s(g("Phu The"))}.`,
  ];
}

// ─── Export chính ─────────────────────────────────────────────────────────────

export function calculateTuVi(input: FortuneRequest): TuViEngineResult {
  const lunar = buildLunar(input);

  const yearStemIdx  = lunar.getYearGanIndex();   // 0=Giáp..9=Quý
  const yearZhiIdx   = lunar.getYearZhiIndex();   // 0=Tý..11=Hợi
  const dayStemIdx   = lunar.getDayGanIndex();
  const dayZhiIdx    = lunar.getDayZhiIndex();
  const hourZhiIdx   = lunar.getTimeZhiIndex();   // 0=Tý..11=Hợi (mỗi 2 giờ)
  const lunarMonth   = lunar.getMonth();
  const lunarDay     = lunar.getDay();
  const isMale      = input.gender === "nam";
  const isYangYear  = yearStemIdx % 2 === 0; // Can dương (hiển thị)
  const isYangChi   = yearZhiIdx % 2 === 0;  // Chi dương: Tý, Dần, Thìn… (đại hạn)

  const menhIdx = getMenhIdx(lunarMonth, hourZhiIdx);
  const thanIdx = getThanIdx(lunarMonth, hourZhiIdx);
  const cuc     = timCuc(menhIdx + 1, yearStemIdx + 1);
  const tuViIdx = pyChiToTs(timTuViPy(lunarDay, cuc.number));

  const palaces = buildPalaces(
    menhIdx, thanIdx, tuViIdx,
    yearStemIdx, yearZhiIdx,
    lunarMonth, lunarDay, hourZhiIdx,
    isMale,
    cuc.number,
  );

  const canChiYear = `${STEMS_VI[yearStemIdx] ?? yearStemIdx} ${BRANCHES_VI[yearZhiIdx] ?? yearZhiIdx}`;
  const canChiDay  = `${STEMS_VI[dayStemIdx]  ?? dayStemIdx}  ${BRANCHES_VI[dayZhiIdx]  ?? dayZhiIdx}`;

  const result: TuViEngineResult = {
    profile: {
      fullName:      input.fullName.trim(),
      genderLabel:   isMale ? "Nam" : "Nữ",
      solarDateTime: `${input.birthDate} ${input.birthTime}`,
      lunarDateTime: `${lunarMonth}/${lunarDay} âm lịch`,
      timezone:      input.timezone,
    },
    overview: {
      chartType:   "Tử Vi Đẩu Số Bắc Tông",
      zodiac:      lunar.getYearShengXiao(),
      amDuong:     isYangYear ? "Dương" : "Âm",
      cuc:         cuc.name,
      cucNumber:   cuc.number,
      menhPalace:  "Menh",
      thanPalace:  palaces.find(p => p.isBodyPalace)?.name ?? "Menh",
      menhBranch:  BRANCHES_EN[menhIdx],
      thanBranch:  BRANCHES_EN[thanIdx],
      canChiYear,
      canChiDay,
      menhChu:     BRANCHES_EN[menhIdx],
      thanChu:     BRANCHES_EN[thanIdx],
    },
    palaces,
    keyStars: palaces
      .filter(p => p.name === "Menh" || p.name === "Quan Loc" || p.name === "Tai Bach" || p.isBodyPalace)
      .flatMap(p => p.majorStars.slice(0, 2).map(s => s.name)),
    decadeCycles: buildDecadeCycles(palaces, cuc.number, isMale, isYangChi),
    summary: [],
    analysis: buildAnalysis(palaces),
  };

  result.summary = buildSummary(result);
  return result;
}

export const calculateBazi = calculateTuVi;
