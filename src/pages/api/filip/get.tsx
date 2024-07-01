import {NextApiRequest, NextApiResponse} from 'next';
import {fetchPhrasesByEmail} from '@/repositories/phrase-repository';
import {logUserActivity} from "@/logging/log";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {fetchUserByEmail} from "@/repositories/user-repository";

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

  await logUserActivity(
    user ? user.email : "Not registered user",
    'filip/get',
    JSON.stringify(result)
  );

  return res.status(200).json(result);
}