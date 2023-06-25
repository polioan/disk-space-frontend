import './styles/normalize.scss'
import './styles/constants.scss'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  type NavigateProps,
} from 'react-router-dom'
import { ToastContainer } from './ui'
import { isAuth } from './helpers'
import { QueryClientProvider } from './common/queryClient'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))

const PrivateRoute: React.FC<{
  children: React.ReactNode
  accessCondition: () => boolean
  navigateToOnFail: NavigateProps['to']
}> = ({ children, accessCondition, navigateToOnFail }) => {
  if (accessCondition()) {
    return <>{children}</>
  } else {
    return <Navigate to={navigateToOnFail} replace />
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute accessCondition={() => isAuth()} navigateToOnFail='/login'>
        <Suspense>
          <Home />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PrivateRoute accessCondition={() => !isAuth()} navigateToOnFail='/'>
        <Suspense>
          <Login />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: '/registration',
    element: (
      <PrivateRoute accessCondition={() => !isAuth()} navigateToOnFail='/'>
        <Suspense>
          <Login isRegistration />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
