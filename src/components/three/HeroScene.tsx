import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

const SchoolBuilding: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 + state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Main building body */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[3, 1.6, 1.5]} />
          <meshStandardMaterial color="#1a2744" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[3.3, 0.15, 1.7]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.1} emissive="#00d4ff" emissiveIntensity={0.3} />
        </mesh>
        {/* Tower center */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#1a2744" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Tower top */}
        <mesh position={[0, 2.8, 0]}>
          <coneGeometry args={[0.5, 0.6, 4]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.6} roughness={0.2} emissive="#8b5cf6" emissiveIntensity={0.4} />
        </mesh>
        {/* Windows row 1 */}
        {[-1, -0.4, 0.4, 1].map((x, i) => (
          <mesh key={`w1-${i}`} position={[x, 1, 0.76]}>
            <boxGeometry args={[0.35, 0.4, 0.02]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} transparent opacity={0.8} />
          </mesh>
        ))}
        {/* Windows row 2 */}
        {[-1, -0.4, 0.4, 1].map((x, i) => (
          <mesh key={`w2-${i}`} position={[x, 0.4, 0.76]}>
            <boxGeometry args={[0.35, 0.4, 0.02]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} transparent opacity={0.7} />
          </mesh>
        ))}
        {/* Door */}
        <mesh position={[0, 0.2, 0.76]}>
          <boxGeometry args={[0.5, 0.6, 0.02]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
        {/* Steps */}
        <mesh position={[0, -0.1, 1]}>
          <boxGeometry args={[0.8, 0.1, 0.3]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Left wing */}
        <mesh position={[-2, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1.2]} />
          <meshStandardMaterial color="#1e3050" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Right wing */}
        <mesh position={[2, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1.2]} />
          <meshStandardMaterial color="#1e3050" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Ground */}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 4]} />
          <meshStandardMaterial color="#0f1729" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

const Particles: React.FC = () => {
  const points = useRef<THREE.Points>(null);
  const particleCount = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, 3, 2]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[3, 2, -2]} intensity={0.4} color="#8b5cf6" />
        <SchoolBuilding />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
