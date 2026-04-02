import ThuVienHeader from "@/components/organisms/ThuVienHeader";
import ThuVienBento from "@/components/organisms/ThuVienBento";
import ThuVienGuide from "@/components/organisms/ThuVienGuide";

export default function ThuVienPage() {
  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <ThuVienHeader />
      <ThuVienBento />
      <ThuVienGuide />
    </main>
  );
}
