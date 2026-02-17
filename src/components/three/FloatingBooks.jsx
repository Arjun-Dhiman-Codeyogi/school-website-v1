import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Book = ({ position, color, rotation }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref} position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[0.8, 1, 0.12]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.065]}>
          <boxGeometry args={[0.7, 0.9, 0.01]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.8} opacity={0.3} transparent />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingBooks = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#3b82f6" />
        <Book position={[-2.5, 1, 0]} color="#3b82f6" rotation={[0.2, 0.3, -0.1]} />
        <Book position={[2, -0.5, -1]} color="#8b5cf6" rotation={[-0.1, -0.2, 0.15]} />
        <Book position={[-1, -1.5, 0.5]} color="#10b981" rotation={[0.1, 0.5, 0.1]} />
        <Book position={[2.5, 1.5, -0.5]} color="#f59e0b" rotation={[-0.2, 0.1, -0.2]} />
        <Book position={[0, 2, -1]} color="#ef4444" rotation={[0.3, -0.3, 0.1]} />
      </Canvas>
    </div>
  );
};

export default FloatingBooks;
