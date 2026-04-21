import { Palace } from "../types";

const DECAY_RATE_PER_DAY = 0.05; // 5% decay per day

export function calculatePalaceDecay(palace: Palace): Palace {
  const lastReviewed = new Date(palace.review_state.last_reviewed);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastReviewed.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) return palace;

  const additionalDecay = diffDays * DECAY_RATE_PER_DAY;
  const newDecay = Math.min(1, palace.review_state.decay_level + additionalDecay);

  return {
    ...palace,
    review_state: {
      ...palace.review_state,
      decay_level: newDecay
    }
  };
}
