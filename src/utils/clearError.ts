 export default function clearError (
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess?: React.Dispatch<React.SetStateAction<string>>
) {
      const errorTimout: number = 3 * 1000; // 3 seconds
      return setTimeout(() => {
        setError('');
        if (setSuccess) setSuccess('');
      }, errorTimout);
  }