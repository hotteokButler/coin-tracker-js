import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { toggleDarkAtom } from '../common/atom';
import { fetchCoins } from '../service/coinApi';

export const Container = styled.div`
  width: 95%;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  position: relative;
  margin: 10px 0 20px;
`;

const CoinLiSection = styled.section``;

const CoinsList = styled.ul`
  padding: 0 1em;
`;

const Coin = styled.li`
  margin: 0 0 15px;
  background-color: white;
  border-radius: 10px;
  color: ${(props) => props.theme.liTextColor};
  transition: 0.2s ease-in;
  a {
    display: flex;
    align-items: center;
    padding: 1.5em 1em;
    font-size: 1.3rem;
  }
  &:hover {
    transform: scale(1.03);
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinImg = styled.figure`
  margin: 0 15px 0 0;
  width: 35px;
  height: 35px;
`;
const CoinName = styled.p`
  width: calc(100% - 50px);
  font-size: 1.1em;
`;
export const Title = styled.h1`
  padding: 1em;
  text-align: center;
  font-size: 2.5rem;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.p`
  font-size: 2rem;
  text-align: center;
`;

export const spinnerRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  margin: 20px auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 8px solid ${(props) => props.theme.textColor};
  border-top: 8px solid ${(props) => props.theme.accentColor};
  animation: ${spinnerRotate} 2s linear infinite;
`;

export const ThemeToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(0, -50%);
  background-color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  .fa-sun,
  .fa-moon {
    font-size: 1.5em;
    color: ${(props) => props.theme.toggleColor};
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface ICoinsProps {}

const Coins = () => {
  const [isDark, setDark] = useRecoilState(toggleDarkAtom);
  const toggleDarkMode = () => {
    setDark(isDark);
  };
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <ThemeToggle onClick={toggleDarkMode}>
          <span>{isDark ? '🌚' : '🌝'}</span>
        </ThemeToggle>
      </Header>
      <CoinLiSection>
        {isLoading ? (
          <>
            <Loader>Now Loading...</Loader>
            <LoadingSpinner />
          </>
        ) : (
          <CoinsList>
            {data?.slice(0, 50).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <CoinImg>
                    <img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt="" />
                  </CoinImg>
                  <CoinName>{coin.name} &rarr;</CoinName>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </CoinLiSection>
    </Container>
  );
};

export default Coins;
