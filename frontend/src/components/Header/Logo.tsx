import { Heading, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <Flex align="center">
        <Heading as="h1" size="lg" pr="1" fontWeight={800} color="blue.400">
          MG
        </Heading>

        <Heading as="h1" fontWeight={500} size="lg">
          Catalog
        </Heading>
      </Flex>
    </Link>
  );
};
