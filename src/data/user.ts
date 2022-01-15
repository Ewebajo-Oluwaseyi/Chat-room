import { supabase } from "src/utils/supabase";

export default function user() {
    return supabase.auth.user();
}