import { createClient } from '@supabase/supabase-js';

const url: string = import.meta.env.VITE_SUPABASE_URL;
const publicAnon: string = import.meta.env.VITE_SUPABASE_PUBLIC_ANON;
const supabase = createClient(url, publicAnon);

  export async function signUpUser(email: string, password: string) {
    try {
      let { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log('user', data.user);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  export async function signInUser(email: string, password: string, login: any) {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log('>> user', data.user);
      login(data.user)
    } catch (err: any) {
      console.error(err.message);
    }
  }

