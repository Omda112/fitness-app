import { verifyOTPAction } from '@/lib/actions/forgot-password/verify-OTP.action';
import { OTPvalue } from '@/lib/schemas/forgot-password.schema';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useVerifyOTP = () => {
  // Translation
  const { t } = useTranslation();

  const { mutate: verifyOTP, isPending } = useMutation({
    mutationFn: (OTP: OTPvalue) => verifyOTPAction(OTP),

    onSuccess: () => toast.success(t('forgot-password.otp.toast.success-message')),

    onError: (error) => toast.error(error.message),
  });
  return { verifyOTP, isPending };
};
