import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Header, Title, Loader, LoadingSpinner } from './coins';

//type interface
interface IRouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
//보통 interface에 정의되는 variable 이름 앞에 I를 붙여주는 관례가 있음

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

//styled-component
const DescriptionCoin = styled.div``;

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      //infoData get from coinId
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`, {
          method: 'GET',
          redirect: 'follow',
        })
      ).json();

      //priceData get from coinId
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`, {
          method: 'GET',
          redirect: 'follow',
        })
      ).json();

      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'No Data'}</Title>
        {loading ? (
          <>
            <Loader>Now Loading...</Loader>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <DescriptionCoin>{info?.description}</DescriptionCoin>
            <DescriptionCoin>{price?.quotes.USD.market_cap_change_24h}</DescriptionCoin>
          </>
        )}
      </Header>
    </Container>
  );
};

export default Coin;
