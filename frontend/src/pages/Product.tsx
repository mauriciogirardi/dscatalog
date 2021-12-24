import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import computerPng from 'assets/images/computer.png';
import { Header } from 'components/Header';
import { CardProduct } from 'components/CardProduct';

export default function Product() {
  return (
    <>
      <Header />

      <Container maxW="container.lg" py="4">
        <Heading as="h4" fontSize="20px" fontWeight={500} color="gray.300">
          Catálago de produtos
        </Heading>

        <SimpleGrid mt="10" minChildWidth="200px" gap="5" align="flex-start">
          <CardProduct
            price="2.779,00"
            title="Computador Desktop - Intel Core i7"
            urlImg={computerPng}
          />

          <CardProduct price="110,00" title="Mouse" urlImg={computerPng} />
          <CardProduct price="110,00" title="Mouse" urlImg={computerPng} />
          <CardProduct price="110,00" title="Mouse" urlImg={computerPng} />
          <CardProduct
            price="1.100,00"
            title="Computador Desktop - Intel Core i7"
            urlImg={computerPng}
          />
          <CardProduct price="110,00" title="Mouse" urlImg={computerPng} />
          <CardProduct price="110,00" title="Mouse" urlImg={computerPng} />
        </SimpleGrid>
      </Container>
    </>
  );
}
