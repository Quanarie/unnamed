import {supabase} from '@/supabase/supabase';

export async function fetchPhrasesByEmail() {
  const {data: phrases, error} = await supabase
    .from('phrases')
    .select(`
      *,
      users (email)
    `);
  return {phrases, error};
}

export async function fetchPhrasesLike(content: string) {
  const {data: phrases, error} = await supabase
    .from('phrases')
    .select('*')
    .ilike('content', content);
  return {phrases, error};
}

export async function insertPhrase(content: string, id: number | null) {
  const {error} = await supabase
    .from('phrases')
    .insert([{content, user_id: id}]);
  return {error};
}

export async function deletePhrase(id: number) {
  const {error} = await supabase
    .from('phrases')
    .delete()
    .eq('id', id);
  return {error};
}
