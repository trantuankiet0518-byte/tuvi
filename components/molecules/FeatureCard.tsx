import Icon from "@/components/atoms/Icon";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-8 rounded-[2rem] border border-white/10 bg-transparent backdrop-blur-xl shadow-lg shadow-background/50 hover:border-primary/20 transition-all group active:scale-95">
      <div className="w-12 h-12 rounded-2xl border border-primary/20 bg-transparent flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        <Icon name={icon} className="text-2xl" />
      </div>
      <h4 className="font-black text-on-surface mb-3 text-sm uppercase tracking-wider">{title}</h4>
      <p className="text-xs font-medium leading-relaxed">{description}</p>
    </div>
  );
}
