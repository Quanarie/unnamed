import {NextApiRequest, NextApiResponse} from 'next';
import {supabase} from "@/supabase/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let {content} = req.body;
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

  const {data, error} = await supabase
    .from('phrases')
    .insert([{content}]);
  if (error) {
    return res.status(500).json({error: error.message});
  }
  res.status(201).json(data);
}