import React, { useState } from 'react';
import { usePalaceStore } from '../store/usePalaceStore';
import { generatePalace } from '../services/geminiService';
import { generateMockPalace } from '../services/mockGenerator';
import { Domain, PalaceTone } from '../types';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

const Generator: React.FC = () => {
  const { addPalace, geminiApiKey } = usePalaceStore();
  const [concepts, setConcepts] = useState('');
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState<Domain>('formal-analysis');
  const [tone, setTone] = useState<PalaceTone>('elegant');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useMock, setUseMock] = useState(false);

  const handleGenerate = async () => {
    if (!title || !concepts) {
      alert('Please provide a title and at least one concept.');
      return;
    }

    const conceptList = concepts.split(',').map((c) => c.trim()).filter(Boolean);
    if (conceptList.length === 0) return;

    setIsGenerating(true);
    try {
      let palace;
      if (useMock || !geminiApiKey) {
        if (!useMock && !geminiApiKey) {
          alert('No API key found. Defaulting to mock generator.');
        }
        palace = generateMockPalace(conceptList);
        palace.title = title;
        palace.domain = domain;
        palace.tone = tone;
      } else {
        palace = await generatePalace(geminiApiKey, conceptList, { title, domain, tone });
      }
      addPalace(palace);
      alert('Palace architecture generated successfully!');
      setConcepts('');
      setTitle('');
    } catch (error: any) {
      console.error(error);
      alert(`Generation failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Palace Architect Generator</h2>
        <p className="text-sm text-zinc-500">Transform your concepts into a spatial journey</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Input Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Palace Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Lake Victoria Stakeholder Analysis"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Concepts (Comma Separated)</label>
              <textarea
                value={concepts}
                onChange={(e) => setConcepts(e.target.value)}
                placeholder="Bayes Theorem, Prior Probabilities, Likelihood Ratio, Posterior..."
                rows={5}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              disabled={isGenerating}
              onClick={handleGenerate}
              className="group relative flex flex-1 items-center justify-center space-x-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Architecting Space...</span>
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  <span>Generate Spatial Palace</span>
                </>
              )}
            </button>

            <button
              onClick={() => setUseMock(!useMock)}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all ${
                useMock ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-white/10 text-zinc-500'
              }`}
            >
              <Sparkles size={24} />
            </button>
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Domain</h3>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {(['formal-analysis', 'cs-ai', 'business', 'interdisciplinary'] as Domain[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`rounded-xl px-4 py-2 text-left text-xs font-semibold transition-all ${
                    domain === d ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  {d.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-widest text-zinc-500">Tone</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(['whimsical', 'elegant', 'dark', 'minimal', 'humorous'] as PalaceTone[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-xl px-4 py-2 text-center text-xs font-semibold transition-all ${
                    tone === t ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
