import { useMutation } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      toast.success('User account successfully updated!');
      queryClient.setQueryData(['user'], data?.user);
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdating };
}
