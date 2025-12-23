import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, Apple } from 'lucide-react';
import { useLogin } from '@/hooks/useLogin';
import { validateEmail, validatePassword } from '@/lib/schemes/auth.schema';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const { mutate, isPending } = useLogin();

  const handleLogin = () => {
    setErrors({});

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          console.log('Token:', response.token);
          console.log('User:', response.user);
          window.location.href = '/';
        },
        onError: (error: any) => {
          setErrors({
            general:
              error?.response?.data?.message || 'فشل تسجيل الدخول. تأكد من البيانات',
          });
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isPending) {
      handleLogin();
    }
  };

  const handleSocialLogin = (provider: string) => {};

  return (
    <div className="min-h-screen bg-[url('/auth-background.png')] border-l border-orange-500 bg-cover bg-center flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm mb-2">Hey There,</p>
          <h1 className="text-white text-4xl font-bold tracking-tight">WELCOME BACK!</h1>
        </div>

        {/* Login Card */}
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          <h2 className="text-white text-2xl font-semibold text-center mb-6">Login</h2>

          {/* General Error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full bg-gray-800/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } rounded-full py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors`}
                  disabled={isPending}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 mr-4 text-right">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full bg-gray-800/50 border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } rounded-full py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors`}
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 mr-4 text-right">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => alert('Forget password feature coming soon!')}
                className="text-orange-500 text-sm hover:text-orange-400 transition-colors"
                disabled={isPending}
              >
                Forget Password ?
              </button>
            </div>

            {/* Login Button */}
            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isPending}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-6 mb-6">
            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isPending}
              className="w-12 h-12 bg-gray-700/80 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-white text-xl font-bold">f</span>
            </button>
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isPending}
              className="w-12 h-12 bg-gray-700/80 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-white text-xl font-bold">G</span>
            </button>
            <button
              aria-label="apple-button"
              onClick={() => handleSocialLogin('apple')}
              disabled={isPending}
              className="w-12 h-12 bg-gray-700/80 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-white text-2xl">
                <Apple className="text-white w-6 h-6" />
              </span>
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm">
            Don't Have An Account Yet ?{' '}
            <button
              type="button"
              onClick={() => alert('Register page coming soon!')}
              disabled={isPending}
              className="text-orange-500 hover:text-orange-400 disabled:text-gray-500 transition-colors font-semibold"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
