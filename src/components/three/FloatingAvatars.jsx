import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const AvatarFigure = ({ position, color }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + position[0] * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={ref} position={position}>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.2, 0.4, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingAvatars = ({ className = '' }) => {
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
  const positions = [
    [-2.5, 1, 0], [2, -0.5, -1], [-1, -1.5, 0.5],
    [2.5, 1.5, -0.5], [0, 2, -1], [-2, -0.5, -0.5],
  ];

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 2]} intensity={0.3} color="#8b5cf6" />
        {positions.map((pos, i) => (
          <AvatarFigure key={i} position={pos} color={colors[i % colors.length]} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingAvatars;
