import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Palace } from '../types';

interface PalaceState {
  palaces: Palace[];
  geminiApiKey: string | null;
  addPalace: (palace: Palace) => void;
  removePalace: (id: string) => void;
  updatePalace: (id: string, palace: Partial<Palace>) => void;
  setGeminiApiKey: (key: string | null) => void;
}

export const usePalaceStore = create<PalaceState>()(
  persist(
    (set) => ({
      palaces: [],
      geminiApiKey: null,
      addPalace: (palace) => set((state) => ({ palaces: [...state.palaces, palace] })),
      removePalace: (id) => set((state) => ({ palaces: state.palaces.filter((p) => p.id !== id) })),
      updatePalace: (id, updatedPalace) => set((state) => ({
        palaces: state.palaces.map((p) => p.id === id ? { ...p, ...updatedPalace } : p)
      })),
      setGeminiApiKey: (key) => set({ geminiApiKey: key }),
    }),
    {
      name: 'palace-storage',
    }
  )
);
