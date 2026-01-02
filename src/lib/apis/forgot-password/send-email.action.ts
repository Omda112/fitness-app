import { EmailValue } from '@/lib/schemas/forgot-password.schema';
import { SendEmailResponse } from '@/lib/types/forgot-password';
import api from '@/services/api';

export const sendEmailAction = async (email: EmailValue): Promise<SendEmailResponse> => {
  try {
    // Send Post Request to "forgotPassword Endpoint"
    const response = await api.post<SendEmailResponse>('/auth/forgotPassword', email);

    // Return the server response
    return response.data;
  } catch (error: any) {
    // Handle Axios errors (check if error has response property)
    if (error?.response) {
      // Get the error message from the response
      const message = error.response?.data?.error || 'Failed to send email';
      throw new Error(message);
    }

    // Catch any unexpected errors and return a descriptive message
    throw new Error(error?.message || 'Unexpected error while sending email');
  }
};
