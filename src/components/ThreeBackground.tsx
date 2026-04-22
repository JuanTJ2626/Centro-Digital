'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BrandSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very gentle mouse parallax for mobile, standard for desktop
      const power = isMobile ? 0.3 : 2;
      const targetX = state.mouse.x * power;
      const targetY = state.mouse.y * power;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Calculate safe positions based on viewport
  const w = viewport.width / 2;
  const h = viewport.height / 2;

  const sphereData = [
    { 
      color: "#0055ff", 
      pos: isMobile ? [-w * 0.4, h * 0.5, -2] : [-w * 0.7, h * 0.4, -5], 
      size: isMobile ? 1.2 : 2.5 
    },
    { 
      color: "#ff0000", 
      pos: isMobile ? [w * 0.4, h * 0.1, -3] : [w * 0.7, -h * 0.2, -6], 
      size: isMobile ? 1.0 : 2.0 
    },
    { 
      color: "#00ff44", 
      pos: isMobile ? [-w * 0.3, -h * 0.4, -2] : [-w * 0.3, -h * 0.6, -4], 
      size: isMobile ? 0.8 : 1.8 
    },
    { 
      color: "#ffdd00", 
      pos: isMobile ? [w * 0.3, h * 0.7, -4] : [w * 0.5, h * 0.6, -5], 
      size: isMobile ? 0.7 : 1.6 
    },
  ];

  return (
    <group ref={groupRef}>
      {sphereData.map((s, i) => (
        <Float key={i} speed={s.speed || 2} rotationIntensity={2} floatIntensity={2}>
          <group position={s.pos as any}>
            <Sphere args={[s.size, 64, 64]}>
              <MeshDistortMaterial 
                color={s.color} 
                speed={3} 
                distort={0.4} 
                roughness={0} 
                metalness={0.9} 
                emissive={s.color}
                emissiveIntensity={5.0}
                envMapIntensity={2}
              />
            </Sphere>
            <pointLight distance={isMobile ? 6 : 15} intensity={isMobile ? 20 : 50} color={s.color} />
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#fafafe]">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }} 
        gl={{ 
          alpha: true, 
          antialias: true, 
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace 
        }}
      >
        <fog attach="fog" args={['#fafafe', 5, 35]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={2} />
        
        <BrandSpheres />
        
        <ContactShadows 
          position={[0, -15, 0]} 
          opacity={0.3} 
          scale={60} 
          blur={3} 
          far={20} 
        />
        
        <Environment preset="night" />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(235,235,245,1)_100%)] opacity-80" />
    </div>
  );
}
