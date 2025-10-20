  import imageCompression from 'browser-image-compression';
  
  export default async function prepareImageForUpload (
    file: File, 
    setFile: React.Dispatch<React.SetStateAction<File | null>>, 
    setImage: React.Dispatch<React.SetStateAction<string>>) {
      // try and compress image before upload
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 250,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        if (compressedFile) {
          const imageUrl = URL.createObjectURL(compressedFile);
          setImage(imageUrl);
          setFile(compressedFile);
        }
      } catch (error) {
        console.log(error);
      }
    };
