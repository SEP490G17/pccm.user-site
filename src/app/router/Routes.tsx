import { createBrowserRouter, RouteObject } from 'react-router-dom';
import BookingCourtPage from '../feature/booking/BookingCourtPage';
import App from '../layout/App';



export const routes: RouteObject[] = [

  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'dat-san',
        element: <BookingCourtPage/>,
        children: [],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
