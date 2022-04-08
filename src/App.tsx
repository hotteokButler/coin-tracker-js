import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './common/theme';

const App = () => {
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    setTheme(localStorage.getItem('themeMode') === 'dark' ? true : false);
  }, [theme]);

  return (
    <ThemeProvider theme={theme ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;
