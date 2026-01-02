'use client';

import { ApiRegister } from '@/lib/apis/register.api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export const useRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const locale = params.locale || 'en';

  const mutation = useMutation({
    mutationFn: ApiRegister,

    onSuccess: (data) => {
      toast.success(t('common.success.accountCreated'));

      // Navigate to login
      navigate(`/${locale}/login`);
    },

    onError: (error: Error) => {
      // Check if error message matches "user already exists" and use translation
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('user already exists') || errorMessage.includes('المستخدم موجود بالفعل')) {
        toast.error(t('common.error.api.userAlreadyExists'));
      } else {
        toast.error(error.message);
      }
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
