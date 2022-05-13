import { HashRouter } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './chart';
import Coin from './coin';
import Coins from './coins';
import Price from './price';

const RouterRoot = () => {
  return (
    <Routes>
      <Route path="/:coinId" element={<Coin />}>
        <Route path="/:coinId/price" element={<Price />} />
        <Route path="/:coinId/chart" element={<Chart />} />
      </Route>
      <Route path="/" element={<Coins />} />
    </Routes>
  );
};

// 경로를 변수로 접근시 :변수 사용

export default RouterRoot;
