import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BloomingIcon } from './Icons';

interface PetalBreathingProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathingPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const PetalBreathing: React.FC<PetalBreathingProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [isStarted, setIsStarted] = useState(false);
  const [durations, setDurations] = useState({
    inhale: 4,
    hold: 4,
    exhale: 6,
  });

  const PHASES = useMemo(() => ({
    idle: { duration: 0, text: '', next: 'inhale' as BreathingPhase },
    inhale: { duration: durations.inhale * 1000, text: 'Breathe In...', next: 'hold' as BreathingPhase },
    hold: { duration: durations.hold * 1000, text: 'Hold', next: 'exhale' as BreathingPhase },
    exhale: { duration: durations.exhale * 1000, text: 'Breathe Out...', next: 'inhale' as BreathingPhase },
  }), [durations]);


  useEffect(() => {
    if (!isOpen) {
      setIsStarted(false);
      setPhase('idle');
      return;
    }

    if (!isStarted || phase === 'idle') {
      return;
    }

    const currentPhaseData = PHASES[phase];
    const timer = setTimeout(() => {
      setPhase(currentPhaseData.next);
    }, currentPhaseData.duration);

    return () => clearTimeout(timer);
  }, [phase, isStarted, isOpen, PHASES]);

  const handleStart = () => {
    setIsStarted(true);
    setPhase('inhale');
  };

  const handleClose = useCallback(() => {
    setIsStarted(false);
    setPhase('idle');
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);
  
  const animationVars = useMemo(() => ({
    '--inhale-duration': `${durations.inhale}s`,
    '--hold-duration': '2s', // For the pulse animation
    '--exhale-duration': `${durations.exhale}s`,
  } as React.CSSProperties), [durations]);


  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-bg-primary/80 backdrop-blur-lg flex flex-col items-center justify-center z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="breathing-title"
      style={animationVars}
    >
      <style>{`
        :root {
          --ease-in-out-quint: cubic-bezier(0.65, 0, 0.35, 1);
        }
        .breathing-face-container, .breathing-mouth, .breathing-cheek {
          transition-property: transform, opacity;
          transition-timing-function: var(--ease-in-out-quint);
        }
        .breathing-face-container { transform-origin: center; }
        .breathing-mouth { transform-origin: center; }

        /* --- DURATION --- */
        .phase-inhale .breathing-face-container, .phase-inhale .breathing-mouth, .phase-inhale .breathing-cheek {
          transition-duration: var(--inhale-duration);
        }
        .phase-exhale .breathing-face-container, .phase-exhale .breathing-mouth, .phase-exhale .breathing-cheek {
          transition-duration: var(--exhale-duration);
        }

        /* --- STATES --- */
        /* IDLE & EXHALE (Resting state) */
        .phase-idle .breathing-face-container, .phase-exhale .breathing-face-container {
          transform: scale(0.95);
          opacity: 0.9;
        }
        .phase-idle .breathing-mouth, .phase-exhale .breathing-mouth {
          transform: scale(1, 0.8);
        }
        .phase-idle .breathing-cheek, .phase-exhale .breathing-cheek {
          opacity: 0.2;
        }

        /* INHALE (Expanded state) */
        .phase-inhale .breathing-face-container, .phase-hold .breathing-face-container {
          transform: scale(1.1);
          opacity: 1;
        }
        .phase-inhale .breathing-mouth, .phase-hold .breathing-mouth {
          transform: scale(1, 1.1);
        }
        .phase-inhale .breathing-cheek, .phase-hold .breathing-cheek {
          opacity: 0.5;
        }

        /* HOLD (Adds a pulse animation) */
        @keyframes holdPulse {
          50% { transform: scale(1.12) translateY(-2px); }
        }
        .phase-hold .breathing-face-container {
          animation: holdPulse var(--hold-duration) ease-in-out infinite;
        }

        /* Range Slider Thumb Styling */
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 20px; height: 20px;
          background: var(--color-brand-primary);
          cursor: pointer; border-radius: 50%;
          margin-top: -8px;
        }
        .range-thumb::-moz-range-thumb {
          width: 20px; height: 20px;
          background: var(--color-brand-primary);
          cursor: pointer; border-radius: 50%;
          border: none;
        }
      `}</style>
      <div className="text-center flex flex-col items-center justify-center flex-grow w-full px-4 pb-24">
        {!isStarted ? (
          <div className="animate-fade-in text-center w-full max-w-md">
            <h2 id="breathing-title" className="text-3xl font-bold text-text-primary mb-2">Petal Breathing</h2>
            <p className="mx-auto text-lg text-text-secondary mb-6">
              Follow the petal to guide your breath. Let's find a moment of calm together.
            </p>

            <div className="space-y-4 my-6 bg-bg-secondary/50 p-4 rounded-lg">
                <div className="w-full">
                    <label htmlFor="inhale-duration" className="flex justify-between text-sm font-semibold text-text-secondary mb-1">
                        <span>Breathe In</span>
                        <span>{durations.inhale}s</span>
                    </label>
                    <input id="inhale-duration" type="range" min="2" max="10" step="1" value={durations.inhale} onChange={(e) => setDurations(d => ({ ...d, inhale: parseInt(e.target.value, 10) }))} className="w-full h-1 bg-bg-input rounded-lg appearance-none cursor-pointer range-thumb"/>
                </div>
                 <div className="w-full">
                    <label htmlFor="hold-duration" className="flex justify-between text-sm font-semibold text-text-secondary mb-1">
                        <span>Hold</span>
                        <span>{durations.hold}s</span>
                    </label>
                    <input id="hold-duration" type="range" min="0" max="10" step="1" value={durations.hold} onChange={(e) => setDurations(d => ({ ...d, hold: parseInt(e.target.value, 10) }))} className="w-full h-1 bg-bg-input rounded-lg appearance-none cursor-pointer range-thumb"/>
                </div>
                 <div className="w-full">
                    <label htmlFor="exhale-duration" className="flex justify-between text-sm font-semibold text-text-secondary mb-1">
                        <span>Breathe Out</span>
                        <span>{durations.exhale}s</span>
                    </label>
                    <input id="exhale-duration" type="range" min="2" max="10" step="1" value={durations.exhale} onChange={(e) => setDurations(d => ({ ...d, exhale: parseInt(e.target.value, 10) }))} className="w-full h-1 bg-bg-input rounded-lg appearance-none cursor-pointer range-thumb"/>
                </div>
            </div>

            <button
              onClick={handleStart}
              className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-hover transition-transform transform hover:scale-105"
            >
              Begin
            </button>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <BloomingIcon className={`w-full h-full text-brand-secondary phase-${isStarted ? phase : 'idle'}`} />
            </div>
            <p id="breathing-title" className="text-4xl font-comfortaa font-bold text-text-primary">
              {PHASES[phase]?.text}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleClose}
        className="absolute bottom-8 bg-bg-secondary/80 px-6 py-2 rounded-full font-semibold text-text-accent hover:bg-bg-secondary transition-all"
      >
        {isStarted ? 'End Exercise' : 'Close'}
      </button>
    </div>
  );
};