import { LoginFormData, LoginResponse } from "@/lib/types/auth";
import axiosInstance from "@/lib/utils/axios";


export const loginAPI = async (
  data: LoginFormData
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    '/auth/signin',
    data
  );

  return response.data;
};
