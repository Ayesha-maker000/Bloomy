import React, { useState, useEffect } from 'react';
import { Mood } from '../types';
import { BloomingIcon, BudIcon, DroopyIcon, WiltedIcon } from './Icons';
import { greetings } from '../data/greetings';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  userName: string;
}

const moodOptions = [
  { mood: Mood.Blooming, Icon: BloomingIcon, label: 'Blooming', color: 'bg-gradient-to-br from-yellow-400 to-yellow-300', hover: 'hover:from-yellow-500 hover:to-yellow-300', ring: 'focus:ring-yellow-400' },
  { mood: Mood.Bud, Icon: BudIcon, label: 'Hopeful', color: 'bg-gradient-to-br from-green-400 to-green-300', hover: 'hover:from-green-500 hover:to-green-300', ring: 'focus:ring-green-400' },
  { mood: Mood.Droopy, Icon: DroopyIcon, label: 'Tired', color: 'bg-gradient-to-br from-blue-400 to-blue-300', hover: 'hover:from-blue-500 hover:to-blue-300', ring: 'focus:ring-blue-400' },
  { mood: Mood.Wilted, Icon: WiltedIcon, label: 'Sad', color: 'bg-gradient-to-br from-red-400 to-red-300', hover: 'hover:from-red-500 hover:to-red-300', ring: 'focus:ring-red-400' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, userName }) => {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting.replace('{userName}', userName));
  }, [userName]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold text-text-primary mb-2 text-center animate-fade-in" style={{ animationDelay: '50ms' }}>{greeting}</h2>
      <p className="text-xl text-text-secondary mb-8 text-center animate-fade-in" style={{ animationDelay: '150ms' }}>How are you feeling today?</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {moodOptions.map(({ mood, Icon, label, color, hover, ring }, index) => (
          <div key={mood} className="flex flex-col items-center">
            <button
              onClick={() => onMoodSelect(mood)}
              className={`w-32 h-32 rounded-full flex items-center justify-center ${color} ${hover} transition-all duration-300 transform hover:scale-115 hover:-rotate-3 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50 ${ring} opacity-0 animate-joyful-bounce`}
              aria-label={label}
              style={{ animationDelay: `${250 + index * 100}ms` }}
            >
              <Icon className="w-20 h-20 text-white/90" />
            </button>
            <span 
              className="mt-4 text-lg font-semibold text-text-secondary opacity-0 animate-fade-in"
              style={{ animationDelay: `${350 + index * 100}ms` }}
            >
                {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
