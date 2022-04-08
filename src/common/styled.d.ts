import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor?: string;
    liBgColor?: string;
    liTextColor?: string;
    toggleColor: string;
    priceList: string;
  }
}
