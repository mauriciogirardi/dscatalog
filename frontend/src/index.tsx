import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { Providers } from 'hooks';
import { theme } from './styles/theme';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <Providers>
          <App />
        </Providers>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
