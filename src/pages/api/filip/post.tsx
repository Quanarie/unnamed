import {NextApiRequest, NextApiResponse} from 'next';
import {supabase} from "@/supabase/supabase";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

async function fetchUserId(email: string) {
  const {data: userInDb, error: selectError} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  return {userInDb, selectError};
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  let userInDb, selectError;
  if (session && session.user) {
    ({userInDb, selectError} = await fetchUserId(session.user.email as string));

    if (selectError) {
      return res.status(500).json({error: selectError.message});
    }
  }

  let content = req.body.content;
  content = content.toLowerCase();

  const {data: existingPhrases, error: fetchError} = await supabase
    .from('phrases')
    .select('*')
    .ilike('content', content);

  if (fetchError) {
    return res.status(500).json({error: fetchError.message});
  }

  if (existingPhrases && existingPhrases.length > 0) {
    return res.status(400).json({error: 'Content must be unique. This phrase already exists.'});
  }

  const {error} = await supabase
    .from('phrases')
    .insert([{content, user_id: userInDb ? userInDb.id : null}]);

  if (error) {
    return res.status(500).json({error: error.message});
  }

  return res.status(200).json({success: true});
}