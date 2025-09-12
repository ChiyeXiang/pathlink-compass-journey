// src/ai/index.ts
import { EmbeddingProvider, RerankerProvider } from './types';
import { BgeEmbedding } from './providers/embedding-bge';
import { CohereReranker } from './providers/rerank-cohere';

export const embeddingProvider: EmbeddingProvider = (() => {
  switch (process.env.EMBED_PROVIDER) {
    case 'bge-m3':
    default:
      return BgeEmbedding;
  }
})();

export const rerankerProvider: RerankerProvider | null = (() => {
  if (process.env.RERANK_PROVIDER === 'cohere' && process.env.COHERE_API_KEY) {
    return CohereReranker(process.env.COHERE_API_KEY);
  }
  return null; // MVP 不启用重排
})();
