export type Gender = "nam" | "nu" | "khac";
export type CalendarType = "duong" | "am";

export type ProfileSettingsDraft = {
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  calendarType: CalendarType;
  birthDate: string;
  birthTime: string;
  timezone: string;
  birthPlace: string;
  lunarDateTime: string;
  notes: string;
  updatedAt: string;
};
