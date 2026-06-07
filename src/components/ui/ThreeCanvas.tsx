"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, TorusKnot } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seededNoise(index: number, axis: number) {
  const value = Math.sin(index * 12.9898 + axis * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function MorphingParticles() {
  const pointsRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const count = 2200;
    const array = new Float32Array(count * 3);
    const radius = 1.45;
    const tubeRadius = 0.42;
    const p = 2; // Torus knot P parameter
    const q = 3; // Torus knot Q parameter

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2 * p;
      const r = radius + tubeRadius * Math.cos(q * t);
      const x = r * Math.cos(p * t);
      const y = r * Math.sin(p * t);
      const z = tubeRadius * Math.sin(q * t);

      array[i * 3] = x + (seededNoise(i, 1) - 0.5) * 0.28;
      array[i * 3 + 1] = y + (seededNoise(i, 2) - 0.5) * 0.28;
      array[i * 3 + 2] = z + (seededNoise(i, 3) - 0.5) * 0.28;
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.x = time * 0.08;
    pointsRef.current.rotation.y = time * 0.11;

    pointsRef.current.rotation.x += state.pointer.y * 0.3;
    pointsRef.current.rotation.y += state.pointer.x * 0.3;

    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      pointsRef.current.position.y = -scrollY * 0.0009;
      pointsRef.current.rotation.z = scrollY * 0.0012;
    }
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#12110f"
          size={0.018}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
          opacity={0.28}
        />
      </Points>
    </group>
  );
}

function InkRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    group.current.rotation.x = state.clock.elapsedTime * 0.12 + scrollY * 0.0004;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
    group.current.position.x = state.pointer.x * 0.28;
    group.current.position.y = state.pointer.y * 0.18;
  });

  return (
    <group ref={group} position={[1.6, -0.05, -0.6]}>
      <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.55}>
        <TorusKnot args={[0.78, 0.045, 180, 12, 3, 5]}>
          <meshBasicMaterial color="#e6392f" wireframe transparent opacity={0.5} />
        </TorusKnot>
        <mesh rotation={[0.7, 0.2, 0.4]}>
          <torusGeometry args={[1.15, 0.015, 12, 160]} />
          <meshBasicMaterial color="#009fbd" transparent opacity={0.62} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-90">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.85} />
        <pointLight position={[10, 8, 8]} intensity={1.15} color="#f5b942" />
        <pointLight position={[-8, -6, -8]} intensity={0.8} color="#009fbd" />
        <MorphingParticles />
        <InkRings />
      </Canvas>
    </div>
  );
}
