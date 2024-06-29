import {NextApiRequest, NextApiResponse} from 'next';
import {fetchPhrasesByEmail} from '@/repositories/phrase-repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {phrases, error} = await fetchPhrasesByEmail();

  if (error) {
    return res.status(500).json({error: error.message});
  }

  const result = phrases ? phrases.map((phrase: any) => (
      {
        id: phrase.id,
        content: phrase.content,
        user_email: phrase.users?.email,
      }
    )
  ) : null;

  return res.status(200).json(result);
}