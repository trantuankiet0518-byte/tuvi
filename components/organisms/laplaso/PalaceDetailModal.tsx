"use client";

import Icon from "@/components/atoms/Icon";
import StarDetailRow from "@/components/molecules/StarDetailRow";
import { getBranchLabel, getPalaceLabel } from "@/lib/bazi/display";
import {
  PHU_TINH_GROUP,
  PHU_TINH_GROUP_LABEL,
  PHU_TINH_GROUP_ORDER,
} from "@/lib/bazi/phuTinhDocs";
import type { TuViPalace, TuViStar } from "@/lib/bazi/types";

interface Props {
  palace: TuViPalace;
  onClose: () => void;
}

function groupMinorStars(stars: TuViStar[]): { key: (typeof PHU_TINH_GROUP_ORDER)[number]; stars: TuViStar[] }[] {
  const buckets = new Map<(typeof PHU_TINH_GROUP_ORDER)[number], TuViStar[]>();

  for (const star of stars) {
    const groupKey = PHU_TINH_GROUP[star.name] ?? "khac";
    if (!buckets.has(groupKey)) buckets.set(groupKey, []);
    buckets.get(groupKey)!.push(star);
  }

  return PHU_TINH_GROUP_ORDER.filter((key) => buckets.has(key)).map((key) => ({
    key,
    stars: (buckets.get(key) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

export default function PalaceDetailModal({ palace, onClose }: Props) {
  const minorGroups = groupMinorStars(palace.minorStars);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="glass-border-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 scrollbar-thin space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="glass-border-panel-soft absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <Icon name="close" className="text-lg" />
        </button>

        <div className="flex items-start gap-4 pr-8">
          <div className="flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-outline">{getBranchLabel(palace.branch)}</span>
              {palace.isLifePalace ? (
                <span className="glass-border-panel-soft rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary">
                  Mệnh
                </span>
              ) : null}
              {palace.isBodyPalace ? (
                <span className="glass-border-panel-soft rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-tertiary">
                  Thân
                </span>
              ) : null}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-on-surface">
              Cung {getPalaceLabel(palace.name)}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{palace.note}</p>
            <p className="mt-2 text-[10px] leading-relaxed text-primary/80">
              Giải thích dưới đây theo hệ Bắc Tông. Phụ tinh cần luận kèm chính tinh, cục và đại tiểu hạn, không nên
              kết luận đơn lẻ một sao.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Icon name="stars" className="text-primary text-sm" />
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">Chính tinh</h3>
          </div>
          {palace.majorStars.length > 0 ? (
            <div className="space-y-2">
              {palace.majorStars.map((star) => (
                <StarDetailRow key={star.name} star={star} />
              ))}
            </div>
          ) : (
            <p className="px-2 text-xs italic text-outline/60">Vô chính diệu — cần xét phụ tinh và tam hợp.</p>
          )}
        </div>

        {palace.minorStars.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Icon name="auto_awesome" className="text-secondary text-sm" />
              <h3 className="text-xs font-black uppercase tracking-widest text-secondary">
                Phụ tinh Bắc Tông ({palace.minorStars.length})
              </h3>
            </div>

            {minorGroups.map(({ key, stars }) => (
              <section key={key} className="space-y-3">
                <h4 className="border-b border-outline-variant/20 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
                  {PHU_TINH_GROUP_LABEL[key]}
                </h4>
                <div className="space-y-2">
                  {stars.map((star) => (
                    <StarDetailRow key={`${key}-${star.name}`} star={star} isMinor />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
