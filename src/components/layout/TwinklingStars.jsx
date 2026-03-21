import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/useTheme';

const STAR_COUNT = 18;

const generateStars = (isDark) => {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 10,
    delay: Math.random() * (isDark ? 3 : 4),
    rotation: Math.random() * 360,
  }));
};

const StarShape = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z" />
  </svg>
);

const TwinklingStars = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(isDark));
  }, [isDark]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            transform: `rotate(${star.rotation}deg)`,
            animation: `${isDark ? 'twinkle-dark' : 'twinkle-light'} ${isDark ? '3s' : '4s'} ease-in-out ${star.delay}s infinite`,
          }}
        >
          <StarShape size={star.size} color="#fc3700" />
        </div>
      ))}
    </div>
  );
};

export default TwinklingStars;
