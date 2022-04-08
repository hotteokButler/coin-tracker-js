import React from 'react';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
