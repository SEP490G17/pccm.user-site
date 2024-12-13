import { createBrowserRouter, RouteObject } from 'react-router-dom';
import CourtClusterDetailsPage from '@/feature/courtcluster/details/CourtClusterDetailsPage';
import MainLayout from '@/app/layout/MainLayout';
import HomePage from '@/feature/home/HomePage';
import NewsPage from '@/feature/news/NewsPage';
import NewsDetailPage from '@/feature/news/NewsDetailPage';
import ListCourtCluser from '@/feature/courtcluster/list/CourtCluserListPage';
import BookingHistoryPage from '@/feature/booking/history/BookingHistoryPage';
import ProfilePage from '@/feature/profile/ProfilePage';
import RegisterPage from '@/feature/auth/RegisterPage';
import BookingDetailsPage from '@/feature/booking/details/BookingDetailsPage';
import ConfirmForgotPassword from '@/feature/auth/ForgotPassword/ConfirmForgotPassword';
import NotFound from '@/feature/errors/NotFound';
import ServerError from '@/feature/errors/ServerError';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'trang-chu',
        element: <HomePage />,
      },
      {
        path: 'tin-tuc',
        element: <NewsPage />,
      },
      {
        path: 'tin-tuc/:id',
        element: <NewsDetailPage />,
      },
      {
        path: 'cum-san',
        element: <ListCourtCluser />,
      },
      {
        path: 'lich-su',
        element: <BookingHistoryPage />,
      },
      {
        path: 'lich-su/chi-tiet/:id',
        element: <BookingDetailsPage />,
      },
      {
        path: 'thongtin',
        element: <ProfilePage />,
      },
      {
        path: 'dang-ki',
        element: <RegisterPage />,
      },
      {
        path: 'chi-tiet/:id',
        element: <CourtClusterDetailsPage />,
        children: [],
      },
      {
        path: '/confirm-forgot-password',
        element: <ConfirmForgotPassword />,
      },
    ],
  },
  {
    path: 'not-found',
    element: <NotFound key="not-found" />,
  },
  {
    path: 'server-error',
    element: <ServerError key="not-found" />,
  }
];

export const router = createBrowserRouter(routes);
