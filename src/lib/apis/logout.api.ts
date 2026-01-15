import api from '@/services/api';

export const logoutAPI = (token: string) => {
  return api.get('/auth/logout', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
