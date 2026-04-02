"use client";

import { useState } from "react";

const filters = ["Tất cả các sao", "Chính Tinh", "Phụ Tinh", "Tứ Hóa", "Vòng Tràng Sinh"];

export default function ThuVienHeader() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Page header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <p className="text-primary font-black tracking-[0.4em] text-xs uppercase bg-primary/5 w-fit px-4 py-1.5 rounded-full">
              Precision Mysticism
            </p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-on-surface">
              Thư viện <span className="text-on-surface-variant">Giải nghĩa</span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-xl font-medium leading-relaxed">
              Khám phá kho tàng tri thức về tính lý các sao, cách cục và ý nghĩa chuyên sâu trong khoa
              Tử Vi Đẩu Số. Được biên soạn với độ chính xác cao nhất cho nhà nghiên cứu hiện đại.
            </p>
          </div>
          <div className="flex gap-3 self-start">
            <span className="bg-surface-container px-4 py-2 rounded-xl text-xs font-black text-on-surface uppercase tracking-widest shadow-sm">
              Total Stars: 108
            </span>
            <span className="bg-surface-container px-4 py-2 rounded-xl text-xs font-black text-on-surface uppercase tracking-widest shadow-sm">
              Updated: Q4 2024
            </span>
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <section className="mb-16">
        <div className="bg-surface-container p-2 rounded-[2rem] flex flex-wrap items-center gap-2 shadow-xl shadow-background/50">
          {filters.map((label, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              className={`px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all min-h-[48px] ${
                active === i
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="ml-auto pr-6 hidden lg:flex items-center gap-3 text-xs text-primary font-black uppercase tracking-[0.2em]">
            <span className="material-symbols-outlined text-lg">tune</span>
            Filter by element
          </div>
        </div>
      </section>
    </>
  );
}
