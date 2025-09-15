 export default function validateImageForUpload (file: File ): string {
    if (!file) 
      return ('No file selected');

    const maxSize = 12 * 1024 * 1024; // 12 MB in bytes
    if (file.size > maxSize) 
      return ('File must be under 5MB');

    return '';
  }