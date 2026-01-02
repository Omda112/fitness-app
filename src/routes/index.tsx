import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '@/app/home/Home';
import Login from '@/app/auth/login/Login';
import ForgotPassword from '@/app/auth/forgot-password/forgot-password-flow';
import AuthLayout from '@/app/auth/layout';
import Register from '@/app/auth/register/register';
import AiChat from '@/app/AI-chat/chat-ui';

const supportedLocales = ['en', 'ar'] as const;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },

  // Redirect non-localized auth routes to English version
  {
    path: '/login',
    element: <Navigate to="/en/login" replace />,
  },
  {
    path: '/forgot-password',
    element: <Navigate to="/en/forgot-password" replace />,
  },
  {
    path: '/register',
    element: <Navigate to="/en/register" replace />,
  },

  {
    path: '/:locale',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Ai-chat', element: <AiChat /> },

      // Auth Routes
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
          { path: 'register', element: <Register /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
]);
