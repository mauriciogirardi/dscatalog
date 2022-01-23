import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { Providers } from 'hooks';
import { theme } from './styles/theme';

import App from './App';
import history from 'utils/history';

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <ChakraProvider theme={theme}>
        <Providers>
          <App />
        </Providers>
      </ChakraProvider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
