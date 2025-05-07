const url: string = import.meta.env.VITE_SUPABASE_URL;
const publicAnon: string = import.meta.env.VITE_SUPABASE_PUBLIC_ANON;
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, publicAnon);

  export async function signUpUser(email: string, password: string) {
    try {
      let { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log('user', data.user);
    } catch (err: any) {
      console.error(err.message);
    }
    console.log('USER CREATED');
    // TODO add a redirect to the login page
  }

  export async function signInUser(email: string, password: string) {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log('user', data.user);
    } catch (err: any) {
      console.error(err.message);
    }
    console.log('USER SIGNED IN');
    // TODO add a redirect to the home page
  }

