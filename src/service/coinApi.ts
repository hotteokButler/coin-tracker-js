const requestOption: object = {
  method: 'GET',
  redirect: 'follow',
};

const BASE_URL: string = 'https://api.coinpaprika.com/v1';

//CoinList
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`, requestOption) //
    .then((response) => response.json());
}
//CoinInfo
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`, requestOption) //
    .then((response) => response.json());
}
//CoinTickers
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`, requestOption) //
    .then((response) => response.json());
}
//CoinHistory
export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 30;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`,
    requestOption
  ) //
    .then((response) => response.json());
}
