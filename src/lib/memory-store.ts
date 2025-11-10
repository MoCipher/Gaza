type MemoryTestimonial = {
  _id: string;
  name: string;
  location?: string;
  rating?: number;
  text: string;
  isVideo?: boolean;
  verified?: boolean;
  imageUrl?: string;
  videoUrl?: string;
  ratingsSum?: number;
  ratingsCount?: number;
};

// In-memory fallback for local testing without DB
export const memoryStore: MemoryTestimonial[] = [];
