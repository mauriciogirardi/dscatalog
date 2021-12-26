import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Header } from 'components/Header';
import { Navbar } from './Navbar';

export default function Admin() {
  return (
    <>
      <Header />

      <Container maxW="container.lg" py="4">
        <Navbar />

        <Box mt="5">
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
