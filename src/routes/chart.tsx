import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../service/coinApi';

interface IChartProps {
  coinId: string;
}

interface ICoinHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
  coinId?: string;
}

const Chart = () => {
  const coinId = useOutletContext<IChartProps['coinId']>();
  const { isLoading, data } = useQuery<ICoinHistory>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId!)
  );

  return <div>Chart</div>;
};

export default Chart;
