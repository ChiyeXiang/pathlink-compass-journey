import { Request, Response } from 'express';
import { Mentor } from '../models/mentor';
import { embeddingProvider } from '../../../shared/src/ai';           // 你已有的封装
import { buildStudentEmbedText } from '../utils/text'; // 把学生问卷拼成检索文本

export async function matchMentors(req: Request, res: Response) {
  try {
    const { formData, topK = 12, requireAvailability = false } = req.body || {};
    if (!formData) return res.status(400).json({ message: 'formData required' });

    // ① 生成查询向量
    const queryText = buildStudentEmbedText(formData); // 自己实现：把 field/degree/needs/target 等拼成一段文字
    let queryVec: number[] | null = null;
    try {
      const [vec] = await embeddingProvider.embed([queryText]);
      queryVec = vec;
    } catch (e) {
      queryVec = null;
    }

    // 2) 向量检索（Atlas Vector Search）
    if (Array.isArray(queryVec) && queryVec.length > 0) {
      const pipeline: any[] = [
        {
          $vectorSearch: {
            index: 'mentor_embedding_idx',   // 你的索引名
            path: 'embedding',
            queryVector: queryVec,
            numCandidates: 200,
            limit: topK,
            // exact: false, // 可选
            // filter: {...} // 需要过滤可加
          },
        },
        // 在后续阶段拿分数
        { $addFields: { score: { $meta: 'vectorSearchScore' } } },
        {
          $project: {
            userId: 1,
            displayName: 1,
            education: 1,
            summary: 1,
            expertise: 1,
            tags: 1,
            availability: 1,
            score: 1,
            updatedAt: 1,
          },
        },
      ];

      if (requireAvailability) {
        pipeline.splice(1, 0, { $match: { availability: { $exists: true, $ne: [] } } });
      }

      const items = await Mentor.aggregate(pipeline as any);
      return res.json({ items });
    }

    // ③ 没有向量能力 → 关键词简易兜底
    const all = await Mentor.find(
      {},
      'userId displayName education summary expertise tags availability'
    ).lean();

    const fset = new Set<string>(formData.field || []);
    const degset = new Set<string>(formData.AppDegree || []);
    const needset = new Set<string>(formData.needs || []);

    const items = all
      .map((m: any) => {
        const eOverlap = (m.expertise || []).filter((x: string) => fset.has(x)).length;
        const tOverlap = (m.tags || []).filter((x: string) =>
          [...fset, ...degset, ...needset].includes(x)
        ).length;
        const score = eOverlap * 2 + tOverlap; // 简单权重
        return { ...m, score };
      })
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, topK);

    return res.json({ items });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: e?.message || 'matching failed' });
  }
}
