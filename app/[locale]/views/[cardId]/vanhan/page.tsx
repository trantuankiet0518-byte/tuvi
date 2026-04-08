"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import Icon from "@/components/atoms/Icon";
import { Link } from "@/i18n/navigation";
import { getBranchLabel, getPalaceLabel, getStarLabel } from "@/lib/bazi/display";
import { predictVanHan, type VanHanPrediction } from "@/lib/vanhan_predict";
import { readSavedCharts, type SavedChart } from "@/lib/services/savedCharts";

const ELEMENT_SUPPORTS: Record<string, string> = {
  Kim: "Thuy",
  Thuy: "Moc",
  Moc: "Hoa",
  Hoa: "Tho",
  Tho: "Kim",
};

const ELEMENT_CONTROLS: Record<string, string> = {
  Kim: "Moc",
  Moc: "Tho",
  Tho: "Thuy",
  Thuy: "Hoa",
  Hoa: "Kim",
};

function toneForStatus(status: string) {
  if (status === "Khởi Sắc") {
    return {
      badge: "bg-primary/15 text-primary border-primary/20",
      panel: "border-primary/15 bg-primary/5",
      icon: "trending_up",
      title: "Đây là giai đoạn nên chủ động hơn một nhịp.",
    };
  }

  if (status === "Cẩn Trọng") {
    return {
      badge: "bg-error/15 text-error border-error/20",
      panel: "border-error/15 bg-error/5",
      icon: "warning",
      title: "Giai đoạn này nên giữ tay và tránh quyết định nóng.",
    };
  }

  return {
    badge: "bg-surface-container-low text-on-surface border-outline-variant/20",
    panel: "border-outline-variant/15 bg-surface-container-low/20",
    icon: "balance",
    title: "Nhịp hiện tại thiên về ổn định và giữ đều kế hoạch.",
  };
}

function ChipGroup({
  title,
  items,
  emptyText,
  tone = "default",
}: {
  title: string;
  items: string[];
  emptyText: string;
  tone?: "default" | "positive" | "warning";
}) {
  const toneClasses =
    tone === "positive"
      ? "border-primary/15 bg-primary/10 text-primary"
      : tone === "warning"
        ? "border-error/15 bg-error/10 text-error"
        : "border-outline-variant/15 bg-surface-container-low/20 text-on-surface";

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">{title}</p>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${toneClasses}`}>
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-7 text-on-surface-variant">{emptyText}</p>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="ui-panel-soft rounded-[1.75rem] p-5">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">{label}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-on-surface">{value}</p>
      <p className="mt-2 text-sm leading-7 text-on-surface-variant">{subtext}</p>
    </div>
  );
}

function getElementRelation(baseElement?: string, targetElement?: string) {
  if (!baseElement || !targetElement) {
    return {
      label: "Chưa đủ dữ liệu",
      desc: "Lá số hiện chưa đủ dữ liệu ngũ hành để kết luận chính xác tương quan sinh khắc.",
    };
  }

  if (baseElement === targetElement) {
    return {
      label: "Bình hòa",
      desc: `Hành cung Mệnh (${baseElement}) và hành cung hạn (${targetElement}) cùng hành, thiên về giữ ổn định và tích lũy.`,
    };
  }

  if (ELEMENT_SUPPORTS[targetElement] === baseElement) {
    return {
      label: "Hạn sinh Mệnh",
      desc: `Hành cung hạn (${targetElement}) sinh cho hành cung Mệnh (${baseElement}), thường thuận hơn khi triển khai kế hoạch.`,
    };
  }

  if (ELEMENT_SUPPORTS[baseElement] === targetElement) {
    return {
      label: "Mệnh sinh Hạn",
      desc: `Hành cung Mệnh (${baseElement}) sinh cho hành cung hạn (${targetElement}), thường phải bỏ công sức và hao lực nhiều hơn mới có kết quả.`,
    };
  }

  if (ELEMENT_CONTROLS[targetElement] === baseElement) {
    return {
      label: "Hạn khắc Mệnh",
      desc: `Hành cung hạn (${targetElement}) khắc hành cung Mệnh (${baseElement}), nên tăng biên độ an toàn trong quyết định quan trọng.`,
    };
  }

  if (ELEMENT_CONTROLS[baseElement] === targetElement) {
    return {
      label: "Mệnh khắc Hạn",
      desc: `Hành cung Mệnh (${baseElement}) khắc hành cung hạn (${targetElement}), có khả năng kiểm soát tình hình nhưng dễ mệt và phải gồng.`,
    };
  }

  return {
    label: "Đang giao hội",
    desc: `Hành cung Mệnh (${baseElement}) và hành cung hạn (${targetElement}) đang tạo quan hệ phối hợp cần theo dõi thêm.`,
  };
}

export default function VanHanDynamicPage() {
  const params = useParams();
  const cardId = params.cardId as string;
  const [targetDate, setTargetDate] = useState("");
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const effectiveTargetDate = useMemo(() => {
    if (!isHydrated) {
      return "";
    }

    return targetDate || new Date().toISOString().split("T")[0];
  }, [isHydrated, targetDate]);

  const chart = useMemo<SavedChart | null>(() => {
    if (!isHydrated) {
      return null;
    }

    const saved = readSavedCharts();
    return saved.find((item) => item.id === cardId) ?? null;
  }, [cardId, isHydrated]);

  const prediction = useMemo<VanHanPrediction | null>(() => {
    if (!chart || !effectiveTargetDate) {
      return null;
    }

    return predictVanHan(chart.result, effectiveTargetDate);
  }, [chart, effectiveTargetDate]);

  const handleDownloadPdf = useCallback(() => {
    if (!chart || !prediction || typeof window === "undefined") {
      return;
    }

    const reportWindow = window.open("", "_blank", "noopener,noreferrer,width=960,height=1280");
    if (!reportWindow) {
      return;
    }

    const reportHtml = `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <title>Bao cao van han - ${chart.result.profile.fullName}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #161616; margin: 40px; line-height: 1.6; }
      h1, h2, h3 { margin: 0 0 12px; }
      h1 { font-size: 28px; }
      h2 { font-size: 18px; margin-top: 28px; }
      p { margin: 0 0 10px; }
      .muted { color: #5f5f5f; }
      .card { border: 1px solid #ddd; border-radius: 14px; padding: 16px; margin-top: 12px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      ul { margin: 8px 0 0 18px; }
      @media print {
        body { margin: 24px; }
      }
    </style>
  </head>
  <body>
    <h1>Du doan van han</h1>
    <p class="muted">${chart.result.profile.fullName} • ${chart.result.profile.solarDateTime}</p>
    <p class="muted">Ngay xem: ${prediction.nhatHan.date} | Am lich: ${prediction.context.lunarDate.day}/${prediction.context.lunarDate.month}/${prediction.context.lunarDate.year} | Can chi nam: ${prediction.context.canChi.year}</p>

    <h2>Dai han</h2>
    <div class="card">
      <p><strong>Do tuoi:</strong> ${prediction.daiHan.startAge}-${prediction.daiHan.endAge}</p>
      <p><strong>Cung:</strong> ${prediction.daiHan.palace} (${prediction.daiHan.branch})</p>
      <p>${prediction.daiHan.focus}</p>
    </div>

    <h2>Tieu han</h2>
    <div class="card">
      <p><strong>Trang thai:</strong> ${prediction.tieuHan.status}</p>
      <p>${prediction.tieuHan.desc}</p>
      <p><strong>Luu sao tai cung:</strong> ${prediction.tieuHan.luuSaoAtPalace.join(", ") || "Khong co"}</p>
      <p><strong>Cat tinh:</strong> ${prediction.tieuHan.catTinh.join(", ") || "Chua noi bat"}</p>
      <p><strong>Sat tinh:</strong> ${prediction.tieuHan.satTinh.join(", ") || "Khong dang ke"}</p>
    </div>

    <h2>Nguyet han</h2>
    <div class="card">
      <p><strong>Thang am:</strong> ${prediction.nguyetHan.month}</p>
      <p><strong>Cung:</strong> ${prediction.nguyetHan.palace} (${prediction.nguyetHan.branch})</p>
      <p><strong>Trang thai:</strong> ${prediction.nguyetHan.status}</p>
      <p>${prediction.nguyetHan.desc}</p>
    </div>

    <h2>Nhat han</h2>
    <div class="grid">
      <div class="card">
        <h3>Gio tot</h3>
        <p>${prediction.nhatHan.goodHours.join(", ")}</p>
      </div>
      <div class="card">
        <h3>Gio xau</h3>
        <p>${prediction.nhatHan.badHours.join(", ")}</p>
      </div>
    </div>

    <h2>Canh bao</h2>
    <div class="card">
      <ul>
        ${(prediction.alerts.length > 0 ? prediction.alerts : ["Chua co canh bao lon trong chu ky hien tai."])
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ul>
    </div>
  </body>
</html>`;

    reportWindow.document.open();
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
  }, [chart, prediction]);

  if (!isHydrated || !chart || !prediction) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
        <p className="font-medium text-on-surface-variant">Đang tính toán vận hạn...</p>
      </div>
    );
  }

  const yearTone = toneForStatus(prediction.tieuHan.status);
  const monthTone = toneForStatus(prediction.nguyetHan.status);

  const topHighlights = [
    {
      label: "Nhịp của năm",
      value: prediction.tieuHan.status,
      subtext: `Tiểu hạn tại cung ${prediction.tieuHan.palace} (${prediction.tieuHan.branch}).`,
    },
    {
      label: "Nhịp của tháng",
      value: prediction.nguyetHan.status,
      subtext: `Tháng âm ${prediction.nguyetHan.month} đi qua cung ${prediction.nguyetHan.palace} (${prediction.nguyetHan.branch}).`,
    },
    {
      label: "Đại hạn hiện tại",
      value: `${prediction.daiHan.startAge}-${prediction.daiHan.endAge}`,
      subtext: `Trọng tâm chính đang nằm ở cung ${prediction.daiHan.palace}.`,
    },
    {
      label: "Ngày đang xem",
      value: prediction.nhatHan.date,
      subtext: `Âm lịch ${prediction.context.lunarDate.day}/${prediction.context.lunarDate.month}/${prediction.context.lunarDate.year}.`,
    },
  ];

  const chartFoundation = [
    { label: "Mệnh", value: getBranchLabel(chart.result.overview.menhBranch) },
    { label: "Thân", value: getBranchLabel(chart.result.overview.thanBranch) },
    { label: "Cục", value: chart.result.overview.cuc },
    { label: "Âm dương", value: chart.result.overview.amDuong },
    { label: "Năm sinh", value: chart.result.overview.canChiYear },
    { label: "Ngày can chi", value: chart.result.overview.canChiDay },
  ];

  const lifePalace = chart.result.palaces.find((palace) => palace.isLifePalace);
  const bodyPalace = chart.result.palaces.find((palace) => palace.isBodyPalace);
  const tieuHanPalace = chart.result.palaces.find((palace) => palace.name === prediction.tieuHan.palace);
  const tieuHanStarLabels = prediction.tieuHan.majorStars.map((star) => getStarLabel(star));
  const tieuHanMinorStarLabels = prediction.tieuHan.minorStars.map((star) => getStarLabel(star));
  const lifePalaceElement = lifePalace?.element;
  const tieuHanElement = tieuHanPalace?.element;
  const elementRelation = getElementRelation(lifePalaceElement, tieuHanElement);
  const thanSupportsYear =
    bodyPalace?.name === prediction.tieuHan.palace || bodyPalace?.branch === tieuHanPalace?.branch;
  const heavyWarning =
    prediction.analysisBasis.heavyIndicators.length > 0 ||
    prediction.alerts.length > 0 ||
    prediction.daiHan.isHeavy;
  const chartBasedInterpretation = [
    {
      title: "1. Chu kỳ hạn đang chồng lên lá số này",
      desc: `Đại hạn hiện tại của lá số rơi vào ${prediction.daiHan.startAge}-${prediction.daiHan.endAge} tuổi tại cung ${prediction.daiHan.palace} (${prediction.daiHan.branch}). Tiểu hạn năm nay đi vào cung ${prediction.tieuHan.palace} (${prediction.tieuHan.branch}), còn nguyệt hạn tháng âm ${prediction.nguyetHan.month} đang nằm ở ${prediction.nguyetHan.palace} (${prediction.nguyetHan.branch}).`,
    },
    {
      title: "2. Lưu sao đang tác động trực tiếp",
      desc: prediction.tieuHan.luuSaoAtPalace.length > 0
        ? `Năm đang xem có các lưu sao nhập thẳng cung hạn gồm ${prediction.tieuHan.luuSaoAtPalace.join(", ")}. Đây là lớp biến động động, giúp giải thích vì sao năm nay nghiêng về ${prediction.tieuHan.status.toLowerCase()}.`
        : "Chưa có lưu sao nổi bật nhập thẳng cung hạn, nên trọng tâm luận đoán thiên về sao gốc của cung hạn và nền đại hạn.",
    },
    {
      title: "3. Gốc lá số và hạn có đang nâng đỡ nhau không?",
      desc: `${elementRelation.desc} ${
        thanSupportsYear
          ? "Cung Thân của lá số đang khá gần trục hạn năm nay nên mức cảm nhận thường mạnh hơn bình thường."
          : "Cung Thân không trùng trực tiếp với cung hạn năm nay nên tác động thường đi theo nhịp gián tiếp hơn."
      }`,
    },
    {
      title: "4. Sao nhập hạn trên chính lá số này",
      desc: tieuHanStarLabels.length > 0
        ? `Cung tiểu hạn năm nay đang mang các sao chính ${tieuHanStarLabels.join(", ")}${tieuHanMinorStarLabels.length > 0 ? `, đi cùng sao phụ ${tieuHanMinorStarLabels.slice(0, 6).join(", ")}` : ""}. Khi các sao này nhập hạn, phần luận phải đặt trên đúng tính chất của sao tại lá số gốc chứ không đọc rời từng sao.`
        : "Cung tiểu hạn năm nay chưa nổi lên nhiều sao chính, nên việc luận cần dựa nặng hơn vào đại hạn, lưu sao và thế sinh khắc.",
    },
    {
      title: "5. Cảnh báo hạn nặng",
      desc: heavyWarning
        ? `Lá số này đang có dấu hiệu cần phòng thủ hơn, vì xuất hiện các chỉ báo như ${prediction.analysisBasis.heavyIndicators.join(", ") || prediction.alerts.join(", ")}. Trường hợp đại hạn và tiểu hạn giao hội cùng hung tinh là kiểu cần ưu tiên an toàn, sức khỏe và tránh quyết định liều.`
        : "Hiện chưa thấy cụm chỉ báo hạn nặng nổi bật. Dù vậy vẫn nên đọc đại hạn, tiểu hạn và nguyệt hạn cùng nhau thay vì nhìn một mốc đơn lẻ.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-3">
          <Link
            href={`/views/${cardId}`}
            className="inline-flex items-center gap-1 text-xs text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="arrow_back" className="text-sm" />
            Quay lại lá số
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-on-surface md:text-5xl">Vận hạn dễ đọc</h1>
          <p className="max-w-3xl text-base leading-7 text-on-surface-variant">
            Trang này gom kết quả theo thứ tự người dùng thường cần đọc: bức tranh chung trước,
            tín hiệu hỗ trợ và rủi ro sau, rồi mới đến nhịp tháng và nhịp ngày.
          </p>
          <p className="text-sm font-medium text-on-surface-variant">
            Lá số: <span className="font-bold text-primary">{chart.result.profile.fullName}</span> •{" "}
            {chart.result.profile.solarDateTime}
          </p>
        </div>

        <div className="ui-shell flex flex-wrap items-center gap-4 rounded-[1.75rem] p-4">
          <label
            htmlFor="target-date"
            className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant"
          >
            Chọn ngày xem
          </label>
          <input
            id="target-date"
            type="date"
            value={effectiveTargetDate}
            onChange={(event) => setTargetDate(event.target.value)}
            className="cursor-pointer rounded-xl border border-outline-variant/15 bg-surface-container-low/30 px-4 py-2 font-bold text-primary outline-none"
          />
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="ui-pill rounded-full border border-outline-variant/30 px-5 py-2 text-xs font-black uppercase tracking-[0.24em] text-on-surface transition-colors hover:bg-surface-container"
          >
            Tải báo cáo PDF
          </button>
        </div>
      </div>

      <section className="ui-shell rounded-[2.5rem] p-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topHighlights.map((item) => (
            <SummaryCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="ui-shell rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Lá số nền đang dùng để luận</h2>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Dự đoán vận hạn không chạy độc lập. Kết quả được neo vào chính lá số này, đặc biệt là
            Mệnh, Thân, Cục, can chi năm sinh và vị trí các cung khi đưa vào đại hạn, tiểu hạn,
            nguyệt hạn.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {chartFoundation.map((item) => (
              <div key={item.label} className="ui-panel-soft rounded-[1.5rem] p-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-black text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ui-panel rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Từ lá số này app đang bám vào đâu?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Cung Mệnh gốc</p>
              <p className="mt-2 text-lg font-black text-on-surface">
                {lifePalace ? `${getPalaceLabel(lifePalace.name)} (${getBranchLabel(lifePalace.branch)})` : "Chưa xác định"}
              </p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {lifePalace?.majorStars.map((star) => getStarLabel(star.name)).join(", ") || "Chưa có sao chính nổi bật."}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-secondary">Cung Thân gốc</p>
              <p className="mt-2 text-lg font-black text-on-surface">
                {bodyPalace ? `${getPalaceLabel(bodyPalace.name)} (${getBranchLabel(bodyPalace.branch)})` : "Chưa xác định"}
              </p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {bodyPalace?.majorStars.map((star) => getStarLabel(star.name)).join(", ") || "Chưa có sao chính nổi bật."}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-primary/12 bg-primary/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Cung tiểu hạn năm nay</p>
              <p className="mt-2 text-lg font-black text-on-surface">
                {prediction.tieuHan.palace} ({prediction.tieuHan.branch})
              </p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Sao chính: {tieuHanStarLabels.join(", ") || "Chưa nổi bật"}.
              </p>
              <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                Sao phụ: {tieuHanMinorStarLabels.join(", ") || "Chưa ghi nhận nhiều sao phụ"}.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-tertiary/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-tertiary">Đại hạn đang phủ nền</p>
              <p className="mt-2 text-lg font-black text-on-surface">
                {prediction.daiHan.palace} ({prediction.daiHan.branch})
              </p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{prediction.daiHan.focus}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-shell rounded-[2.5rem] p-8 md:p-10">
        <h2 className="text-2xl font-black tracking-tight text-on-surface">
          Luận vận hạn theo đúng lá số này
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-on-surface-variant">
          Phần dưới đây áp dụng trực tiếp 5 nguyên tắc bạn đưa vào chính lá số đang xem, thay vì
          chỉ giải thích lý thuyết chung. Tức là app đang nối chu kỳ hạn, lưu sao, cung Mệnh/Thân,
          ngũ hành và các sao nhập hạn với dữ liệu thật của chart này.
        </p>

        <div className="mt-8 grid gap-4">
          {chartBasedInterpretation.map((item) => (
            <div key={item.title} className="ui-panel-soft rounded-[1.75rem] p-6">
              <p className="text-lg font-black tracking-tight text-on-surface">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Ngũ hành Mệnh</p>
            <p className="mt-2 text-lg font-black text-on-surface">{lifePalaceElement || "Chưa rõ"}</p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              Lấy theo cung Mệnh gốc của lá số.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Ngũ hành cung hạn</p>
            <p className="mt-2 text-lg font-black text-on-surface">{tieuHanElement || "Chưa rõ"}</p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              Lấy theo cung {prediction.tieuHan.palace} đang làm tiểu hạn năm nay.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-primary/12 bg-primary/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Kết luận sinh khắc</p>
            <p className="mt-2 text-lg font-black text-on-surface">{elementRelation.label}</p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">{elementRelation.desc}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className={`ui-shell rounded-[2.5rem] border p-8 md:p-10 ${yearTone.panel}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.24em] ${yearTone.badge}`}>
                Tiểu hạn {prediction.tieuHan.status}
              </div>
              <h2 className="text-3xl font-black tracking-tight text-on-surface">{yearTone.title}</h2>
              <p className="max-w-3xl text-base leading-8 text-on-surface-variant">
                {prediction.tieuHan.desc}
              </p>
            </div>
            <div className="hidden rounded-[1.75rem] bg-surface-container-low/40 p-4 text-on-surface md:block">
              <Icon name={yearTone.icon} className="text-4xl" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="ui-panel-soft rounded-[1.5rem] p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Đại hạn nền</p>
              <p className="mt-3 text-lg font-black text-on-surface">
                {prediction.daiHan.palace} ({prediction.daiHan.branch})
              </p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{prediction.daiHan.focus}</p>
            </div>

            <div className="ui-panel-soft rounded-[1.5rem] p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-secondary">Lưu sao tại cung hạn</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.tieuHan.luuSaoAtPalace.join(", ") || "Chưa có lưu sao nổi bật nhập thẳng cung hạn."}
              </p>
            </div>

            <div className="ui-panel-soft rounded-[1.5rem] p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-tertiary">Chỉ báo nặng</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.analysisBasis.heavyIndicators.join(", ") || "Chưa có giao hội nặng nổi bật trong chu kỳ này."}
              </p>
            </div>
          </div>
        </div>

        <div className={`ui-panel rounded-[2.5rem] border p-8 md:p-10 ${monthTone.panel}`}>
          <div className="space-y-3">
            <div className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.24em] ${monthTone.badge}`}>
              Nguyệt hạn {prediction.nguyetHan.status}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-on-surface">
              Tháng âm {prediction.nguyetHan.month} cần đọc như thế nào?
            </h2>
            <p className="text-base leading-8 text-on-surface-variant">{prediction.nguyetHan.desc}</p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Vị trí tháng</p>
            <p className="mt-2 text-lg font-black text-on-surface">
              {prediction.nguyetHan.palace} ({prediction.nguyetHan.branch})
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <ChipGroup
              title="Cát tinh tháng"
              items={prediction.nguyetHan.catTinh}
              emptyText="Chưa có cát tinh nổi bật trong nguyệt hạn này."
              tone="positive"
            />
            <ChipGroup
              title="Điểm cần giữ trong tháng"
              items={prediction.nguyetHan.satTinh}
              emptyText="Chưa thấy hung tinh mạnh, nên giữ nhịp đều và bám kế hoạch."
              tone="warning"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="ui-shell rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Điểm đang nâng bạn lên</h2>
          <div className="mt-6 space-y-6">
            <ChipGroup
              title="Tín hiệu thuận"
              items={prediction.analysisBasis.favorableSignals}
              emptyText="Chưa có tín hiệu thuận nổi bật, nên ưu tiên đi chậm mà chắc."
              tone="positive"
            />
            <ChipGroup
              title="Cát tinh tại tiểu hạn"
              items={prediction.tieuHan.catTinh}
              emptyText="Cung tiểu hạn chưa có cát tinh nổi bật trong lần xem này."
              tone="positive"
            />
          </div>
        </div>

        <div className="ui-panel rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Điểm nên giữ tay</h2>
          <div className="mt-6 space-y-6">
            <ChipGroup
              title="Tín hiệu cần lưu ý"
              items={prediction.analysisBasis.cautionSignals}
              emptyText="Chưa có tín hiệu rủi ro đáng kể trong cung hạn hiện tại."
              tone="warning"
            />
            <ChipGroup
              title="Sát tinh tại tiểu hạn"
              items={prediction.tieuHan.satTinh}
              emptyText="Chưa thấy sát tinh mạnh xuất hiện trong lần xem này."
              tone="warning"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="ui-shell rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Vì sao app kết luận như vậy?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-on-surface-variant">
            App không chỉ trả một câu kết luận ngắn. Kết quả được đặt trên nền đại hạn,
            vị trí tiểu hạn, lưu sao nhập hạn và toàn bộ sao nền tại cung hạn của năm đang xem.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-tertiary">Sao nền cung tiểu hạn</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.analysisBasis.tieuHanPalaceStars.join(", ") || "Chưa ghi nhận sao nền."}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-secondary">Lưu sao toàn năm</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {prediction.tieuHan.luuSao.map((item) => (
                  <span
                    key={`${item.name}-${item.position}`}
                    className="rounded-full border border-outline-variant/12 px-3 py-1.5 text-xs font-medium text-on-surface-variant"
                  >
                    {item.name}: {item.branch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ui-panel rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight text-on-surface">Nhịp trong ngày</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.5rem] border border-primary/12 bg-primary/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Giờ thuận</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.nhatHan.goodHours.join(", ")}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-error/12 bg-error/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-error">Giờ nên tránh</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.nhatHan.badHours.join(", ")}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Màu hợp ngày</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.nhatHan.luckyColors.join(", ")}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Lời nhắc ngắn</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{prediction.nhatHan.caution}</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{prediction.nhatHan.fortune}</p>
            </div>
          </div>
        </div>
      </section>

      {prediction.alerts.length > 0 ? (
        <section className="ui-shell rounded-[2.5rem] border border-error/15 bg-error/5 p-8 md:p-10">
          <div className="flex items-center gap-3 text-error">
            <Icon name="warning" className="text-2xl" />
            <h2 className="text-2xl font-black tracking-tight">Cảnh báo cần đọc kỹ</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {prediction.alerts.map((alert, index) => (
              <div key={`${index}-${alert}`} className="rounded-[1.5rem] border border-error/10 bg-surface/40 p-5">
                <p className="text-sm leading-7 text-on-surface-variant">{alert}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
