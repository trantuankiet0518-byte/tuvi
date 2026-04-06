import type { ComponentType } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowForward,
  AutoStories,
  Bookmark,
  Brain,
  CalendarToday,
  Check,
  CheckCircle,
  ChevronDown,
  CircleAlert,
  Clock3,
  Dashboard,
  Description,
  ExternalLink,
  FileText,
  Eye,
  Home,
  DarkMode,
  Info,
  Language,
  Logout,
  Mars,
  Menu,
  Person,
  Plus,
  Quote,
  RotateCcw,
  Search,
  Settings,
  Share,
  SlidersHorizontal,
  Sparkles,
  Waves,
  X,
  LightMode,
  Venus,
} from "@/components/icons";

type IconName =
  | "add"
  | "arrow_back"
  | "arrow_forward"
  | "arrow_outward"
  | "auto_awesome"
  | "auto_stories"
  | "bookmarks"
  | "bookmark"
  | "calendar_today"
  | "check"
  | "check_circle"
  | "close"
  | "dashboard"
  | "description"
  | "expand_more"
  | "error"
  | "external_link"
  | "format_quote"
  | "female"
  | "home"
  | "info"
  | "language"
  | "logout"
  | "light_mode"
  | "dark_mode"
  | "visibility"
  | "male"
  | "menu"
  | "open_in_new"
  | "person"
  | "psychology"
  | "refresh"
  | "search"
  | "settings"
  | "share"
  | "stars"
  | "summarize"
  | "timeline"
  | "tune"
  | "waves";

interface IconProps {
  name: IconName | string;
  className?: string;
}

const iconMap = {
  add: Plus,
  arrow_back: ArrowLeft,
  arrow_forward: ArrowForward,
  arrow_outward: ArrowUpRight,
  auto_awesome: Sparkles,
  auto_stories: AutoStories,
  bookmarks: Bookmark,
  bookmark: Bookmark,
  calendar_today: CalendarToday,
  check: Check,
  check_circle: CheckCircle,
  close: X,
  dashboard: Dashboard,
  description: Description,
  expand_more: ChevronDown,
  error: CircleAlert,
  external_link: ExternalLink,
  format_quote: Quote,
  female: Venus,
  home: Home,
  info: Info,
  language: Language,
  logout: Logout,
  light_mode: LightMode,
  dark_mode: DarkMode,
  visibility: Eye,
  male: Mars,
  menu: Menu,
  open_in_new: ArrowUpRight,
  person: Person,
  psychology: Brain,
  refresh: RotateCcw,
  search: Search,
  settings: Settings,
  share: Share,
  stars: Sparkles,
  summarize: FileText,
  timeline: Clock3,
  tune: SlidersHorizontal,
  waves: Waves,
} satisfies Record<IconName, ComponentType<{ className?: string; strokeWidth?: number }>>;

export default function Icon({ className = "", name }: IconProps) {
  const SvgIcon = iconMap[name as IconName];

  if (SvgIcon) {
    return <SvgIcon aria-hidden="true" className={className} strokeWidth={1.8} />;
  }

  return <span className={className}>{name}</span>;
}
