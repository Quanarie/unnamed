import {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {fetchUserByEmail} from '@/repositories/user-repository';
import {fetchPhrasesLike, insertPhrase} from '@/repositories/phrase-repository';
import {logUserActivity} from "@/logging/log";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  let user, fetchUserError;
  if (session && session.user) {
    ({user, error: fetchUserError} = await fetchUserByEmail(session.user.email as string));

    if (fetchUserError) {
      return res.status(500).json({error: fetchUserError.message});
    }
  }

  let content = req.body.content;
  content = content.toLowerCase();

  const {phrases, error: fetchPhrasesError} = await fetchPhrasesLike(content);

  if (fetchPhrasesError) {
    return res.status(500).json({error: fetchPhrasesError.message});
  }

  if (phrases && phrases.length > 0) {
    return res.status(400).json({error: 'Content must be unique. This phrase already exists.'});
  }

  const {error} = await insertPhrase(content, user ? user.id : null);

  if (error) {
    return res.status(500).json({error: error.message});
  }

  await logUserActivity(
    user ? user.email : "Not registered user",
    'filip/post',
    JSON.stringify(content)
  );

  return res.status(200).json({success: true});
}