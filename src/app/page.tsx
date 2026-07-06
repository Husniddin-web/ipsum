import { AnalysisSection } from "./_components/analysis-section";
import { GallerySection } from "./_components/gallery-section";
import { HeroSection } from "./_components/hero-section";
import { ProcessSection } from "./_components/process-section";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { TrustSection } from "./_components/trust-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AnalysisSection />
        <TrustSection />
        <ProcessSection />
        <GallerySection />
      </main>
      <SiteFooter />
    </>
  );
}
