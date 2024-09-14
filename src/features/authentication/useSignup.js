import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success("User signed up successfully! Please verify the new account form the user's email address.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  return { signup, isLoading };
}
