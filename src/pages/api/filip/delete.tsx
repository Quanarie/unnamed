import {NextApiRequest, NextApiResponse} from 'next';
import {supabase} from '@/supabase/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.body;
  const {error: deleteError} = await supabase
    .from('phrases')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return res.status(500).json({error: deleteError.message});
  }

  return res.status(200).json({success: true});
}
