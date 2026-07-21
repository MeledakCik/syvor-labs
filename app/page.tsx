import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import ArtifackBuilder from "@/components/ArtifackBuilder";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen select-none w-full max-w-[100vw] overflow-x-hidden bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-[#0E0E0F] dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <About />
        <ArtifackBuilder />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
