import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, Outlet, useMatch } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toggleDarkAtom } from '../common/atom';
import { fetchCoinInfo, fetchCoinTickers } from '../service/coinApi';
import {
  Container,
  Header,
  Title,
  Loader,
  LoadingSpinner,
  ThemeToggle,
  ICoinsProps as ICoinPorps,
} from './coins';

//type interface
interface IRouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
//보통 interface에 정의되는 variable 이름 앞에 I를 붙여주는 관례가 있음

interface ITikersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

//styled-component
export const Error = styled.h1`
  font-size: 2em;
`;
const OverviewSection = styled.section`
  margin: 0 0 2em;
`;

const PriceAndChartSection = styled(OverviewSection)``;

export const Overview = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-radius: 10px;
  text-align: center;
  background-color: ${(props) => props.theme.liBgColor};
`;

const OverviewItem = styled.div`
  padding: 0.5em;
`;

const OverviewTitle = styled.dt`
  margin: 0 0 0.8em;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
`;

const OverviewText = styled.dd`
  font-size: 1.5rem;
`;

const OverviewDescription = styled.div`
  padding: 2em 0.5em;
  line-height: 1.7em;
  font-weight: 300;
`;

const Tab = styled.button<{ isActive: boolean }>`
  display: block;
  width: calc(50% - 5px);
  border-radius: 10px;
  background-color: ${(props) => props.theme.liBgColor};
  text-align: center;
  a {
    display: block;
    padding: 1em;
    color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  }
  &:hover a {
    color: ${(props) => props.theme.accentColor};
  }
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2em;
`;

const HomeButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.liBgColor};
  a {
    display: block;
    color: ${(props) => props.theme.textColor};
  }
`;

const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const priceMath = useMatch('/:coinId/price');
  const chartMath = useMatch('/:coinId/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['info', coinId], () =>
    fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITikersData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId!)
  );

  const loading = infoLoading || tickersLoading;

  const [isDark, setDark] = useRecoilState(toggleDarkAtom);
  const toggleDarkMode = () => {
    setDark(isDark);
  };

  return (
    <Container>
      <Helmet>
        <link rel="icon" href={`https://cryptocurrencyliveprices.com/img/${coinId}.png`} />
        <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
          <HomeButton>
            <Link to="/">
              <i className="fa-solid fa-house"></i>
            </Link>
          </HomeButton>
        </Title>
        <ThemeToggle onClick={toggleDarkMode}>
          <span>{isDark ? '🌚' : '🌝'}</span>
        </ThemeToggle>
      </Header>
      {loading ? (
        <>
          <Loader>Now Loading...</Loader>
          <LoadingSpinner />
        </>
      ) : coinId ? (
        <>
          <OverviewSection>
            <Overview>
              <OverviewItem>
                <OverviewTitle>RANK :</OverviewTitle>
                <OverviewText>{infoData?.rank || 'No Data'}</OverviewText>
              </OverviewItem>
              <OverviewItem>
                <OverviewTitle>SYMBOL :</OverviewTitle>
                <OverviewText>{`$${infoData?.symbol || 'No Data'}`}</OverviewText>
              </OverviewItem>
              <OverviewItem>
                <OverviewTitle>PRICE :</OverviewTitle>
                <OverviewText>{`$${tickersData?.quotes.USD.price.toFixed(2)}`}</OverviewText>
              </OverviewItem>
            </Overview>
            {/* coin-rank,symbol,opensource */}
            <OverviewDescription>{infoData?.description || 'No Data'}</OverviewDescription>
            {/* discription */}
            <Overview>
              <OverviewItem>
                <OverviewTitle>TOTAL SUPLY :</OverviewTitle>
                <OverviewText>{tickersData?.total_supply || 'No Data'}</OverviewText>
              </OverviewItem>
              <OverviewItem>
                <OverviewTitle>MAX SUPPLY :</OverviewTitle>
                <OverviewText>{tickersData?.max_supply || 'No Data'}</OverviewText>
              </OverviewItem>
            </Overview>
            {/* coin-rank,symbol,opensource */}
          </OverviewSection>
          {/* Overview Section */}
          <PriceAndChartSection>
            <TabButtons>
              <Tab isActive={priceMath !== null}>
                <Link to={`/${coinId}/price`}>PRICE</Link>
              </Tab>
              <Tab isActive={chartMath !== null}>
                <Link to={`/${coinId}/chart`}>CHART</Link>
              </Tab>
            </TabButtons>

            <Outlet
              context={{
                coinId,
                priceData: tickersData?.quotes.USD,
              }}
            />
          </PriceAndChartSection>
          {/* PriceAndChartSection */}
        </>
      ) : (
        <Error>Wrong Path...</Error>
      )}
    </Container>
  );
};

export default Coin;
