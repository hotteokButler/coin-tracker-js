import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './coin';
import Coins from './coins';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

// 경로를 변수로 접근시 :변수 사용

export default Router;
