'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BrandSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very smooth mouse parallax
      const targetX = state.mouse.x * 2;
      const targetY = state.mouse.y * 2;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Blue - Solid */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[2, 64, 64]} position={[-6, 3, -5]}>
          <MeshDistortMaterial
            color="#0071e3"
            speed={3}
            distort={0.4}
            roughness={0.1}
            metalness={0.4}
            emissive="#0071e3"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>

      {/* Red - Solid */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere args={[1.6, 64, 64]} position={[6, -2, -6]}>
          <MeshDistortMaterial
            color="#ff3b30"
            speed={2}
            distort={0.5}
            roughness={0.1}
            metalness={0.4}
            emissive="#ff3b30"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>

      {/* Green - Solid */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
        <Sphere args={[1.4, 64, 64]} position={[-2, -5, -4]}>
          <MeshDistortMaterial
            color="#34c759"
            speed={4}
            distort={0.3}
            roughness={0.1}
            metalness={0.4}
            emissive="#34c759"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

      {/* Yellow - Solid */}
      <Float speed={1.8} rotationIntensity={1.8} floatIntensity={1.8}>
        <Sphere args={[1.2, 64, 64]} position={[4, 5, -5]}>
          <MeshDistortMaterial
            color="#ffcc00"
            speed={2.5}
            distort={0.6}
            roughness={0.1}
            metalness={0.4}
            emissive="#ffcc00"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#f5f5f7]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <fog attach="fog" args={['#f5f5f7', 8, 20]} />
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#0071e3" intensity={0.5} />

        <BrandSpheres />

        <ContactShadows
          position={[0, -10, 0]}
          opacity={0.15}
          scale={40}
          blur={2.5}
          far={10}
        />

        <Environment preset="city" />
      </Canvas>

      {/* Background radial gradient to give depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(240,240,245,1)_100%)]" />
    </div>
  );
}
