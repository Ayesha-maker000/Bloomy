import React from 'react';
import { helplines } from '../data/helplines';
import { ExternalLinkIcon } from './Icons';

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="helpline-title"
    >
      <div
        className="bg-bg-secondary rounded-2xl shadow-2xl p-6 md:p-8 w-11/12 max-w-md animate-slide-in overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="helpline-title" className="text-2xl font-bold text-text-primary mb-2">
          Support is Available
        </h2>
        <p className="text-text-secondary mb-6">
          If you need to talk to someone, these resources are here to help.
        </p>

        <div className="space-y-4">
          {helplines.map((helpline) => (
            <a
              key={helpline.name}
              href={helpline.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-bg-primary rounded-lg hover:bg-bg-input transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-text-accent">{helpline.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">{helpline.description}</p>
                </div>
                <ExternalLinkIcon className="w-5 h-5 text-text-secondary flex-shrink-0 ml-4" />
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-hover transition-transform transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};