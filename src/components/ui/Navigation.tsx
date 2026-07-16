"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Download } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About Me" },
  { id: "academic", label: "Academic Journey" },
  { id: "skills", label: "Technical Skills Universe" },
  { id: "ml-journey", label: "Machine Learning Journey" },
  { id: "erp-journey", label: "Enterprise ERP & POS Journey" },
  { id: "experience", label: "Professional Experience" },
  { id: "projects", label: "Featured Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "leadership", label: "Leadership & Community" },
  { id: "github", label: "GitHub Dashboard" },
  { id: "achievements", label: "Achievements" },
  { id: "vision", label: "Future Vision" },
  { id: "socials", label: "Social Hub" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(progress);
      }

      // Check active section
      let currentSection = "hero";
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the middle of the viewport
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Top Floating Glass Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-6xl mx-auto pointer-events-none">
        <div className="glass-nav w-full py-3 px-6 flex items-center justify-between pointer-events-auto backdrop-blur-md">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-space text-lg font-bold tracking-tight text-white flex items-center gap-1.5 focus:outline-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse" />
            <span>MUHSIN.KALODI</span>
          </button>

          {/* Core Desktop Navigation Checkpoints */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollTo("about")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeSection === "about" ? "text-white" : "text-slate-400"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollTo("skills")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeSection === "skills" ? "text-white" : "text-slate-400"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo("erp-journey")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeSection === "erp-journey" ? "text-white" : "text-slate-400"
              }`}
            >
              ERP City
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeSection === "projects" ? "text-white" : "text-slate-400"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className={`text-sm font-medium transition-colors hover:text-white ${
                activeSection === "contact" ? "text-white" : "text-slate-400"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/Muhsin_Kalodi_Resume.pdf"
              download="Muhsin_Kalodi_Resume.pdf"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 text-white transition-all flex items-center gap-1.5"
            >
              Resume <Download size={13} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-[#00f2fe]/40 hover:text-white text-slate-300 transition-all flex items-center gap-1.5"
            >
              Connect <ArrowRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-4 right-4 bg-brand-bg/95 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-xl shadow-2xl pointer-events-auto md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            {SECTIONS.filter((_, idx) => [0, 1, 3, 5, 7, 14].includes(idx)).map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`text-left font-space text-lg font-medium border-b border-white/5 pb-2 hover:text-[#00f2fe] ${
                  activeSection === sec.id ? "text-white" : "text-slate-400"
                }`}
              >
                {sec.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-2 text-center text-xs font-semibold py-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-lg"
            >
              Connect Now
            </button>
          </div>
        )}
      </header>

      {/* Side Dot Tracker Pinned to Right (Desktop only) */}
      <aside className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3.5">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative flex items-center justify-end focus:outline-none"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Tooltip */}
              <span className="absolute right-6 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 px-2.5 py-1 rounded bg-[#030014]/90 border border-white/10 text-[10px] font-semibold text-slate-300 whitespace-nowrap transition-all duration-200 pointer-events-none font-mono">
                {sec.label}
              </span>
              
              {/* Active Outline Circle */}
              <span
                className={`w-5 h-5 rounded-full border border-[#00f2fe]/40 absolute transition-all duration-300 scale-0 ${
                  isActive ? "scale-100" : "group-hover:scale-50 opacity-20"
                }`}
              />

              {/* Core Dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 relative z-10 ${
                  isActive ? "bg-[#00f2fe] scale-125 glow-glow" : "bg-slate-500 hover:bg-slate-300"
                }`}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
}
