import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './common/theme';

const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;
