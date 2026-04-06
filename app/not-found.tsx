import Link from "next/link";
import { fontVariables } from "@/app/fonts";

export default function NotFound() {
  return (
    <html lang="vi" className={`${fontVariables} dark`}>
      <body className="antialiased bg-background text-on-surface flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-6xl font-black text-primary">404</p>
          <p className="text-on-surface-variant">Trang không tồn tại</p>
          <Link href="/" className="text-primary hover:underline text-sm">
            Về trang chủ
          </Link>
        </div>
      </body>
    </html>
  );
}
