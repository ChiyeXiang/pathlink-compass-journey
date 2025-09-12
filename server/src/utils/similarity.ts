/**
 * 计算两个向量的余弦相似度
 * @param a 向量A
 * @param b 向量B
 * @returns 相似度分数 (-1 到 1)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("向量长度必须一致");
  }

  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));

  if (normA === 0 || normB === 0) return 0; // 避免除以0
  return dot / (normA * normB);
}
