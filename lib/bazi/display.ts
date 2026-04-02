import type { TuViStar } from "@/lib/bazi/types";

export const BRANCH_LABELS: Record<string, string> = {
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

export const PALACE_LABELS: Record<string, string> = {
  Menh: "Mệnh",
  "Phu Mau": "Phụ mẫu",
  "Phuc Duc": "Phúc đức",
  "Dien Trach": "Điền trạch",
  "Quan Loc": "Quan lộc",
  "No Boc": "Nô bộc",
  "Thien Di": "Thiên di",
  "Tat Ach": "Tật Ách",
  "Tai Bach": "Tài Bạch",
  "Tu Tuc": "Tử tức",
  "Phu The": "Phu thê",
  "Huynh De": "Huynh đệ",
};

export const STAR_LABELS: Record<string, string> = {
  "Tu Vi": "Tử vi",
  "Liem Trinh": "Liêm trinh",
  "Thien Dong": "Thiên đồng",
  "Vu Khuc": "Vũ khúc",
  "Thai Duong": "Thái dương",
  "Thien Co": "Thiên cơ",
  "Thien Phu": "Thiên phủ",
  "Thai Am": "Thái âm",
  "Tham Lang": "Tham lang",
  "Cu Mon": "Cự môn",
  "Thien Tuong": "Thiên tướng",
  "Thien Luong": "Thiên lương",
  "That Sat": "Thất sát",
  "Pha Quan": "Phá quân",
  "Loc Ton": "Lộc tồn",
  "Kinh Duong": "Kình dương",
  "Da La": "Đà la",
  "Thien Khoi": "Thiên khôi",
  "Thien Viet": "Thiên việt",
  "Van Xuong": "Văn xương",
  "Van Khuc": "Văn khúc",
  "Ta Phu": "Tả phù",
  "Huu Bat": "Hữu bật",
  "Thien Ma": "Thiên mã",
  "Hoa Loc": "Hóa lộc",
  "Hoa Quyen": "Hóa quyền",
  "Hoa Khoa": "Hóa khoa",
  "Hoa Ky": "Hóa kỵ",
  "Dia Khong": "Địa không",
  "Dia Kiep": "Địa kiếp",
  "Hoa Tinh": "Hỏa tinh",
  "Linh Tinh": "Linh tinh",
  "Bac Sy": "Bác sĩ",
  "Luc Si": "Lực sĩ",
  "Thanh Long": "Thanh long",
  "Tieu Hao": "Tiểu hao",
  "Tuong Quan": "Tướng quân",
  "Tau Thu": "Tấu thư",
  "Phi Liem": "Phi liêm",
  "Hy Than": "Hỷ thần",
  "Benh Phu": "Bệnh phù",
  "Dai Hao": "Đại hao",
  "Phuc Binh": "Phục binh",
  "Quan Phu 2": "Quan phù",
  "Thai Tue": "Thái tuế",
  "Thieu Duong": "Thiếu dương",
  "Tang Mon": "Tang môn",
  "Thieu Am": "Thiếu âm",
  "Quan Phu 3": "Quan phù",
  "Tu Phu": "Tử phù",
  "Nguyet Duc": "Nguyệt đức",
  "Tue Pha": "Tuế phá",
  "Long Duc": "Long đức",
  "Bach Ho": "Bạch hổ",
  "Phuc Duc": "Phúc đức",
  "Thien Duc": "Thiên đức",
  "Dieu Khach": "Điếu khách",
  "Truc Phu": "Trực phù",
  "Trang Sinh": "Tràng sinh",
  "Moc Duc": "Mộc dục",
  "Quan Doi": "Quan đới",
  "Lam Quan": "Lâm quan",
  "De Vuong": "Đế vượng",
  "Suy": "Suy",
  "Benh": "Bệnh",
  "Tu": "Tử",
  "Mo": "Mộ",
  "Tuyet": "Tuyệt",
  "Thai": "Thai",
  "Duong": "Dưỡng",
  "Long Tri": "Long trì",
  "Phuong Cac": "Phượng các",
  "Giai Than": "Giải thần",
  "Tam Thai": "Tam thai",
  "Bat Toa": "Bát tọa",
  "An Quang": "Ân quang",
  "Thien Quy": "Thiên quý",
  "Thien Hu": "Thiên hư",
  "Thien Khoc": "Thiên khốc",
  "Thien Tai": "Thiên tài",
  "Thien Tho": "Thiên thọ",
  "Hong Loan": "Hồng loan",
  "Thien Hy": "Thiên hỷ",
  "Dao Hoa": "Đào hoa",
  "Thien Quan": "Thiên quan",
  "Thien Phuc": "Thiên phúc",
  "Thien Hinh": "Thiên hình",
  "Thien Rieu": "Thiên riêu",
  "Thien Y": "Thiên y",
  "Hoa Cai": "Hoa cái",
  "Kiep Sat": "Kiếp sát",
  "Tuan": "Tuần",
  "Triet": "Triệt",
};

export const ELEMENT_LABELS: Record<string, string> = {
  Kim: "Kim",
  Moc: "Mộc",
  Thuy: "Thủy",
  Hoa: "Hỏa",
  Tho: "Thổ",
  "Kim ": "Kim",
  "Mộc": "Mộc",
  "Thủy": "Thủy",
  "Hỏa": "Hỏa",
  "Thổ": "Thổ",
};

export const QUALITY_LABELS: Record<TuViStar["quality"], string> = {
  mieu_dia: "Miếu",
  vuong_dia: "Vượng",
  dac_dia: "Đắc",
  binh_hoa: "Bình",
  ham_dia: "Hãm",
};

export const QUALITY_COLORS: Record<TuViStar["quality"], string> = {
  mieu_dia: "text-primary",
  vuong_dia: "text-tertiary",
  dac_dia: "text-secondary",
  binh_hoa: "text-on-surface-variant",
  ham_dia: "text-error",
};

export function getBranchLabel(branch: string) {
  return BRANCH_LABELS[branch] ?? branch;
}

export function getPalaceLabel(name: string) {
  return PALACE_LABELS[name] ?? name;
}

export function getStarLabel(name: string) {
  return STAR_LABELS[name] ?? name;
}

export function getElementLabel(name: string) {
  return ELEMENT_LABELS[name] ?? name;
}
