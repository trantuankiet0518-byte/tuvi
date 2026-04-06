import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function createIcon(path: ReactNode) {
  return function Icon({ className, strokeWidth = 2, ...props }: IconProps) {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        {...props}
      >
        {path}
      </svg>
    );
  };
}

export const ArrowRight = createIcon(
  <>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </>
);

export const ChevronDown = createIcon(
  <path d="m6 9 6 6 6-6" />
);

export const SunMedium = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.93 19.07 1.41-1.41" />
    <path d="m17.66 6.34 1.41-1.41" />
  </>
);

export const Eye = createIcon(
  <>
    <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

export const EyeOff = createIcon(
  <>
    <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-1.24" />
    <path d="M9.88 5.08A10.9 10.9 0 0 1 12 4.5c6 0 9.5 7.5 9.5 7.5a19.6 19.6 0 0 1-3.22 4.33" />
    <path d="M6.61 6.61C4.24 8.18 2.5 12 2.5 12s3.5 7.5 9.5 7.5c1.15 0 2.24-.18 3.24-.49" />
    <path d="m2 2 20 20" />
  </>
);

export const LockKeyhole = createIcon(
  <>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 13v3" />
    <circle cx="12" cy="15" r="1" />
  </>
);

export const LogIn = createIcon(
  <>
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
    <path d="M15 4h4v16h-4" />
  </>
);

export const Mail = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </>
);

export const Facebook = createIcon(
  <>
    <path d="M14 3h3V0h-3c-3.3 0-6 2.7-6 6v3H5v4h3v11h4V13h3l1-4h-4V6c0-1.1.9-2 2-2Z" />
  </>
);

export const Apple = createIcon(
  <>
    <path d="M15.5 4.5c-.9 1-1.9 1.6-3 1.6-.1-1.1.4-2.2 1.1-3 .8-.9 2-1.5 3.3-1.3-.1 1.1-.5 2-1.4 2.7Z" />
    <path d="M16.5 8.5c-1.4 0-2.1.7-3.2.7-1 0-1.8-.7-3-.7-2 0-4.8 1.8-4.8 6.4 0 4.8 3 9.1 5.4 9.1 1 0 1.6-.5 2.8-.5s1.6.5 2.8.5c2.1 0 5.2-4.1 5.2-8.6 0-3.7-2.3-6.9-5.2-6.9Z" />
  </>
);

export const UserCircle2 = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 19a7 7 0 0 1 11 0" />
  </>
);

export const ShieldAlert = createIcon(
  <>
    <path d="M12 3 4.5 6.5v4.8c0 4.7 3 8.9 7.5 9.7 4.5-.8 7.5-5 7.5-9.7V6.5L12 3Z" />
    <path d="M12 8v5" />
    <circle cx="12" cy="16.5" r="1" />
  </>
);

export const CalendarToday = createIcon(
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3.5v3" />
    <path d="M16 3.5v3" />
    <path d="M3.5 9h17" />
    <path d="M8 13h3" />
  </>
);

export const TrendingUp = createIcon(
  <>
    <path d="M4 16 9.5 10.5 13 14l7-7" />
    <path d="M13 7h7v7" />
  </>
);

export const Payments = createIcon(
  <>
    <rect x="3.5" y="6.5" width="17" height="11" rx="2" />
    <path d="M3.5 10.5h17" />
    <circle cx="15.5" cy="13" r="1.25" />
    <path d="M6.5 13h3" />
  </>
);

export const StarRate = createIcon(
  <path d="m12 4 2.45 4.96 5.48.8-3.97 3.87.94 5.47L12 16.52 7.1 19.1l.94-5.47L4.07 9.76l5.48-.8L12 4Z" />
);

export const Warning = createIcon(
  <>
    <path d="m12 4 8.2 14H3.8L12 4Z" />
    <path d="M12 9v4" />
    <circle cx="12" cy="16.2" r="1" />
  </>
);

export const ArrowForward = createIcon(
  <>
    <path d="M5 12h11" />
    <path d="m12 6 6 6-6 6" />
  </>
);

export const Search = createIcon(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16.2 16.2 4 4" />
  </>
);

export const Home = createIcon(
  <>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6.5 10.5V20h11V10.5" />
  </>
);

export const Menu = createIcon(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </>
);

export const Settings = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.03.03a2 2 0 0 1-1.42 3.41h-.04a1.8 1.8 0 0 0-1.27.53 1.8 1.8 0 0 0-.53 1.27v.04a2 2 0 0 1-3.41 1.42l-.03-.03A1.8 1.8 0 0 0 12 23a1.8 1.8 0 0 0-1.77 1.65l-.03.03A2 2 0 0 1 6.79 23.26v-.04a1.8 1.8 0 0 0-.53-1.27 1.8 1.8 0 0 0-1.27-.53h-.04A2 2 0 0 1 3.53 18l.03-.03A1.8 1.8 0 0 0 3.56 16 1.8 1.8 0 0 0 3 14.74v-.04A2 2 0 0 1 4.42 11.3h.04a1.8 1.8 0 0 0 1.27-.53 1.8 1.8 0 0 0 .53-1.27V9.46A2 2 0 0 1 9.66 8.04l.03.03A1.8 1.8 0 0 0 12 8a1.8 1.8 0 0 0 1.77-1.65l.03-.03A2 2 0 0 1 17.21 0v.04a1.8 1.8 0 0 0 .53 1.27c.33.33.8.53 1.27.53h.04A2 2 0 0 1 20.47 3.99l-.03.03A1.8 1.8 0 0 0 20.44 6c0 .47.2.94.53 1.27l.03.03A2 2 0 0 1 19.58 11.3h-.04a1.8 1.8 0 0 0-1.27.53 1.8 1.8 0 0 0-.53 1.27V15Z" />
  </>
);

export const Logout = createIcon(
  <>
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
    <path d="M15 4h4v16h-4" />
  </>
);

export const Person = createIcon(
  <>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </>
);

export const Dashboard = createIcon(
  <>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
  </>
);

export const AutoStories = createIcon(
  <>
    <path d="M6 4h10a4 4 0 0 1 4 4v12a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z" />
    <path d="M8 8h8" />
    <path d="M8 12h6" />
  </>
);

export const Description = createIcon(
  <>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </>
);

export const Share = createIcon(
  <>
    <circle cx="18" cy="5" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="19" r="2" />
    <path d="M7.7 11.2 16.3 6.8" />
    <path d="M7.7 12.8 16.3 17.2" />
  </>
);

export const Language = createIcon(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.8 12h16.4" />
    <path d="M12 3.5a12 12 0 0 1 0 17" />
    <path d="M12 3.5a12 12 0 0 0 0 17" />
  </>
);

export const AutoAwesome = createIcon(
  <>
    <path d="M12 3 9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5L12 3Z" />
    <path d="M18 3.5 17.2 5.2 15.5 6 17.2 6.8 18 8.5 18.8 6.8 20.5 6 18.8 5.2 18 3.5Z" />
  </>
);

export const ArrowLeft = createIcon(
  <>
    <path d="M19 12H8" />
    <path d="m12 6-6 6 6 6" />
  </>
);

export const ArrowUpRight = createIcon(
  <>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </>
);

export const Bookmark = createIcon(
  <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3-6 3V5a1 1 0 0 1 1-1Z" />
);

export const Brain = createIcon(
  <>
    <path d="M8 8a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0V8Z" />
    <path d="M10 5a4 4 0 0 0-4 4v1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2v1a4 4 0 0 0 4 4" />
    <path d="M14 5a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2v1a4 4 0 0 1-4 4" />
  </>
);

export const Check = createIcon(
  <path d="m5 12 4 4 10-10" />
);

export const CheckCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </>
);

export const CircleAlert = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <circle cx="12" cy="16.5" r="1" />
  </>
);

export const Clock3 = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
);

export const LightMode = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.93 19.07 1.41-1.41" />
    <path d="m17.66 6.34 1.41-1.41" />
  </>
);

export const DarkMode = createIcon(
  <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
);

export const ExternalLink = createIcon(
  <>
    <path d="M14 5h5v5" />
    <path d="M10 14 19 5" />
    <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
  </>
);

export const FileText = createIcon(
  <>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </>
);

export const Info = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <circle cx="12" cy="7.5" r="1" />
  </>
);

export const Mars = createIcon(
  <>
    <circle cx="10" cy="14" r="5" />
    <path d="M13.5 10.5 19 5" />
    <path d="M15 5h4v4" />
  </>
);

export const Plus = createIcon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>
);

export const Quote = createIcon(
  <>
    <path d="M7 10h4v6H7z" />
    <path d="M13 10h4v6h-4z" />
  </>
);

export const RotateCcw = createIcon(
  <>
    <path d="M4 4v6h6" />
    <path d="M4.5 13a8 8 0 1 0 2-5.5" />
  </>
);

export const SlidersHorizontal = createIcon(
  <>
    <path d="M4 6h8" />
    <path d="M16 6h4" />
    <path d="M12 6v0" />
    <circle cx="12" cy="6" r="2" />
    <path d="M4 12h4" />
    <path d="M10 12h10" />
    <circle cx="8" cy="12" r="2" />
    <path d="M4 18h10" />
    <path d="M16 18h4" />
    <circle cx="14" cy="18" r="2" />
  </>
);

export const Sparkles = createIcon(
  <>
    <path d="M12 3 9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5L12 3Z" />
    <path d="M18 3.5 17.2 5.2 15.5 6 17.2 6.8 18 8.5 18.8 6.8 20.5 6 18.8 5.2 18 3.5Z" />
  </>
);

export const Waves = createIcon(
  <>
    <path d="M2 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
    <path d="M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
  </>
);

export const X = createIcon(
  <>
    <path d="M5 5l14 14" />
    <path d="M19 5 5 19" />
  </>
);

export const Venus = createIcon(
  <>
    <circle cx="10" cy="10" r="5" />
    <path d="M10 15v6" />
    <path d="M7 18h6" />
  </>
);
