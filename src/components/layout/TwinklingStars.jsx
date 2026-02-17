import { useMemo, useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const STAR_COUNT = 50;

const generateStars = (isDark) => {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1.5,
    delay: Math.random() * (isDark ? 3 : 4),
  }));
};

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
          className="absolute rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: isDark ? '#ffffff' : '#3b82f6',
            animation: `${isDark ? 'twinkle-dark' : 'twinkle-light'} ${isDark ? '3s' : '4s'} ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default TwinklingStars;
