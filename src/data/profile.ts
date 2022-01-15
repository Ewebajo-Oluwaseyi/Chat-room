import {supabase} from '../utils/supabase';
import useSWR from 'swr';
//import { Profile } from '../../index.d.ts';

export default function profile() {
  const { data, error, mutate } = useSWR(supabase.auth.session() ? 'profile': null, fetchProfile);


  return {
    data,
    error,
    loading: !data && !error,
    revalidate: () => mutate()
  }
}

async function fetchProfile() {
    const { data, error } = await supabase
    .from<App.Profile>('profiles')
    .select('*')
    .eq('id', `${supabase.auth.user()?.id}`)
    .single()

    if (error) throw new Error(error.message);
    return data;
}