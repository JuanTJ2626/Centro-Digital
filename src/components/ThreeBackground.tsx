'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BrandSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Blue */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[-3, 2, -2]}>
          <MeshDistortMaterial color="#2563eb" speed={2} distort={0.3} roughness={0.1} metalness={0.2} transparent opacity={0.4} />
        </Sphere>
      </Float>
      {/* Red */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere args={[1.2, 64, 64]} position={[3, -1, -3]}>
          <MeshDistortMaterial color="#dc2626" speed={1.5} distort={0.4} roughness={0.2} metalness={0.1} transparent opacity={0.3} />
        </Sphere>
      </Float>
      {/* Green */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
        <Sphere args={[1, 64, 64]} position={[-1, -3, -1]}>
          <MeshDistortMaterial color="#16a34a" speed={2.5} distort={0.2} roughness={0.3} metalness={0.1} transparent opacity={0.3} />
        </Sphere>
      </Float>
      {/* Yellow */}
      <Float speed={1.8} rotationIntensity={1.8} floatIntensity={1.8}>
        <Sphere args={[0.8, 64, 64]} position={[2, 3, -2]}>
          <MeshDistortMaterial color="#facc15" speed={1.8} distort={0.5} roughness={0.1} metalness={0.1} transparent opacity={0.4} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <BrandSpheres />
      </Canvas>
    </div>
  );
}
