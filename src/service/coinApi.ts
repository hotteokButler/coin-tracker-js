const requestOption: object = {
  method: 'GET',
  redirect: 'follow',
};

const BASE_URL: string = 'https://api.coinpaprika.com/v1';

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`, requestOption) //
    .then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`, requestOption) //
    .then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`, requestOption) //
    .then((response) => response.json());
}
