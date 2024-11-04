import { createBrowserRouter, RouteObject } from 'react-router-dom';
import BookingCourtPage from '@/feature/booking/BookingCourtPage';
import MainLayout from '@/app/layout/MainLayout';
import HomePage from '@/feature/home/HomePage';
import NewsPage from '@/feature/news/NewsPage';
import NewsDetailPage from '@/feature/news/NewsDetailPage';
import ListCourtCluser from '@/feature/courtcluster/ListCourtCluser';
import BookingHistoryPage from '@/feature/booking/BookingHistoryPage';
import ProfilePage from '@/feature/profile/ProfilePage'



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
        path: 'view-profile',
        element: <ProfilePage />
      },
      {
        path: 'dat-san',
        element: <BookingCourtPage />,
        element: <BookingCourtPage />,
        children: [],
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
