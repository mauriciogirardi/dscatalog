import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { ContainerCenter } from 'components/ContainerCenter';
import { Header } from 'components/Header';

import backgroundSvg from 'assets/svgs/backgroundLogin.svg';

export const Auth = () => {
  return (
    <>
      <Header />

      <ContainerCenter>
        <Flex align="center" w="100%">
          <Box p="5" w={['60%', '60%']} display={['none', 'none', 'block']}>
            <Heading w="380px">Divulgue seus produtos no MG Catalog</Heading>
            <Text my="5" color="gray.200" w="380px">
              Faça parte do nosso catálogo de divulgação e aumente a venda dos
              seus produtos.
            </Text>

            <Flex justify="center">
              <Image
                src={backgroundSvg}
                w="350px"
                alt="mulher fazendo login no celular"
              />
            </Flex>
          </Box>

          <Outlet />
        </Flex>
      </ContainerCenter>
    </>
  );
};
