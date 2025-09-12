import { Mentor } from '../models/mentor';
import { buildMentorEmbedText } from '../utils/text';
import { embeddingProvider } from '../../../shared/src/ai';

export async function upsertMentor(userId: string, payload: any) {
  const embedText = buildMentorEmbedText(payload);
  const [vec] = await embeddingProvider.embed([embedText]);

  const doc = await Mentor.findOneAndUpdate(
    { userId },
    { $set: { ...payload, embedText, embedding: vec } },
    { upsert: true, new: true }
  );
  return doc;
}
