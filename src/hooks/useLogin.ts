import { LoginFormData } from '@/lib/types/auth';
import { loginAPI } from '@/services/auth.api';
import { useMutation } from '@tanstack/react-query';


export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => loginAPI(data),
  });
};
