"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Brain,
  Cpu,
  Layers,
  Terminal,
  Calendar,
  Award,
  Mail,
  Send,
  ExternalLink,
  ChevronDown,
  Download,
  BookOpen,
  Building,
  Briefcase,
  Star,
  Activity,
  Compass,
  Users,
  Code,
  Database,
  Cloud,
  MapPin,
  Phone,
  Server,
  Play,
} from "lucide-react";

// Animation utility helper
const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ==========================================
// BRAND SVG ICONS (Lucide v1+ removes brands)
// ==========================================
function GithubIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XTwitterIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ThreadsIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.93c-2.48-.16-4.5-2.22-4.5-4.75 0-2.6 2.1-4.7 4.7-4.7.67 0 1.3.14 1.87.4l-.87 1.74a2.76 2.76 0 0 0-1-.2c-1.5 0-2.7 1.2-2.7 2.7 0 1.46 1.15 2.65 2.6 2.69v2.12z" />
    </svg>
  );
}

function RedditIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M12 6v6m-3 3s1 1 3 1 3-1 3-1" />
    </svg>
  );
}

function YoutubeIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function DiscordIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6a6 6 0 0 0-12 0c0 4.42 3 8 6 8s6-3.58 6-8z" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
      <path d="M8 18h8" />
    </svg>
  );
}

function KaggleIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 4v16M16 4l-6 7.5L17 20" />
    </svg>
  );
}

function HuggingFaceIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7c-1.5 0-3 1-3 2.5S10.5 12 12 12s3-1 3-2.5S13.5 7 12 7z" />
      <path d="M7 16c1.5 1.5 4.5 2 5 2s3.5-.5 5-2" />
    </svg>
  );
}

function LeetCodeIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function HackerRankIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l9 4v10l-9 4-9-4V7l9-4z" />
      <path d="M12 7.5L7.5 10v4l4.5 2.5 4.5-2.5v-4L12 7.5z" />
    </svg>
  );
}

function MediumIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="7" cy="12" r="4" />
      <ellipse cx="15.5" cy="12" rx="2.5" ry="4" />
      <ellipse cx="20.5" cy="12" rx="1" ry="3.5" />
    </svg>
  );
}

// ==========================================
// 1. HERO SECTION
// ==========================================
export function HeroSection({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  return (
    <section id="hero" className="min-h-dvh w-full flex flex-col items-center justify-center relative px-4 md:px-8 py-20">
      <div className="max-w-4xl text-center z-10 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/5 mb-6 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
          <span className="text-[10px] font-semibold font-mono text-[#00f2fe] uppercase tracking-wider">
            Muhsin Kalodi | Portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-space text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        >
          MUHSIN KALODI
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-space text-base md:text-2xl text-gradient-cyan-purple font-medium tracking-wide mb-8 max-w-2xl mx-auto uppercase"
        >
          Machine Learning Engineer • AI Engineer • Full Stack Software Developer
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-space text-xl md:text-3xl text-slate-100 font-bold tracking-wide mb-8"
        >
          "Building Intelligent Software That Solves Real-World Problems."
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 font-sans leading-relaxed mb-10"
        >
          Engineering production-quality ML systems, enterprise smart structures, and beautiful high-performance web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onScrollTo("academic")}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-sm font-semibold hover:opacity-90 shadow-lg hover:shadow-cyan-500/10 transition-all font-sans cursor-none"
          >
            Explore My Journey
          </button>
          <a
            href={process.env.NEXT_PUBLIC_RESUME_URL || "mailto:muhsinkalodi9311@gmail.com?subject=Requesting%20Resume%20-%20Portfolio"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#00f2fe]/40 text-sm font-semibold text-white transition-all font-sans cursor-none flex items-center gap-2"
          >
            <Download size={16} /> Download Resume
          </a>
          <button
            onClick={() => onScrollTo("projects")}
            className="px-8 py-3.5 rounded-full border border-white/10 hover:border-brand-cyan/40 hover:bg-white/5 text-sm font-semibold text-white transition-all font-sans cursor-none"
          >
            View Projects
          </button>
          <button
            onClick={() => onScrollTo("contact")}
            className="px-8 py-3.5 rounded-full border border-white/10 hover:border-brand-purple/40 hover:bg-white/5 text-sm font-semibold text-slate-300 transition-all font-sans cursor-none"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 select-none">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Voyage</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}

// ==========================================
// 2. ABOUT ME
// ==========================================
export function AboutSection() {
  return (
    <section id="about" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="text-[#00f2fe] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            ABOUT ME
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 font-sans">
              I am a passionate Machine Learning Engineer and Full Stack Software Developer with experience building production-ready AI applications, enterprise software, scalable web platforms, and intelligent automation systems.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 font-sans">
              My expertise includes Machine Learning, Deep Learning, Computer Vision, Backend Development, Cloud Deployment, and modern Full Stack Development using Python, TensorFlow, Next.js, Node.js, PostgreSQL, Docker, and modern software engineering practices.
            </p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans">
              I enjoy solving real-world business challenges using AI and building software that is scalable, maintainable, and impactful.
            </p>
          </div>

          <div className="md:col-span-2 border border-white/5 rounded-2xl p-6 bg-white/2 backdrop-blur-md">
            <h3 className="font-space text-xs font-semibold text-[#7f00ff] tracking-widest uppercase mb-4">
              Muhsin Kalodi
            </h3>
            <ul className="space-y-4 text-xs md:text-sm font-sans text-slate-300">
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#00f2fe]" />
                <span>Kerala, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#ff007f]" />
                <span className="truncate">muhsinkalodi9311@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#7f00ff]" />
                <span>+91-8778484505</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 3. ACADEMIC JOURNEY
// ==========================================
export function AcademicSection() {
  return (
    <section id="academic" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-[#ff007f] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            ACADEMIC JOURNEY
          </h2>
        </div>

        <div className="space-y-8">
          {/* Master's Degree */}
          <div className="border-l-2 border-[#ff007f]/30 pl-6 space-y-2.5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#ff007f] shadow-lg shadow-pink-500/50" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="font-space text-base md:text-lg font-semibold text-white">
                Master of Technology (Artificial Intelligence & Data Science)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 self-start sm:self-auto">
                2026 - Present
              </span>
            </div>
            <p className="text-xs md:text-sm font-space text-[#ff007f] font-medium">
              Pondicherry University — Pondicherry
            </p>
            <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
              Advanced curriculum specializing in intelligent systems, machine learning architectures, and scalable data solutions.
            </p>
          </div>

          {/* Bachelor's Degree */}
          <div className="border-l-2 border-[#ff007f]/30 pl-6 space-y-2.5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#ff007f] shadow-lg shadow-pink-500/50" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="font-space text-base md:text-lg font-semibold text-white">
                Bachelor of Technology (Artificial Intelligence & Data Science)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 self-start sm:self-auto">
                2022 - 2026
              </span>
            </div>
            <p className="text-xs md:text-sm font-space text-[#ff007f] font-medium">
              Excel Engineering College — Komarapalayam, Namakkal, Tamil Nadu
            </p>
            <p className="text-xs md:text-sm text-slate-300 font-mono">
              CGPA: <span className="font-bold text-[#ff007f]">7.0 / 10</span>
            </p>
            <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
              Curriculum focused on Artificial Neural Networks, Data Analytics, Deep Learning frameworks, and Distributed Cloud Computing.
            </p>
          </div>

          {/* 12th */}
          <div className="border-l-2 border-[#ff007f]/30 pl-6 space-y-2.5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#ff007f] shadow-lg shadow-pink-500/50" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="font-space text-base md:text-lg font-semibold text-white">
                Higher Secondary Education (12th Standard)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] self-start sm:self-auto">
                2022 Completed
              </span>
            </div>
            <p className="text-xs md:text-sm font-space text-[#ff007f] font-medium">
              PKMMHSS
            </p>
            <p className="text-xs md:text-sm text-slate-300 font-mono">
              Score: <span className="font-bold text-[#ff007f]">89%</span>
            </p>
          </div>

          {/* 10th */}
          <div className="border-l-2 border-[#ff007f]/30 pl-6 space-y-2.5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#ff007f] shadow-lg shadow-pink-500/50" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="font-space text-base md:text-lg font-semibold text-white">
                Secondary School Education (10th Standard)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] self-start sm:self-auto">
                2020 Completed
              </span>
            </div>
            <p className="text-xs md:text-sm font-space text-[#ff007f] font-medium">
              PKMMHSS
            </p>
            <p className="text-xs md:text-sm text-slate-300 font-mono">
              Score: <span className="font-bold text-[#ff007f]">82%</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 4. TECHNICAL SKILLS UNIVERSE
// ==========================================
export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "Java", "SQL"],
      color: "text-[#00f2fe]",
    },
    {
      title: "Machine Learning & AI",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "CNN", "Feature Engineering", "Model Training", "Model Evaluation"],
      color: "text-[#9d4edd]",
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Express.js", "Flask", "Django", "REST APIs"],
      color: "text-[#ff007f]",
    },
    {
      title: "Frontend Frameworks",
      skills: ["Next.js", "React", "HTML5", "CSS3"],
      color: "text-indigo-400",
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB Atlas", "SQLite", "Firebase"],
      color: "text-emerald-400",
    },
    {
      title: "DevOps & Tools",
      skills: ["Git", "GitHub", "Docker", "Linux", "Postman", "Jupyter Notebook", "Power BI"],
      color: "text-slate-300",
    },
  ];

  return (
    <section id="skills" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Terminal className="text-[#00f2fe] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            TECHNICAL SKILLS UNIVERSE
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md hover:border-brand-cyan/25 transition-all duration-300"
            >
              <h3 className={`font-space text-sm font-semibold tracking-wider mb-4 ${cat.color}`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-2.5 py-1.5 rounded bg-white/5 border border-white/10 hover:border-brand-cyan/40 hover:text-white transition-all text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 5. ML JOURNEY
// ==========================================
export function MLJourneySection() {
  const steps = [
    { name: "Data Collection", desc: "Aggregating multi-source structured and visual assets." },
    { name: "Data Cleaning", desc: "Resolving outliers, null matrices, and formatting anomalies." },
    { name: "Feature Engineering", desc: "Constructing PCA pipelines and vector embeddings transformations." },
    { name: "Exploratory Data Analysis", desc: "Analyzing statistical properties, correlation profiles, and graphs." },
    { name: "Model Training", desc: "Fitting Deep CNN arrays, transformers, and regression nets." },
    { name: "Hyperparameter Tuning", desc: "Optimizing learning rates, weight decays, and batch dimensions." },
    { name: "Model Evaluation", desc: "Validating ROC-AUC curves, precision matrices, and weights integrity." },
    { name: "Deployment", desc: "Shipping scalable microservices wrapped inside container units." },
  ];

  return (
    <section id="ml-journey" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="text-[#ff007f] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            MACHINE LEARNING JOURNEY
          </h2>
        </div>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans mb-8">
          The structural lifecycle of compiling, optimizing, and serving AI agents in real-world environments:
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md flex flex-col justify-between hover:border-[#ff007f]/20 transition-all duration-300 min-h-[140px]"
            >
              <div>
                <span className="text-[10px] font-mono text-[#ff007f] mb-2 block">
                  STAGE 0{idx + 1}
                </span>
                <h3 className="font-space text-xs md:text-sm font-semibold text-white mb-2">
                  {step.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 6. ENTERPRISE ERP & POS JOURNEY
// ==========================================
export function ERPJourneySection() {
  const erpModules = [
    { name: "Inventory Management", desc: "Automated warehouse stocks auditing and barcode triggers." },
    { name: "Billing Engine & GST", desc: "Integrated taxes calculators with local receipts compliance." },
    { name: "POS Client", desc: "Offline-first generation arrays for fast cashier checkouts." },
    { name: "Sales Analytics", desc: "Aggregated reports visualizations for business indicators." },
    { name: "Customer Relations", desc: "Secured client accounts profiles with activity metrics." },
    { name: "Role Authorization", desc: "Granular access matrix settings for employees and managers." },
    { name: "Cloud Sync Database", desc: "Automated local backups syncing to secure cloud instances." },
    { name: "Business Intelligence", desc: "Statistical forecast pipelines for future demands planning." },
  ];

  return (
    <section id="erp-journey" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <Layers className="text-[#00f2fe] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            ENTERPRISE ERP & POS JOURNEY
          </h2>
        </div>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans mb-8">
          Developing robust, highly secure business structures that run seamlessly. The corresponding smart city buildings model highlights these module integrations:
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {erpModules.map((mod, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md hover:border-[#00f2fe]/20 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <h3 className="font-space text-xs md:text-sm font-semibold text-white mb-2">
                  {mod.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 7. PROFESSIONAL EXPERIENCE
// ==========================================
export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="text-[#7f00ff] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            PROFESSIONAL EXPERIENCE
          </h2>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/5 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div>
                <h3 className="font-space text-base md:text-xl font-bold text-white">
                  Machine Learning Engineer Intern
                </h3>
                <p className="text-xs font-space text-[#00f2fe] font-semibold">
                  WexorAI — Kozhikode, Kerala
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 self-start sm:self-auto">
                Dec 2024 - Jan 2025
              </span>
            </div>
            
            <ul className="space-y-3 text-xs md:text-sm font-sans text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7f00ff] mt-1.5 shrink-0" />
                <span>Built end-to-end Machine Learning pipelines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7f00ff] mt-1.5 shrink-0" />
                <span>Orchestrated data preprocessing and feature engineering pipelines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7f00ff] mt-1.5 shrink-0" />
                <span>Performed model training, hyperparameter tuning, and comprehensive evaluation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7f00ff] mt-1.5 shrink-0" />
                <span>Automated preprocessing routines using Python libraries like Pandas and NumPy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7f00ff] mt-1.5 shrink-0" />
                <span>Collaborated via Git-based workflows and integrated ML models into scalable software layers.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 8. FEATURED PROJECTS
// ==========================================
export function ProjectsSection() {
  const projects = [
    {
      title: "Motoheadz Workshop ERP",
      desc: "A comprehensive Enterprise Resource Planning system tailored for workshop management.",
      techs: ["Next.js", "FastAPI", "MongoDB", "Local Cache DB", "Google Drive Backup"],
      color: "border-[#9d4edd]/20 hover:border-[#9d4edd]/60",
      link: "https://moto.wexorai.com",
    },
    {
      title: "Student Performance Prediction Analysis",
      desc: "A Machine Learning pipeline predicting academic performance metrics based on historical and behavioral student records.",
      techs: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      color: "border-[#00f2fe]/20 hover:border-[#00f2fe]/60",
    },
    {
      title: "StudentDex",
      desc: "Full-stack Student Information Management System featuring secure multi-role auth, attendance trackers, and CSV/Excel import tools.",
      techs: ["Next.js", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
      color: "border-[#7f00ff]/20 hover:border-[#7f00ff]/60",
    },
    {
      title: "CHEDI",
      desc: "Computer Vision application using deep Convolutional Neural Networks (CNN) for real-time plant disease detection.",
      techs: ["TensorFlow", "OpenCV", "CNN", "Streamlit"],
      color: "border-[#ff007f]/20 hover:border-[#ff007f]/60",
    },
  ];

  return (
    <section id="projects" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <Layers className="text-[#00f2fe] w-6 h-6" />
            <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Showcase
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-white/2 border backdrop-blur-md flex flex-col justify-between min-h-[260px] transition-all duration-300 ${proj.color}`}
            >
              <div>
                <h3 className="font-space text-base font-bold text-white mb-2">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                  {proj.desc}
                </p>
              </div>
              
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techs.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] hover:text-[#00f2fe]/80 transition-colors mt-2 cursor-none"
                  >
                    View Live <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 9. CERTIFICATIONS
// ==========================================
export function CertificationsSection() {
  const certs = [
    { title: "Google AI Essentials" },
    { title: "Google Foundations of Cybersecurity" },
    { title: "Play It Safe: Manage Security Risks" },
    { title: "Cisco Introduction to Modern AI" },
    { title: "Cisco Introduction to Cybersecurity" },
    { title: "NPTEL – Introduction to Industrial Internet of Things" },
    { title: "GUVI – Mastering MongoDB" },
    { title: "MongoDB Atlas Workshop – NIT Trichy" },
  ];

  return (
    <section id="certifications" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Award className="text-[#ff007f] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            CERTIFICATIONS
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md flex items-center justify-between hover:border-[#ff007f]/20 transition-all duration-300"
            >
              <h3 className="font-space text-xs md:text-sm font-semibold text-white">
                {cert.title}
              </h3>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 10. LEADERSHIP & COMMUNITY
// ==========================================
export function LeadershipSection() {
  const items = [
    { name: "National Service Scheme (NSS)", desc: "Orchestrated local outreach and civic action campaigns." },
    { name: "Google Developer Groups (GDG)", desc: "Facilitated collaborative learning workshops on AI tools." },
    { name: "FOSSMeet", desc: "Collaborated with open-source developers to design developer utilities." },
    { name: "TECBLAZE 2024", desc: "Managed technical hackathons and event-level execution." },
  ];

  return (
    <section id="leadership" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-[#00f2fe] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            LEADERSHIP & COMMUNITY
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md hover:border-[#00f2fe]/20 transition-all duration-300"
            >
              <h3 className="font-space text-sm font-semibold text-white mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 11. GITHUB DASHBOARD
// ==========================================
export function GitHubSection() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/muhsinkalodi/repos?sort=stars&per_page=3");
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data)) {
            setRepos(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
      }
      
      // Fallback
      setRepos([
        { name: "StudentDex", description: "Full-stack Student Information Management System with secure role auth.", stargazers_count: 12, language: "TypeScript" },
        { name: "student-performance-predictor", description: "ML model predicting student performance using academic metrics.", stargazers_count: 8, language: "Python" },
        { name: "plant-disease-detection", description: "CNN-based plant disease classifier served using Streamlit.", stargazers_count: 5, language: "Python" }
      ]);
      setLoading(false);
    };

    fetchRepos();
  }, []);

  return (
    <section id="github" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <GithubIcon className="text-[#00f2fe] w-6 h-6" />
            <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
              GITHUB DASHBOARD
            </h2>
          </div>
          <a
            href="https://github.com/muhsinkalodi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-none font-mono"
          >
            muhsinkalodi <ExternalLink size={12} />
          </a>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-xs text-slate-500 font-mono">Loading repository feeds...</div>
          ) : (
            repos.map((repo, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#030014]/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#00f2fe]/20 transition-all duration-300"
              >
                <div className="space-y-1">
                  <h3 className="font-space text-sm font-semibold text-white">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-lg">
                    {repo.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-mono self-start sm:self-auto">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> {repo.stargazers_count}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                    {repo.language}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 12. ACHIEVEMENTS
// ==========================================
export function AchievementsSection() {
  const stats = [
    { value: "10+", label: "Projects Completed" },
    { value: "15+", label: "GitHub Repositories" },
    { value: "25+", label: "Technologies Mastered" },
    { value: "8", label: "Certifications Earned" },
  ];

  return (
    <section id="achievements" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Activity className="text-[#ff007f] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            ACHIEVEMENTS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md text-center flex flex-col items-center justify-center gap-1 hover:border-brand-purple/20 transition-all"
            >
              <span className="font-space text-3xl md:text-4xl font-extrabold tracking-tight text-[#00f2fe] glow-glow">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs font-sans text-slate-400 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 13. FUTURE VISION
// ==========================================
export function FutureVisionSection() {
  return (
    <section id="vision" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <Compass className="text-[#7f00ff] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            FUTURE VISION
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <blockquote className="border-l-4 border-[#00f2fe] pl-6 text-base md:text-xl font-medium font-sans text-slate-200 italic leading-relaxed">
              "I believe Artificial Intelligence should solve real-world problems, empower businesses, and improve everyday life. My mission is to engineer intelligent, scalable, and impactful software that transforms ideas into real solutions."
            </blockquote>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-[#030014]/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-pink/20 to-brand-cyan/20 rounded-full blur-2xl" />
            <h3 className="font-space text-xs font-semibold text-slate-200 tracking-wider mb-4 uppercase">
              Key Objectives
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-300 font-sans">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                <span>Robust production pipelines</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7f00ff]" />
                <span>On-device vision execution</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f]" />
                <span>Modular cloud-based backends</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 14. SOCIAL HUB
// ==========================================
export function SocialHubSection() {
  const socials = [
    { icon: <GithubIcon size={18} />, label: "GitHub", href: "https://github.com/muhsinkalodi" },
    { icon: <LinkedinIcon size={18} />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <InstagramIcon size={18} />, label: "Instagram", href: "https://instagram.com" },
    { icon: <XTwitterIcon size={18} />, label: "X / Twitter", href: "https://x.com" },
    { icon: <ThreadsIcon size={18} />, label: "Threads", href: "https://threads.net" },
    { icon: <RedditIcon size={18} />, label: "Reddit", href: "https://reddit.com" },
    { icon: <YoutubeIcon size={18} />, label: "YouTube", href: "https://youtube.com" },
    { icon: <DiscordIcon size={18} />, label: "Discord", href: "https://discord.com" },
    { icon: <KaggleIcon size={18} />, label: "Kaggle", href: "https://kaggle.com" },
    { icon: <HuggingFaceIcon size={18} />, label: "Hugging Face", href: "https://huggingface.co" },
    { icon: <LeetCodeIcon size={18} />, label: "LeetCode", href: "https://leetcode.com" },
    { icon: <HackerRankIcon size={18} />, label: "HackerRank", href: "https://hackerrank.com" },
    { icon: <MediumIcon size={18} />, label: "Medium", href: "https://medium.com" },
    { icon: <ExternalLink size={18} className="text-slate-400" />, label: "Portfolio", href: "#hero" },
    { icon: <Mail size={18} />, label: "Email Link", href: "mailto:muhsinkalodi9311@gmail.com" },
  ];

  return (
    <section id="socials" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Compass className="text-[#00f2fe] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            SOCIAL HUB UNIVERSE
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 text-center hover:border-brand-cyan/20 hover:bg-white/5 transition-all duration-300 cursor-none"
            >
              <div className="p-3 rounded-full bg-slate-900 border border-white/5 text-slate-300">
                {social.icon}
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-400 hover:text-white transition-colors">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 15. CONTACT SECTION
// ==========================================

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Helper function to format data for Netlify's handler
  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ 
        "form-name": "portfolio-contact", 
        ...formState 
      }),
    })
      .then((response) => {
        if (response.ok) {
          setStatus("success");
          setFormState({ name: "", email: "", message: "" });
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section id="contact" className="min-h-dvh w-full flex items-center justify-center px-4 md:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="glass-panel p-5 sm:p-8 md:p-12 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <Mail className="text-[#ff007f] w-6 h-6" />
          <h2 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white">
            CONTACT SIGNAL HUB
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/5 self-start w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-semibold font-mono text-green-400 uppercase tracking-wider">
                Availability: Open For Roles
              </span>
            </div>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans mb-6">
              Get in touch to collaborate on ML projects, full-stack systems, or general technology reviews.
            </p>

            <ul className="space-y-4 text-xs md:text-sm font-mono text-slate-300 mb-6">
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#00f2fe]" />
                <span>Kerala, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#ff007f]" />
                <span>+91-8778484505</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#7f00ff]" />
                <span>muhsinkalodi9311@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Form attributes for Netlify processing */}
          <form 
            name="portfolio-contact" 
            method="POST" 
            onSubmit={handleSubmit} 
            className="space-y-4 font-sans"
          >
            {/* Essential hidden token field for NextJS SSR routing */}
            <input type="hidden" name="form-name" value="portfolio-contact" />

            <div>
              <label htmlFor="form-name" className="block text-xs font-medium text-slate-400 mb-1.5">
                Name
              </label>
              <input
                id="form-name"
                name="name" // Added explicit name property
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-[#030014]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f2fe]/40 transition-colors"
                placeholder="Enter name"
              />
            </div>
            
            <div>
              <label htmlFor="form-email" className="block text-xs font-medium text-slate-400 mb-1.5">
                Email Address
              </label>
              <input
                id="form-email"
                name="email" // Added explicit name property
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-[#030014]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f2fe]/40 transition-colors"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label htmlFor="form-message" className="block text-xs font-medium text-slate-400 mb-1.5">
                Message Request
              </label>
              <textarea
                id="form-message"
                name="message" // Added explicit name property
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-[#030014]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f2fe]/40 transition-colors resize-none"
                placeholder="Write message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg cursor-none disabled:opacity-50 transition-opacity"
            >
              {status === "sending" ? (
                "Encrypting Signal..."
              ) : status === "success" ? (
                "Transmission Dispatched!"
              ) : status === "error" ? (
                "Transmission Failed. Retry."
              ) : (
                <>
                  Transmit Signals <Send size={12} />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
