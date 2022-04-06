import React from 'react';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
