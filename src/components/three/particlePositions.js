import * as THREE from 'three';

export const createParticleGeometry = (count = 100) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 15;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  return geo;
};

export const createColoredParticleGeometry = (count = 150, colors = ['#3b82f6']) => {
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

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return geo;
};
