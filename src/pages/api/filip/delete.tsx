import {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {fetchUserByEmail} from '@/repositories/user-repository';
import {deletePhrase} from '@/repositories/phrase-repository';
import {logUserActivity} from "@/logging/log";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const {user, error: fetchError} = await fetchUserByEmail(session.user.email as string);
  if (fetchError) {
    return res.status(500).json({error: fetchError.message});
  }

  if (req.body.user_email && user.email !== req.body.user_email) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const phraseId = req.body.id;
  const {error: deleteError} = await deletePhrase(phraseId);

  if (deleteError) {
    return res.status(500).json({error: deleteError.message});
  }

  await logUserActivity(
    user ? user.email : "Not registered user",
    'filip/delete',
    JSON.stringify(req.body)
  );

  return res.status(200).json({success: true});
}
