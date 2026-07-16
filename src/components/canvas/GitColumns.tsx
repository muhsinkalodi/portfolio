"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollState";

interface BarProps {
  position: [number, number, number];
  maxHeight: number;
  color: string;
  activeProgress: number;
}

function GitBar({ position, maxHeight, color, activeProgress }: BarProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Lerp height based on scroll state active status
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, activeProgress, 0.08);
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + maxHeight / 2, position[2]]} scale={[1, 0.01, 1]}>
      <boxGeometry args={[0.3, maxHeight, 0.3]} />
      <meshPhysicalMaterial
        color="#090d16"
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.9}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.3, maxHeight, 0.3)]} />
        <lineBasicMaterial color={color} linewidth={1} />
      </lineSegments>
    </mesh>
  );
}

export default function GitColumns() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Positioned around Section 11 / 12 target range (Y: -7.5 to -9.0)
  const basePosition: [number, number, number] = [0, -7.8, -1.0];

  const columnsData = useMemo(() => {
    const colors = ["#00f2fe", "#00ff66", "#3b82f6", "#10b981"];
    const items = [];
    let idx = 0;
    
    // Generate a 7x4 grid of contribution bars
    for (let x = -3; x <= 3; x++) {
      for (let z = -1; z <= 2; z++) {
        const height = 0.5 + Math.random() * 2.0;
        // Color based on height (denser commits = brighter cyan/green)
        let color = "#1e293b"; // low
        if (height > 1.8) {
          color = "#00ff66"; // high commits
        } else if (height > 1.2) {
          color = "#00f2fe"; // medium commits
        } else if (height > 0.7) {
          color = "#3b82f6"; // low commits
        }
        
        items.push({
          pos: [x * 0.7, 0, z * 0.7] as [number, number, number],
          maxHeight: height,
          color,
        });
        idx++;
      }
    }
    return items;
  }, []);

  const progressRef = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Active for GitHub (10) and Achievements (11) sections
    const isGitSection = scrollState.activeSection === 10 || scrollState.activeSection === 11;
    const targetProgress = isGitSection ? 1.0 : 0.01;
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetProgress, 0.05);

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, isGitSection ? 1.0 : 0.05, 0.08));

    // Slow layout rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
  });

  return (
    <group ref={groupRef} position={basePosition} scale={[0.05, 0.05, 0.05]}>
      {/* Visual platform */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0.3]}>
        <planeGeometry args={[6.0, 4.0]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {columnsData.map((col, idx) => (
        <GitBar
          key={idx}
          position={col.pos}
          maxHeight={col.maxHeight}
          color={col.color}
          activeProgress={progressRef.current}
        />
      ))}
    </group>
  );
}
