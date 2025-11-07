import React from 'react';
import { Mood, type JournalEntry } from '../types';
import { BloomingIcon, BudIcon, DroopyIcon, WiltedIcon, TrashIcon } from './Icons';

interface JournalGardenProps {
  entries: JournalEntry[];
  onDeleteEntry: (id: string) => void;
  onSelectEntry: (entry: JournalEntry) => void;
}

const MoodIcon: React.FC<{ mood: Mood; className?: string }> = ({ mood, className }) => {
  switch (mood) {
    case Mood.Blooming:
      return <BloomingIcon className={className} />;
    case Mood.Bud:
      return <BudIcon className={className} />;
    case Mood.Droopy:
      return <DroopyIcon className={className} />;
    case Mood.Wilted:
      return <WiltedIcon className={className} />;
    default:
      return null;
  }
};

const JournalCard: React.FC<{ entry: JournalEntry; onDelete: (id: string) => void; onSelect: (entry: JournalEntry) => void }> = ({ entry, onDelete, onSelect }) => {
  const moodColors = {
    [Mood.Blooming]: 'bg-yellow-100/80 border-yellow-300',
    [Mood.Bud]: 'bg-green-100/80 border-green-300',
    [Mood.Droopy]: 'bg-blue-100/80 border-blue-300',
    [Mood.Wilted]: 'bg-red-100/80 border-red-300',
  };
  const moodIconColors = {
    [Mood.Blooming]: 'text-yellow-500',
    [Mood.Bud]: 'text-green-500',
    [Mood.Droopy]: 'text-blue-500',
    [Mood.Wilted]: 'text-red-500',
  };
  const moodRingColors = {
    [Mood.Blooming]: 'focus:ring-yellow-400',
    [Mood.Bud]: 'focus:ring-green-400',
    [Mood.Droopy]: 'focus:ring-blue-400',
    [Mood.Wilted]: 'focus:ring-red-400',
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(entry.id);
  };

  return (
    <button
      onClick={() => onSelect(entry)}
      className={`group relative p-4 rounded-xl border ${moodColors[entry.mood]} shadow-sm transition-transform hover:scale-105 hover:shadow-lg text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg ${moodRingColors[entry.mood]}`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-bg-secondary/50 text-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-400 z-20"
        aria-label="Delete entry"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full`}>
           <MoodIcon mood={entry.mood} className={`w-8 h-8 ${moodIconColors[entry.mood]} animate-sparkle`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-secondary mb-1">
            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-text-primary whitespace-pre-wrap">{entry.text}</p>
        </div>
      </div>
    </button>
  );
};


export const JournalGarden: React.FC<JournalGardenProps> = ({ entries, onDeleteEntry, onSelectEntry }) => {
  if (entries.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center h-full text-center animate-fade-in">
         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-leaf-green/30" style={{ borderTopLeftRadius: '100% 50%', borderTopRightRadius: '100% 50%' }}></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Your Garden is Waiting to Grow</h2>
          <p className="text-text-secondary max-w-md">
            Start a new chat and share your thoughts to plant your first memory. Each entry will bloom here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in w-full h-full overflow-hidden flex flex-col">
       <style>{`
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.8; }
          30% { transform: scale(1.3) rotate(15deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-sparkle {
          animation: sparkle 0.7s ease-out;
        }
      `}</style>
      <h2 className="text-3xl font-bold text-text-primary pt-4 pb-2 text-center flex-shrink-0">My Journal Garden</h2>
        <div className="flex-grow overflow-y-auto p-4 relative">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-leaf-green/30" style={{ borderTopLeftRadius: '100% 50%', borderTopRightRadius: '100% 50%' }}></div>
            <div className="relative z-10 grid grid-cols-1 gap-4">
                {entries.slice().reverse().map(entry => (
                    <JournalCard key={entry.id} entry={entry} onDelete={onDeleteEntry} onSelect={onSelectEntry} />
                ))}
            </div>
        </div>
    </div>
  );
};