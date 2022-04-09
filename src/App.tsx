import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './common/reset';
import Router from './routes/router';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled, { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './common/theme';

export const ThemeToggle = styled.button`
  position: absolute;
  top: 10%;
  right: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(235px, -50%);
  background-color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  .fa-sun,
  .fa-moon {
    font-size: 1.5em;
    color: ${(props) => props.theme.toggleColor};
  }
`;

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
        <Router />
      </HelmetProvider>
      <ThemeToggle onClick={changeTheme}>
        {/* <i className={themeIcon ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i> */}
        <span>{themeIcon ? '🌑' : '🌝'}</span>
      </ThemeToggle>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;

// fa-solid fa-sun fa-moon
