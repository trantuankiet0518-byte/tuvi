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
    <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl hover:border-primary/20 transition-all duration-300">
      <Avatar src={avatarSrc} fallback={name} size="md" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-on-surface truncate">{name}</p>
        {email && (
          <p className="text-xs text-on-surface-variant truncate">{email}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-1">
        {role && (
          <Badge variant="outline">{role}</Badge>
        )}
        {status && (
          <Badge variant={status === "active" ? "success" : "secondary"}>
            {status}
          </Badge>
        )}
      </div>
    </div>
  );
}
