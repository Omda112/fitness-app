import api from '@/services/api';
import { RegisterSchema } from '../schema/register.schema';
import { RegisterSuccessResponse } from '../types/register';

export const ApiRegister = async (registerPayload: RegisterSchema): Promise<RegisterSuccessResponse> => {
  try {
    // Send Post Request to "signup Endpoint"
    const response = await api.post<RegisterSuccessResponse>(
      '/auth/signup',
      registerPayload
    );

    // Return  response
    return response.data;
  } catch (error: any) {
    // Handle axios errors
    if (error?.response) {
      // Get the error message from the axios response
      const message = error.response?.data?.error || 'Failed to register';
      throw new Error(message);
    }

    // Catch any unexpected errors
    throw new Error(error?.message || 'Unexpected error while registering');
  }
};
