import { useTranslations } from "next-intl";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Badge from "@/components/atoms/Badge";

interface PricingCardProps {
  plan: "free" | "pro" | "master";
  price: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({ plan, price, features, highlighted = false }: PricingCardProps) {
  const t = useTranslations("billing");

  return (
    <div
      className={`
        rounded-xl p-6 border flex flex-col gap-5 transition-all duration-300
        ${highlighted
          ? "bg-primary/5 border-primary/30 shadow-[0_0_40px_rgba(255,193,116,0.1)]"
          : "bg-surface-container-low border-outline-variant/10 hover:border-primary/20"
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">
            {t(`plans.${plan}`)}
          </p>
          <p className="text-3xl font-black text-on-surface mt-1">{price}</p>
        </div>
        {highlighted && <Badge variant="success">{t("popular")}</Badge>}
      </div>

      <ul className="space-y-2 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Icon className="text-sm text-primary" name="check_circle" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={highlighted ? "primary" : "ghost"} className="w-full">
        {t("getStarted")}
      </Button>
    </div>
  );
}
