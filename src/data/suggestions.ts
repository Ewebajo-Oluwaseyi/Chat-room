import useSWR from 'swr';
import { supabase } from '../utils/supabase';


export interface RequestReturnType extends App.Request {
  comments_count?: [{ count: number }];
  liked_count: [{
    count: number
  }]; 
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export default function suggessions() {
    const { data, error, mutate } = useSWR('requests', fetchRequests);

    return {
        data,
        error,
        loading: !error && !data,
        revalidate: () => mutate(),
    }
}
async function fetchRequests() {
    const { data , error } = await supabase
    .from<RequestReturnType>('requests')
    .select(`*, comments_count:comments(count), liked_count:liked(count),  user:user_id(*)`)
    if (error) throw new Error(error.message);
    return data;
}

export async function likeRequest(requestId: string) {
  const { data } = await supabase.from('liked').select('*')
  .filter('user_id', 'eq', supabase.auth.session()?.user?.id)
  .filter('request_id', 'eq', requestId);

  if (data?.length) {
    return data
  }
  
  //const { error } = await supabase.from('liked').delete().match({user_id: supabase.auth.session()?.user?.id});
  const { error } = await supabase.from('liked').insert([
      {
          user_id: supabase.auth.session()?.user?.id,
          request_id: requestId,
      }
  ])
  if (error) throw new Error(error?.message)
}