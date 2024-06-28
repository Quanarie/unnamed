import {NextApiRequest, NextApiResponse} from 'next';
import {supabase} from '@/supabase/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.body;
  const {data, error} = await supabase.from('phrases').delete().eq('id', id);
  if (error) {
    return res.status(500).json(error.message);
  }
  res.status(200).json(data);
}
