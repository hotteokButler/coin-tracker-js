import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './common/theme';

const App = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [themeIcon, setThemeIcon] = useState<boolean>(true);

  const changeTheme = () => {
    setThemeIcon((current) => !current);
    setIsDark((current) => !current);
  };

  return (
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router changeTheme={changeTheme} themeIcon={themeIcon!} isDark={isDark!} />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;

// fa-solid fa-sun fa-moon
