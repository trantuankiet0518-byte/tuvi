import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";

interface UserCardProps {
  name: string;
  email?: string;
  role?: string;
  avatarSrc?: string;
  status?: "active" | "inactive";
}

export default function UserCard({ name, email, role, avatarSrc, status }: UserCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-transparent p-4 transition-all duration-300 backdrop-blur-xl hover:border-primary/20">
      <Avatar src={avatarSrc} fallback={name} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {email && <p className="truncate text-xs text-on-surface-variant">{email}</p>}
      </div>
      <div className="flex flex-col items-end gap-1">
        {role && <Badge variant="outline">{role}</Badge>}
        {status && <Badge variant={status === "active" ? "success" : "secondary"}>{status}</Badge>}
      </div>
    </div>
  );
}
