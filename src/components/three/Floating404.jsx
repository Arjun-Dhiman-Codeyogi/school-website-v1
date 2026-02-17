import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const FloatingNumbers = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* 4 */}
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[0.8, 2, 0.3]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* 0 */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.8, 0.3, 16, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* 4 */}
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[0.8, 2, 0.3]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const Particles404 = () => {
  const points = useRef(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

const Floating404 = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[3, -2, 2]} intensity={0.4} color="#8b5cf6" />
        <FloatingNumbers />
        <Particles404 />
      </Canvas>
    </div>
  );
};

export default Floating404;
