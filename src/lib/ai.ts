export type Sentiment = "positive" | "neutral" | "negative";

export function simpleSentiment(text: string): Sentiment {
  const t = text.toLowerCase();
  const pos = ["hope", "support", "love", "unity", "resilient", "peace"];
  const neg = ["fear", "violence", "sad", "pain", "loss", "grief"];
  let score = 0;
  for (const p of pos) if (t.includes(p)) score++;
  for (const n of neg) if (t.includes(n)) score--;
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}

export function keywordMatch(text: string, q: string): boolean {
  return text.toLowerCase().includes(q.toLowerCase());
}


