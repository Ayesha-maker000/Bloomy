import React, { useState, FormEvent } from 'react';
import { BloomyMascot } from './Icons';

interface AuthPageProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: (name: string, email: string, password: string) => Promise<boolean>;
  error: string | null;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup, error }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let success = false;
    if (isLoginView) {
      success = await onLogin(email, password);
    } else {
      success = await onSignup(name, email, password);
    }
    if (!success) {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 z-10 animate-fade-in">
        <div className="w-full max-w-sm mx-auto bg-bg-secondary/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
                <BloomyMascot className="w-20 h-20 mx-auto mb-2" />
                <h1 className="text-3xl font-bold text-text-accent font-comfortaa">
                    Welcome to Bloomy
                </h1>
                <p className="text-text-secondary mt-1">
                    {isLoginView ? "Sign in to tend to your garden." : "Create an account to get started."}
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginView && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-text-secondary mb-1">Your Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-bg-input border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary transition text-text-primary"
                            placeholder="e.g. Sunshine"
                        />
                    </div>
                )}
                 <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-bg-input border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary transition text-text-primary"
                        placeholder="you@example.com"
                    />
                </div>
                 <div>
                    <label htmlFor="password"className="block text-sm font-semibold text-text-secondary mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 bg-bg-input border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary transition text-text-primary"
                        placeholder="••••••••"
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-hover transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        isLoginView ? 'Login' : 'Create Account'
                    )}
                </button>
            </form>
             <p className="text-center text-sm text-text-secondary mt-6">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
                <button onClick={toggleView} className="font-semibold text-text-accent hover:underline ml-1">
                     {isLoginView ? "Sign up" : "Login"}
                </button>
            </p>
        </div>
    </main>
  );
}
