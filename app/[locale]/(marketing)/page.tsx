import HomeHero from "@/components/organisms/marketing/HomeHero";
import HomeIntro from "@/components/organisms/marketing/HomeIntro";
import HomeBenefits from "@/components/organisms/marketing/HomeBenefits";
import HomeCTA from "@/components/organisms/marketing/HomeCTA";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeIntro />
      <HomeBenefits />
      <HomeCTA />
    </main>
  );
}
