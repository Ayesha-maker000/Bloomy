import React, { useMemo } from 'react';
import type { PetalSettings, PetalColor } from '../types';

interface FallingPetalsProps {
  settings: PetalSettings;
}

const DENSITY_MAP: Record<PetalSettings['density'], number> = {
  low: 15,
  medium: 30,
  high: 50,
};

const SPEED_MAP: Record<PetalSettings['speed'], { min: number; max: number }> = {
  slow: { min: 10, max: 15 },
  medium: { min: 5, max: 10 },
  fast: { min: 3, max: 7 },
};

const COLOR_MAP: Record<PetalColor, string[]> = {
  pink: ['rgba(255, 222, 230, 0.7)'],
  gold: ['rgba(255, 223, 122, 0.7)'],
  mixed: ['rgba(255, 222, 230, 0.7)', 'rgba(255, 223, 122, 0.7)'],
};

export const FallingPetals: React.FC<FallingPetalsProps> = ({ settings }) => {
  const petals = useMemo(() => {
    if (!settings.enabled) return [];

    const numPetals = DENSITY_MAP[settings.density];
    const { min, max } = SPEED_MAP[settings.speed];
    const colors = COLOR_MAP[settings.color];

    return Array.from({ length: numPetals }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * (max - min) + min}s`,
        animationDelay: `${Math.random() * 5}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      };
      return <div key={i} className="petal" style={style}></div>;
    });
  }, [settings]);

  if (!settings.enabled) return null;

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .petal {
          position: fixed;
          top: 0;
          width: 15px;
          height: 15px;
          border-radius: 0 50% 50% 50%;
          transform: rotate(-45deg);
          animation: fall linear infinite;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {petals}
      </div>
    </>
  );
};