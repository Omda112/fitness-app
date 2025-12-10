// import { createBrowserRouter, Navigate } from 'react-router-dom'
// import App from '../App'
// import Home from '@/app/home/Home'
// import Login from '@/app/auth/login/Login'
// import ForgotPassword from '@/app/auth/forgot-password/forget-password'
// import AuthLayout from '@/app/auth/layout'

// const supportedLocales = ['en', 'ar'] as const

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navigate to="/en" replace />,
//   },

//   {
//     path: '/:locale',
//     element: <App />,
//     children: [
//       { index: true, element: <Home /> },
//       {
//         element: <AuthLayout />,
//         children: [
//           { path: 'login', element: <Login /> },
//           { path: 'forgot-password', element: <ForgotPassword /> },
//         ],
//       },
//     ],
//   },

//   {
//     path: '*',
//     element: <Navigate to="/en" replace />,
//   },
// ])

import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Home from '@/app/home/Home'
import Login from '@/app/auth/login/Login'
import ForgotPassword from '@/app/auth/forgot-password/forget-password'
import AuthLayout from '@/app/auth/layout'

const supportedLocales = ['en', 'ar'] as const

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
    path: '/:locale',
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      // Auth Routes
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
])
