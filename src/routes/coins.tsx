import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
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
    display: block;
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

const Title = styled.h1`
  padding: 1em;
  text-align: center;
  font-size: 2rem;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.p`
  font-size: 2rem;
  text-align: center;
`;

const spinnerRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
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
      setCoins(json.slice(0, 30));
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
                <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </CoinLiSection>
    </Container>
  );
};

export default Coins;
