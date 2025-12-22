export const validateEmail = (email: string): string | null => {
  if (!email) return 'البريد الإلكتروني مطلوب';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'البريد الإلكتروني غير صحيح';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'كلمة المرور مطلوبة';
  if (password.length < 6)
    return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  return null;
};
