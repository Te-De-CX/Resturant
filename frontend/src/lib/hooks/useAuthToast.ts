import { toast } from 'react-hot-toast';

const useAuthToast = () => {
    const showSuccess = (message: string): void => {
      toast.success(message);
    };
    
    const showError = (error: unknown): void => {
      const message = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      toast.error(message);
    };
    
    return { showSuccess, showError };
  };

export default useAuthToast;