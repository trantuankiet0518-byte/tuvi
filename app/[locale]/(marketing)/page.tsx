import HomeHero from "@/components/organisms/HomeHero";
import HomeIntro from "@/components/organisms/HomeIntro";
import HomeBenefits from "@/components/organisms/HomeBenefits";
import HomeCTA from "@/components/organisms/HomeCTA";

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
