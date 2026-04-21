import React, { useState } from 'react';
import { Palace, Room } from '../types';
import QuizEngine from './QuizEngine';
import { usePalaceStore } from '../store/usePalaceStore';
import { ChevronLeft, ChevronRight, Map as MapIcon, Info, Eye, Brain, GraduationCap } from 'lucide-react';

interface PalaceViewerProps {
  palace: Palace;
  onExit: () => void;
}

const PalaceViewer: React.FC<PalaceViewerProps> = ({ palace, onExit }) => {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'walk' | 'map' | 'quiz'>('walk');
  const [showDetails, setShowDetails] = useState(true);
  const { updatePalace } = usePalaceStore();

  const currentRoom = palace.rooms[currentRoomIndex];

  const handleQuizComplete = (score: number) => {
    // Logic to update decay and review state
    const accuracy = score / palace.rooms.length;
    const newDecay = Math.max(0, palace.review_state.decay_level - accuracy * 0.5);
    updatePalace(palace.id, {
      review_state: {
        ...palace.review_state,
        last_reviewed: new Date().toISOString(),
        review_count: palace.review_state.review_count + 1,
        decay_level: newDecay
      }
    });
    setViewMode('walk');
  };

  const handleNext = () => {
    if (currentRoomIndex < palace.rooms.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Viewer Header */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 px-6 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={onExit} className="text-zinc-400 hover:text-white">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-lg font-bold tracking-tight">{palace.title}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {viewMode === 'walk' ? `Room ${currentRoom.sequence} of ${palace.rooms.length}` : 'Architectural Map'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 rounded-xl bg-white/5 p-1">
          <button 
            onClick={() => setViewMode('walk')}
            className={`flex items-center space-x-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${viewMode === 'walk' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            <Eye size={14} />
            <span>Walk</span>
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`flex items-center space-x-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            <MapIcon size={14} />
            <span>Map</span>
          </button>
          <button 
            onClick={() => setViewMode('quiz')}
            className={`flex items-center space-x-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${viewMode === 'quiz' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            <GraduationCap size={14} />
            <span>Quiz</span>
          </button>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden">
        {viewMode === 'quiz' ? (
          <QuizEngine 
            palace={palace} 
            onComplete={handleQuizComplete} 
            onExit={() => setViewMode('walk')} 
          />
        ) : viewMode === 'walk' ? (
          <div className="flex h-full flex-col lg:flex-row">
            {/* 3D-ish Viewport (Placeholder for visual depth) */}
            <div className="relative flex-1 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 flex items-center justify-center">
               <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${palace.architecture.color_palette[1] || '#3b82f6'} 0%, transparent 70%)` }}></div>
               
               <div className="chromatic-glass relative aspect-video w-full max-w-4xl p-12 flex flex-col items-center justify-center text-center">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white lg:text-5xl">
                    {currentRoom.name}
                  </h3>
                  <div className="mt-8 max-w-2xl text-lg text-zinc-300 leading-relaxed italic">
                    "{currentRoom.description}"
                  </div>
                  
                  {/* Anchored Concept Floating Box */}
                  <div className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Anchored Concept</p>
                    <h4 className="mt-1 text-2xl font-bold text-white">{currentRoom.concepts[0]?.term}</h4>
                    <p className="mt-2 text-sm text-zinc-400">{currentRoom.concepts[0]?.image}</p>
                  </div>
               </div>

               {/* Navigation Arrows Overlay */}
               <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 justify-between">
                  <button 
                    onClick={handlePrev} 
                    disabled={currentRoomIndex === 0}
                    className="h-12 w-12 rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md flex items-center justify-center disabled:opacity-0 hover:bg-white/10"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={currentRoomIndex === palace.rooms.length - 1}
                    className="h-12 w-12 rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md flex items-center justify-center disabled:opacity-0 hover:bg-white/10"
                  >
                    <ChevronRight size={32} />
                  </button>
               </div>
            </div>

            {/* Sensory Sidebar */}
            <aside className={`w-full border-l border-white/10 bg-zinc-950 p-8 lg:w-96 overflow-y-auto transition-all ${showDetails ? 'block' : 'hidden'}`}>
               <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sensory Encoding</h4>
                  <button onClick={() => setShowDetails(false)} className="text-zinc-600 lg:hidden"><ChevronLeft /></button>
               </div>

               <div className="mt-8 space-y-8">
                  <SensoryItem label="Visual" text={currentRoom.sensory.visual} color="text-blue-400" />
                  <SensoryItem label="Auditory" text={currentRoom.sensory.auditory} color="text-purple-400" />
                  <SensoryItem label="Olfactory" text={currentRoom.sensory.olfactory} color="text-green-400" />
                  <SensoryItem label="Kinesthetic" text={currentRoom.sensory.kinesthetic} color="text-orange-400" />
                  <SensoryItem label="Gustatory" text={currentRoom.sensory.gustatory} color="text-red-400" />
               </div>

               <div className="mt-12 rounded-2xl bg-zinc-900 p-6">
                  <h4 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Brain size={14} />
                    <span>Mnemonic Key</span>
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {currentRoom.concepts[0]?.mnemonic}
                  </p>
               </div>
            </aside>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-12">
            <div className="chromatic-glass h-full w-full max-w-5xl p-8 flex items-center justify-center">
              <svg viewBox="0 0 800 400" className="h-full w-full">
                {/* Render sequential rooms as a path */}
                {palace.rooms.map((room, i) => {
                  const x = 100 + (i % 4) * 180;
                  const y = 100 + Math.floor(i / 4) * 150;
                  return (
                    <g key={room.id} onClick={() => { setCurrentRoomIndex(i); setViewMode('walk'); }} className="cursor-pointer group">
                      {/* Connection Line */}
                      {i < palace.rooms.length - 1 && (
                        <line 
                          x1={x} y1={y} 
                          x2={100 + ((i + 1) % 4) * 180} 
                          y2={100 + Math.floor((i + 1) / 4) * 150} 
                          stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" 
                        />
                      )}
                      <rect 
                        x={x - 40} y={y - 40} width={80} height={80} 
                        className={`transition-all duration-300 ${i === currentRoomIndex ? 'fill-blue-600' : 'fill-white/5 stroke-white/20 group-hover:fill-white/10'}`} 
                        rx="12" 
                      />
                      <text x={x} y={y + 5} textAnchor="middle" className="fill-white text-[10px] font-bold pointer-events-none">
                        {i + 1}
                      </text>
                      <text x={x} y={y + 60} textAnchor="middle" className="fill-zinc-500 text-[8px] font-bold uppercase tracking-tighter pointer-events-none">
                        {room.name.length > 15 ? room.name.substring(0, 15) + '...' : room.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}
      </main>

      {/* Control Footer (Mobile) */}
      <footer className="flex h-20 items-center justify-between border-t border-white/10 px-6 lg:hidden">
         <button onClick={handlePrev} disabled={currentRoomIndex === 0} className="p-2 text-zinc-500 disabled:opacity-10"><ChevronLeft size={32}/></button>
         <button onClick={() => setShowDetails(!showDetails)} className="text-zinc-500"><Info size={24}/></button>
         <button onClick={handleNext} disabled={currentRoomIndex === palace.rooms.length - 1} className="p-2 text-zinc-500 disabled:opacity-10"><ChevronRight size={32}/></button>
      </footer>
    </div>
  );
};

const SensoryItem: React.FC<{ label: string; text: string; color: string }> = ({ label, text, color }) => (
  <div className="group">
    <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${color}`}>{label}</div>
    <div className="mt-1 text-sm text-zinc-400 transition-colors group-hover:text-zinc-200">{text}</div>
  </div>
);

export default PalaceViewer;
