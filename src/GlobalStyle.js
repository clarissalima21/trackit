import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-weight: normal; /* >>> Aqui garantimos: SEM negrito */
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Lexend Deca', sans-serif;
  }

  html, #root {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyle;


