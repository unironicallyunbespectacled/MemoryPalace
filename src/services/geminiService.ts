import { GoogleGenerativeAI } from "@google/generative-ai";
import { Palace, Domain, PalaceTone } from "../types";

const SYSTEM_PROMPT = `
You are a Memory Palace Architect. Your goal is to convert a list of concepts into a spatially coherent, sensory-rich, and narratively compelling memory palace.
The method of loci is the empirically strongest mnemonic technique. You must generate a palace that anchors each concept to a specific physical spot with a weird, memorable image.

GUIDELINES:
1. Spatial Consistency: If Room A is "North" of Room B, maintain that logic. Use a sequential room structure (1, 2, 3...) with logical exits.
2. Sensory Layering: Include visual, olfactory, auditory, kinesthetic, and gustatory details for EVERY room.
3. Memorable Imagery: Use vivid, surreal, and grotesque imagery. The weirder, the better for memory.
4. Concept Mapping: Each room should anchor 1-2 core concepts from the provided list.

OUTPUT FORMAT:
You MUST output valid JSON only, following the Palace interface. No conversational text.
Example structure:
{
  "id": "unique-id",
  "title": "Title",
  "domain": "domain-type",
  "location": { "type": "fictional", "place": "..." },
  "architecture": { "style": "...", "material": "...", "color_palette": ["#...", ...] },
  "rooms": [
    {
      "id": "room-1",
      "name": "...",
      "sequence": 1,
      "description": "...",
      "imagery": "...",
      "sensory": { "visual": "...", "olfactory": "...", "auditory": "...", "kinesthetic": "...", "gustatory": "..." },
      "concepts": [ { "id": "c1", "term": "...", "image": "...", "mnemonic": "...", "relationships": [] } ],
      "exits": ["room-2"]
    }
  ],
  "concept_graph": { "nodes": [], "edges": [] },
  "review_state": { "created_at": "...", "last_reviewed": "...", "review_count": 0, "decay_level": 0 },
  "tone": "..."
}
`;

export async function generatePalace(
  apiKey: string,
  concepts: string[],
  options: { title: string; domain: Domain; tone: PalaceTone; style?: string }
): Promise<Palace> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
    Generate a memory palace for these concepts: ${concepts.join(", ")}
    Title: ${options.title}
    Domain: ${options.domain}
    Tone: ${options.tone}
    ${options.style ? `Architecture Style: ${options.style}` : ""}
    
    Ensure the JSON is valid and complete.
  `;

  const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
  const response = await result.response;
  const text = response.text();
  
  // Clean the response in case of markdown blocks
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to generate a valid palace structure. No JSON found.");
  }

  try {
    const palace = JSON.parse(jsonMatch[0]) as Palace;
    // Inject some client-side defaults/IDs
    palace.id = crypto.randomUUID();
    palace.review_state = {
      created_at: new Date().toISOString(),
      last_reviewed: new Date().toISOString(),
      review_count: 0,
      decay_level: 0,
    };
    return palace;
  } catch (e) {
    console.error("JSON Parse Error:", text);
    throw new Error("Failed to parse the generated palace JSON.");
  }
}
