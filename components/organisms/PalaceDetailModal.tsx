"use client";

import type { TuViPalace, TuViStar } from "@/lib/bazi/types";
import { getBranchLabel, getPalaceLabel, getStarLabel, QUALITY_COLORS, QUALITY_LABELS } from "@/lib/bazi/display";
import StarDetailRow from "@/components/molecules/StarDetailRow";

interface Props {
  palace: TuViPalace;
  onClose: () => void;
}

export default function PalaceDetailModal({ palace, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6 space-y-5"
        style={{ background: "rgba(23,31,51,0.97)", boxShadow: "0 32px 64px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-outline font-medium">{getBranchLabel(palace.branch)}</span>
              {palace.isLifePalace && (
                <span className="text-[9px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">Mệnh</span>
              )}
              {palace.isBodyPalace && (
                <span className="text-[9px] font-black uppercase tracking-wider text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">Thân</span>
              )}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-on-surface">
              Cung {getPalaceLabel(palace.name)}
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{palace.note}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">Chính tinh</h3>
          </div>
          {palace.majorStars.length > 0 ? (
            <div className="space-y-2">
              {palace.majorStars.map((star) => (
                <StarDetailRow key={star.name} star={star} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-outline/60 italic px-2">Vô chính diệu — cần xét phụ tinh và tam hợp.</p>
          )}
        </div>

        {palace.minorStars.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
              <h3 className="text-xs font-black uppercase tracking-widest text-secondary">
                Phụ tinh Bắc Tông ({palace.minorStars.length})
              </h3>
            </div>
            <div className="space-y-2">
              {palace.minorStars.map((star) => (
                <StarDetailRow key={star.name} star={star} isMinor />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
