"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/ui/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import {
  HeroSection,
  AboutSection,
  AcademicSection,
  SkillsSection,
  MLJourneySection,
  ERPJourneySection,
  ExperienceSection,
  ProjectsSection,
  CertificationsSection,
  LeadershipSection,
  GitHubSection,
  AchievementsSection,
  FutureVisionSection,
  SocialHubSection,
  ContactSection,
} from "@/components/sections";

// Load 3D scene container on client side only to prevent hydration mismatches
const SceneContainer = dynamic(
  () => import("@/components/canvas/SceneContainer"),
  { ssr: false }
);

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full min-h-dvh">
      {/* 3D background WebGL Canvas */}
      <SceneContainer />

      {/* Floating global UI indicators */}
      <Navigation />
      <CustomCursor />

      {/* Foreground Content container */}
      <div className="relative z-10 w-full flex flex-col pointer-events-none">
        {/* Enable pointer events on standard card layouts so click buttons/inputs work */}
        <div className="w-full flex flex-col pointer-events-auto">
          <HeroSection onScrollTo={scrollTo} />
          <AboutSection />
          <AcademicSection />
          <SkillsSection />
          <MLJourneySection />
          <ERPJourneySection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <LeadershipSection />
          <GitHubSection />
          <AchievementsSection />
          <FutureVisionSection />
          <SocialHubSection />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
