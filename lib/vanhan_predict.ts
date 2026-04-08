import { SolarDay } from "tyme4ts";
import {
  DIA_CHI_LABELS,
  DiaChi,
  GioiTinh,
  getNguyetHanCung,
  getTieuHanCung,
  getTuoiAmLich,
  parseDateInput,
  normalizeCungIndex,
} from "./vanhan";
import type { TuViEngineResult } from "./bazi/types";

const STEMS_VI = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const BRANCH_VI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const BRANCH_EN = ["Ty", "Suu", "Dan", "Mao", "Thin", "Ti", "Ngo", "Mui", "Than", "Dau", "Tuat", "Hoi"] as const;

const CHI_INDEX_MAP: Record<string, number> = {
  Tý: 1,
  Sửu: 2,
  Dần: 3,
  Mão: 4,
  Thìn: 5,
  Tỵ: 6,
  Ngọ: 7,
  Mùi: 8,
  Thân: 9,
  Dậu: 10,
  Tuất: 11,
  Hợi: 12,
  Ty: 1,
  Suu: 2,
  Dan: 3,
  Mao: 4,
  Thin: 5,
  Ti: 6,
  Ngo: 7,
  Mui: 8,
  Than: 9,
  Dau: 10,
  Tuat: 11,
  Hoi: 12,
};

const FAVORABLE_SIGNAL_NAMES = ["Hoa Loc", "Hoa Quyen", "Hoa Khoa", "Loc Ton", "Thien Ma", "Thanh Long", "Hy Than"];
const CAUTION_SIGNAL_NAMES = ["Dia Khong", "Dia Kiep", "Kinh Duong", "Da La", "Hoa Tinh", "Linh Tinh", "Bach Ho", "Tang Mon"];

type PalaceStarSnapshot = {
  majorStars: string[];
  minorStars: string[];
  allStars: string[];
};

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function getCanChiLabel(canIndex: number, chiIndex: number): string {
  return `${STEMS_VI[canIndex]} ${BRANCH_VI[chiIndex - 1]}`;
}

function getPalaceStars(chart: TuViEngineResult, palaceName?: string): PalaceStarSnapshot {
  const palace = chart.palaces.find((item) => item.name === palaceName);
  if (!palace) {
    return { majorStars: [], minorStars: [], allStars: [] };
  }

  const majorStars = palace.majorStars.map((star) => star.name);
  const minorStars = palace.minorStars.map((star) => star.name);

  return {
    majorStars,
    minorStars,
    allStars: [...majorStars, ...minorStars],
  };
}

function filterSignals(stars: string[], signalNames: string[]): string[] {
  return stars.filter((star) => signalNames.includes(normalizeText(star)));
}

function getLuuSao(chiNamXemHan: number, canNamXemHan: number): Record<string, number> {
  const luuThaiTue = chiNamXemHan;
  const luuTangMon = normalizeCungIndex(luuThaiTue + 2);
  const luuBachHo = normalizeCungIndex(luuThaiTue + 8);

  let luuThienMa = 3;
  if ([3, 7, 11].includes(chiNamXemHan)) luuThienMa = 9;
  else if ([9, 1, 5].includes(chiNamXemHan)) luuThienMa = 3;
  else if ([6, 10, 2].includes(chiNamXemHan)) luuThienMa = 12;
  else if ([12, 4, 8].includes(chiNamXemHan)) luuThienMa = 6;

  const luuThienKhoc = normalizeCungIndex(7 - chiNamXemHan + 1);
  const luuThienHu = normalizeCungIndex(7 + chiNamXemHan - 1);

  const locTonIndexByCan = [3, 4, 6, 7, 6, 7, 9, 10, 12, 1];
  const luuLocTon = locTonIndexByCan[canNamXemHan];
  const luuKinhDuong = normalizeCungIndex(luuLocTon + 1);
  const luuDaLa = normalizeCungIndex(luuLocTon - 1);

  return {
    "Lưu Thái Tuế": luuThaiTue,
    "Lưu Tang Môn": luuTangMon,
    "Lưu Bạch Hổ": luuBachHo,
    "Lưu Thiên Mã": luuThienMa,
    "Lưu Thiên Khốc": luuThienKhoc,
    "Lưu Thiên Hư": luuThienHu,
    "Lưu Lộc Tồn": luuLocTon,
    "Lưu Kình Dương": luuKinhDuong,
    "Lưu Đà La": luuDaLa,
  };
}

function describeMonthlyStatus(status: string, palace: string, branch: string): string {
  if (status === "Cẩn Trọng") {
    return `Nguyệt hạn nhập cung ${palace} (${branch}), nên giảm quyết định nóng và ưu tiên kiểm soát rủi ro trong tháng này.`;
  }

  if (status === "Khởi Sắc") {
    return `Nguyệt hạn vào cung ${palace} (${branch}), thuận hơn cho công việc ngắn hạn, đi lại và xử lý cơ hội mới.`;
  }

  return `Nguyệt hạn đi qua cung ${palace} (${branch}), nhịp tháng thiên về giữ ổn định và bám sát kế hoạch hiện tại.`;
}

export interface VanHanPrediction {
  context: {
    targetDate: string;
    lunarDate: {
      year: number;
      month: number;
      day: number;
    };
    canChi: {
      year: string;
      day: string;
    };
    age: number;
    gender: GioiTinh;
  };
  daiHan: {
    startAge: number;
    endAge: number;
    palace: string;
    branch: string;
    focus: string;
    isHeavy: boolean;
    stars: string[];
  };
  tieuHan: {
    year: number;
    age: number;
    palace: string;
    branch: string;
    luuSao: Array<{ name: string; position: number; branch: string }>;
    luuSaoAtPalace: string[];
    status: string;
    desc: string;
    majorStars: string[];
    minorStars: string[];
    catTinh: string[];
    satTinh: string[];
  };
  nguyetHan: {
    month: number;
    palace: string;
    branch: string;
    status: string;
    desc: string;
    catTinh: string[];
    satTinh: string[];
  };
  nhatHan: {
    date: string;
    goodHours: string[];
    badHours: string[];
    luckyColors: string[];
    caution: string;
    fortune: string;
  };
  analysisBasis: {
    tieuHanPalaceStars: string[];
    favorableSignals: string[];
    cautionSignals: string[];
    heavyIndicators: string[];
  };
  alerts: string[];
}

export function predictVanHan(chart: TuViEngineResult, targetDateString: string): VanHanPrediction {
  const { year: targetYear, month: targetMonth, day: targetDay } = parseDateInput(targetDateString);
  const targetSolar = SolarDay.fromYmd(targetYear, targetMonth, targetDay);
  const targetLunar = targetSolar.getLunarDay();
  const lunarMonth = targetLunar.getLunarMonth().getMonth();
  const lunarYear = targetLunar.getLunarMonth().getLunarYear();

  const yearCan = lunarYear.getSixtyCycle().getHeavenStem().getIndex();
  const yearChi = lunarYear.getSixtyCycle().getEarthBranch().getIndex() + 1;
  const birthSolarDateStr = chart.profile.solarDateTime;
  const tuoiAmLich = getTuoiAmLich(birthSolarDateStr, targetDateString);

  const daiHan =
    chart.decadeCycles.find((cycle) => cycle.startAge <= tuoiAmLich && cycle.endAge >= tuoiAmLich) ??
    chart.decadeCycles[0];
  const daiHanPalaceObj = chart.palaces.find((palace) => palace.name === daiHan.palace);
  const daiHanStars = daiHanPalaceObj?.majorStars.map((star) => star.name) ?? [];

  const gioiTinh: GioiTinh = chart.profile.genderLabel === "Nữ" ? "nu" : "nam";
  const [, chiNamSinhRaw = "Tý"] = chart.overview.canChiYear.split(" ");
  const chiNamSinhIndex = CHI_INDEX_MAP[chiNamSinhRaw] ?? 1;
  const chiNamSinh = BRANCH_EN[chiNamSinhIndex - 1] as DiaChi;

  const tieuHanIndex = getTieuHanCung(chiNamSinh, gioiTinh, tuoiAmLich);
  const tieuHanBranchEn = BRANCH_EN[tieuHanIndex - 1] as DiaChi;
  const tieuHanBranch = DIA_CHI_LABELS[tieuHanBranchEn];
  const tieuHanPalaceObj = chart.palaces.find((palace) => palace.branch === tieuHanBranchEn);
  const tieuHanStars = getPalaceStars(chart, tieuHanPalaceObj?.name);

  const nguyetHanIndex = getNguyetHanCung(tieuHanIndex, gioiTinh, lunarMonth);
  const nguyetHanBranchEn = BRANCH_EN[nguyetHanIndex - 1] as DiaChi;
  const nguyetHanBranch = DIA_CHI_LABELS[nguyetHanBranchEn];
  const nguyetHanPalaceObj = chart.palaces.find((palace) => palace.branch === nguyetHanBranchEn);
  const nguyetHanStars = getPalaceStars(chart, nguyetHanPalaceObj?.name);

  const luuSaoMap = getLuuSao(yearChi, yearCan);
  const luuSao = Object.entries(luuSaoMap).map(([name, position]) => ({
    name,
    position,
    branch: BRANCH_VI[position - 1],
  }));
  const luuSaoAtPalace = luuSao.filter((item) => item.position === tieuHanIndex).map((item) => item.name);

  const favorableSignals = [
    ...luuSaoAtPalace.filter((name) => ["Lưu Lộc Tồn", "Lưu Thiên Mã"].includes(name)),
    ...filterSignals(tieuHanStars.allStars, FAVORABLE_SIGNAL_NAMES),
  ];
  const cautionSignals = [
    ...luuSaoAtPalace.filter((name) =>
      ["Lưu Kình Dương", "Lưu Đà La", "Lưu Bạch Hổ", "Lưu Tang Môn"].includes(name)
    ),
    ...filterSignals(tieuHanStars.allStars, CAUTION_SIGNAL_NAMES),
  ];
  const heavyIndicators = [
    ...(tieuHanIndex === CHI_INDEX_MAP[daiHanPalaceObj?.branch ?? ""] ? ["Tiểu hạn trùng cung đại hạn"] : []),
    ...(luuSaoAtPalace.includes("Lưu Tang Môn") ? ["Lưu Tang Môn nhập hạn"] : []),
    ...(luuSaoAtPalace.includes("Lưu Bạch Hổ") ? ["Lưu Bạch Hổ nhập hạn"] : []),
    ...filterSignals(tieuHanStars.allStars, CAUTION_SIGNAL_NAMES),
  ];
  const isHeavy = heavyIndicators.length > 0;

  let status = "Ổn Định";
  let desc = `Năm nay Tiểu hạn rơi vào cung ${tieuHanPalaceObj?.name ?? ""} (${tieuHanBranch}). Mọi việc thiên về nhịp vừa phải, cần giữ sự ổn định và theo đúng kế hoạch.`;

  if (favorableSignals.length > cautionSignals.length && favorableSignals.length > 0) {
    status = "Khởi Sắc";
    desc = `Tiểu hạn có nhiều tín hiệu thuận như ${favorableSignals.join(", ")}, phù hợp để thúc đẩy tài lộc, dịch chuyển hoặc mở rộng công việc.`;
  } else if (cautionSignals.length > 0) {
    status = "Cẩn Trọng";
    desc = `Tiểu hạn gặp tín hiệu cần lưu ý như ${cautionSignals.join(", ")}, nên đề phòng thị phi, sức khỏe và các quyết định lớn vượt ngoài tầm kiểm soát.`;
  }

  const nguyetCatTinh = filterSignals(nguyetHanStars.allStars, FAVORABLE_SIGNAL_NAMES);
  const nguyetSatTinh = filterSignals(nguyetHanStars.allStars, CAUTION_SIGNAL_NAMES);
  const nguyetHanStatus =
    nguyetSatTinh.length > 0 ? "Cẩn Trọng" : nguyetCatTinh.length > 0 ? "Khởi Sắc" : "Ổn Định";
  const nguyetHanDesc = describeMonthlyStatus(
    nguyetHanStatus,
    nguyetHanPalaceObj?.name ?? "",
    nguyetHanBranch
  );

  const alerts: string[] = [];
  if (isHeavy) {
    alerts.push("Đại hạn và Tiểu hạn có dấu hiệu giao hội mạnh hoặc chạm hung tinh, nên ưu tiên an toàn, sức khỏe và quản trị rủi ro.");
  }
  if (luuSaoAtPalace.includes("Lưu Tang Môn") || luuSaoAtPalace.includes("Lưu Bạch Hổ")) {
    alerts.push("Lưu Tang Môn hoặc Lưu Bạch Hổ chiếu hạn: cần đề phòng chuyện buồn phiền, va chạm hoặc sự cố ngoài kế hoạch.");
  }
  if (nguyetHanStatus === "Cẩn Trọng") {
    alerts.push(`Nguyệt hạn tháng ${lunarMonth} đang nghiêng về phòng thủ, nên siết nhịp chi tiêu và tránh quyết định nóng.`);
  }

  const dayBranchIndex = targetLunar.getSixtyCycle().getEarthBranch().getIndex();
  const dayChiStr = BRANCH_VI[dayBranchIndex];

  return {
    context: {
      targetDate: targetDateString,
      lunarDate: {
        year: lunarYear.getYear(),
        month: lunarMonth,
        day: targetLunar.getDay(),
      },
      canChi: {
        year: getCanChiLabel(yearCan, yearChi),
        day: chart.overview.canChiDay,
      },
      age: tuoiAmLich,
      gender: gioiTinh,
    },
    daiHan: {
      startAge: daiHan.startAge,
      endAge: daiHan.endAge,
      palace: daiHanPalaceObj?.name ?? daiHan.palace,
      branch: BRANCH_VI[(CHI_INDEX_MAP[daiHanPalaceObj?.branch ?? "Tý"] ?? 1) - 1],
      focus: daiHan.focus,
      isHeavy,
      stars: daiHanStars,
    },
    tieuHan: {
      year: targetYear,
      age: tuoiAmLich,
      palace: tieuHanPalaceObj?.name ?? "",
      branch: tieuHanBranch,
      luuSao,
      luuSaoAtPalace,
      status,
      desc,
      majorStars: tieuHanStars.majorStars,
      minorStars: tieuHanStars.minorStars,
      catTinh: filterSignals(tieuHanStars.allStars, FAVORABLE_SIGNAL_NAMES),
      satTinh: filterSignals(tieuHanStars.allStars, CAUTION_SIGNAL_NAMES),
    },
    nguyetHan: {
      month: lunarMonth,
      palace: nguyetHanPalaceObj?.name ?? "",
      branch: nguyetHanBranch,
      status: nguyetHanStatus,
      desc: nguyetHanDesc,
      catTinh: nguyetCatTinh,
      satTinh: nguyetSatTinh,
    },
    nhatHan: {
      date: targetDateString,
      goodHours: ["Giờ Thìn (07:00-09:00)", "Giờ Tỵ (09:00-11:00)", "Giờ Thân (15:00-17:00)"],
      badHours: ["Giờ Dậu (17:00-19:00)", "Giờ Hợi (21:00-23:00)"],
      luckyColors: ["Vàng", "Đỏ", "Cam"],
      caution: "Tránh xuất hành đi xa, hạn chế đầu tư mạo hiểm trong ngày.",
      fortune: `Ngày ${dayChiStr}: công việc có thể vướng nhẹ vào buổi chiều nhưng vẫn có cơ hội gặp người hỗ trợ đúng lúc.`,
    },
    analysisBasis: {
      tieuHanPalaceStars: tieuHanStars.allStars,
      favorableSignals,
      cautionSignals,
      heavyIndicators,
    },
    alerts,
  };
}
