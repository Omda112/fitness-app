export type SendEmailResponse = {
  message: string;
  info: string;
};

export type VerifyCodeResponse = {
  status: string;
};

export type ResetPasswordResponse = {
  message: string;
  token: string;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};
