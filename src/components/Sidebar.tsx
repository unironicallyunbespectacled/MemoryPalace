import React from 'react';
import { LayoutDashboard, Compass, BookOpen, Settings as SettingsIcon, BrainCircuit } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'palaces', label: 'Palaces', icon: LayoutDashboard },
    { id: 'generator', label: 'Create', icon: BrainCircuit },
    { id: 'walk', label: 'Walk', icon: Compass },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-zinc-950/50 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <h2 className="text-xl font-bold tracking-tighter text-white">Palace Architect</h2>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all ${
              activeTab === tab.id
                ? 'chromatic-glass text-white shadow-lg shadow-blue-500/10'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <tab.icon size={20} />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Quick Stats</p>
          <p className="mt-2 text-sm text-zinc-300">3 Active Palaces</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-800">
            <div className="h-full w-2/3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
