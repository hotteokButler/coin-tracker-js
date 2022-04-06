import React from 'react';
import { useParams } from 'react-router-dom';

const Coin = () => {
  const { coinId } = useParams();
  return <div>coin : {coinId}</div>;
};

export default Coin;
