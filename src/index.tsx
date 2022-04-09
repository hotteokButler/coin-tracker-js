import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fortawesome/fontawesome-free/js/all.js';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);

export default App;
