import { OTPvalue } from '@/lib/schemas/forgot-password.schema';
import { VerifyCodeResponse } from '@/lib/types/forgot-password';
import api from '@/services/api';

export const verifyOTPAction = async (OTP: OTPvalue) => {
  try {
    // Send Post Request to "verifyResetCode Endpoint"
    const response = await api.post<VerifyCodeResponse>('/auth/verifyResetCode', OTP);

    // Return the server response
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      // Get the error message from the response
      const message = error.response?.data?.error || 'Failed to verify OTP';
      throw new Error(message);
    }

    // Catch any unexpected errors and return a descriptive message
    throw new Error(error?.message || 'Unexpected error while verifing OTP');
  }
};
