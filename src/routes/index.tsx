// src/routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

const supportedLocales = ['en', 'ar'] as const

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },

  {
    path: '/:locale',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
])
