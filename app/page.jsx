import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import CategoriesSection from "../components/sections/CategoriesSection";
import FeaturedSection from "../components/sections/FeaturedSection";
import TrendingSection from "../components/sections/TrendingSection";
import PromoBanner from "../components/sections/PromoBanner";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import InstagramSection from "../components/sections/InstagramSection";
import MarqueeBar from "../components/sections/MarqueeBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <CategoriesSection />
        <FeaturedSection />
        <PromoBanner />
        <TrendingSection />
        <TestimonialsSection />
        <InstagramSection />
      </main>
      <Footer />
    </>
  );
}
