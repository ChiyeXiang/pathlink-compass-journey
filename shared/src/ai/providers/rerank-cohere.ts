// src/ai/providers/rerank-cohere.ts
import { CohereClient } from 'cohere-ai';
import type { RerankerProvider } from '../types';

export const CohereReranker = (apiKey: string): RerankerProvider => {
  const co = new CohereClient({ token: apiKey });
  return {
    name: 'cohere-rerank-3',
    async rerank(query, docs, topN = 10) {
      const { results } = await co.rerank({ model: 'rerank-3', query, documents: docs, topN: topN });
      return results.map(r => ({ index: r.index!, score: r.relevanceScore! }));
    },
  }; 
};

