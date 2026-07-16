"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./scrollState";

interface NodeProps {
  position: [number, number, number];
  color: string;
  size: number;
}

function TechNode({ position, color, size }: NodeProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        transmission={0.6}
        thickness={0.5}
      />
    </mesh>
  );
}

export default function TechConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Outer group positional placement matches coordinates in CAMERA_PATH (Section 4, index 4)
  const basePosition: [number, number, number] = [0, 0, -1.5];

  const ringsData = useMemo(() => {
    return [
      {
        radius: 2.2,
        nodes: [
          { angle: 0, color: "#00f2fe", size: 0.15 }, // AI Node
          { angle: Math.PI * 0.67, color: "#ff007f", size: 0.15 }, // ML Node
          { angle: Math.PI * 1.33, color: "#7f00ff", size: 0.15 }, // Deep Learning Node
        ],
        speed: 0.004,
        axis: new THREE.Vector3(0.3, 1, 0.2).normalize(),
      },
      {
        radius: 3.2,
        nodes: [
          { angle: Math.PI * 0.25, color: "#00ff66", size: 0.12 }, // Full Stack Node
          { angle: Math.PI * 0.9, color: "#4facfe", size: 0.12 }, // Cloud Node
          { angle: Math.PI * 1.6, color: "#ffaa00", size: 0.12 }, // Data Node
        ],
        speed: -0.003,
        axis: new THREE.Vector3(-0.2, 1, 0.4).normalize(),
      },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Scale and opacity interpolation based on proximity to section index 3 (Technical Skills Universe)
    const isSkillsSection = scrollState.activeSection === 3;
    const targetScale = isSkillsSection ? 1.0 : 0.05;
    const targetOpacity = isSkillsSection ? 0.9 : 0.05;
    
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

    // Rotate core structures
    groupRef.current.rotation.y += 0.005;
    groupRef.current.rotation.x += 0.002;
  });

  return (
    <group ref={groupRef} position={basePosition} scale={[0.1, 0.1, 0.1]}>
      {/* Central Glowing Core */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshPhysicalMaterial
            color="#7f00ff"
            emissive="#7f00ff"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.2}
            transmission={0.9}
            thickness={1.5}
            ior={1.5}
          />
        </mesh>
        
        {/* Core Wireframe Shell */}
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#00f2fe" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>

      {/* Orbit Rings & Tech Nodes */}
      {ringsData.map((ring, rIdx) => {
        const rotationAngle = (rIdx + 1) * 0.1;
        return (
          <group key={rIdx} rotation={[rotationAngle, rotationAngle * 0.5, 0]}>
            {/* Draw Orbit Line Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[ring.radius - 0.01, ring.radius + 0.01, 64]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.06} side={THREE.DoubleSide} />
            </mesh>

            {/* Orbiting Nodes */}
            {ring.nodes.map((node, nIdx) => {
              const x = Math.cos(node.angle) * ring.radius;
              const y = Math.sin(node.angle) * ring.radius;
              return (
                <TechNode
                  key={nIdx}
                  position={[x, y, 0]}
                  color={node.color}
                  size={node.size}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
