"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollState";

interface BuildingProps {
  position: [number, number, number];
  maxHeight: number;
  color: string;
  label: string;
  activeProgress: number;
}

function SmartBuilding({ position, maxHeight, color, activeProgress }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Interpolated height based on the section scroll progress
  const currentHeight = maxHeight * activeProgress;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, activeProgress, 0.08);
    }
  });

  return (
    <group position={position}>
      {/* Pinned base, so it scales upwards from ground */}
      <mesh ref={meshRef} position={[0, maxHeight / 2, 0]} scale={[1, 0.01, 1]}>
        <boxGeometry args={[1.0, maxHeight, 1.0]} />
        <meshPhysicalMaterial
          color="#0f172a"
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.8}
          transmission={0.4}
          thickness={0.8}
          transparent
          opacity={0.85}
        />
        
        {/* Glow outlines */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.0, maxHeight, 1.0)]} />
          <lineBasicMaterial color={color} linewidth={1.5} />
        </lineSegments>
      </mesh>
    </group>
  );
}

export default function SmartCity() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Center smart city at R3F coordinates matching the path target
  const cityOffset: [number, number, number] = [0, -2, 0];

  const buildingsData = useMemo(() => {
    const colors = ["#00f2fe", "#7f00ff", "#ff007f", "#4facfe"];
    const labels = [
      "Inventory", "Sales", "Billing", "POS",
      "Customers", "Accounting", "Reports", "Analytics",
      "Barcode", "Role Sync", "Cloud DB", "API Gateway"
    ];
    
    const items = [];
    let idx = 0;
    for (let x = -2; x <= 1; x++) {
      for (let z = -2; z <= 0; z++) {
        const height = 1.5 + Math.random() * 2.5;
        const color = colors[idx % colors.length];
        const label = labels[idx] || "Module";
        
        items.push({
          pos: [x * 2.0, 0, z * 2.0] as [number, number, number],
          maxHeight: height,
          color,
          label
        });
        idx++;
      }
    }
    return items;
  }, []);

  const progressRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Scale interpolation: city is visible/fully grown in section index 5 (ERP & POS Journey)
    const isCitySection = scrollState.activeSection === 5;
    const targetProgress = isCitySection ? 1.0 : 0.01;
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetProgress, 0.05);

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, isCitySection ? 0.95 : 0.05, 0.08));

    // Slow rotation of city platform
    groupRef.current.rotation.y = 0.05 + Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef} position={cityOffset} scale={[0.1, 0.1, 0.1]}>
      {/* Glowing City Grid Foundation */}
      <gridHelper args={[20, 20, "#7f00ff", "#1e1e38"]} position={[0, 0, 0]} />

      {/* Buildings */}
      {buildingsData.map((building, idx) => (
        <SmartBuilding
          key={idx}
          position={building.pos}
          maxHeight={building.maxHeight}
          color={building.color}
          label={building.label}
          activeProgress={progressRef.current}
        />
      ))}
    </group>
  );
}
