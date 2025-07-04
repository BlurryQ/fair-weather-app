import supabase from "../client";

  export async function signUpUser(email: string, password: string): Promise<boolean> {
    try {
      let { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log('user', data.user);
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
      console.log('>> user', data.user);
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

  // export async function resetPassword(email: string) {
  //   try {
  //     const { data, error } = await supabase.auth.api.resetPasswordForEmail(
  //       email,
  //       { redirectTo: 'https://example.com/update-password' }
  //     )
  //     if (error) throw error;
  //     console.log('Password reset email sent', data);
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // }  