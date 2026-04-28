'use client';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

function BubbleSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.4}>
        <MeshDistortMaterial
          color={color}
          speed={4}
          distort={0.4}
          roughness={0}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function BotpressBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleChat = () => {
    // @ts-ignore
    if (window.botpressWebChat) {
      if (isOpen) {
        // @ts-ignore
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        // @ts-ignore
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    console.log('BotpressBubble mounted');
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'botpress-webchat-visibility') {
        console.log('Botpress visibility changed:', e.data.value);
        setIsOpen(e.data.value === 'show');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
    <div className="fixed bottom-6 right-24 z-[9999] flex flex-col items-end gap-4">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="relative"
          >
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? -20 : -10 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl shadow-2xl border border-white/20 pointer-events-none whitespace-nowrap hidden md:block"
            >
              <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">¿Necesitas ayuda?</p>
            </motion.div>

              <button
                onClick={toggleChat}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-20 h-20 outline-none cursor-pointer group"
              >
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl group-hover:bg-blue-500/40 transition-colors" />
                
                <div className="w-full h-full">
                  <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <Suspense fallback={null}>
                      <BubbleSphere color="#0071e3" />
                    </Suspense>
                  </Canvas>
                </div>

                <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                  <MessageSquare size={28} className="drop-shadow-lg group-hover:scale-110 transition-transform" />
                </div>
              </button>
            </motion.div>
          )}

          {isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleChat}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide default Botpress button/launcher */
          iframe[title="botpress-webchat-launcher"],
          #bp-webchat-container + div button,
          .bp-widget-launcher,
          [aria-label="Open Chat"] {
            display: none !important;
          }
          
          /* Chat Window Container */
          #bp-webchat-container {
            bottom: 100px !important;
            right: 24px !important;
            left: auto !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
            border-radius: 24px !important;
            overflow: hidden !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }

          /* Iframe inside the container */
          #bp-webchat-container iframe {
            border-radius: 24px !important;
          }
          
          /* Customizing Botpress Internal Variables if possible */
          :root {
            --bp-bg-color: #1a1c21;
            --bp-text-color: #ffffff;
            --bp-primary-color: #0071e3;
          }
        `}} />
      </div>
    </>
  );
}
