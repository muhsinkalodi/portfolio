"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollState";

export default function ParticleTunnel() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 2500;
  
  // Generate random particles coordinates and custom velocities
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spawn particles in a cylinder volume stretching down Z axis
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 1; // hollow center
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z axis spread

      // Velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.02; // x speed
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02; // y speed
      vel[i * 3 + 2] = Math.random() * 0.05 + 0.02; // z speed (forward)

      // Colors: Cyan to purple gradients
      const mixRatio = Math.random();
      col[i * 3] = mixRatio; // R
      col[i * 3 + 1] = mixRatio * 0.7 + 0.3; // G
      col[i * 3 + 2] = 1.0; // B
    }

    return [pos, vel, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    
    // Scale speed based on active section
    // If section is Future Vision (index 12), speed up for hyperspace fly-through
    const isActiveVision = scrollState.activeSection === 12;
    const speedMultiplier = isActiveVision ? 15.0 : 1.0;
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Move particle forward (along negative Z axis relative to camera movement)
      posArr[idx + 2] += velocities[idx + 2] * speedMultiplier;
      
      // Infinite loop wrap: if particle goes too close, send it back to depth
      if (posArr[idx + 2] > 20) {
        posArr[idx + 2] = -20;
      }
      
      // Add subtle noise/drift
      posArr[idx] += velocities[idx] * (isActiveVision ? 0.2 : 1);
      posArr[idx + 1] += velocities[idx + 1] * (isActiveVision ? 0.2 : 1);
    }
    
    geo.attributes.position.needsUpdate = true;

    // Rotate the entire particle cloud slowly
    pointsRef.current.rotation.z += 0.001 * (isActiveVision ? 5.0 : 1.0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
