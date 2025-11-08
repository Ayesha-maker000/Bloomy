import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { ChatWindow } from './components/ChatWindow';
import { JournalGarden } from './components/JournalGarden';
import { SettingsModal } from './components/SettingsModal';
import { startChatSession } from './services/geminiService';
import type { View, ChatMessage, JournalEntry, Mood, AppSettings, User } from './types';
import { AffirmationModal } from './components/AffirmationModal';
import { affirmations } from './data/affirmations';
import { FallingPetals } from './components/FallingPetals';
import { PetalBreathing } from './components/PetalBreathing';
import { AuthPage } from './components/AuthPage';
import { login, signup, logout, checkSession } from './services/authService';


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  const [view, setView] = useState<View>('mood-check-in');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isBloomyTyping, setIsBloomyTyping] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAffirmationOpen, setIsAffirmationOpen] = useState<boolean>(false);
  const [isBreathingExerciseOpen, setIsBreathingExerciseOpen] = useState<boolean>(false);
  const [currentAffirmation, setCurrentAffirmation] = useState<string>('');
  
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const storedSettings = localStorage.getItem('bloomy-settings');
       const defaults: Omit<AppSettings, 'userName'> = {
        theme: 'Classic',
        font: 'Nunito',
        petalSettings: {
          enabled: true,
          color: 'pink',
          speed: 'medium',
          density: 'low',
        },
        customTheme: {
          c1: '#FFDAB9',
          c2: '#FFC7C7',
          c3: '#A8D8B9',
          c4: '#FFDF7A',
        }
      };

      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        return {
          ...defaults,
          ...parsed,
          petalSettings: {
            ...defaults.petalSettings,
            ...(parsed.petalSettings || {})
          },
          customTheme: {
            ...defaults.customTheme,
            ...(parsed.customTheme || {})
          }
        };
      }
      return defaults as AppSettings;
    } catch (error) {
       return {
        theme: 'Classic',
        font: 'Nunito',
        petalSettings: { enabled: true, color: 'pink', speed: 'medium', density: 'low' },
        customTheme: { c1: '#FFDAB9', c2: '#FFC7C7', c3: '#A8D8B9', c4: '#FFDF7A' }
      } as AppSettings;
    }
  });
  
  const chatRef = useRef<Chat | null>(null);
  const isFirstMessageInSession = useRef<boolean>(true);
  const currentMood = useRef<Mood | null>(null);
  const activeJournalId = useRef<string | null>(null);

  useEffect(() => {
    const session = checkSession();
    if (session) {
      setCurrentUser(session.user);
    }
    setIsAuthenticating(false);
  }, []);

  useEffect(() => {
    document.body.style.fontFamily = `'${settings.font}', sans-serif`;
    
    if (settings.theme === 'Custom' && settings.customTheme) {
        document.documentElement.removeAttribute('data-theme');
        document.body.style.setProperty('--bg-grad-1', settings.customTheme.c1);
        document.body.style.setProperty('--bg-grad-2', settings.customTheme.c2);
        document.body.style.setProperty('--bg-grad-3', settings.customTheme.c3);
        document.body.style.setProperty('--bg-grad-4', settings.customTheme.c4);
    } else {
        document.documentElement.dataset.theme = settings.theme.toLowerCase();
        document.body.style.removeProperty('--bg-grad-1');
        document.body.style.removeProperty('--bg-grad-2');
        document.body.style.removeProperty('--bg-grad-3');
        document.body.style.removeProperty('--bg-grad-4');
    }

    localStorage.setItem('bloomy-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
        chatRef.current = startChatSession(currentUser.name);
    }
  }, [currentUser]);
  
  const handleMoodSelect = (mood: Mood) => {
    if (!currentUser) return;
    currentMood.current = mood;
    activeJournalId.current = null;
    const welcomeMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'bloomy',
      text: `It's nice to see you, ${currentUser.name}! How about we write a little about what's on your mind? Your first message will be added to your garden. 🌸`
    };
    setMessages([welcomeMessage]);
    setView('chat');
    isFirstMessageInSession.current = true;
  };
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatRef.current || !currentUser) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text };

    const updatedMessagesWithUser = [...messages, userMessage];
    setMessages(updatedMessagesWithUser);

    if (text.trim().toLowerCase() === "let your feelings bloom") {
      setIsBloomyTyping(true);
      setTimeout(() => {
        const easterEggResponse: ChatMessage = {
          id: `bloomy-easter-egg-${Date.now()}`,
          sender: 'bloomy',
          text: "A tiny seed, a hopeful start,\nA feeling planted in the heart.\nWith gentle words and sunny skies,\nWatch your garden start to rise. 🌷✨",
          isEasterEgg: true,
        };
        setMessages(prev => [...prev, easterEggResponse]);
        setIsBloomyTyping(false);
      }, 1000);
      return; 
    }

    if (isFirstMessageInSession.current && currentMood.current) {
        const newEntry: JournalEntry = {
            id: `journal-${Date.now()}`,
            date: new Date(),
            mood: currentMood.current,
            text: text,
            chatHistory: updatedMessagesWithUser
        };
        setJournalEntries(prevEntries => [...prevEntries, newEntry]);
        activeJournalId.current = newEntry.id;
        isFirstMessageInSession.current = false;
    } else if(activeJournalId.current) {
        setJournalEntries(prevEntries => prevEntries.map(entry => 
            entry.id === activeJournalId.current ? { ...entry, chatHistory: updatedMessagesWithUser } : entry
        ));
    }

    setIsBloomyTyping(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: text });

      const bloomyResponseId = `bloomy-${Date.now()}`;
      let fullResponseText = "";
      let messageAdded = false;

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (!chunkText) continue;

        if (!messageAdded) {
            setIsBloomyTyping(false);
            const newBloomyMessage: ChatMessage = { id: bloomyResponseId, sender: 'bloomy', text: '' };
            setMessages(prev => [...prev, newBloomyMessage]);
            messageAdded = true;
        }

        fullResponseText += chunkText;
        setMessages(prev => prev.map(msg => 
            msg.id === bloomyResponseId ? { ...msg, text: fullResponseText } : msg
        ));
      }

      if (activeJournalId.current) {
        const finalBloomyMessage: ChatMessage = { id: bloomyResponseId, sender: 'bloomy', text: fullResponseText };
        setJournalEntries(prevEntries => prevEntries.map(entry =>
            entry.id === activeJournalId.current ? { ...entry, chatHistory: [...entry.chatHistory, finalBloomyMessage] } : entry
        ));
      }
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'bloomy',
        text: "Oops! I'm having a little trouble connecting. Please try again in a moment.",
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsBloomyTyping(false);
    }
  }, [messages, currentUser]);

  const handleDeleteEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== id));
  };
  
  const handleSelectEntry = (entry: JournalEntry) => {
    setMessages(entry.chatHistory);
    currentMood.current = entry.mood;
    activeJournalId.current = entry.id;
    isFirstMessageInSession.current = false;
    setView('chat');
  };

  const resetChat = () => {
    setMessages([]);
    setView('mood-check-in');
    isFirstMessageInSession.current = true;
    currentMood.current = null;
    activeJournalId.current = null;
    if (currentUser) {
        chatRef.current = startChatSession(currentUser.name);
    }
  }

  const handleShowAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
    setIsAffirmationOpen(true);
  };
  
  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setAuthError(null);
    try {
      const { user } = await login(email, password);
      setCurrentUser(user);
      return true;
    } catch (error) {
      setAuthError((error as Error).message);
      return false;
    }
  };

  const handleSignup = async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthError(null);
    try {
      const { user } = await signup(name, email, password);
      setCurrentUser(user);
      return true;
    } catch (error) {
      setAuthError((error as Error).message);
      return false;
    }
  };
  
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setMessages([]);
    setJournalEntries([]);
    setView('mood-check-in');
  }

  if (isAuthenticating) {
    return <div className="bg-transparent min-h-screen" />; // Or a loading spinner
  }
  
  return (
    <div className={`bg-transparent min-h-screen text-text-primary flex flex-col font-${settings.font.toLowerCase()}`}>
      {settings.petalSettings.enabled && currentUser && <FallingPetals settings={settings.petalSettings} />}
       {!currentUser ? (
        <AuthPage 
          onLogin={handleLogin} 
          onSignup={handleSignup}
          error={authError} 
        />
       ) : (
        <>
            <Header 
                user={currentUser}
                currentView={view} 
                setView={setView} 
                resetChat={resetChat} 
                onOpenSettings={() => setIsSettingsOpen(true)}
                onShowAffirmation={handleShowAffirmation}
                onOpenBreathingExercise={() => setIsBreathingExerciseOpen(true)}
            />
            <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
                <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
                {view === 'mood-check-in' && <MoodSelector onMoodSelect={handleMoodSelect} userName={currentUser.name} />}
                {view === 'chat' && <ChatWindow messages={messages} onSendMessage={handleSendMessage} isBloomyTyping={isBloomyTyping} />}
                {view === 'garden' && <JournalGarden entries={journalEntries} onDeleteEntry={handleDeleteEntry} onSelectEntry={handleSelectEntry} />}
                </div>
            </main>
            <SettingsModal 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                settings={settings}
                onSettingsChange={setSettings}
                onLogout={handleLogout}
            />
            <AffirmationModal
                isOpen={isAffirmationOpen}
                onClose={() => setIsAffirmationOpen(false)}
                affirmation={currentAffirmation}
            />
            <PetalBreathing
                isOpen={isBreathingExerciseOpen}
                onClose={() => setIsBreathingExerciseOpen(false)}
            />
        </>
      )}
    </div>
  );
};

export default App;