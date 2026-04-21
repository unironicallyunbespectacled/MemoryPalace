import { Palace } from "../types";

export function generateMockPalace(concepts: string[]): Palace {
  return {
    id: crypto.randomUUID(),
    title: "Mock Memory Palace (Demo)",
    domain: "formal-analysis",
    location: { type: "fictional", place: "The Astral Archive" },
    architecture: {
      style: "Gothic Brutalist",
      material: "Obsidian and Cold Neon",
      color_palette: ["#1a1a1a", "#00ffcc", "#8a2be2"]
    },
    rooms: concepts.map((concept, index) => ({
      id: `room-${index}`,
      name: `Chamber of ${concept}`,
      sequence: index + 1,
      description: `A vast, echoing space dedicated to the concept of ${concept}.`,
      imagery: `A giant, floating ${concept} made of cracked crystal...`,
      sensory: {
        visual: "Flickering lights and deep shadows.",
        olfactory: "The smell of ozone and old paper.",
        auditory: "A low, constant hum like a distant turbine.",
        kinesthetic: "The floor feels slightly spongy underfoot.",
        gustatory: "A metallic tang on the tongue."
      },
      concepts: [{
        id: `c-${index}`,
        term: concept,
        image: `A surrealist representation of ${concept}.`,
        mnemonic: `Visualize ${concept} interacting with a giant ticking clock.`,
        relationships: []
      }],
      exits: index < concepts.length - 1 ? [`room-${index + 1}`] : ["exit"]
    })),
    concept_graph: { nodes: [], edges: [] },
    review_state: {
      created_at: new Date().toISOString(),
      last_reviewed: new Date().toISOString(),
      review_count: 0,
      decay_level: 0
    },
    tone: "dark"
  };
}
