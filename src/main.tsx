import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import '@/index.scss';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { router } from './app/router/Routes.tsx';
import { store, StoreContext } from './app/stores/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>,
);
