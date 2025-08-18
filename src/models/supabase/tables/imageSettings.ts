import supabase from "../client";

  export async function getImageSettings() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !user) throw userError;
      const { data, error } = await supabase
        .from('image_settings')
        .select('*')
        .eq('id', user.id)
        .single();
  
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error(err.message);
    }
  }
    
  export async function updateImageSettings(settings: any) {
    
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      
      if (userError || !user) throw userError;

      const { data, error } = await supabase
      .from('image_settings')
      .update(settings)
      .eq('id', user.id)
      .select();

      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error(err.message);
    }
  }

  