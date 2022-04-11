import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './chart';
import Coin from './coin';
import Coins from './coins';
import Price from './price';

interface IRouterProps {
  changeTheme: () => void;
  themeIcon: boolean;
  isDark: boolean;
}

const Router = ({ changeTheme, themeIcon, isDark }: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:coinId"
          element={<Coin isDark={isDark} changeTheme={changeTheme} themeIcon={themeIcon} />}
        >
          <Route path="/:coinId/price" element={<Price />} />
          <Route path="/:coinId/chart" element={<Chart />} />
        </Route>
        <Route path="/" element={<Coins changeTheme={changeTheme} themeIcon={themeIcon} />} />
      </Routes>
    </BrowserRouter>
  );
};

// 경로를 변수로 접근시 :변수 사용

export default Router;
