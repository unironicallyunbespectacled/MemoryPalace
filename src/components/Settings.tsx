import React, { useState } from 'react';
import { usePalaceStore } from '../store/usePalaceStore';

const Settings: React.FC = () => {
  const { geminiApiKey, setGeminiApiKey } = usePalaceStore();
  const [key, setKey] = useState(geminiApiKey || '');

  const handleSave = () => {
    setGeminiApiKey(key);
    alert('API Key saved to LocalStorage');
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-sm text-zinc-500">Configure your architectural engine</p>
      </div>

      <div className="chromatic-glass p-8">
        <h3 className="text-lg font-semibold text-white">Gemini API Key</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Required for generating new palaces. Your key is stored locally in your browser and never sent to our servers.
        </p>
        
        <div className="mt-6">
          <label htmlFor="api-key" className="block text-xs font-bold uppercase tracking-widest text-zinc-500">
            Anthropic/Google API Key
          </label>
          <input
            id="api-key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-8 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
        >
          Save Configuration
        </button>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
        <h3 className="text-sm font-semibold text-white">About Memory Palace Architect</h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Version 1.0.0 (MVP) - Specifically optimized for Minerva M29 HC Workflows.
          Built with React, Tauri, and Gemini Pro.
        </p>
      </div>
    </div>
  );
};

export default Settings;
