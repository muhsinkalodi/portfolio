import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhsin Kalodi | AI Engineer, Full Stack Developer & M.Tech Student",
  description: "Explore the premium cinematic 3D portfolio of Muhsin Kalodi. Showcasing projects in AI/ML engineering, Deep Learning, Cloud Systems, and Full Stack Development. M.Tech AI & DS student at Pondicherry University.",
  keywords: [
    "Muhsin Kalodi", "AI Engineer", "Machine Learning Engineer", "Full Stack Developer", 
    "Student at Pondicherry University", "Pondicherry University Student", "M.Tech AI & DS", 
    "Kerala Developer", "Motoheadz ERP", "React", "Next.js", "Python", "Deep Learning", 
    "TensorFlow", "3D Portfolio", "WexorAI Intern"
  ],
  authors: [{ name: "Muhsin Kalodi" }],
  openGraph: {
    title: "Muhsin Kalodi | AI & Full Stack Developer Portfolio",
    description: "An immersive cinematic scrolling experience exploring advanced machine learning projects, ERP systems, and full stack development by Muhsin Kalodi, M.Tech student at Pondicherry University.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-brand-bg text-slate-100 min-h-dvh overflow-x-hidden selection:bg-brand-cyan/30 selection:text-white">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
