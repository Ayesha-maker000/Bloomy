import React, { useState } from 'react';
import { HeartPlusIcon } from './Icons';
import { HelplineModal } from './HelplineModal';

export const HelplineLink: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        title="Get Support"
        aria-label="Get Support"
        className="fixed bottom-5 right-5 z-30 p-3 bg-bloom-red-500 text-white rounded-full shadow-lg hover:bg-bloom-red-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bloom-red-400 dark:focus:ring-offset-dark-bg"
      >
        <HeartPlusIcon className="w-7 h-7" />
      </button>
      <HelplineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
