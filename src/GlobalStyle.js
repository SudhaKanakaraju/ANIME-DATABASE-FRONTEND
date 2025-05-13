import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none; /* Corrected value */
    text-decoration: none; /* Corrected value */
    font-family: 'Inter', sans-serif; /* Corrected font family */
  }

  body 
    color: #6c7983;
    font-size:1.3rem;

  }
`;

export default GlobalStyle;
