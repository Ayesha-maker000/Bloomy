import React, { useState, useEffect } from 'react';
import type { AppSettings, Font, Theme, PetalColor, PetalSpeed, PetalDensity, CustomTheme } from '../types';
import { PaletteIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (newSettings: AppSettings) => void;
}

const fonts: Font[] = ['Nunito', 'Inter', 'Lobster', 'Poppins', 'Caveat', 'Comfortaa'];
const themes: { name: Exclude<Theme, 'Custom'>, gradient: string }[] = [
    { name: 'Classic', gradient: 'from-[#FFDAB9] via-[#FFC7C7] to-[#A8D8B9]' },
    { name: 'Starlight', gradient: 'from-[#2C3E50] via-[#34495E] to-[#233140]' },
    { name: 'Sunset', gradient: 'from-[#f8b595] via-[#f67280] to-[#c06c84]' },
    { name: 'Forest', gradient: 'from-[#cad2c5] via-[#a8d8b9] to-[#84a98c]' },
    { name: 'Ocean', gradient: 'from-[#a2d2ff] via-[#bde0fe] to-[#89c2d9]' },
];
const petalColors: PetalColor[] = ['pink', 'gold', 'mixed'];
const petalSpeeds: PetalSpeed[] = ['slow', 'medium', 'fast'];
const petalDensities: PetalDensity[] = ['low', 'medium', 'high'];


export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [isOpen, settings]);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  
  // Allow live preview of settings
  useEffect(() => {
    if (isOpen) {
        onSettingsChange(localSettings);
    }
  }, [localSettings, isOpen, onSettingsChange]);

  const handleCustomColorChange = (colorKey: keyof CustomTheme, value: string) => {
    setLocalSettings(prev => ({
        ...prev,
        customTheme: {
            ...(prev.customTheme),
            [colorKey]: value,
        }
    }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={handleSave}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div 
        className="bg-bg-secondary rounded-2xl shadow-2xl p-6 md:p-8 w-11/12 max-w-md animate-slide-in overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="settings-title" className="text-2xl font-bold text-text-primary mb-6">Settings</h2>

        {/* User Name */}
        <div className="mb-6">
          <label htmlFor="userName" className="block text-sm font-semibold text-text-secondary mb-2">
            What should Bloomy call you?
          </label>
          <input
            id="userName"
            type="text"
            value={localSettings.userName}
            onChange={(e) => setLocalSettings({ ...localSettings, userName: e.target.value })}
            className="w-full px-4 py-2 bg-bg-input border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary transition text-text-primary"
            placeholder="e.g., sunshine"
          />
        </div>

        {/* Theme */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text-secondary mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-3">
             {themes.map(theme => (
              <button
                key={theme.name}
                onClick={() => setLocalSettings({ ...localSettings, theme: theme.name })}
                className={`text-center rounded-lg transition-all duration-200 focus:outline-none ${
                    localSettings.theme === theme.name ? 'ring-2 ring-offset-2 ring-brand-primary ring-offset-bg-secondary' : 'ring-1 ring-transparent hover:ring-1 hover:ring-brand-secondary'
                }`}
              >
                  <div className={`w-full h-12 rounded-t-md bg-gradient-to-br ${theme.gradient}`}></div>
                  <p className="text-xs font-semibold p-2 bg-bg-primary rounded-b-md text-text-secondary">{theme.name}</p>
              </button>
            ))}
             <button
                onClick={() => setLocalSettings({ ...localSettings, theme: 'Custom' })}
                className={`text-center rounded-lg transition-all duration-200 focus:outline-none ${
                    localSettings.theme === 'Custom' ? 'ring-2 ring-offset-2 ring-brand-primary ring-offset-bg-secondary' : 'ring-1 ring-transparent hover:ring-1 hover:ring-brand-secondary'
                }`}
              >
                  <div className="w-full h-12 rounded-t-md bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400 flex items-center justify-center">
                    <PaletteIcon className="w-6 h-6 text-white/80" />
                  </div>
                  <p className="text-xs font-semibold p-2 bg-bg-primary rounded-b-md text-text-secondary">Custom</p>
              </button>
          </div>
        </div>
        
        {localSettings.theme === 'Custom' && localSettings.customTheme && (
            <div className="my-6 p-4 bg-bg-input/50 rounded-lg animate-fade-in">
                <h4 className="text-sm font-semibold text-text-secondary mb-3">Custom Gradient</h4>
                <div className="grid grid-cols-2 gap-4">
                    {(Object.keys(localSettings.customTheme) as Array<keyof CustomTheme>).map((key, index) => (
                        <div key={key}>
                            <label htmlFor={key} className="block text-xs font-medium text-text-secondary mb-1.5">
                                Color {index + 1}
                            </label>
                            <div className="relative">
                                <input
                                    id={key}
                                    type="color"
                                    value={localSettings.customTheme![key]}
                                    onChange={(e) => handleCustomColorChange(key, e.target.value)}
                                    className="p-1 h-10 w-full block bg-white border border-border-primary rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}


        {/* Font */}
        <div className="mb-8">
           <label htmlFor="font" className="block text-sm font-semibold text-text-secondary mb-2">
            Font Style
          </label>
          <select
            id="font"
            value={localSettings.font}
            onChange={(e) => setLocalSettings({ ...localSettings, font: e.target.value as Font })}
            className="w-full px-4 py-2 bg-bg-input text-text-primary border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary transition appearance-none"
            style={{ 
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="${localSettings.theme === 'Starlight' || localSettings.theme === 'Sunset' ? '#BDC3C7' : '#4B5563'}" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.2em'
             }}
          >
            {fonts.map(font => (
              <option key={font} value={font} className={`font-${font.toLowerCase()}`}>
                {font}
              </option>
            ))}
          </select>
        </div>
        
        <hr className="my-6 border-border-primary" />

        <h3 className="text-xl font-bold text-text-primary mb-4">Falling Petals</h3>
        
        {/* Enable Petals */}
        <div className="mb-6 flex items-center justify-between">
            <label htmlFor="petalToggle" className="text-sm font-semibold text-text-secondary">
                Enable Animation
            </label>
            <button
                id="petalToggle"
                role="switch"
                aria-checked={localSettings.petalSettings.enabled}
                onClick={() => setLocalSettings(prev => ({ ...prev, petalSettings: { ...prev.petalSettings, enabled: !prev.petalSettings.enabled } }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-bg-secondary focus:ring-brand-secondary ${
                    localSettings.petalSettings.enabled ? 'bg-brand-primary' : 'bg-bg-input'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.petalSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>

        {/* Petal Color */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text-secondary mb-2">Color</label>
          <div className="flex gap-2 bg-bg-input p-1 rounded-lg">
            {petalColors.map(color => (
              <button
                key={color}
                onClick={() => setLocalSettings(prev => ({ ...prev, petalSettings: { ...prev.petalSettings, color: color as PetalColor } }))}
                className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${
                  localSettings.petalSettings.color === color
                  ? 'bg-brand-primary text-white shadow' 
                  : 'hover:bg-bg-secondary/50'
                }`}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Petal Speed */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text-secondary mb-2">Speed</label>
           <div className="flex gap-2 bg-bg-input p-1 rounded-lg">
            {petalSpeeds.map(speed => (
              <button
                key={speed}
                onClick={() => setLocalSettings(prev => ({ ...prev, petalSettings: { ...prev.petalSettings, speed: speed as PetalSpeed } }))}
                className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${
                  localSettings.petalSettings.speed === speed
                  ? 'bg-brand-primary text-white shadow' 
                  : 'hover:bg-bg-secondary/50'
                }`}
              >
                {speed.charAt(0).toUpperCase() + speed.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Petal Density */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-text-secondary mb-2">Density</label>
           <div className="flex gap-2 bg-bg-input p-1 rounded-lg">
            {petalDensities.map(density => (
              <button
                key={density}
                onClick={() => setLocalSettings(prev => ({ ...prev, petalSettings: { ...prev.petalSettings, density: density as PetalDensity } }))}
                className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${
                  localSettings.petalSettings.density === density
                  ? 'bg-brand-primary text-white shadow' 
                  : 'hover:bg-bg-secondary/50'
                }`}
              >
                {density.charAt(0).toUpperCase() + density.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-hover transition-transform transform hover:scale-105"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};