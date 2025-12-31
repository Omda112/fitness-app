import { useAuth } from '@/context/auth-context';
import { logoutAPI } from '@/lib/apis/logout.api';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const { token, logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!token) return;
      await logoutAPI(token);
    },
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};
