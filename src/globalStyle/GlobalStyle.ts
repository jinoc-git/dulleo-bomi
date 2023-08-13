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
  body { 
    line-height: 1.4;
    font-size: 0.9rem;
    color: #222;
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
  h2 {
    font-size: 2rem;
    font-weight: bold;
    font-family: 'TheJamsil5Bold';
    margin-bottom: 15px;
  }
  h3 { 
    font-size:1.5rem;
    font-family: 'TheJamsil5Bold';
  }
  h4 {font-size:1rem;font-weight:bold}
  p,
  tr,
  span,
  a {
    /* font-family: 'omnigothic020'; */
  }
  a:link, a:focus, a:active, a:visited, a:hover  {
        color: inherit
    }
  ul {
    list-style: none;
  }
`;

export default GlobalStyles;
