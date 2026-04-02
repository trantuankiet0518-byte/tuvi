interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: string;
}

const sizeStyles = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-14 h-14 text-base",
};

export default function Avatar({ src, alt = "Avatar", size = "md", fallback }: AvatarProps) {
  const initials = fallback
    ? fallback.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div
      className={`
        ${sizeStyles[size]} rounded-full overflow-hidden
        flex-shrink-0
        bg-surface-container-high flex items-center justify-center
      `}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold text-primary">{initials}</span>
      )}
    </div>
  );
}
