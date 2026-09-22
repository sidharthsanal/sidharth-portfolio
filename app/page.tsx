import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FeaturedWork from "@/components/FeaturedWork";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Statement from "@/components/Statement";
import Work from "@/components/Work";

export default function Page() {
  return (
    <>
      <main id="main">
        {/* 1. HERO (ink) */}
        <Hero />

        {/* 2. ABOUT (ivory) */}
        <About />

        {/* 2b. BY THE NUMBERS & APPROACH (ivory) */}
        <Metrics />
        <Statement />

        {/* 2c. SERVICES / WHAT I DO (ink) */}
        <Services />

        {/* 3. WORK (ink) */}
        <FeaturedWork />
        <Work />

        {/* 4. EXPERIENCE & SKILLS */}
        <Experience />
        <Skills />

        {/* 5. CERTIFICATES (ink) */}
        <Certifications />

        {/* 6. CONTACT (ink) */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
