import { createClient } from '@supabase/supabase-js';

const url: string = import.meta.env.VITE_SUPABASE_URL;
const publicAnon: string = import.meta.env.VITE_SUPABASE_PUBLIC_ANON;
const supabase = createClient(url, publicAnon);

export default supabase;