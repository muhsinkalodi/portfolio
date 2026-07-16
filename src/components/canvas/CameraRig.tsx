"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { scrollState, mouseState } from "./scrollState";

// Defines camera positions and lookAt targets for each of the 15 sections
const CAMERA_PATH = [
  // 1. Hero
  { pos: [0, 0, 8], target: [0, 0, 0] },
  // 2. About Me
  { pos: [3, 1, 7], target: [-1, 0, 0] },
  // 3. Academic Journey
  { pos: [-4, -2, 6], target: [1, -1, 0] },
  // 4. Skills Universe
  { pos: [0, 0, 5], target: [0, 0, -1] },
  // 5. ML Journey
  { pos: [4, 2, 6], target: [0, 0, -2] },
  // 6. ERP & POS (Smart City)
  { pos: [7, 6, 9], target: [0, 0, 0] },
  // 7. Experience
  { pos: [-5, 1, 7], target: [0, 0, 0] },
  // 8. Featured Projects
  { pos: [0, 0, 9], target: [0, 0, -3] },
  // 9. Certifications
  { pos: [3, -2, 6], target: [-1, -1, 0] },
  // 10. Leadership & Community
  { pos: [-3, 2, 8], target: [0, 1, 0] },
  // 11. GitHub Dashboard
  { pos: [0, -6, 8], target: [0, -7, 0] },
  // 12. Achievements
  { pos: [0, -9, 7], target: [0, -9, 0] },
  // 13. Future Vision
  { pos: [0, 0, 3], target: [0, 0, -12] },
  // 14. Social Hub
  { pos: [2, 0, 6], target: [0, 0, 0] },
  // 15. Contact
  { pos: [0, 0, 7], target: [0, 0, 0] },
];

export default function CameraRig() {
    const { camera, size } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 8));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // 1. Smoothly interpolate scrollState values
    scrollState.currentProgress += (scrollState.targetProgress - scrollState.currentProgress) * 0.08;
    scrollState.currentY += (scrollState.targetY - scrollState.currentY) * 0.08;

    // 2. Smoothly interpolate mouseState values
    mouseState.currentX += (mouseState.targetX - mouseState.currentX) * 0.05;
    mouseState.currentY += (mouseState.targetY - mouseState.currentY) * 0.05;

    // 3. Calculate camera coordinates along the 14-section path
    const progress = scrollState.currentProgress;
    const maxIdx = CAMERA_PATH.length - 1;
    const rawIndex = progress * maxIdx;
    const baseIdx = Math.floor(rawIndex);
    const nextIdx = Math.min(maxIdx, baseIdx + 1);
    const alpha = rawIndex - baseIdx;

    const startNode = CAMERA_PATH[baseIdx];
    const endNode = CAMERA_PATH[nextIdx];

    if (startNode && endNode) {
      // Determine responsive camera offset
      const isMobile = size.width < 768;
      const isTablet = size.width >= 768 && size.width < 1024;
      const zOffset = isMobile ? 3.5 : isTablet ? 1.5 : 0.0;

      // Interpolate base path
      const targetX = THREE.MathUtils.lerp(startNode.pos[0], endNode.pos[0], alpha);
      const targetY = THREE.MathUtils.lerp(startNode.pos[1], endNode.pos[1], alpha);
      const targetZ = THREE.MathUtils.lerp(startNode.pos[2], endNode.pos[2], alpha) + zOffset;

      const lookX = THREE.MathUtils.lerp(startNode.target[0], endNode.target[0], alpha);
      const lookY = THREE.MathUtils.lerp(startNode.target[1], endNode.target[1], alpha);
      const lookZ = THREE.MathUtils.lerp(startNode.target[2], endNode.target[2], alpha);

      // Add mouse parallax offset
      const mouseParallaxX = mouseState.currentX * 0.8;
      const mouseParallaxY = mouseState.currentY * 0.6;

      currentPos.current.set(
        targetX + mouseParallaxX,
        targetY + mouseParallaxY,
        targetZ
      );
      currentTarget.current.set(
        lookX + mouseParallaxX * 0.3,
        lookY + mouseParallaxY * 0.3,
        lookZ
      );

      // Lerp actual camera position
      camera.position.lerp(currentPos.current, 0.1);
      
      // Update lookAt target
      const lookTarget = new THREE.Vector3();
      lookTarget.lerpVectors(camera.position, currentTarget.current, 0.1);
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
}
