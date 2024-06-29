import {supabase} from '@/supabase/supabase';

export async function createUser(email: string, password: string) {
  const {data: user, error} = await supabase
    .from('users')
    .insert([{email, password}])
    .select()
    .single();
  return {user, error};
}

export async function fetchUserByEmail(email: string) {
  const {data: user, error} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  return {user, error};
}


