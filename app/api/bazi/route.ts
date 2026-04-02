import { NextResponse } from "next/server";

import { calculateTuVi } from "@/lib/bazi/engine";
import type { FortuneRequest } from "@/lib/bazi/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<FortuneRequest>;

    if (!body.birthDate || !body.birthTime || !body.calendarType || !body.gender || !body.timezone) {
      return NextResponse.json(
        { error: "Thiếu trường bắt buộc để lập lá số." },
        { status: 400 }
      );
    }

    const result = calculateTuVi({
      fullName: body.fullName ?? "",
      gender: body.gender,
      calendarType: body.calendarType,
      birthDate: body.birthDate,
      birthTime: body.birthTime,
      timezone: body.timezone,
      eightCharProviderSect: body.eightCharProviderSect ?? 2,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tính lá số.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
