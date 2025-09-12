import { pipeline } from '@xenova/transformers';
import type { EmbeddingProvider } from '../types';

let _pipePromise: Promise<any> | null = null;

async function getPipe() {
  if (!_pipePromise) {
    // 首次调用会自动下载权重到本地缓存（/tmp/.cache/…）
    _pipePromise = pipeline('feature-extraction', 'Xenova/bge-m3');
  }
  return _pipePromise;
}

export const BgeEmbedding: EmbeddingProvider = {
  name: 'bge-m3',
  async embed(texts, opts = { normalize: true }) {
    const pipe = await getPipe();
    const out: number[][] = [];
    for (const t of texts) {
      const r = await pipe(t, { pooling: 'mean', normalize: !!opts.normalize });
      out.push(Array.from(r.data));
    }
    return out;
  },
};
