import Icon from "@/components/atoms/Icon";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div
      className="group p-10 rounded-[2.5rem] border border-white/10 bg-transparent backdrop-blur-xl hover:border-primary/30 transition-all duration-500 flex flex-col items-center text-center shadow-xl shadow-background/50 hover:-translate-y-2"
    >
      <div className="w-20 h-20 rounded-3xl border border-white/10 bg-transparent flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-inner backdrop-blur-xl">
        <Icon name={icon} className="text-4xl" />
      </div>
      <h3 className="text-xl font-black mb-4 text-on-surface tracking-tight uppercase">{title}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{description}</p>
    </div>
  );
}
