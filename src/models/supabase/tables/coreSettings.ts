import supabase from "../client";

  export async function getCoreSettings() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !user) throw userError;
      const { data, error } = await supabase
        .from('core_settings')
        .select('*')
        .eq('id', user.id)
        .single();
  
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error(err.message);
    }
  }
  