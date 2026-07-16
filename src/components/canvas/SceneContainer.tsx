"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import CameraRig from "./CameraRig";
import ParticleTunnel from "./ParticleTunnel";
import TechConstellation from "./TechConstellation";
import SmartCity from "./SmartCity";
import FloatingScreens from "./FloatingScreens";
import GitColumns from "./GitColumns";

export default function SceneContainer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030014] overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#030014"]} />
        
        {/* Core Lighting System */}
        <ambientLight intensity={0.25} />
        
        {/* Glowing Colored Space Lights */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7f00ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#00f2fe" />
        <pointLight position={[0, 5, -10]} intensity={0.8} color="#ff007f" />
        
        {/* Directional accent light */}
        <directionalLight position={[5, 10, 2]} intensity={0.5} color="#ffffff" />

        {/* Camera Rig (Scroll & Mouse parallax controller) */}
        <CameraRig />

        {/* 3D Visual Environments */}
        <ParticleTunnel />
        <TechConstellation />
        <SmartCity />
        <FloatingScreens />
        <GitColumns />
      </Canvas>
    </div>
  );
}
