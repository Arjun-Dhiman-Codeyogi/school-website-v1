import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 150, colors = ['#3b82f6'] }) => {
  const points = useRef(null);

  const { positions, colorArray } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const parsedColors = colors.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = parsedColors[Math.floor(Math.random() * parsedColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colorArray: col };
  }, [count, colors]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const ParticleBackground = ({ colors, color, count = 150, className = '' }) => {
  const colorList = colors || (color ? [color] : ['#3b82f6']);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <Particles count={count} colors={colorList} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
