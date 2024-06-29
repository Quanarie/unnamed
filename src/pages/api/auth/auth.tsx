import {NextApiRequest, NextApiResponse} from 'next'
import {supabase} from '@/supabase/supabase';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {email, password} = req.body
  const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!data) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const {data, error} = await supabase
      .from('users')
      .insert([{email: email, password: hashedPassword}]);

    if (error) {
      return res.status(401).json({error: error.message});
    }

    return res.status(200).json({success: true});
  }

  if (error)
    return res.status(500).json({error: error.message});

  if (!await bcrypt.compare(password, data.password)) {
    return res.status(401).json({error: 'Passwords do not match.'});
  }

  return res.status(200).json({success: true})
}