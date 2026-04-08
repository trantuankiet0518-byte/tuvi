import {
  TIEU_HAN_START,
  getCungLabel,
  getNguyetHanCung,
  getTieuHanCung,
} from "@/lib/vanhan";

export interface VanHanCycleLevel {
  level: string;
  cycle: string;
  unit: string;
}

export interface VanHanRuleItem {
  label: string;
  value: string;
  verified?: boolean;
}

export interface VanHanCodeExample {
  language: string;
  title: string;
  code: string;
}

// ─── Prediction types ─────────────────────────────────────────────────────────

export type PredictionTone = "positive" | "neutral" | "caution";

export interface DayPrediction {
  date: string;          // e.g. "22/02 Âm lịch"
  label: string;         // short label, e.g. "Ngày mai"
  cung: string;          // e.g. "Thiên Di (Tý)"
  stars: string[];       // key stars active that day
  summary: string;
  advice: string;
  tone: PredictionTone;
}

export interface WeekSegment {
  period: string;        // e.g. "Đầu tuần – 23–24/02"
  days: DayPrediction[];
}

export interface VanHanPrediction {
  title: string;
  subtitle: string;
  lunarToday: string;
  tomorrow: DayPrediction;
  weekSegments: WeekSegment[];
  weekSummary: string;
  weekAdvice: string;
}

// ─── Existing types ────────────────────────────────────────────────────────────

export interface VanHanContent {
  title: string;
  intro: string;
  apiPath: string;
  overview: {
    title: string;
    levels: VanHanCycleLevel[];
  };
  sections: Array<{
    id: string;
    title: string;
    summary: string;
    cards?: VanHanRuleItem[];
    codeExamples?: VanHanCodeExample[];
    tables?: Array<{
      title: string;
      rows: Array<{ key: string; value: string; verified?: boolean }>;
    }>;
    bulletGroups?: Array<{
      title: string;
      items: Array<{ text: string; verified?: boolean }>;
    }>;
  }>;
  pipeline: string[];
  commonMistakes: string[];
  notes: string[];
  prediction: VanHanPrediction;
}

// ─── Test cases ────────────────────────────────────────────────────────────────

const tieuHanCases = [
  {
    key: "Nam, tuổi Dần, năm 1",
    index: getTieuHanCung("Dan", "nam", 1),
  },
  {
    key: "Nữ, tuổi Ngọ, năm 5",
    index: getTieuHanCung("Ngo", "nu", 5),
  },
  {
    key: "Nam, tuổi Tý, năm 10",
    index: getTieuHanCung("Ty", "nam", 10),
  },
];

const nguyetHanExampleIndex = getNguyetHanCung(5, "nam", 1);

// ─── Prediction data ───────────────────────────────────────────────────────────

const prediction: VanHanPrediction = {
  title: "Dự đoán ngày mai & tuần tới",
  subtitle: "Lưu Nhật hạn + Lưu Nguyệt hạn",
  lunarToday: "21 tháng 2 năm Bính Ngọ",
  tomorrow: {
    date: "22/02 Âm lịch",
    label: "Ngày mai",
    cung: "Thiên Di (Tý)",
    stars: ["Vũ Khúc", "Thiên Phủ", "Lộc Tồn", "Triệt", "Địa Không"],
    summary:
      "Cung Thiên Di mạnh với bộ Vũ Khúc–Thiên Phủ–Lộc Tồn. Rất thuận cho hoạt động bên ngoài, gặp gỡ đối tác và các giao dịch tài chính.",
    advice:
      "Triệt và Địa Không có thể gây ngăn trở nhỏ hoặc thay đổi kế hoạch vào phút chót. Tài tinh vẫn chiếu — kết quả cuối nghiêng về hướng có lợi nếu giữ đầu óc linh hoạt.",
    tone: "positive",
  },
  weekSegments: [
    {
      period: "Đầu tuần – 23–24/02",
      days: [
        {
          date: "23/02",
          label: "Thứ Tư",
          cung: "Tật Ách (Sửu)",
          stars: ["Nhật", "Nguyệt", "Hóa Khoa"],
          summary: "Ngày giải ách tốt. Mệt mỏi sẽ sớm hồi phục, tìm được cách nghỉ ngơi hợp lý.",
          advice: "Ưu tiên sức khỏe và giải tỏa căng thẳng tích lũy.",
          tone: "positive",
        },
        {
          date: "24/02",
          label: "Thứ Năm",
          cung: "Tài Bạch (Dần)",
          stars: ["Tham Lang", "Hóa Kỵ"],
          summary: "Hóa Kỵ nhập Tài Bạch — cần đặc biệt cẩn thận trong chi tiêu và vay mượn.",
          advice: "Tránh cho vay hoặc ký kết hợp đồng tài chính ngày này để phòng thị phi tranh chấp.",
          tone: "caution",
        },
      ],
    },
    {
      period: "Giữa tuần – 25–26/02",
      days: [
        {
          date: "25/02",
          label: "Thứ Sáu",
          cung: "Tử Tức",
          stars: [],
          summary: "Tập trung vào các mối quan hệ thân cận — gia đình và bạn bè gần gũi.",
          advice: "Ngày hợp để lắng nghe và củng cố kết nối cá nhân.",
          tone: "neutral",
        },
        {
          date: "26/02",
          label: "Thứ Bảy",
          cung: "Thân (Thìn)",
          stars: ["Tử Vi", "Thiên Tướng"],
          summary: "Hạn vào cung Thân — tự tin, có uy thế, làm chủ được các tình huống quan trọng.",
          advice: "Thời điểm tốt để đưa ra quyết định cá nhân hoặc xử lý việc đòi hỏi sự quyết đoán.",
          tone: "positive",
        },
      ],
    },
    {
      period: "Cuối tuần – 27–28/02",
      days: [
        {
          date: "27/02",
          label: "Chủ Nhật",
          cung: "Huynh Đệ",
          stars: [],
          summary: "Có thể nhận được sự giúp đỡ hoặc lời khuyên từ anh em, bạn bè đồng trang lứa.",
          advice: "Ngày hợp để mở rộng mạng lưới hỗ trợ xung quanh bạn.",
          tone: "neutral",
        },
        {
          date: "28/02",
          label: "Thứ Hai",
          cung: "Mệnh (Ngọ)",
          stars: ["Lưu Thái Tuế", "Kình Dương"],
          summary:
            "Hạn quay về cung Mệnh — năng lượng rất mạnh nhưng đầy áp lực. Dễ nóng nảy và phải đối mặt với thử thách đòi hỏi quyết đoán cao.",
          advice:
            "Giữ bình tĩnh là chìa khóa. Tránh xung đột không cần thiết, đặc biệt với những người có thẩm quyền.",
          tone: "caution",
        },
      ],
    },
  ],
  weekSummary:
    "Tuần này đan xen mạnh giữa cơ hội tài chính (đầu tuần) và khẳng định bản thân (giữa và cuối tuần). Năm Thái Tuế tại Mệnh — mọi hành động cần dựa trên điềm tĩnh và tu thân để biến hung thành cát.",
  weekAdvice:
    "Ngày 24 và 28 là hai điểm cần canh chừng nhất. Ưu tiên kiểm soát cảm xúc và tránh quyết định tài chính vội vàng.",
};

// ─── Main content ──────────────────────────────────────────────────────────────

export const vanHanContent: VanHanContent = {
  title: "Vận hạn",
  intro:
    "Vận hạn là lớp diễn tiến thời gian chồng lên lá số gốc, gồm Đại hạn, Tiểu hạn, Nguyệt hạn và Nhật hạn. Tài liệu này gom lại logic tính, quy tắc an sao lưu và các điểm cần cảnh báo khi luận hạn.",
  apiPath: "/api/vanhan",
  overview: {
    title: "4 tầng chu kỳ thời gian",
    levels: [
      { level: "Đại hạn", cycle: "10 năm / cung", unit: "Cục số + chiều đi" },
      { level: "Tiểu hạn", cycle: "1 năm / cung", unit: "Địa chi năm sinh" },
      { level: "Nguyệt hạn", cycle: "1 tháng / cung", unit: "Từ vị trí Tiểu hạn" },
      { level: "Nhật hạn", cycle: "1 ngày / cung", unit: "Từ giờ Tý đếm thuận" },
    ],
  },
  sections: [
    {
      id: "dai-han",
      title: "1. Đại hạn",
      summary:
        "Đại hạn là chu kỳ 10 năm, lấy Cung Mệnh làm điểm khởi, tuổi bắt đầu bằng Cục số và chiều đi phụ thuộc âm dương năm sinh kết hợp giới tính.",
      cards: [
        { label: "Thủy nhị cục", value: "Bắt đầu từ 2 tuổi" },
        { label: "Mộc tam cục", value: "Bắt đầu từ 3 tuổi" },
        { label: "Kim tứ cục", value: "Bắt đầu từ 4 tuổi" },
        { label: "Thổ ngũ cục", value: "Bắt đầu từ 5 tuổi" },
        { label: "Hỏa lục cục", value: "Bắt đầu từ 6 tuổi" },
      ],
      bulletGroups: [
        {
          title: "Chiều đi",
          items: [
            { text: "Dương Nam hoặc Âm Nữ: đi thuận chiều Tý -> Sửu -> Dần..." },
            { text: "Âm Nam hoặc Dương Nữ: đi nghịch chiều Tý -> Hợi -> Tuất..." },
          ],
        },
        {
          title: "Can dương và can âm",
          items: [
            { text: "Can dương: Giáp, Bính, Mậu, Canh, Nhâm" },
            { text: "Can âm: Ất, Đinh, Kỷ, Tân, Quý" },
          ],
        },
      ],
      codeExamples: [
        {
          language: "text",
          title: "Khoảng tuổi theo từng đại hạn",
          code: [
            "Đại hạn 1: cuc_so -> cuc_so + 9",
            "Đại hạn 2: cuc_so + 10 -> cuc_so + 19",
            "Đại hạn n: cuc_so + (n - 1) * 10 -> cuc_so + (n - 1) * 10 + 9",
          ].join("\n"),
        },
      ],
    },
    {
      id: "tieu-han",
      title: "2. Tiểu hạn",
      summary:
        "Tiểu hạn là chu kỳ 1 năm. Cung khởi được xác định từ địa chi năm sinh, sau đó đi thuận với nam và nghịch với nữ để suy ra vị trí từng năm tuổi âm lịch.",
      tables: [
        {
          title: "Khởi cung theo chi năm sinh",
          rows: [
            { key: "Dần, Ngọ, Tuất", value: "Khởi cung Thìn (index 5)" },
            { key: "Thân, Tý, Thìn", value: "Khởi cung Dần (index 3)" },
            { key: "Tỵ, Dậu, Sửu", value: "Khởi cung Tuất (index 9)" },
            { key: "Hợi, Mão, Mùi", value: "Khởi cung Thân (index 7)" },
          ],
        },
        {
          title: "Case kiểm tra getTieuHanCung()",
          rows: tieuHanCases.map((testCase) => ({
            key: testCase.key,
            value: `${getCungLabel(testCase.index)} (index ${testCase.index})`,
          })),
        },
      ],
      bulletGroups: [
        {
          title: "Chiều đi Tiểu hạn",
          items: [
            { text: "Nam: đi thuận chiều." },
            { text: "Nữ: đi nghịch chiều." },
          ],
        },
        {
          title: "Quy ước DiaChi enum",
          items: [
            { text: "Ty = Tý (Rat)." },
            { text: "Ti = Tỵ (Snake)." },
            { text: "TIEU_HAN_START dùng đúng convention này, không hoán đổi Ty/Ti." },
          ],
        },
      ],
      codeExamples: [
        {
          language: "ts",
          title: "Bảng khởi cung",
          code: [
            "const TIEU_HAN_START: Record<DiaChi, number> = {",
            `  Dan: ${TIEU_HAN_START.Dan}, Ngo: ${TIEU_HAN_START.Ngo}, Tuat: ${TIEU_HAN_START.Tuat},`,
            `  Than: ${TIEU_HAN_START.Than}, Ty: ${TIEU_HAN_START.Ty}, Thin: ${TIEU_HAN_START.Thin},`,
            `  Ti: ${TIEU_HAN_START.Ti}, Dau: ${TIEU_HAN_START.Dau}, Suu: ${TIEU_HAN_START.Suu},`,
            `  Hoi: ${TIEU_HAN_START.Hoi}, Mao: ${TIEU_HAN_START.Mao}, Mui: ${TIEU_HAN_START.Mui},`,
            "};",
          ].join("\n"),
        },
        {
          language: "ts",
          title: "Xác định cung Tiểu hạn theo tuổi",
          code: [
            "function getTieuHanCung(",
            "  chiNamSinh: DiaChi,",
            "  gioiTinh: 'nam' | 'nu',",
            "  tuoiAmLich: number",
            "): number {",
            "  const startCung = TIEU_HAN_START[chiNamSinh];",
            "  const offset = tuoiAmLich - 1;",
            "  if (gioiTinh === 'nam') {",
            "    return ((startCung - 1 + offset) % 12) + 1;",
            "  }",
            "  return ((startCung - 1 - offset + 1200) % 12) + 1;",
            "}",
          ].join("\n"),
        },
      ],
    },
    {
      id: "nguyet-han",
      title: "3. Nguyệt hạn",
      summary:
        "Nguyệt hạn lấy tháng Giêng làm mốc xuất phát tại chính cung Tiểu hạn. Từ đó nam đi thuận, nữ đi nghịch, mỗi tháng dịch một cung và vẫn giữ convention index 1-based.",
      bulletGroups: [
        {
          title: "Quy tắc khởi cung",
          items: [
            { text: "Tháng Giêng khởi từ cung Tiểu hạn." },
            { text: "Nam: tháng 2 đi thuận 1 cung, tiếp tục cho đến tháng 12." },
            { text: "Nữ: tháng 2 đi nghịch 1 cung, tiếp tục cho đến tháng 12." },
          ],
        },
      ],
      codeExamples: [
        {
          language: "ts",
          title: "Xác định cung Nguyệt hạn",
          code: [
            "function getNguyetHanCung(",
            "  tieuHanCung: number,",
            "  gioiTinh: 'nam' | 'nu',",
            "  thangAmLich: number",
            "): number {",
            "  const offset = thangAmLich - 1;",
            "  if (gioiTinh === 'nam') {",
            "    return ((tieuHanCung - 1 + offset) % 12) + 1;",
            "  }",
            "  return ((tieuHanCung - 1 - offset + 1200) % 12) + 1;",
            "}",
          ].join("\n"),
        },
        {
          language: "text",
          title: "Ví dụ tháng Giêng",
          code: `tieuHanCung = 5 -> thang 1 (nam) = ${nguyetHanExampleIndex} (${getCungLabel(nguyetHanExampleIndex)})`,
        },
      ],
    },
    {
      id: "tuoi-am-lich",
      title: "4. Tuổi âm lịch",
      summary:
        "Luôn tính tuổi âm lịch theo tuổi mụ trước khi xác định Đại hạn, Tiểu hạn hay Nguyệt hạn. Phần đổi năm âm lịch phải dùng tyme4ts để xử lý đúng ranh giới năm, không tự suy luận thủ công.",
      bulletGroups: [
        {
          title: "Quy tắc",
          items: [
            { text: "Tuổi âm lịch (tuổi mụ) = năm âm lịch hiện tại - năm âm lịch sinh + 1." },
            { text: "Ví dụ: sinh năm Giáp Tý, xem năm Bính Dần -> tuổi mụ = 3." },
            { text: "Dùng tyme4ts để convert năm âm lịch từ ngày dương lịch tương ứng." },
          ],
        },
      ],
      codeExamples: [
        {
          language: "ts",
          title: "Tính tuổi âm lịch bằng tyme4ts",
          code: [
            "import { SolarDay } from 'tyme4ts';",
            "",
            "function getTuoiAmLich(birthDate: string, referenceDate: string): number {",
            "  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number);",
            "  const [refYear, refMonth, refDay] = referenceDate.split('-').map(Number);",
            "  const birthLunarYear = SolarDay.fromYmd(birthYear, birthMonth, birthDay)",
            "    .getLunarDay().getLunarMonth().getLunarYear().getYear();",
            "  const refLunarYear = SolarDay.fromYmd(refYear, refMonth, refDay)",
            "    .getLunarDay().getLunarMonth().getLunarYear().getYear();",
            "  return refLunarYear - birthLunarYear + 1;",
            "}",
          ].join("\n"),
        },
      ],
    },
    {
      id: "luu-sao",
      title: "5. Lưu sao theo năm xem hạn",
      summary:
        "Mỗi năm xem hạn cần an thêm các sao lưu động để phản ánh biến động của năm đang xét. Đây là lớp dữ liệu không cố định trong lá số gốc.",
      codeExamples: [
        {
          language: "ts",
          title: "Cấu trúc lưu sao",
          code: [
            "interface LuuSao {",
            "  luuThaiTue: number;",
            "  luuTangMon: number;",
            "  luuBachHo: number;",
            "  luuThienMa: number;",
            "  luuLocTon: number;",
            "  luuKinhDuong: number;",
            "  luuDaLa: number;",
            "}",
          ].join("\n"),
        },
      ],
      tables: [
        {
          title: "Lưu Thiên Mã theo chi năm xem hạn",
          rows: [
            { key: "Dần, Ngọ, Tuất", value: "An tại cung Thân" },
            { key: "Thân, Tý, Thìn", value: "An tại cung Dần" },
            { key: "Tỵ, Dậu, Sửu", value: "An tại cung Hợi" },
            { key: "Hợi, Mão, Mùi", value: "An tại cung Tỵ" },
          ],
        },
        {
          title: "Lưu Lộc Tồn theo can năm xem hạn",
          rows: [
            { key: "Giáp", value: "Cung Dần" },
            { key: "Ất", value: "Cung Mão" },
            { key: "Bính, Mậu", value: "Cung Tỵ" },
            { key: "Đinh, Kỷ", value: "Cung Ngọ" },
            { key: "Canh", value: "Cung Thân" },
            { key: "Tân", value: "Cung Dậu" },
            { key: "Nhâm", value: "Cung Hợi" },
            { key: "Quý", value: "Cung Tý" },
          ],
        },
      ],
      bulletGroups: [
        {
          title: "Quy tắc đáng chú ý",
          items: [
            { text: "Lưu Thái Tuế nằm tại cung có địa chi trùng năm xem hạn." },
            { text: "Lưu Tang Môn = Lưu Thái Tuế + 2 theo chiều thuận." },
            { text: "Lưu Bạch Hổ = Lưu Thái Tuế + 8 theo chiều thuận." },
            { text: "Lưu Kình Dương = Lưu Lộc Tồn + 1, Lưu Đà La = Lưu Lộc Tồn - 1." },
          ],
        },
      ],
    },
    {
      id: "danh-gia",
      title: "6. Logic luận đoán",
      summary:
        "Luận hạn cần đọc đồng thời ngũ hành cung hạn, cát hung tinh, mức độ trùng phùng của Đại hạn và Tiểu hạn, cùng các tổ hợp sao đặc trưng.",
      codeExamples: [
        {
          language: "ts",
          title: "Đánh giá tương sinh tương khắc",
          code: [
            "function danhGiaHanh(",
            "  menhHanh: NguHanh,",
            "  hanhHan: NguHanh",
            "):",
            "  | 'han_sinh_menh'",
            "  | 'menh_sinh_han'",
            "  | 'han_khac_menh'",
            "  | 'menh_khac_han'",
            "  | 'binh_hoa' {",
            "  // Sinh: Kim->Thuy->Moc->Hoa->Tho->Kim",
            "  // Khac: Kim->Moc, Moc->Tho, Tho->Thuy, Thuy->Hoa, Hoa->Kim",
            "}",
          ].join("\n"),
        },
      ],
      bulletGroups: [
        {
          title: "Phân loại ngũ hành",
          items: [
            { text: "Hạn sinh Mệnh: hành hạn sinh cho hành Mệnh." },
            { text: "Mệnh sinh hạn: bản Mệnh tiết khí cho hành hạn." },
            { text: "Hạn khắc Mệnh: hành hạn khắc trực tiếp bản Mệnh." },
            { text: "Mệnh khắc hạn: bản Mệnh chế ngự hành hạn." },
            { text: "Bình hòa: cùng hành hoặc không rơi vào 4 quan hệ trên." },
          ],
        },
        {
          title: "Mức độ hạn",
          items: [
            { text: "Hạn tốt: Đại hạn sáng, có cát tinh; Tiểu hạn xấu vẫn có thể được hóa giải." },
            { text: "Hạn xấu thường: gặp hung tinh hãm địa như Kình, Đà, Hỏa, Linh, Không, Kiếp." },
            { text: "Hạn nặng: Đại hạn và Tiểu hạn trùng cung, kèm Tuyệt, Tử, Mộ hoặc bộ Sát Phá Tham xấu." },
            { text: "Tăng cảnh báo khi Lưu Tang Môn, Lưu Bạch Hổ nhập Mệnh hoặc Thân." },
          ],
        },
        {
          title: "Tổ hợp sao đặc trưng",
          items: [
            { text: "Thái Âm sáng + cát tinh: hỷ sự, tài lộc, mua bất động sản." },
            { text: "Liêm Trinh + Hồng Đào: nhấn mạnh hôn nhân và tình cảm." },
            { text: "Thất Sát mờ + Hình hoặc Quan Phủ: lưu ý tai nạn, pháp lý." },
            { text: "Tử Vi + Tam Không hoặc Kỵ: dễ bệnh tật, tổn tài." },
            { text: "Lưu Thiên Mã: dịch chuyển, thay đổi công việc." },
            { text: "Lưu Thiên Khốc + Thiên Hư: thiên về tang sự hoặc u buồn." },
          ],
        },
      ],
    },
  ],
  pipeline: [
    "Input: ngày sinh, tháng sinh, năm sinh, giờ sinh, giới tính, năm xem hạn.",
    "Bước 1: dùng tyme4ts đổi sang năm âm lịch và tính tuổi mụ tại năm xem hạn.",
    "Bước 2: xác định Đại hạn hiện tại theo Cục số, âm dương năm sinh và giới tính.",
    "Bước 3: xác định Tiểu hạn bằng chi năm sinh, giới tính và tuổi âm lịch.",
    "Bước 4: xác định Nguyệt hạn từ cung Tiểu hạn, tháng âm lịch và giới tính.",
    "Bước 5: an các lưu sao như Lưu Thái Tuế, Lưu Thiên Mã, Lưu Lộc Tồn.",
    "Bước 6: đánh giá tương tác ngũ hành, cát hung tinh và khả năng trùng phùng.",
    "Bước 7: sinh output gồm đại hạn, tiểu hạn, nguyệt hạn, lưu sao, đánh giá và cảnh báo.",
  ],
  commonMistakes: [
    "Quên đổi tuổi dương sang tuổi âm lịch trước khi tính Đại hạn và Tiểu hạn.",
    "Nhầm convention DiaChi giữa Ty (Tý) và Ti (Tỵ).",
    "Nhầm chiều đi thuận hoặc nghịch theo giới tính ở Tiểu hạn và Nguyệt hạn.",
    "Không an lưu sao nên bỏ sót biến động của năm đang xem.",
    "Chỉ nhìn Tiểu hạn mà bỏ qua Đại hạn, trong khi Đại hạn là khung quyết định.",
  ],
  notes: [
    "Convention toàn bộ module vận hạn: Ty = Tý, Ti = Tỵ.",
    "Index cung luôn dùng hệ 1-based: Tý = 1 ... Hợi = 12.",
    "Nội dung này hiện là đặc tả logic và quy tắc nghiệp vụ, chưa phải engine vận hạn hoàn chỉnh.",
  ],
  prediction,
};

export function getVanHanContent(): VanHanContent {
  return vanHanContent;
}