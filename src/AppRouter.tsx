import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTE_PATHS } from './constants/routes.constants';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { OnBoardingPage } from './pages/OnBoarding/OnBoardingPage';
import { SignupPage } from './pages/Signup/SignupPage';

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: ROUTE_PATHS.ON_BOARDING,
    element: <OnBoardingPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
