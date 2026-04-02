import type { TuViEngineResult } from "@/lib/bazi/types";
import LapLaSoMiniChart from "@/components/organisms/LapLaSoMiniChart";
import LapLaSoVanHanCard from "@/components/organisms/LapLaSoVanHanCard";
import { getPalaceLabel } from "@/lib/bazi/display";

interface LapLaSoDetailProps {
  result: TuViEngineResult;
  onReset: () => void;
}

export default function LapLaSoDetail({ result, onReset }: LapLaSoDetailProps) {
  const today = new Date().toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="col-span-12 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-on-surface">
            Chào, {result.profile.fullName || "bạn"}!
          </h1>
          <p className="text-on-surface-variant/80 font-light max-w-xl">
            Lá số đã được an định. Hãy khám phá các cung, sao và vận hạn của bạn bên dưới.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[0.6875rem] tracking-widest uppercase text-outline">
            <span className="material-symbols-outlined text-primary-fixed-dim text-sm">calendar_today</span>
            <span>{today}</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Lập lại
          </button>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "1.75rem",
        }}
      >
        <LapLaSoMiniChart result={result} />
        <LapLaSoVanHanCard result={result} />

        <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-surface-container-low rounded-xl p-8 relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="material-symbols-outlined text-primary mb-4 block text-3xl">format_quote</span>
              <h3 className="text-xl font-medium italic leading-relaxed text-on-surface mb-6">
                &ldquo;Mệnh tốt không bằng thân tốt, thân tốt không bằng vận tốt.&rdquo;
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-outline-variant" />
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Góc kiến thức</span>
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="col-span-12 md:col-span-6 lg:col-span-7 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl p-8 flex items-center justify-between group cursor-pointer text-left hover:from-surface-container-high hover:to-surface-bright transition-all"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2 text-on-surface">Sẵn sàng khám phá vận mệnh mới?</h3>
            <p className="text-on-surface-variant max-w-sm text-sm">
              Lập lá số mới để xem lại Mệnh, Thân cư {getPalaceLabel(result.overview.thanPalace)} và nhịp vận hạn của bạn.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary elev-glow group-hover:scale-110 transition-transform flex-shrink-0 ml-6">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
        </button>
      </div>
    </div>
  );
}
