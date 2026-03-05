import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { createColoredParticleGeometry } from './particlePositions';

const Particles = ({ count = 150, colors = ['#3b82f6'] }) => {
  const points = useRef(null);

  const geometry = useMemo(() => createColoredParticleGeometry(count, colors), [count, colors]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
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
