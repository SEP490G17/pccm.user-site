import { createBrowserRouter, RouteObject } from 'react-router-dom';
import CourtClusterDetailsPage from '@/feature/courtcluster/details/CourtClusterDetailsPage';
import MainLayout from '@/app/layout/MainLayout';
import HomePage from '@/feature/home/HomePage';
import NewsPage from '@/feature/news/NewsPage';
import NewsDetailPage from '@/feature/news/NewsDetailPage';
import ListCourtCluser from '@/feature/courtcluster/list/CourtCluserListPage';
import BookingHistoryPage from '@/feature/booking/history/BookingHistoryPage';
import ProfilePage from '@/feature/profile/ProfilePage'
import RegisterPage from '@/feature/auth/RegisterPage';
import BookingDetailsPage from '@/feature/booking/details/BookingDetailsPage';



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
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'news',
        element: <NewsPage />
      },
      {
        path: 'news/:id',
        element: <NewsDetailPage />
      },
      {
        path: 'list-courtcluster',
        element: <ListCourtCluser itemsPerPage={8} />
      },
      {
        path: 'booking-history',
        element: <BookingHistoryPage />
      },
      {
        path: 'booking-history/chi-tiet/:id',
        element: <BookingDetailsPage />
      },
      {
        path: 'view-profile',
        element: <ProfilePage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'chi-tiet/:id',
        element: <CourtClusterDetailsPage />,
        children: [],
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
