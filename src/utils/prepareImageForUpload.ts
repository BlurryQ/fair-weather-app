  import imageCompression from 'browser-image-compression';
  
  export default async function prepareImageForUpload (
    file: File, 
    setFile: React.Dispatch<React.SetStateAction<File | null>>, 
    setImage: React.Dispatch<React.SetStateAction<string>>) {
      // Compress before upload. The cards render these up to ~220 CSS px on
      // mobile (more on high-DPI screens), so 250px looked pixelated - 1024
      // matches the bundled default images and stays well under the bucket's
      // 5 MB limit.
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1024,
        initialQuality: 0.82,
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
