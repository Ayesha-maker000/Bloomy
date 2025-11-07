import React from 'react';

interface AffirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  affirmation: string;
}

export const AffirmationModal: React.FC<AffirmationModalProps> = ({ isOpen, onClose, affirmation }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="affirmation-title"
    >
      <div
        className="bg-gradient-to-br from-peach via-golden-yellow/80 to-leaf-green/70 rounded-2xl shadow-2xl p-8 w-11/12 max-w-md animate-bloom-in text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
         <h2
           id="affirmation-title"
           className="text-xl font-bold font-comfortaa text-gray-700 mb-4 opacity-0 animate-fade-in"
           style={{ animationDelay: '0.2s' }}
         >
          A little encouragement for you...
         </h2>
         <p
           className="text-2xl md:text-3xl font-caveat text-gray-800 leading-relaxed opacity-0 animate-fade-in"
           style={{ animationDelay: '0.3s' }}
         >
            "{affirmation}"
         </p>
         <button
            onClick={onClose}
            className="mt-6 bg-bg-secondary/80 px-6 py-2 rounded-full font-semibold text-text-accent hover:bg-bg-secondary transition-all opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
         >
            Close
         </button>
      </div>
    </div>
  );
};