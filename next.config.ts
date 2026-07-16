import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  allowedDevOrigins: ["192.168.220.41", "localhost:3000", "0.0.0.0:3000"],
};

export default nextConfig;
