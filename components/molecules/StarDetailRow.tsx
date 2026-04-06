import type { TuViStar } from "@/lib/bazi/types";
import { QUALITY_COLORS, QUALITY_LABELS, getElementLabel, getStarLabel } from "@/lib/bazi/display";
import { PHU_TINH_DETAIL } from "@/lib/bazi/phuTinhDocs";

export const MAJOR_STAR_DESC: Record<string, string> = {
  "Tu Vi": "Tử Vi là đế tinh, đứng đầu 14 chính tinh. Chủ về quyền lực, tôn quý và khả năng lãnh đạo.",
  "Thien Co": "Thiên Cơ là mưu thần, chủ về trí tuệ, sự khéo léo và biến hóa.",
  "Thai Duong": "Thái Dương là mặt trời, chủ về danh tiếng, sự nghiệp và ánh sáng.",
  "Vu Khuc": "Vũ Khúc là tài tinh, chủ về tiền bạc, kinh doanh và sự quyết đoán.",
  "Thien Dong": "Thiên Đồng chủ về phúc thọ, sự hưởng thụ và tính cách hiền lành.",
  "Liem Trinh": "Liêm Trinh là quan tinh, chủ về pháp luật, kỷ luật và sự nghiêm khắc.",
  "Thien Phu": "Thiên Phủ là lộc khố, chủ về sự giàu có, ổn định và lòng bao dung.",
  "Thai Am": "Thái Âm là mặt trăng, chủ về tình cảm, gia đình và sự nhạy cảm.",
  "Tham Lang": "Tham Lang chủ về ham muốn, tài năng đa dạng và sự hấp dẫn.",
  "Cu Mon": "Cự Môn chủ về thị phi, tranh luận và khả năng ngôn ngữ.",
  "Thien Tuong": "Thiên Tướng là ấn tinh, chủ về sự hỗ trợ, bảo vệ và tính nguyên tắc.",
  "Thien Luong": "Thiên Lương chủ về đạo đức, y học và sự bảo hộ.",
  "That Sat": "Thất Sát là tướng quân, chủ về uy dũng, quyết đoán và sự thay đổi đột phá.",
  "Pha Quan": "Phá Quân chủ về sự phá vỡ, cải cách và tinh thần tiên phong.",
};

interface Props {
  star: TuViStar;
  isMinor?: boolean;
  showDesc?: boolean;
}

export default function StarDetailRow({ star, isMinor = false, showDesc = true }: Props) {
  const desc = isMinor ? PHU_TINH_DETAIL[star.name] : MAJOR_STAR_DESC[star.name];

  return (
    <div className="glass-border-panel-soft space-y-2 rounded-xl p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-sm font-bold ${QUALITY_COLORS[star.quality]}`}>
            {getStarLabel(star.name)}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${QUALITY_COLORS[star.quality]} bg-current/10`}
          >
            {QUALITY_LABELS[star.quality]}
          </span>
        </div>
        <span className="glass-border-panel-soft shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-outline">
          {getElementLabel(star.element)}
        </span>
      </div>
      {showDesc && desc ? (
        <p className="border-t border-outline-variant/10 pt-2 text-xs leading-relaxed text-on-surface-variant">
          {desc}
        </p>
      ) : null}
      {showDesc && isMinor && !desc ? (
        <p className="pt-1 text-[11px] italic text-outline/70">
          Phụ tinh Bắc Tông — xem thêm trong toàn lá và đại vận.
        </p>
      ) : null}
    </div>
  );
}
