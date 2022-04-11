import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './common/theme';

const App = () => {
  const [theme, setTheme] = useState<boolean>();
  const [themeIcon, setThemeIcon] = useState<boolean>();

  useEffect(() => {
    setTheme(false);
    setThemeIcon(false);
  }, []);

  const changeTheme = () => {
    setThemeIcon((current) => !current);
    setTheme((current) => !current);
  };

  return (
    <ThemeProvider theme={theme ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router changeTheme={changeTheme} themeIcon={themeIcon!} />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;

// fa-solid fa-sun fa-moon
