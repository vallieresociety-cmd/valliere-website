import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Culture from "@/components/Culture";
import Traditions from "@/components/Traditions";
import Pillars from "@/components/Pillars";
import Vetting from "@/components/Vetting";
import Faq from "@/components/Faq";
import Application from "@/components/Application";
import GrandSignature from "@/components/GrandSignature";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <Manifesto />
        <Culture />
        <Traditions />
        <Pillars />
        <Vetting />
        <Faq />
        <Application />
      </main>
      <GrandSignature />
      <Footer />
    </LanguageProvider>
  );
}
