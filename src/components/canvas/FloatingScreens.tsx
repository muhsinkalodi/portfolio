"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, mouseState } from "./scrollState";

interface ScreenProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

function ProjectScreen({ position, rotation, color }: ScreenProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating motion using cosine waves
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.15;
    meshRef.current.rotation.y = rotation[1] + Math.cos(time + position[0]) * 0.05;
    
    // Tilt slightly on mouse move
    meshRef.current.rotation.x = mouseState.currentY * 0.15;
    meshRef.current.rotation.y += mouseState.currentX * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[2.2, 1.4, 0.05]} />
      {/* Semi-transparent dark glass tablet */}
      <meshPhysicalMaterial
        color="#090d16"
        emissive={color}
        emissiveIntensity={0.15}
        roughness={0.1}
        metalness={0.9}
        transmission={0.8}
        thickness={0.5}
        transparent
        opacity={0.8}
      />
      {/* Screen Glowing border outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.4, 0.05)]} />
        <lineBasicMaterial color={color} linewidth={2} />
      </lineSegments>
    </mesh>
  );
}

export default function FloatingScreens() {
  const groupRef = useRef<THREE.Group>(null);

  // Positioned right in front of the camera viewport for Section 8 (Index 7)
  const basePosition: [number, number, number] = [0, 0, 5.0];

  const screensData = useMemo(() => {
    return [
      { pos: [-2.5, 0, -1.0] as [number, number, number], rot: [0, 0.4, 0] as [number, number, number], color: "#00f2fe" }, // Left Screen
      { pos: [0, 0.2, -0.5] as [number, number, number], rot: [0, 0, 0] as [number, number, number], color: "#7f00ff" },   // Center Screen
      { pos: [2.5, 0, -1.0] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], color: "#ff007f" },  // Right Screen
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Scale interpolation based on Section 8 (index 7) active status
    const isProjectSection = scrollState.activeSection === 7;
    const targetScale = isProjectSection ? 1.0 : 0.02;
    
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
  });

  return (
    <group ref={groupRef} position={basePosition} scale={[0.02, 0.02, 0.02]}>
      {screensData.map((screen, idx) => (
        <ProjectScreen
          key={idx}
          position={screen.pos}
          rotation={screen.rot}
          color={screen.color}
        />
      ))}
    </group>
  );
}
