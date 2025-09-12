export interface EmbeddingProvider {
  name: string;
  embed(texts: string[], opts?: { normalize?: boolean }): Promise<number[][]>;
}

export interface RerankerProvider {
  name: string;
  rerank(query: string, docs: string[], topN?: number): Promise<{index: number; score: number}[]>;
}