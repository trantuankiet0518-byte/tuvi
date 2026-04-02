import { Link } from "@/i18n/navigation";

/**
 * Không bọc <html>/<body> — đã có trong app/[locale]/layout.tsx.
 * Lồng html gây DOM không hợp lệ và lỗi hydration.
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <p className="text-6xl font-black text-primary">404</p>
        <p className="text-on-surface-variant">Trang không tồn tại</p>
        <Link href="/" className="text-primary hover:underline text-sm inline-block">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
