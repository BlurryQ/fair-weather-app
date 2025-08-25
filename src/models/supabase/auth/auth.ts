import supabase from "../client";

  export async function signUpUser(email: string, password: string): Promise<boolean> {
    try {
      let { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return true
    } catch (err: any) {
      console.error(err.message);
      return false
    }
  }

  export async function signInUser(email: string, password: string, login: any) {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      login(data.user)
      return true
    } catch (err: any) {
      console.error(err.message);
      return false
    }
  }

  export async function signOutUser() {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('User signed out');
    } catch (err: any) {
      console.error(err.message);
    }
  }

  export async function resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: 'http://localhost:5173/reset_password' }
      )
      if (error) throw error;
      return true
    } catch (err: any) {
      console.error(err.message);
      return false
    }
  }  

  export async function updatePassword(password: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      if (error) throw error;
      console.log('User updated');
      return true
    } catch (err: any) {
      console.error(err.message);
      return false
    }
  }