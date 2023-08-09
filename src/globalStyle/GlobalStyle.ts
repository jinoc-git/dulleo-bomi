import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  ${reset};
  *{
    box-sizing: border-box;
  }
  h1 {
    font-family: 'TheJamsil5Bold';
  }
  th,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* font-family: 'omnigothic030'; */
  }
  p,
  tr,
  span,
  a {
    /* font-family: 'omnigothic020'; */
  }
`;

export default GlobalStyles;
