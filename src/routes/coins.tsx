import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 95%;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
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
  color: ${(props) => props.theme.bgColor};
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

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins', {
        method: 'GET',
        redirect: 'follow',
      });
      const json = await response.json();
      setCoins(json.slice(0, 40));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinLiSection>
        {loading ? (
          <>
            <Loader>Now Loading...</Loader>
            <LoadingSpinner />
          </>
        ) : (
          <CoinsList>
            {coins.map((coin) => (
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
