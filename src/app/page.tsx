import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { CoursesPreview } from "@/components/home/CoursesPreview";
import { StorePreview } from "@/components/home/StorePreview";
import { AboutTrainer } from "@/components/home/AboutTrainer";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadMagnet } from "@/components/home/LeadMagnet";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StatsBar />
      <CoursesPreview />
      <StorePreview />
      <AboutTrainer />
      <Testimonials />
      <LeadMagnet />
    </div>
  );
}
