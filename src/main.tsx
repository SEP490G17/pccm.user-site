import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { router } from './app/router/Routes.tsx';
import { store, StoreContext } from './app/stores/store.ts';
import { registerLicense } from '@syncfusion/ej2-base';
import { ChakraProvider } from '@chakra-ui/react';

registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5DQmFAYVF2R2dJflx6dl1MY15BNQtUQF1hTX9TdUVjWn9XcHVRQ2lc');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </StoreContext.Provider>
  </StrictMode>,
);
