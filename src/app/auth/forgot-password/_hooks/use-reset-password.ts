import { resetPasswordAction } from '@/lib/apis/forgot-password/reset-password.action';
import { ResetPasswordPayload } from '@/lib/types/forgot-password';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useResetPassword = () => {
  // Translation
  const { t } = useTranslation();

  // Navigation
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (resetPasswordPayload: ResetPasswordPayload) =>
      resetPasswordAction(resetPasswordPayload),

    onSuccess: () => {
      toast.success(t('forgot-password.new-password.toast.success-message'));
      setTimeout(() => {
        navigate('/en/login');
      }, 1000);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { resetPassword, isPending };
};
