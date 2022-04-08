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
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<ICoinHistory[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId!)
  );
  return (
    <div>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                price.time_open,
                [
                  price.open.toFixed(3),
                  price.high.toFixed(3),
                  price.low.toFixed(3),
                  price.close.toFixed(3),
                ],
              ]) as [],
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
              borderColor: '#90a4aeab',
            },
            xaxis: {
              type: 'datetime',
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
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#df5a46',
                  downward: '#1178e7',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
