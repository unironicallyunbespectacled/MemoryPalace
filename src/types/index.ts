export type Domain = 'formal-analysis' | 'cs-ai' | 'business' | 'interdisciplinary';
export type PalaceTone = 'whimsical' | 'elegant' | 'dark' | 'minimal' | 'humorous';

export interface LocationInfo {
  type: 'real' | 'fictional';
  place?: string;
  lat?: number;
  lng?: number;
}

export interface ArchitectureInfo {
  style: string;
  material: string;
  color_palette: string[];
}

export interface SensoryInfo {
  visual: string;
  olfactory: string;
  auditory: string;
  kinesthetic: string;
  gustatory: string;
}

export interface Concept {
  id: string;
  term: string;
  image: string;
  mnemonic: string;
  relationships: string[]; // IDs of related concepts
}

export interface Room {
  id: string;
  name: string;
  sequence: number;
  description: string;
  imagery: string;
  sensory: SensoryInfo;
  concepts: Concept[];
  exits: string[]; // Directions or room IDs
}

export interface ReviewState {
  created_at: string;
  last_reviewed: string;
  review_count: number;
  decay_level: number; // 0.0 to 1.0 (1.0 is full decay)
}

export interface ConceptGraph {
  nodes: { id: string; label: string }[];
  edges: { source: string; target: string }[];
}

export interface Palace {
  id: string;
  title: string;
  domain: Domain;
  location: LocationInfo;
  architecture: ArchitectureInfo;
  rooms: Room[];
  concept_graph: ConceptGraph;
  review_state: ReviewState;
  tone: PalaceTone;
}
