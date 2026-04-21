import React, { useState, useEffect } from 'react';
import { Palace, Room } from '../types';
import { Brain, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';

interface QuizEngineProps {
  palace: Palace;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ palace, onComplete, onExit }) => {
  const [currentStep, setCurrentStep] = useState(palace.rooms.length - 1); // Reverse trip
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const currentRoom = palace.rooms[currentStep];

  useEffect(() => {
    if (!isFinished) {
      generateOptions();
    }
  }, [currentStep, isFinished]);

  const generateOptions = () => {
    const correctTerm = currentRoom.concepts[0].term;
    const allOtherConcepts = palace.rooms
      .flatMap(r => r.concepts)
      .map(c => c.term)
      .filter(t => t !== correctTerm);
    
    // Shuffle and pick 3 random distractors
    const distractors = allOtherConcepts.sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [correctTerm, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(combined);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = option === currentRoom.concepts[0].term;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="chromatic-glass p-12 max-w-md w-full">
          <Trophy size={64} className="mx-auto text-yellow-500" />
          <h2 className="mt-6 text-3xl font-bold">Quiz Complete</h2>
          <p className="mt-2 text-zinc-400">You recalled your palace with spatial precision.</p>
          
          <div className="mt-8 text-5xl font-black text-white">
            {Math.round((score / palace.rooms.length) * 100)}%
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-2">Accuracy Score</p>
          
          <button 
            onClick={() => onComplete(score)}
            className="mt-10 w-full rounded-xl bg-white py-3 font-bold text-black hover:bg-zinc-200"
          >
            Update Recall State
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-zinc-500">
            <Brain size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Reverse Retrieval</span>
          </div>
          <div className="text-xs font-bold text-zinc-500">
            STEP {palace.rooms.length - currentStep} OF {palace.rooms.length}
          </div>
        </div>

        <div className="chromatic-glass p-8 lg:p-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Room: {currentRoom.name}</h3>
          <p className="text-xl font-medium text-white leading-relaxed mb-10">
            "You recall the sensory details... {currentRoom.sensory.visual.toLowerCase()}. Which concept is anchored here?"
          </p>

          <div className="grid grid-cols-1 gap-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                  selectedOption === option
                    ? isCorrect
                      ? 'border-green-500 bg-green-500/10 text-green-500'
                      : 'border-red-500 bg-red-500/10 text-red-500'
                    : selectedOption && option === currentRoom.concepts[0].term
                      ? 'border-green-500 bg-green-500/10 text-green-500'
                      : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
                }`}
              >
                <span className="font-semibold">{option}</span>
                {selectedOption === option && (
                  isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />
                )}
              </button>
            ))}
          </div>

          {selectedOption && (
            <button
              onClick={handleNext}
              className="mt-10 w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500"
            >
              Continue Journey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;
