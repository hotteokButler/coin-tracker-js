import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { Overview } from './coin';

interface IPriceData {
  priceData: {
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
}

const PriceList = styled(Overview)`
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  margin-bottom: 1em;
  background-color: ${(props) => props.theme.priceList};
`;
const PriceTitle = styled.dt``;
const PriceDesc = styled.dd`
  color: ${(props) => props.theme.accentColor};
`;

const Price = () => {
  const { priceData } = useOutletContext() as IPriceData;

  return (
    <>
      <PriceList>
        <PriceTitle>Current Price</PriceTitle>
        <PriceDesc>{`$${priceData.price.toFixed(3)}`}</PriceDesc>
      </PriceList>
      <PriceList>
        <PriceTitle>Max Price</PriceTitle>
        <PriceDesc>{`$${priceData.ath_price.toFixed(3)}`}</PriceDesc>
      </PriceList>
      <PriceList>
        <PriceTitle>Percent Chenged(7 Days)</PriceTitle>
        <PriceDesc>{`${priceData.percent_change_7d}%`}</PriceDesc>
      </PriceList>
      <PriceList>
        <PriceTitle>Percent Chenged(24 Hours)</PriceTitle>
        <PriceDesc>{`${priceData.percent_change_24h}%`}</PriceDesc>
      </PriceList>
      <PriceList>
        <PriceTitle>Percent Chenged(1 Hours)</PriceTitle>
        <PriceDesc>{`${priceData.percent_change_1h}%`}</PriceDesc>
      </PriceList>
      <PriceList>
        <PriceTitle>Volume(24h)</PriceTitle>
        <PriceDesc>{`$${priceData.volume_24h.toFixed(3)}`}</PriceDesc>
      </PriceList>
    </>
  );
};

export default Price;
