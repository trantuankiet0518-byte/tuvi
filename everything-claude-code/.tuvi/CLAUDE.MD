# CLAUDE.md — TuVi Luxury: Tử Vi Engine Reference

This file is the **canonical** reference for all Tử Vi calculation logic in this codebase.
All AI assistants working on this project **must read this file** before touching any calculation, palace, or star placement code.

---

## 1. Stack & Project Context

- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind v4 + `next-intl` + Motion
- **Backend**: Hono + Bun + PostgreSQL + Drizzle ORM + Redis + Zod + Better Auth
- **Calendar/time lib**: `tyme4ts` — handles all lunar ↔ solar conversion, EightChar, ChildLimit
- **Engine file**: `lib/bazi/engine.ts` (the `calculateTuVi` function is the single entry point)
- **Shared types**: `lib/bazi/types.ts` — `FortuneRequest`, `TuViEngineResult`, `TuViPalace`, `TuViStar`, `TuViDecadeCycle`
- **Tradition**: Bắc Tông (Northern School)
- **Export alias**: `calculateBazi` = `calculateTuVi` (same function, two names)

---

## 2. Key Conventions

### Position encoding — 1-based branch index

All palace/star positions inside this engine use **1-based** indexing (1–12), NOT 0-based.

```ts
// BRANCH_EN[0] = "Ty" = position 1
toOneBasedBranchIndex(zeroBasedIdx)  // zeroBased + 1
fromOneBasedBranchIndex(oneBased)    // mod12(oneBased - 1)
```

`dichCung(position, steps)` advances a 1-based position by `steps` palaces (wraps correctly):
```ts
dichCung(3, 4)  // → (3 - 1 + 4) % 12 + 1 = 7
```

All internal arithmetic uses `mod12(n)` for 0-based branch indices.

### Palace arrays

`palaces[]` always has **exactly 12 elements**, indexed 0–11.
`palaces[0]` is always **Mệnh**. Each subsequent element is the next palace counter-clockwise.
The branch (Địa Chi) of each palace = `BRANCH_EN[mod12(menhIdx + offset)]`.

---

## 3. Input & Data Types

```ts
// FortuneRequest (input)
interface FortuneRequest {
  fullName: string;
  birthDate: string;          // "YYYY-MM-DD"
  birthTime: string;          // "HH:MM"
  timezone: string;           // e.g. "+07:00"
  gender: "nam" | "nu";
  calendarType: "am" | "duong";  // lunar or solar input
  eightCharProviderSect: 1 | 2;  // provider1 = DefaultEightChar, provider2 = LunarSect2
}

// TuViStar
interface TuViStar {
  name: string;             // English key, e.g. "Tu Vi", "Thai Duong"
  type: "chinh_tinh" | "phu_tinh";
  quality: "mieu_dia" | "vuong_dia" | "dac_dia" | "ham_dia" | "binh_hoa";
  element: string;          // e.g. "Thổ", "Hỏa", "Kim", "Thủy", "Mộc"
}

// TuViPalace
interface TuViPalace {
  name: string;             // English key from PALACE_NAMES
  branch: string;           // English branch key, e.g. "Ty", "Suu"
  element: string;
  isLifePalace: boolean;    // true only for palaces[0]
  isBodyPalace: boolean;    // true for the palace at thanIdx
  majorStars: TuViStar[];
  minorStars: TuViStar[];
  note: string;
}
```

**Important**: star names and palace names are stored in **English keys** (e.g. `"Tu Vi"`, `"Menh"`, `"Quan Loc"`). Vietnamese display names are rendered in the UI layer, not in the engine.

---

## 4. Engine Pipeline (step by step)

### Step 1 — Build LunarHour from input (`buildLunarHour`)

- If `calendarType === "am"`: call `LunarHour.fromYmdHms(y, m, d, h, min, 0)` directly
- If `calendarType === "duong"`: convert ISO string → UTC → zoned time → `SolarTime` → `.getLunarHour()`
- `LunarHour.provider` is set before every call based on `eightCharProviderSect`

### Step 2 — Extract indices from EightChar

```ts
const eightChar = lunarHour.getEightChar();
yearStemIdx   = eightChar.getYear().getHeavenStem().getIndex();   // 0–9
yearBranchIdx = eightChar.getYear().getEarthBranch().getIndex();  // 0–11
hourBranchIdx = lunarHour.getSixtyCycle().getEarthBranch().getIndex();
lunarMonth    = lunarHour.getMonth();
lunarDay      = lunarHour.getDay();
```

### Step 3 — Mệnh & Thân positions

```ts
menhIdx = mod12(2 + (lunarMonth - 1) - hourBranchIdx)
thanIdx = mod12(2 + (lunarMonth - 1) + hourBranchIdx)
```

Both are **0-based** branch indices. Convert to 1-based when calling `dichCung`.

### Step 4 — Cục số (`getCuc`)

Uses Nạp Âm of the **Mệnh Palace's** Can-Chi pair via a 60-element lookup array `NAP_AM_CORRECT`. 
To find the Mệnh Palace's Can, use the Ngũ Hổ Độn formula based on the year's Can to find the Can of Dần, then offset to the Mệnh Palace.

```ts
// Calculate exact 60-cycle index from stem and branch
pos60 = (menhCanIdx * 36 + menhBranchIdx * 25) % 60
element = NAP_AM_CORRECT[pos60]
// Thuy→2, Moc→3, Kim→4, Tho→5, Hoa→6
```

Returns `{ name: "Thủy nhị cục", number: 2 }` etc.

### Step 5 — Tử Vi position (`getTuViPosition`)

Starting from cung Dần (position 3), advance until accumulated count ≥ lunarDay:

```ts
while (cuc < lunarDay) { cuc += cucNumber; cungDan += 1; }
saiLech = cuc - lunarDay
if (saiLech % 2 === 1) saiLech = -saiLech  // odd offset → go backward
return dichCung(cungDan, saiLech)
```

### Step 6 — 14 Major Stars (`getMajorStarPositions`)

Thiên Phủ mirror formula:
```ts
thienPhuPosition = dichCung(3, 3 - tuViPosition)
```

All other stars are **fixed offsets** from Tử Vi or Thiên Phủ:

| Star | Formula |
|---|---|
| Tử Vi | `tuViPosition` |
| Liêm Trinh | `dichCung(tuViPosition, 4)` |
| Thiên Đồng | `dichCung(tuViPosition, 7)` |
| Vũ Khúc | `dichCung(tuViPosition, 8)` |
| Thái Dương | `dichCung(tuViPosition, 9)` |
| Thiên Cơ | `dichCung(tuViPosition, 11)` |
| Thiên Phủ | `dichCung(3, 3 - tuViPosition)` |
| Thái Âm | `dichCung(thienPhuPosition, 1)` |
| Tham Lang | `dichCung(thienPhuPosition, 2)` |
| Cự Môn | `dichCung(thienPhuPosition, 3)` |
| Thiên Tướng | `dichCung(thienPhuPosition, 4)` |
| Thiên Lương | `dichCung(thienPhuPosition, 5)` |
| Thất Sát | `dichCung(thienPhuPosition, 6)` |
| Phá Quân | `dichCung(thienPhuPosition, 10)` |

### Step 7 — Auxiliary Stars (`getMinorStarPositions`)

Key derivation variables:

```ts
amDuongNamNu = getAmDuongNamNu(yearStemIdx, gender)
// +1 if (male AND dương year) OR (female AND âm year)
// -1 otherwise
// Dương stems: Giáp(0), Bính(2), Mậu(4), Canh(6), Nhâm(8) → yearStemIdx % 2 === 0
```

Critical auxiliary star groups:

| Star | Formula |
|---|---|
| Lộc Tồn | lookup table by `yearStemIdx` → `[3,4,6,7,6,7,9,10,12,1]` |
| Tả Phù | `dichCung(5, lunarMonth - 1)` |
| Hữu Bật | `dichCung(2, 2 - taPhu)` — mirror of Tả Phù |
| Văn Khúc | `dichCung(5, hourBranchPosition - 1)` |
| Văn Xương | `dichCung(11, -(hourBranchPosition - 1))` — mirror |
| Địa Kiếp | `dichCung(12, hourBranchPosition - 1)` |
| Địa Không | `dichCung(12, -(hourBranchPosition - 1))` — mirror |
| Thiên Khôi | lookup by `yearStemPosition` (1-based) |
| Thiên Việt | `dichCung(5, 5 - thienKhoi)` — mirror |
| Thiên Mã | derived from `yearBranchPosition % 4` |
| Hỏa Tinh / Linh Tinh | lookup by `yearBranchPosition` group + `hourBranchPosition` offset, direction flipped by `amDuongNamNu` |
| Kình Dương | `dichCung(locTon, 1)` |
| Đà La | `dichCung(locTon, -1)` |
| Tràng Sinh ring (12 stars) | start = `getTrangSinhPosition(cucNumber)`, each step = `amDuongNamNu` |
| Bác Sĩ ring (12 stars) | start = `locTon`, each step = `amDuongNamNu` |
| Tuế Tinh ring (12 stars) | start = `yearBranchPosition`, step = +1 always |
| Tuần (2-palace) | `getTuanPositions(yearStemIdx, yearBranchIdx)` |
| Triệt (2-palace) | `getTrietPositions(yearStemPosition)` |

**Tuần and Triệt** are stored as `number[]` (two palace positions), not a single number.
They appear in `minorStars` of **both** palaces they occupy.

### Step 8 — Tứ Hóa (`hoaByCan` table inside `getMinorStarPositions`)

Lookup by `yearStemPosition` (1-based, 1=Giáp … 10=Quý):

```ts
// Example for Giáp (stemPosition=1):
{ "Hoa Loc": "Liem Trinh", "Hoa Quyen": "Pha Quan", "Hoa Khoa": "Vu Khuc", "Hoa Ky": "Thai Duong" }
```

Special cases for Hóa Khoa and Hóa Kỵ — they can target auxiliary stars:
- `"Van Xuong"` → use `vanXuong` position
- `"Van Khuc"` → use `vanKhuc` position
- `"Huu Bat"` → use `huuBat` position
- Otherwise → look up from `majorStarPositions[starName]`

The four Hóa stars are added as **separate `minorStars` entries** at the same palace as their target star (not as a flag on the star object).

### Step 9 — Validation (`validateMinorStarSymmetries`)

After placement, the engine **throws** if symmetry rules are violated:

- Văn Khúc / Văn Xương must mirror across hour branch
- Địa Không / Địa Kiếp must mirror across hour branch
- Long Trì = `dichCung(5, yearBranchPosition - 1)`, Phượng Các mirrors it
- Tuần: 2 consecutive positions (diff = 1)
- Triệt: 2 consecutive positions (diff = 1)

**Never bypass these checks.** If they throw, the lookup table or index math is wrong.

### Step 10 — Assemble Palaces (`buildPalaces`)

Iterates 12 offsets from `menhIdx`, creates `TuViPalace[]`, then populates `majorStars` and `minorStars` by converting each star's 1-based position → 0-based branch index → matching palace by `BRANCH_EN` lookup.

### Step 11 — Đại Hạn (`buildDecadeCycles`)

Uses `tyme4ts`:
```ts
const childLimit = ChildLimit.fromSolarTime(solar, gender)
startAge = Math.max(1, childLimit.getYearCount() + 1)
// Palace[i] → startAge + i * 10
```

Returns 12 `TuViDecadeCycle` entries, one per palace.

---

## 5. Lookup Tables (do not modify without cross-checking)

### `PALACE_ELEMENTS[branchIdx]` (0-based, 0=Tý)
```
Tý=Thủy, Sửu=Thổ, Dần=Mộc, Mão=Mộc, Thìn=Thổ, Tị=Hỏa,
Ngọ=Hỏa, Mùi=Thổ, Thân=Kim, Dậu=Kim, Tuất=Thổ, Hợi=Thủy
```

### `getLocTonPosition(yearStemIdx)` — 0-based → 1-based position
```
Giáp(0)=3, Ất(1)=4, Bính(2)=6, Đinh(3)=7, Mậu(4)=6,
Kỷ(5)=7, Canh(6)=9, Tân(7)=10, Nhâm(8)=12, Quý(9)=1
```

### `getTrangSinhPosition(cucNumber)`
```
6(Hỏa) → 3,  4(Kim) → 6,  2(Thủy)/5(Thổ) → 9,  3(Mộc) → 12
```

### `getThienMaPosition(yearBranchPosition % 4)`
```
%4=1 → 3(Dần),  %4=2 → 12(Hợi),  %4=3 → 9(Thân),  %4=0 → 6(Tị)
```

---

## 6. Star Name Convention

All star names in the engine are **English transliterations** (no diacritics):

| Engine key | Vietnamese |
|---|---|
| `"Tu Vi"` | Tử Vi |
| `"Liem Trinh"` | Liêm Trinh |
| `"Thai Duong"` | Thái Dương |
| `"Pha Quan"` | Phá Quân |
| `"Loc Ton"` | Lộc Tồn |
| `"Hoa Loc"` | Hóa Lộc |
| `"Hoa Ky"` | Hóa Kỵ |
| `"Van Xuong"` | Văn Xương |
| `"Da La"` | Đà La |
| `"Kinh Duong"` | Kình Dương |
| `"Ta Phu"` | Tả Phù |
| `"Huu Bat"` | Hữu Bật |

When displaying in the UI, map through a `VI_STAR_NAMES` dictionary — **never hardcode Vietnamese in the engine**.

---

## 7. Quality (Miếu / Vượng / Đắc / Hãm)

Quality is determined by `STAR_QUALITY[starName]` which maps to arrays of **0-based branch indices**:

```ts
getQuality(starName, branchIdx): "mieu_dia" | "vuong_dia" | "dac_dia" | "ham_dia" | "binh_hoa"
```

Only the 14 major stars have quality entries. All auxiliary stars default to `"binh_hoa"`.

---

## 8. Output Shape (`TuViEngineResult`)

```ts
{
  profile: { fullName, genderLabel, solarDateTime, lunarDateTime, timezone },
  overview: {
    chartType, zodiac, amDuong,
    cuc,        // e.g. "Thủy nhị cục"
    cucNumber,  // 2 | 3 | 4 | 5 | 6
    menhPalace, thanPalace,    // palace name keys
    menhBranch, thanBranch,    // branch EN keys
    canChiYear, canChiDay,     // e.g. "Giáp Tý"
    menhChu, thanChu
  },
  palaces: TuViPalace[],        // 12 elements, [0] = Mệnh
  keyStars: string[],           // top stars from Mệnh, Quan Lộc, Tài Bạch, Thân
  decadeCycles: TuViDecadeCycle[],
  summary: string[],
  analysis: { coreTraits, career, relationship }
}
```

---

## 9. Common Mistakes to Avoid

1. **Mixing 0-based and 1-based indices** — `dichCung` takes 1-based; `mod12` works on 0-based. Never pass a 0-based index directly to `dichCung`.
2. **Modifying `PALACE_NAMES` order** — the offset 0–11 from Mệnh is load-bearing.
3. **Bypassing `validateMinorStarSymmetries`** — if it throws, fix the lookup table, not the validator.
4. **Hardcoding Vietnamese strings in the engine** — all names stay as English keys.
5. **Treating Tuần/Triệt as single positions** — they are `number[]` of length 2, appearing in two palaces.
6. **Re-implementing what `tyme4ts` already does** — lunar conversion, EightChar, ChildLimit are handled by the lib.
7. **Placing Tứ Hóa as a flag on the star** — they are separate `minorStars` entries, not metadata on the transformed star.
8. **Using `yearStemIdx` (0-based) where `yearStemPosition` (1-based) is expected** — the `hoaByCan` table and several lookups use 1-based stem position.

---

## 10. Testing Checklist

For any generated chart, cross-check against tudivi.com or tuvilyso.net:

- [ ] Mệnh Cung branch matches reference
- [ ] Thân Cung branch matches reference
- [ ] Cục số correct
- [ ] Tử Vi position correct
- [ ] All 14 major stars in correct palaces
- [ ] Kình Dương and Đà La flanking Lộc Tồn (±1)
- [ ] Văn Xương and Văn Khúc are mirrors (sum of positions = 16 or wrapped equivalent)
- [ ] Tứ Hóa on correct stars for birth year's Can
- [ ] Đại Hạn starting age correct
- [ ] `validateMinorStarSymmetries` does not throw

---

*Last updated: 2026. Source of truth: `lib/bazi/engine.ts`. Keep this file in sync with the engine whenever logic changes.*