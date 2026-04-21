import { useState } from 'react';
import { usePalaceStore } from './store/usePalaceStore';
import Sidebar from './components/Sidebar';
import PalaceCard from './components/PalaceCard';
import { LayoutDashboard, Compass, BookOpen, Settings as SettingsIcon, BrainCircuit, Plus } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('palaces');
  const { palaces } = usePalaceStore();

  const mobileTabs = [
    { id: 'palaces', icon: LayoutDashboard },
    { id: 'generator', icon: BrainCircuit },
    { id: 'walk', icon: Compass },
    { id: 'library', icon: BookOpen },
    { id: 'settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#09090b] text-white">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-zinc-950/50 px-6 backdrop-blur-xl">
          <h1 className="text-lg font-bold tracking-tight text-white lg:hidden">Palace Architect</h1>
          <div className="hidden items-center space-x-2 text-sm font-medium text-zinc-400 lg:flex">
            <span>Memory Palace</span>
            <span className="text-zinc-700">/</span>
            <span className="text-white capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold hover:bg-white/20">
              <span>M29 - Praise</span>
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-6 pb-24 lg:pb-6">
          {activeTab === 'palaces' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">My Memory Palaces</h2>
                  <p className="text-sm text-zinc-500">Your spatial journey collection</p>
                </div>
                <button 
                  onClick={() => setActiveTab('generator')}
                  className="flex items-center space-x-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500"
                >
                  <Plus size={18} />
                  <span>Build New Palace</span>
                </button>
              </div>

              {palaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
                  <div className="rounded-full bg-white/5 p-4 text-zinc-600">
                    <BrainCircuit size={48} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">No palaces found</h3>
                  <p className="mt-2 text-sm text-zinc-500">Initialize your first spatial architecture by using the generator.</p>
                  <button 
                    onClick={() => setActiveTab('generator')}
                    className="mt-6 rounded-xl bg-white px-6 py-2 text-sm font-bold text-black hover:bg-zinc-200"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {palaces.map((palace) => (
                    <PalaceCard 
                      key={palace.id} 
                      palace={palace} 
                      onClick={(id) => console.log('Click Palace:', id)} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'generator' && (
            <div className="flex h-96 items-center justify-center">
              <p className="text-zinc-500">Generator Component coming soon...</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="flex h-96 items-center justify-center">
              <p className="text-zinc-500">Settings Component coming soon...</p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-around rounded-2xl border border-white/10 bg-zinc-950/80 p-3 backdrop-blur-2xl lg:hidden">
        {mobileTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
              activeTab === tab.id
                ? 'chromatic-glass text-white shadow-lg shadow-blue-500/10'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            <tab.icon size={20} />
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
