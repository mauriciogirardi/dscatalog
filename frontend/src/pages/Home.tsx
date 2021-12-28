import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { RiArrowRightSLine } from 'react-icons/ri';

import { ContainerCenter } from 'components/ContainerCenter';
import { ButtonLink } from 'components/ButtonLink';
import { CATALOG } from 'constants/paths';
import { Header } from 'components/Header';

import mainImageSvg from 'assets/svgs/backgroundMain.svg';

export default function Home() {
  return (
    <>
      <Header />

      <ContainerCenter>
        <Flex
          flexDir={['column-reverse', 'column-reverse', 'row']}
          h={['600px', '800px', '510px']}
          borderRadius="4px"
          justify="center"
          align="center"
          boxShadow="md"
          bg="gray.800"
          w="100%"
          p="8"
        >
          <Flex flexDir="column" align={['center', 'start']} w="100%">
            <Heading
              textAlign={['center', 'left']}
              fontSize={['25px', '35px']}
              w={['300px', '380px']}
            >
              Conheça o melhor catálogo de produtos para DEVs.
            </Heading>
            <Text
              fontSize={['16px', '17px']}
              textAlign={['center', 'left']}
              w={['300px', '380px']}
              color="gray.300"
              mt="2"
              mb="6"
            >
              Ajudaremos você a encontrar os melhores produtos disponíveis no
              mercado.
            </Text>

            <ButtonLink
              path={CATALOG}
              title="INICIE AGORA A SUA BUSCA"
              icon={RiArrowRightSLine}
            />
          </Flex>

          <Box mb={['10', '10', '0']} w="100%">
            <Image
              src={mainImageSvg}
              alt="mulher sentada na mesa com um computador"
            />
          </Box>
        </Flex>
      </ContainerCenter>
    </>
  );
}
