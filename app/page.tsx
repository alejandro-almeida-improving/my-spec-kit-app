import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HeroCarousel } from "./components/hero-carousel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
      </main>
      <Footer />
    </div>
  );
}
