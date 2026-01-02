import { sendEmailAction } from '@/lib/apis/forgot-password/send-email.action';
import { EmailValue } from '@/lib/schemas/forgot-password.schema';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSendEmail = () => {
  const { mutate: sendEmail, isPending } = useMutation({
    mutationFn: (email: EmailValue) => sendEmailAction(email),

    onSuccess: (data) => {
      toast.success(data.info);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendEmail, isPending };
};
