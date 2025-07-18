import supabase from "../client";

export async function uploadImage(imageName: string, file: File) {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !user) throw userError;
      const { data, error } = await supabase
      .storage
      .from('images')
      .upload(imageName, file, {
        cacheControl: '3600',
        upsert: true
      })
  
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error(err.message);
    }
  }

  export async function getAllImageUrls(id: string) {
    try {
      const { data: files, error } = await supabase.storage.from('images').list(id);
      if (error) throw error;

      const urls = await Promise.all(files.map(async (file) => {
        const { data, error } = await supabase
          .storage
          .from('images')
          .createSignedUrl(`${id}/${file.name}`, 60 * 60); // 1 hour expiration

        if (error) throw error;
        return {
          name: file.name,
          url: data.signedUrl + `&t=${new Date().getTime()}`, // to prevent caching
        }
      }));
      
      return urls;
    } catch (err: any) {
    console.error(err.message);
  } 
}
  
  export async function getImageUrl(imageName: string) {
    try {
      const [id, fileName] = imageName.split('/');

      const { data: files } = await supabase.storage.from('images').list(id);
      const fileExists = files?.some(file => file.name === fileName)
      
      if (!fileExists) {
        return null;
      }

      const { data, error } = await supabase
        .storage
        .from('images')
        .createSignedUrl(imageName, 60 * 60); // 1 hour expiration
  
      if (error) throw error;
      return data.signedUrl + `&t=${new Date().getTime()}`; // to prevent caching
    } catch (err: any) {
      console.error(err.message);
    }
  }