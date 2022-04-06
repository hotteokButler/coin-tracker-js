interface VariableType {
  baseUrl: string;
  getCoinList: object;
}

class GetCoinData implements VariableType {
  baseUrl: string;
  requestOptions: object;

  constructor() {
    this.baseUrl = 'https://api.coinpaprika.com/v1';
    this.requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  }

  //coin list

  async getCoinList() {
    const response = await fetch(`${this.baseUrl}/coins`, this.requestOptions);
    return await response.json();
  }
}

export default GetCoinData;
