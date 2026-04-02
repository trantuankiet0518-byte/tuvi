import type { TuViStar } from "@/lib/bazi/types";
import { QUALITY_COLORS, QUALITY_LABELS, getStarLabel, getElementLabel } from "@/lib/bazi/display";

// Mô tả chính tinh
export const MAJOR_STAR_DESC: Record<string, string> = {
  "Tu Vi":       "Tử Vi là đế tinh, đứng đầu 14 chính tinh. Chủ về quyền lực, tôn quý và khả năng lãnh đạo.",
  "Thien Co":    "Thiên Cơ là mưu thần, chủ về trí tuệ, sự khéo léo và biến hóa.",
  "Thai Duong":  "Thái Dương là mặt trời, chủ về danh tiếng, sự nghiệp và ánh sáng.",
  "Vu Khuc":     "Vũ Khúc là tài tinh, chủ về tiền bạc, kinh doanh và sự quyết đoán.",
  "Thien Dong":  "Thiên Đồng chủ về phúc thọ, sự hưởng thụ và tính cách hiền lành.",
  "Liem Trinh":  "Liêm Trinh là quan tinh, chủ về pháp luật, kỷ luật và sự nghiêm khắc.",
  "Thien Phu":   "Thiên Phủ là lộc khố, chủ về sự giàu có, ổn định và lòng bao dung.",
  "Thai Am":     "Thái Âm là mặt trăng, chủ về tình cảm, gia đình và sự nhạy cảm.",
  "Tham Lang":   "Tham Lang chủ về ham muốn, tài năng đa dạng và sự hấp dẫn.",
  "Cu Mon":      "Cự Môn chủ về thị phi, tranh luận và khả năng ngôn ngữ.",
  "Thien Tuong": "Thiên Tướng là ấn tinh, chủ về sự hỗ trợ, bảo vệ và tính nguyên tắc.",
  "Thien Luong": "Thiên Lương chủ về đạo đức, y học và sự bảo hộ.",
  "That Sat":    "Thất Sát là tướng quân, chủ về uy dũng, quyết đoán và sự thay đổi đột phá.",
  "Pha Quan":    "Phá Quân chủ về sự phá vỡ, cải cách và tinh thần tiên phong.",
};

// Mô tả phụ tinh
export const MINOR_STAR_DESC: Record<string, string> = {
  "Loc Ton":    "Lộc Tồn chủ về tài lộc bền vững, sức khỏe và sự ổn định.",
  "Kinh Duong": "Kình Dương mang tính sát phạt, xung đột và tranh đấu.",
  "Da La":      "Đà La chủ về trì trệ, vướng bận và những trở ngại âm thầm.",
  "Thien Khoi": "Thiên Khôi là quý nhân nam, chủ về sự giúp đỡ từ người có địa vị cao.",
  "Thien Viet": "Thiên Việt là quý nhân nữ, thiên về quý nhân nữ giới và sự hỗ trợ.",
  "Van Xuong":  "Văn Xương chủ về học vấn, văn chương, thi cử và danh tiếng.",
  "Van Khuc":   "Văn Khúc chủ về tài năng nghệ thuật, âm nhạc và các kỹ năng mềm.",
  "Ta Phu":     "Tả Phù chủ về sự hỗ trợ từ cấp trên, đồng nghiệp và người xung quanh.",
  "Huu Bat":    "Hữu Bật tương tự Tả Phù, chủ về sự giúp đỡ và hỗ trợ.",
  "Thien Ma":   "Thiên Mã chủ về sự di chuyển, thay đổi và năng động.",
  "Hoa Loc":    "Hóa Lộc là sao tứ hóa cát nhất, chủ về tài lộc, may mắn và sự phát triển.",
  "Hoa Quyen":  "Hóa Quyền chủ về quyền lực, địa vị và sự kiểm soát.",
  "Hoa Khoa":   "Hóa Khoa chủ về danh tiếng, học vấn và sự công nhận từ xã hội.",
  "Hoa Ky":     "Hóa Kỵ là sao tứ hóa hung nhất, chủ về trở ngại, thị phi.",
  "Dia Khong":  "Địa Không chủ về sự hao tán, mất mát và những điều không thực tế.",
  "Dia Kiep":   "Địa Kiếp chủ về tai họa bất ngờ và sự mất mát đột ngột.",
  "Hoa Tinh":   "Hỏa Tinh mang tính nóng nảy, xung đột và tai nạn.",
  "Linh Tinh":  "Linh Tinh chủ về những tai họa không lường trước được.",
};

interface Props {
  star: TuViStar;
  isMinor?: boolean;
  showDesc?: boolean;
}

export default function StarDetailRow({ star, isMinor = false, showDesc = true }: Props) {
  const desc = isMinor ? MINOR_STAR_DESC[star.name] : MAJOR_STAR_DESC[star.name];

  return (
    <div className="rounded-xl bg-surface-container-low p-4 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${QUALITY_COLORS[star.quality]}`}>
            {getStarLabel(star.name)}
          </span>
          <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${QUALITY_COLORS[star.quality]} bg-current/10`}>
            {QUALITY_LABELS[star.quality]}
          </span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-outline bg-surface-container-high px-2 py-0.5 rounded-full">
          {getElementLabel(star.element)}
        </span>
      </div>
      {showDesc && desc && (
        <p className="text-xs text-on-surface-variant leading-relaxed">{desc}</p>
      )}
    </div>
  );
}
