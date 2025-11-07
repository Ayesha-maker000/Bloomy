import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { BloomyMascot, SendIcon } from './Icons';
import Markdown from 'react-markdown';

// Custom hook to manage the typewriter animation state
const useTypewriter = (text: string, speed = 25) => {
  const [displayedText, setDisplayedText] = useState('');

  // Effect to handle resetting vs. continuing the animation
  useEffect(() => {
    setDisplayedText(currentDisplayedText => {
      // If the new text is a continuation of what's already displayed,
      // let the typing effect continue from where it is.
      if (text.startsWith(currentDisplayedText)) {
        return currentDisplayedText;
      }
      // Otherwise, it's a new message, so reset to start typing from scratch.
      return "";
    });
  }, [text]);

  // Effect to handle the character-by-character typing
  useEffect(() => {
    // If we haven't displayed the full text yet, schedule the next character.
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      // Cleanup function to clear the timeout if the component unmounts
      // or if dependencies change before the timeout fires.
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, text, speed]);

  return displayedText;
};

// A component to render the text with the typewriter effect
const TypewriterRenderer: React.FC<{ text: string }> = ({ text }) => {
    const typedText = useTypewriter(text);
    const isTyping = typedText.length < text.length;

    return (
        <div className="prose prose-sm prose-p:my-0 text-text-primary max-w-none whitespace-pre-wrap">
            <Markdown>{`${typedText}${isTyping ? '▋' : ''}`}</Markdown>
        </div>
    );
};

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isBloomyTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isBloomyTyping }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll when new messages are added or when typing starts/stops
  useEffect(scrollToBottom, [messages, isBloomyTyping]);
  // Also scroll as the typewriter text grows for the last message
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages[messages.length - 1]?.text]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-bg-secondary/80 backdrop-blur-sm rounded-2xl shadow-lg w-full max-w-2xl mx-auto animate-fade-in">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => {
          const isLastFromBloomy = msg.sender === 'bloomy' && index === messages.length - 1;
          
          return (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bloomy' && <BloomyMascot className="w-10 h-10 flex-shrink-0" />}
              <div
                className={`max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-brand-primary text-white rounded-br-lg'
                    : msg.isEasterEgg
                    ? 'easter-egg-bubble text-white rounded-bl-lg'
                    : 'bg-gradient-to-br from-bg-primary to-bg-secondary border border-border-primary/80 text-text-primary rounded-bl-lg'
                }`}
              >
                {isLastFromBloomy && !msg.isEasterEgg ? (
                  <TypewriterRenderer text={msg.text} />
                ) : (
                  <div className="prose prose-sm prose-p:my-0 text-text-primary max-w-none whitespace-pre-wrap">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isBloomyTyping && (
           <div className="flex items-end gap-3 justify-start">
             <BloomyMascot className="w-10 h-10 flex-shrink-0" />
             <div className="p-3 rounded-2xl bg-bg-secondary text-text-primary rounded-bl-lg shadow">
                <div className="flex items-center gap-1">
                    <span className="typing-dot"></span>
                    <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
                    <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
                </div>
             </div>
           </div>
        )}
         <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-bg-secondary/50 border-t border-border-primary">
        <div className="flex items-center bg-bg-secondary rounded-full shadow-inner">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-5 py-3 bg-transparent border-none rounded-full focus:outline-none focus:ring-2 focus:ring-brand-secondary transition text-text-primary"
          />
          <button
            type="submit"
            className="bg-brand-primary text-white rounded-full p-3 m-1 hover:bg-brand-hover transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .typing-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: var(--color-brand-secondary);
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }
        @keyframes sparkle-background {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .easter-egg-bubble {
          background: linear-gradient(45deg, #FFDAB9, #FFC7C7, #A8D8B9, #FFDF7A);
          background-size: 300% 300%;
          animation: sparkle-background 8s ease infinite;
        }
        .prose p { margin-top: 0; margin-bottom: 0; }
        .prose {
          color: var(--color-text-primary);
        }
        .prose a {
          color: var(--color-brand-primary);
        }
        .prose strong {
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
};