import {NextApiRequest, NextApiResponse} from 'next';
import {supabase} from "@/supabase/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {data, error} = await supabase
    .from('phrases')
    .select(`
      *,
      users (email)
    `);

  if (error) {
    return res.status(500).json({error: error.message});
  }

  const result = data.map((phrase: any) => (
      {
        id: phrase.id,
        content: phrase.content,
        user_email: phrase.users?.email,
      }
    )
  );

  return res.status(200).json(result);
}