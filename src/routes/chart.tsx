import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../service/coinApi';
import ApexChart from 'react-apexcharts';
import { Loader } from './coins';

interface IChartProps {
  coinId: string;
}

interface ICoinHistory {
  time_open: string;
  time_close: string;
  open: number; //시작가
  high: number; //최고가
  low: number; //최저가
  close: number; //종가
  volume: number;
  market_cap: number;
  coinId?: string;
}

const Chart = () => {
  const coinId = useOutletContext<IChartProps['coinId']>();
  const { isLoading, data } = useQuery<ICoinHistory[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId!)
  );
  return (
    <div>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Close Price', //
              data: data?.map((price) => price.close) ?? [], //
            },
          ]}
          options={{
            theme: { mode: 'dark' }, //
            chart: {
              height: '100%', //
              width: '300px', //
              toolbar: {
                show: false,
              }, //
              background: 'transparent',
            }, //
            grid: {
              show: false,
            },
            stroke: { curve: 'smooth' }, //
            xaxis: {
              type: 'datetime',
              categories: data?.map((date) => date.time_open),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: 'gradient',
              colors: ['#fbe7c6s'],
              gradient: {
                gradientToColors: ['#ffaebc'],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
