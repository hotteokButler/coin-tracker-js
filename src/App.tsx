import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './common/theme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isDarkAtom } from './common/atom';

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;

// fa-solid fa-sun fa-moon
