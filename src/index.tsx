import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fortawesome/fontawesome-free/js/all.js';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
