import { ResetPasswordPayload, ResetPasswordResponse } from '@/lib/types/forgot-password';
import api from '@/services/api';

export const resetPasswordAction = async (resetPasswordPayload: ResetPasswordPayload) => {
  try {
    // Send Post Request to "resetPassword Endpoint"
    const response = await api.put<ResetPasswordResponse>(
      '/auth/resetPassword',
      resetPasswordPayload
    );

    // Return the server response
    return response.data;
  } catch (error: any) {
    // Handle Axios errors (check if error has response property)
    if (error?.response) {
      // Get the error message from the response
      const message = error.response?.data?.error || 'Failed to reset password';
      throw new Error(message);
    }

    // Catch any unexpected errors and return a descriptive message
    throw new Error(error?.message || 'Unexpected error while reset password');
  }
};
