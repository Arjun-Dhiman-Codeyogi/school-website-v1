import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      wireRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group>
        <mesh ref={meshRef}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            color="#1e40af"
            metalness={0.3}
            roughness={0.7}
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh ref={wireRef}>
          <sphereGeometry args={[2.02, 20, 20]} />
          <meshStandardMaterial
            color="#3b82f6"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#60a5fa" />
      </group>
    </Float>
  );
};

const FloatingGlobe = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-3, 2, 4]} intensity={0.3} color="#8b5cf6" />
        <Globe />
      </Canvas>
    </div>
  );
};

export default FloatingGlobe;
