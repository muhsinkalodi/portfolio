"use client";

import SceneContainer from "@/components/canvas/SceneContainer";
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

      {/* Global UI */}
      <Navigation />
      <CustomCursor />

      {/* Scrollable Content Sections overlaying the canvas */}
      <div className="relative z-10 w-full flex flex-col items-center">
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
    </main>
  );
}
