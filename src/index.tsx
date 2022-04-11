import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fortawesome/fontawesome-free/js/all.js';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

export default App;
