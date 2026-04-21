import React from 'react';
import { Palace } from '../types';
import { Building2, Calendar, Brain } from 'lucide-react';

interface PalaceCardProps {
  palace: Palace;
  onClick: (id: string) => void;
}

const PalaceCard: React.FC<PalaceCardProps> = ({ palace, onClick }) => {
  const lastReviewed = new Date(palace.review_state.last_reviewed).toLocaleDateString();
  const decayPercent = Math.round(palace.review_state.decay_level * 100);

  return (
    <div 
      onClick={() => onClick(palace.id)}
      className="chromatic-glass group cursor-pointer p-6 transition-all hover:scale-[1.02] hover:bg-white/15"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white">{palace.title}</h3>
          <div className="mt-2 flex items-center space-x-4 text-xs font-medium uppercase tracking-wider text-zinc-400">
            <span className="flex items-center space-x-1">
              <Building2 size={12} />
              <span>{palace.rooms.length} Rooms</span>
            </span>
            <span className="flex items-center space-x-1">
              <Brain size={12} />
              <span>{palace.domain}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`h-2.5 w-2.5 rounded-full ${decayPercent > 50 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
          <span className="mt-1 text-[10px] font-bold text-zinc-500 uppercase">{decayPercent}% Decay</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-zinc-500">
          <Calendar size={14} />
          <span className="text-xs">{lastReviewed}</span>
        </div>
        <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20">
          Walk Palace
        </button>
      </div>
      
      {/* Decorative architectural style tag */}
      <div className="absolute -bottom-2 -right-2 opacity-5 transition-opacity group-hover:opacity-10">
        <Building2 size={80} />
      </div>
    </div>
  );
};

export default PalaceCard;
